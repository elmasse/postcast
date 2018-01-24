import React, { Component } from 'react'
import styled from 'react-emotion'

export default class Timeline extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeFrame: props.active
    }
  }

  componentWillReceiveProps (nextProps) {
    const { active } = nextProps
    const { activeFrame } = this.state
    if (active !== activeFrame) {
      this.setState({
        activeFrame: active
      })
    }
  }

  handleChange = (e) => {
    const { value } = e.target
    const { onChangeFrame } = this.props
    onChangeFrame(parseInt(value, 10))
  }

  render () {
    const { frames } = this.props
    const { length } = frames
    const { activeFrame } = this.state

    return (
      <InputRange type={'range'} max={length - 1} value={activeFrame} onChange={this.handleChange} />
    )
  }
}

const InputRange = styled.input`
  flex: 1;
  margin: 0 10px;
  width: auto;
`
