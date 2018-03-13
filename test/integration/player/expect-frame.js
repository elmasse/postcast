/* global expect */

expect.extend({
  toHaveCaptionWithText,
  toHaveCaptionWith,
  toHaveContentWithText
})


function toHaveContentWithText (actual, contentText) {
  const content = actual.props.children[0]
  const element = content.props.children[0]
  const value = element.props.children[0]
  const pass = actual && content && element && value === contentText

  return ({
    message: () => `expected "${value}" in content to${pass ? ' not' : '' } be "${contentText}"`,
    pass
  })
  
}

function toHaveCaptionWithText (actual, captionText) {
  const caption = actual.props.children[1]
  const p = caption.props.children[0]
  const value = p.props.children[0]
  const pass = actual && caption && p && value === captionText

  return ({
    message: () => `expected "${value}" in frame caption to${pass ? ' not' : '' } be "${captionText}"`,
    pass
  })
}

function toHaveCaptionWith (actual, expectedArray) {
  const caption = actual.props.children[1]
  const p = caption.props.children[0]
  const descendants = p.props.children
  let pass = true
  let msg;
  expectedArray.forEach((expected, index) => {
    if (typeof expected === 'string' && descendants[index] !== expected) {
      pass = false
    }
    if (typeof expected === 'object') {
      for (let [k,v] in Object.entries(expected)) {
        if (descendants[index][k] !== v) {
          pass = false
        }
      }
    }
  });
  return ({
    message: () => `caption is wrong:`,
    pass
  })


}
