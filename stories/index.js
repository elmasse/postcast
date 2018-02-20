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
  .add('with markdown as children', () => (
    <Postcast>
      {() => `
# This is a Title

And this is a paragraph.
      `}
    </Postcast>
  ))
  .add('with long paragraphs', () => (
    <Postcast>
      {() => `
# This is a Title

And this is a paragraph. A short one. This will be not modified.

But this one, should be splitted into 4 paragraphs since it contains more than 200 characters. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
      `}
    </Postcast>
  ))
