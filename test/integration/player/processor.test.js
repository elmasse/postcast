/* global describe, test, expect */

import './expect-frame'

import { create } from '../../markdown-helper'

/* SUT */
import processor from '../../../src/player/processor'

describe('player/processor content', () => {
  test('process content with title and one paragraph', async () => {
    const paragraph = 'Some text.'
    const title = 'title'
    const markdown = create({ content: `# ${title}\n${paragraph}` })
    
    //when
    const result = processor(markdown)

    //expect    
    const { content } = result
    expect(result).toHaveFrames(3)
    expect(result).toHaveFrameWithCaption({ index: 1, captionText: title })
    expect(result).toHaveFrameWithCaption({ index: 2, captionText: paragraph })
  })
  test('process content with title and paragraph with 2 sentences', async () => {
    const sentences = ['Some text. ', 'Another sentence.']
    const paragraph = sentences.join('')
    const title = 'title'
    const markdown = create({ content: `# ${title}\n${paragraph}` })    

    //when
    const result = processor(markdown)

    //expect
    const { content } = result
    expect(result).toHaveFrames(4)
    expect(result).toHaveFrameWithCaption({ index: 1, captionText: title })
    expect(result).toHaveFrameWithCaption({ index: 2, captionText: sentences[0] })
    expect(result).toHaveFrameWithCaption({ index: 3, captionText: sentences[1] })
  })  
});

describe('player/processor with YAML frontmatter', () => {
  test('process headers: title', async () => {
    const title = 'Title'
    const content = 'Some text.'
    const markdown = create({ yaml: { title }, content })

    //when
    const result = processor(markdown)

    //expect
    expect(result).toHaveFrames(3)
    expect(result).toHaveFrameWithCaption({ index: 1, captionText: title })
    expect(result).toHaveFrameWithCaption({ index: 2, captionText: content })
  })
});
