/* global SpeechSynthesisUtterance */
import { Component } from 'react'

export default class SpeechSynth extends Component {
  constructor (props) {
    super(props)

    if ('speechSynthesis' in window) {
      this.speech = this.createSpeech(props)
    } else {
      console.warn('The current browser does not support the speechSynthesis API.')
    }

    this.state = {
      started: false,
      playing: false
    }
  }

  createSpeech ({ text = '', volume = 1, rate = 1, pitch = 1, lang = 'en-US' }) {
    let speech = new SpeechSynthesisUtterance(text)
    return Object.assign(speech, {
      volume,
      rate,
      pitch,
      lang
    })
  }

  speak = () => {
    window.speechSynthesis.speak(this.speech)
    this.setState({ started: true, playing: true })
  }

  cancel = () => {
    window.speechSynthesis.resume()
    window.speechSynthesis.cancel()
    this.setState({ started: false, playing: false })
  }

  pause = () => {
    window.speechSynthesis.pause()
    this.setState({ playing: false })
  }

  resume = () => {
    window.speechSynthesis.resume()
    this.setState({ playing: true })
  }

  onEnd = () => {
    this.setState({ started: false })
    this.props.onEnd()
  }

  componentWillReceiveProps ({ play, pause }) {
    const { started, playing } = this.state
    if (play && !started) {
      return this.speak()
    }

    if (pause && playing && started) {
      return this.pause()
    }

    if (!pause && !playing && started) {
      return this.resume()
    }
  }

  shouldComponentUpdate () {
    return false
  }

  componentDidMount () {
    const { play } = this.props
    this.speechEvents = [
      { name: 'start', action: this.props.onStart },
      { name: 'error', action: this.props.onError },
      { name: 'pause', action: this.props.onPause },
      { name: 'resume', action: this.props.onResume },
      { name: 'end', action: this.onEnd }
    ]

    this.speechEvents.forEach(e => {
      this.speech.addEventListener(e.name, e.action)
    })

    if (play) {
      this.speak()
    }
  }

  componentWillUnmount () {
    this.speechEvents.forEach(e => {
      this.speech.removeEventListener(e.name, e.action)
    })
    this.cancel()
  }

  render () {
    return null
  }
}
