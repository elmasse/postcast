import React, { Component } from 'react'
import styled, { css } from 'react-emotion'

export default class Content extends Component {
  static displayName = 'Content'

  render () {
    const { children } = this.props
    return (
      <Container css={scrollable}>{children}</Container>
    )
  }
}

const scrollable = css`
  margin: auto;
`

const table = css`
  table tr td img {
    width: 100%;
    object-fit: contain;
  }
`
const Container = styled.div`
  ${scrollable}
  ${table}
  padding: 30px;
`
