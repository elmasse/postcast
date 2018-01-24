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

import Frame from './frame'
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
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'img':
      case 'blockquote':
      case 'table':
        content = h('postcast-content', [node])
        items.push(content)
        break
      case 'p':
        if (onlyImages(node)) {
          content = h('postcast-content', [node])
          items.push(content)
        } else {
          caption = h('postcast-caption', [node])
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
          content = h('postcast-content', [h('ul', [child])])
          items.push(content)
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
    if (item.type.displayName === 'Content') {
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
