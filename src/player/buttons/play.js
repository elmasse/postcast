import React, { Component } from 'react'

export default class Play extends Component {
  handlePlay = () => {
    const { playing, onPlay, onPause } = this.props

    playing ? onPause() : onPlay()
  }

  render () {
    const { playing, size = 48, ...props } = this.props

    return (
      <svg onClick={this.handlePlay} height={size} width={size} {...props} viewBox={'0 0 48 48'} xmlns={'http://www.w3.org/2000/svg'}>
        <title>{playing ? 'Pause' : 'Play'}</title>
        {!playing &&
          <g>
            <path d={'M20 33l12-9-12-9v18zm4-29C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z'} />
          </g>
        }
        {playing &&
          <g>
            <path d={'M18 32h4V16h-4v16zm6-28C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16zm2-8h4V16h-4v16z'} />
          </g>
        }
      </svg>
    )
  }
}
