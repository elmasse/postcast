import React, { Component } from 'react'
import styled from 'react-emotion'

import process from './processor'
import Runner from './runner'
import Frame from './frame'
import Timeline from './timeline'
import Play from './buttons/play'
import Captions from './buttons/captions'
import Language from './buttons/language'

export default class Player extends Component {
  constructor (props) {
    super(props)
    const { markdown, lang, phonemes } = props
    const { data, content } = process(markdown, { phonemes })
    this.state = {
      active: 0,
      playing: false,
      metadata: { lang, phonemes, ...data },
      frames: content,
      captions: true,
      mouseOver: false
    }
  }

  componentWillReceiveProps (nextProps) {
    const { markdown, lang, phonemes } = this.props

    if (markdown !== nextProps.markdown) {
      const { data, content } = process(nextProps.markdown, { phonemes })
      this.setState({
        active: 0,
        playing: false,
        metadata: { phonemes, lang, ...data },
        frames: content,
        captions: true,
        mouseOver: false
      })
    }
  }

  handlePlay = () => {
    this.setState({
      playing: true
    })
  }

  next = () => {
    const { active, frames } = this.state
    const next = active + 1

    if (next >= frames.length) {
      this.setState({
        playing: false
      })
    } else {
      this.setState({active: next})
    }
  }

  handlePause = () => {
    this.setState({
      playing: false
    })
  }

  handleStop = () => {
    this.setState({
      playing: false,
      active: 0
    })
  }

  handleFrameChange = (value) => {
    this.setState({ active: value })
  }

  handleToggleCaptions = () => {
    this.setState(prevState => ({captions: !prevState.captions}))
  }

  handleMouseEnter = () => {
    this.setState({mouseOver: true})
  }

  handleMouseLeave = () => {
    this.setState({mouseOver: false})
  }

  render () {
    const { frames, active, playing, captions, mouseOver, metadata } = this.state
    const frame = {...frames[active]}
    const frameProps = frame.props
    const language = metadata ? metadata.lang : undefined

    return (
      <Viewport onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <Runner
          frame={frame}
          metadata={metadata}
          play={playing}
          pause={!playing}
          onEnd={this.next}
        />
        <Frame {...frameProps} captions={captions} />
        <Toolbar hide={playing && !mouseOver}>
          <Controls>
            <Play onPlay={this.handlePlay} onPause={this.handlePause} playing={playing} size={30} />
            <Captions onToggle={this.handleToggleCaptions} captions={captions} size={30} />
            <Language language={language} size={30} />
          </Controls>
          <Timeline active={active} frames={frames} onChangeFrame={this.handleFrameChange} />
        </Toolbar>
      </Viewport>
    )
  }
}

const Viewport = styled('div')`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center; 
  flex: 1; 
`

const Toolbar = styled('div')`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: ${({ hide }) => hide ? 'none' : 'flex'};
  align-items: center;
  transition: all .3s ease-out;
`

const Controls = styled('div')`
  display: flex;
  padding: 2px 5px;
`
