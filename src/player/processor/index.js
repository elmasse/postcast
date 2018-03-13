import React from 'react'

import unified from 'unified'
import remarkParse from 'remark-parse'
import breaks from 'remark-breaks'
import remark2rehype from 'remark-rehype'
import emoji from 'remark-emoji'
import reactRenderer from 'rehype-react'
import raw from 'rehype-raw'
import fm from 'frontmatter'

import Frame from '../frame'
import Caption from '../frame/caption'
import Content from '../frame/content'
import Code from '../frame/code'

import createItems from './create-items'
import createFrames from './create-frames'
import splitParagraph from './split-paragraph'
import appendCaptionParagraphs from './append-caption-paragraphs'

export default (markdown, { phonemes } = {}) => {
  const { data, content } = fm(markdown)
  const processor = unified()
    .use(remarkParse)
    .use(breaks)
    .use(appendCaptionParagraphs)
    .use(splitParagraph)
    .use(emoji)
    .use(remark2rehype, { allowDangerousHTML: true })
    .use(() => tree => { tree.children = tree.children.filter(c => !!c.tagName) })
    .use(raw)
    .use(createItems, { data: { phonemes, ...data } })
    .use(reactRenderer, {
      createElement: React.createElement,
      components: {
        'postcast-frame': Frame,
        'postcast-content': Content,
        'postcast-caption': Caption,
        'postcast-code': Code
      }
    })

  const { props: { children } } = processor.processSync(content).contents

  return {
    data,
    content: createFrames(children)
  }
}
