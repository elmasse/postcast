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
    <Postcast lang="es-AR">
      {() => md.withTextInSpanish}
    </Postcast>    
  ))
  .add('with language by YAML', () => (
    <Postcast lang="es-AR">
      {() => md.withLanguage}
    </Postcast>    
  ))  
  .add('with phonemes by param', () => (
    <Postcast phonemes={{yaml: `/yæməl/`}}>
      {() => md.withPhonemes}
    </Postcast>
  ))
  .add('with phonemes by YAML', () => (
    <Postcast>
      {() => md.withPhonemesInYAML}
    </Postcast>
  ))
  .add('with multiple config', () => (
    <Postcast>
      {() => md.withConfig}
    </Postcast>
  ))
  .add('with src: React README', () => (
    <Postcast src="/react.md"/>
  ))
  .add('with src: Redux README', () => (
    <Postcast src="/redux.md"/>
  ))
