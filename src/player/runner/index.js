/* global btoa */

import React, { Component } from 'react'

import { isStringNode, isCodeNode, isContentNode } from '../frame'
import Synth from './synth'
import Timer from './timer'

const processTextToSpeech = (frame) => {
  const sanitize = textNode => {
    return textNode
      .replace(/[·]/gi, '') // hmmmm....
      .replace(/http(s):\/\//, '')
  }

  const walk = (c) => {
    const { children = [] } = c.props
    return children
      .filter((child, _, all) => {
        return (isStringNode(child) || !(isContentNode(child) && all.length > 1))
      })
      .map((child) => isStringNode(child) ? (sanitize(child)) : (!isCodeNode(child)) ? walk(child) : '')
      .reduce((prev, curr) => prev.concat(curr), [])
      .join(' ')
  }

  return walk(frame).trim()
}

export default class Runner extends Component {
  state = {
    text: processTextToSpeech(this.props.frame),
    duration: this.props.duration || 2000
  }

  componentWillReceiveProps (nextProps) {
    const { frame, duration } = nextProps
    if (frame !== this.props.frame) {
      this.setState({
        text: processTextToSpeech(frame)
      })
    }

    if (duration && duration !== this.state.duration) {
      this.setState({duration})
    }
  }

  render () {
    const { text, duration } = this.state
    const { play, pause, onEnd, metadata } = this.props
    const Runner = text ? Synth : Timer
    const key = btoa(text).substr(10)
    const lang = metadata ? metadata.lang : ''

    return (
      <Runner key={key} text={text} duration={duration} onEnd={onEnd} play={play} pause={pause} lang={lang} />
    )
  }
}
