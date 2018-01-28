import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'
import Postcast from '../src'
// eslint-disable-next-line 
import css from 'highlight.js/styles/atom-one-light.css'

storiesOf('Postcast', module)
  .add('with src', () => (
    <Postcast src="https://raw.githubusercontent.com/postcast/postcast/master/README.md"></Postcast>
  ))

