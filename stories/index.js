import React from 'react'
import { storiesOf } from '@storybook/react'
// import { action } from '@storybook/addon-actions'

import * as md from './markdowns';
import Postcast from '../src'

// eslint-disable-next-line 
import css from 'highlight.js/styles/atom-one-light.css'

storiesOf('Postcast', module)
  .add('with src', () => (
    <Postcast src="https://raw.githubusercontent.com/postcast/postcast/master/README.md"></Postcast>
  ))
  .add('with src: Redux README', () => (
    <Postcast src="/redux.md"/>
  ))
  .add('with markdown as children', () => (
    <Postcast>
      {() => md.simple}
    </Postcast>
  ))
  .add('with long paragraphs', () => (
    <Postcast>
      {() => md.longParagraph}
    </Postcast>
  ))
  .add('with title in YAML', () => (
    <Postcast>
      {() => md.withTitleInYAML}
    </Postcast>
  ))
  .add('with language', () => (
    <Postcast>
      {() => md.withLanguage}
    </Postcast>    
  ))
  .add('with phonemes', () => (
    <Postcast>
      {() => md.withPhonemes}
    </Postcast>    
  ))
  .add('with multiple config', () => (
    <Postcast>
      {() => md.withConfig}
    </Postcast>
  ))
