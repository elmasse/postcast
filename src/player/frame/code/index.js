import React, { Component } from 'react'
// import Typist from 'react-typist'
import styled from 'react-emotion'

import Highlight from './code-highlight'

export default class Code extends Component {
  static displayName = 'Code'

  render () {
    const { className = '', children } = this.props
    const [, lang] = className.split('-')
    return (
      <Pre className={`hljs hljs-${lang}`}>
        <Highlight className={className}>{children}</Highlight>
      </Pre>
    )
  }
}

const Pre = styled('pre')`
  box-shadow: 0 2px 4px rgba(0,0,0,.15);
  text-align: left;
  min-width: 450px;
`
