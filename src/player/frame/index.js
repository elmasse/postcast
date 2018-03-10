import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import styled from 'react-emotion'

// move this maybe?
export const isStringNode = node => (typeof node === 'string')
export const isCodeNode = node => node.type.displayName === 'Code'
export const isCaptionNode = node => node.type.displayName === 'Caption'
export const isContentNode = node => node.type.displayName === 'Content'
export const isFrameNode = node => node.type.displayName === 'Frame'

export default class Frame extends Component {
  static displayName = 'Frame'
  resetAnchorTarget = () => {
    const root = findDOMNode(this)
    if (root && root.querySelectorAll) {
      root.querySelectorAll('a[href^="http://"], a[href^="https://"]').forEach(tag => {
        tag.target = '_blank'
        tag.rel = 'noopener noreferrer'
      })
    }
  }

  render () {
    const { children, playing, captions, ...props } = this.props

    return (
      <Framed {...props}>
        {
          children
            .filter(c => captions || (!isCaptionNode(c)))
        }
      </Framed>
    )
  }

  componentDidUpdate () {
    this.resetAnchorTarget()
  }

  componentDidMount () {
    this.resetAnchorTarget()
  }
}

const Framed = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  background: white;
  flex: 1;
  overflow: scroll;
`
