import React from 'react'

import unified from 'unified'
import remarkParse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import emoji from 'remark-emoji'
import reactRenderer from 'rehype-react'
import raw from 'rehype-raw'
import u from 'unist-builder'
import h from 'hastscript'
import fm from 'frontmatter'
import visit from 'unist-util-visit'

import Frame, { isContentNode, isFrameNode } from './frame'
import Caption from './frame/caption'
import Content from './frame/content'
import Code from './frame/code'

const onlyImages = (node) => {
  const { children } = node
  const filtered = children.filter((c) => !['\n'].includes(c.value))

  for (const child of filtered) {
    if ((child.tagName === 'a' && child.children[0].tagName !== 'img') || (child.tagName !== 'a' && child.tagName !== 'img')) return false
  }

  return true
}

const createCaption = (props, children) => {
  if (props instanceof Array) {
    children = props
    props = {}
  }
  let textToSpeech = ''
  const [ node ] = children

  visit(node, 'text', ({ value }) => {
    textToSpeech += value
  })

  return h('postcast-caption', { ...props, textToSpeech }, children)
}

const createItems = ({ data }) => (tree) => {
  const { children } = tree
  const items = []
  let content, caption

  if (data && data.title) {
    content = h('postcast-content', [h('h1', [data.title])])
    items.push(content)
  }

  for (const node of children) {
    const { tagName } = node
    switch (tagName) {
      case 'img':
      case 'table':
        content = h('postcast-content', [node])
        items.push(content)
        break
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'blockquote':
        caption = createCaption({ hidden: true }, [node])
        content = h('postcast-content', [node])
        items.push(h('postcast-frame', [content, caption]))
        break
      case 'p':
        if (onlyImages(node)) {
          content = h('postcast-content', [node])
          items.push(content)
        } else {
          caption = createCaption([node])
          items.push(caption)
        }
        break
      case 'pre':
        const { children, properties } = node.children[0]
        content = h('postcast-content', [
          h('postcast-code', properties, children)
        ])
        items.push(content)
        break
      case 'ul':
      case 'ol':
        const uls = node.children.filter((c) => !['\n'].includes(c.value))
        for (const child of uls) {
          caption = createCaption({ hidden: true }, [child])
          content = h('postcast-content', [h('ul', [child])])
          items.push(h('postcast-frame', [content, caption]))
        }
        break
      default:
        console.warn(`${tagName} is not processed`)
        break
    }
  }

  return u('root', items)
}

const cleanNodes = () => tree => {
  tree.children = tree.children.filter(c => !!c.tagName)
  return tree
}

const createFrames = (items) => {
  let content, caption

  return items.map((item, idx, all) => {
    if (isFrameNode(item)) {
      [content, caption] = item.props.children
    } else if (isContentNode(item)) {
      content = item
      caption = undefined
    } else {
      caption = item
    }
    const children = [content]
    if (caption) {
      children.push(caption)
    }

    return (
      <Frame>
        {children}
      </Frame>
    )
  })
}

const process = markdown => {
  const { data, content } = fm(markdown)
  const processor = unified()
    .use(remarkParse)
    .use(emoji)
    .use(remark2rehype, { allowDangerousHTML: true })
    .use(raw)
    .use(cleanNodes)
    .use(createItems, { data })
    .use(reactRenderer, {
      createElement: React.createElement,
      components: {
        'postcast-frame': Frame,
        'postcast-content': Content,
        'postcast-caption': Caption,
        'postcast-code': Code
      }
    })
  return {
    data,
    content: createFrames(processor.processSync(content).contents.props.children)
  }
}

export default process
