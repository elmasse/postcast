import React from 'react'
import Frame, { isContentNode, isFrameNode } from '../frame'

export default (items) => {
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
