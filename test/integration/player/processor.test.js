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
    const title = 'Title'
    const content = 'Some text.'
    const markdown = create({ yaml: { title }, content })
    
    //when
    const result = processor(markdown)

    //expect
    expect(result).toBeTruthy()
    expect(result).toHaveProperty('data')
    expect(result).toHaveProperty('content')

    expect(result.content.length).toBe(2) // [frame, frame]
    const [ frame1, frame2 ] = result.content
    
    expect(frame1.props.children.length).toBe(2) // frame -> [content(title), caption(title)]
    expect(frame2.props.children.length).toBe(2) // frame -> [content(title), caption(paragraph)]

    expect(frame2.props.children[1].props.children.length).toBe(1) // caption -> p
    const [frame2caption] = frame2.props.children[1].props.children    
    
    expect(frame2caption.props.children[0]).toBe(content)
    
  })
});
