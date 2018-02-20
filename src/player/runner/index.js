import React, { Component } from 'react'

import { isCaptionNode } from '../frame'
import Synth from './synth'
import Timer from './timer'

const NoOp = () => null

const processTextToSpeech = (frame) => {
  const sanitize = text => {
    return text
      .replace(/[·]/gi, '') // hmmmm....
      .replace(/http(s):\/\//, '')
  }

  return frame.props.children
    .filter(isCaptionNode)
    .filter(e => e.props.textToSpeech)
    .map(e => sanitize(e.props.textToSpeech))
    .reduce((prev, curr) => prev.concat(curr), [])
    .join(' ')
    .trim()
}

const runnerKey = (frame) => frame.props.children.reduce((prev, curr) => `${prev}-${curr.key}`, 'runner')

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
    const { play, pause, onEnd, metadata, frame } = this.props
    const Runner = text ? (('speechSynthesis' in window) ? Synth : NoOp) : Timer
    const lang = metadata ? metadata.lang : ''
    const key = runnerKey(frame)

    return (
      <Runner key={key} text={text} duration={duration} onEnd={onEnd} play={play} pause={pause} lang={lang} />
    )
  }
}
