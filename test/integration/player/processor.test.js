/* global describe, test, expect */

import { create } from '../../markdown-helper'

/* SUT */
import processor from '../../../src/player/processor'

describe('player/processor YAML', () => {
  test('process headers: title', async () => {
    const title = 'TItle'
    const content = 'Some text.'
    const markdown = create({ yaml: { title }, content })
    
    //when
    const result = processor(markdown)

    //expect
    expect(result).toBeTruthy()
    expect(result).toHaveProperty('data')
    expect(result).toHaveProperty('content')
    expect(result.data).toMatchObject({ title })
  })
});


describe('player/processor content', () => {
  test('process content with title and short paragraph', async () => {
    const title = 'TItle'
    const content = 'Some text.'
    const markdown = create({ yaml: { title }, content })
    
    //when
    const result = processor(markdown)

    //expect
    expect(result).toBeTruthy()
    expect(result).toHaveProperty('data')
    expect(result).toHaveProperty('content')

    expect(result.content.length).toBe(2) // [frame, frame]
    expect(result.content[0].props.children.length).toBe(2) // frame -> [content(title), caption(title)]
    expect(result.content[1].props.children.length).toBe(2) // frame -> [content(title), caption(paragraph)]
    expect(result.content[1].props.children[1].props.children.length).toBe(1) // caption -> p
  })
});
