import React, { Component } from 'react'
import styled, { keyframes } from 'react-emotion'

export default class Caption extends Component {
  static displayName = 'Caption'

  render () {
    const { children } = this.props
    return (
      <Captioned>{children}</Captioned>
    )
  }
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const Captioned = styled.div`
  position: absolute;
  bottom: 35px;
  background: rgba(0,0,0,.3);
  color: black;
  animation: ${fadeIn} .3s ease-in; 
  padding: 0px 20px;
  color: white;
  text-shadow: 0px 0px 2px black;
  a {
    text-shadow: none;
  }
`
