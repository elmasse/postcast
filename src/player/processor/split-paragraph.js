import { sentences } from 'sbd'

export default () => tree => {
  const replace = []

  tree.children
    .filter(p => p.type === 'paragraph')
    .forEach(
    p => {
      const { children } = p
      const split = []
      let sentence = ''
      let from = 0
      const pushToSplit = pushTo(split)
      const exploded = []

      // explode text children
      for (const _child of children) {
        if (_child.type === 'text') {
          exploded.push([_child, explode(_child)])
        }
      }

      exploded.forEach(([child, explode]) => {
        children.splice(children.indexOf(child), 1, ...explode)
      })

      // split sentences
      for (const child of children) {
        const index = children.indexOf(child)

        if (child.type === 'break') {
          pushToSplit(p, from, index)
          from = index + 1 // skip break
        }

        if (child.type === 'text' || child.type === 'strong' || child.type === 'emphasis') {
          sentence += valueFrom(child)
          const result = sentences(sentence)

          if (result.length > 1) {
            pushToSplit(p, from, index)
            from = index
            sentence = valueFrom(child)
          }
        }

        if (index === children.length - 1) { // reached last element
          pushToSplit(p, from)
        }
      } // for
      replace.push([p, split])
    }
  ) // forEach
  replace.forEach(([p, split]) => {
    tree.children.splice(tree.children.indexOf(p), 1, ...split)
  })
}

const explode = (textNode) => {
  let { value } = textNode
  const startsWithStop = value.startsWith('.')

  if (startsWithStop) {
    value = value.slice(1)
  }

  const all = sentences(value, { preserve_whitespace: true })

  if (startsWithStop) {
    all.unshift('.')
  }

  return all.map(v => ({ ...textNode, value: v }))
}

const pushTo = array => (p, from, index) => {
  const { children } = p
  const split = children.slice(from, index)
  if (split.length) {
    array.push({ ...p, children: split })
  }
}

const valueFrom = child => {
  return child.value || child.children.map(c => c.value).join('')
}
