/* global describe, test, expect */

import './expect-frame'

import { create } from '../../markdown-helper'

/* SUT */
import processor from '../../../src/player/processor'

describe('player/processor content', () => {
  test('process content with title and one paragraph', () => {
    const paragraph = 'Some text.'
    const title = 'title'
    const markdown = create({ content: `# ${title}\n${paragraph}` })
    
    //when
    const { content: frames } = processor(markdown)

    //expect
    expect(frames.length).toBe(3)
    expect(frames[1]).toHaveContentWithText(title)
    expect(frames[1]).toHaveCaptionWithText(title)
    expect(frames[2]).toHaveCaptionWithText(paragraph)
  })

  test('process content with title and paragraph with 2 sentences', () => {
    const sentences = ['Some text. ', 'Another sentence.']
    const paragraph = sentences.join('')
    const title = 'title'
    const markdown = create({ content: `# ${title}\n${paragraph}` })    

    //when
    const { content: frames } = processor(markdown)

    //expect
    expect(frames.length).toBe(4)
    expect(frames[0]).toHaveContentWithText(title)
    expect(frames[1]).toHaveCaptionWithText(title)
    expect(frames[2]).toHaveCaptionWithText(sentences[0] )
    expect(frames[3]).toHaveCaptionWithText(sentences[1] )
  })  
});

describe('player/processor with YAML frontmatter', () => {
  test('process headers: title', () => {
    const title = 'Title'
    const paragraph = 'Some text.'
    const markdown = create({ yaml: { title }, content: paragraph })

    //when
    const { content: frames } = processor(markdown)

    //expect
    expect(frames.length).toBe(3)
    expect(frames[0]).toHaveContentWithText(title)
    expect(frames[1]).toHaveCaptionWithText(title)
    expect(frames[2]).toHaveCaptionWithText(paragraph)
  })
});
