/* global expect */


const toHaveContentWithText = (actual, contentText) => {
  const content = actual.props.children[0]
  const element = content.props.children[0]
  const value = element.props.children[0]
  const pass = actual && content && element && value === contentText

  return ({
    message: () => `expected "${value}" in content to${pass ? ' not' : '' } be "${contentText}"`,
    pass
  })
  
}

const toHaveCaptionWithText = (actual, captionText) => {
  const caption = actual.props.children[1]
  const p = caption.props.children[0]
  const value = p.props.children[0]
  const pass = actual && caption && p && value === captionText

  return ({
    message: () => `expected "${value}" in frame ${index} caption to${pass ? ' not' : '' } be "${captionText}"`,
    pass
  })
}


expect.extend({
  toHaveCaptionWithText,
  toHaveContentWithText
})
