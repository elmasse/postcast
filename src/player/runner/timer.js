import { Component } from 'react'

export default class Timer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      started: false,
      playing: false,
      duration: props.duration || 2000
    }
  }

  run = () => {
    const { duration } = this.state
    this._timeout = window.setTimeout(this._fn, duration)
    this._start = new Date()
    this._duration = duration
    this.setState({ started: true, playing: true })
  }

  cancel = () => {
    window.clearTimeout(this._timeout)
    this.setState({ started: false, playing: false })
  }

  pause = () => {
    window.clearTimeout(this._timeout)
    this._duration -= (new Date() - this._start)
    this.setState({ playing: false })
  }

  resume = () => {
    const duration = this._duration
    this._timeout = window.setTimeout(this._fn, duration)
    this._start = new Date()
    this.setState({ playing: true })
  }

  componentWillReceiveProps ({ play, pause }) {
    const { started, playing } = this.state
    if (play && !started) {
      return this.run()
    }

    if (pause && playing && started) {
      return this.pause()
    }

    if (!pause && !playing && started) {
      return this.resume()
    }
  }

  componentDidMount () {
    const { onEnd, play } = this.props

    this._fn = () => {
      this.setState({ started: false })
      onEnd()
    }

    if (play) {
      this.run()
    }
  }

  render () {
    return null
  }

  componentWillUnmount () {
    this.cancel()
  }
}
