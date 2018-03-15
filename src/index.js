/* global FileReader, fetch */
import React, { Component } from 'react'
import styled from 'react-emotion'

import Player from './player'

export default class Postcast extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loaded: false,
      loading: false,
      error: null
    }
  }

  async componentDidMount () {
    const { src, file, children } = this.props
    if (children) {
      this.setState({
        loaded: true,
        markdown: children()
      })
    }

    if (src) {
      await this.fetchPost(src)
    }

    if (file) {
      await this.loadFile(file)
    }
  }

  async componentDidUpdate (prevProps) {
    const { src, file, children } = this.props
    const { src: prevSrc, file: prevFile, children: prevChildren } = prevProps
    if (children && prevChildren !== children) {
      this.setState({
        loaded: true,
        markdown: children()
      })
    }

    if (src && prevSrc !== src) {
      await this.fetchPost(src)
    }

    if (file && prevFile !== file) {
      await this.loadFile(file)
    }
  }

  async fetchPost (src) {
    if (src) {
      this.setState({ loading: true, error: null })

      try {
        const response = await fetch(src)

        if (!(response.headers.get('content-type').includes(`text/markdown`) ||
          response.headers.get('content-type').includes(`text/plain`))) {
          this.setState({
            error: `${src} does not look like a markdown file!`,
            loading: false
          })

          return
        }

        const text = await response.text()

        this.setState({
          loaded: true,
          loading: false,
          markdown: text
        })
      } catch (e) {
        this.setState({
          error: `Looks like we cannot connect to ${src}`,
          loading: false
        })
      }
    } else {
      this.setState({
        loaded: false,
        loading: false,
        markdown: ''
      })
    }
  }

  async fetchFileText (file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        resolve(e.target.result)
      }
      reader.readAsText(file)
    })
  }

  async loadFile (file) {
    this.setState({ loading: true, error: null })

    if (file) {
      const text = await this.fetchFileText(file)
      this.setState({
        loaded: true,
        loading: false,
        markdown: text
      })
    } else {
      this.setState({
        loaded: false,
        loading: false,
        markdown: ''
      })
    }
  }

  render () {
    const { src, file, children, lang, phonemes, ...props } = this.props
    const { loaded, loading, markdown, error } = this.state
    return (
      <Container {...props} >
        { loading && <Loading>Loading</Loading> }
        { !loading && loaded && <Player markdown={markdown} lang={lang} phonemes={phonemes} /> }
        { error && <Error><h2>Something went wrong</h2>{error}</Error> }
      </Container>
    )
  }
}

const Container = styled('div')`
  height: ${({ height }) => `${(height || 500)}px`};
  width: ${({ width }) => `${(width || 900)}px`};

  @media (max-width: 800px) {
    height: 60vh;
    width: 80vw;  
  }
  
  background: #181818;
  position: relative;
  display: flex;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(127, 127, 127, .2);

  > div {
    flex: 1;
  }
`

const Loading = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;  
`

const Error = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  padding: 10px;
  color: #fafafa;
`
