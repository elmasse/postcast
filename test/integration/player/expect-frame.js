/* global expect */


expect.extend({
  toHaveFrames,
  toHaveFrameWithCaption
})

function toHaveFrames (received, argument) {
  const pass = received.content.length === argument
  return ({
    message: () => `expected ${received.content} to ${pass ? 'not' : '' } have ${argument} frames`,
    pass
  })
}

function toHaveFrameWithCaption (actual, { index = 0,  captionText }) {
  const frame = actual.content[index]
  const caption = frame.props.children[1]
  const p = caption.props.children[0]

  const pass = frame && caption && p.props.children[0] === captionText
  
  return ({
    message: () => `expected ${captionText} in frame ${index} to ${pass ? 'not' : '' } have ${captionText}`,
    pass
  })  

}

// export default (result) => {
//   return {
//     toHaveDataAndContent: hasDataAndContent(result),
//     containsFrames: containsFrames(result)
//   }
// }


// const containsFrames = (result) => (qty) => {
//   expect(result.content.length).toBe(qty)
// }
