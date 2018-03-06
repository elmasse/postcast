export default () => tree => {
  const extended = []
  tree.children.forEach(e => {
    const { type } = e
    extended.push(e)
    switch (type) {
      case 'heading':
        extended.push({ ...e, type: 'paragraph' })
        break
      case 'blockquote':
        e.children.forEach(bi => {
          switch (bi.type) {
            case 'list':
              bi.children.forEach(li => {
                li.children.forEach(lip => {
                  extended.push({ ...lip, type: 'paragraph' })
                })
              })
              break
            default:
              extended.push({ ...bi, type: 'paragraph' })
              break
          }
        })
        break
      case 'list':
        e.children.forEach(li => {
          li.children.forEach(lip => {
            extended.push({ ...lip, type: 'paragraph' })
          })
        })
        break
    }
  })
  tree.children = extended
}
