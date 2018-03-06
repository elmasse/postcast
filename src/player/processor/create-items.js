import u from 'unist-builder'
import h from 'hastscript'
import visit from 'unist-util-visit'

export default ({ data }) => (tree) => {
  const createCaption = captioner({ data })
  const { children } = tree
  const items = []
  let content, caption

  if (data && data.title) {
    const node = h('h1', [data.title])
    caption = createCaption({props: { hidden: true }, children: [node]})
    content = h('postcast-content', [node])
    items.push(h('postcast-frame', [content, caption]))
  }

  for (const node of children) {
    const { tagName } = node
    switch (tagName) {
      case 'img':
      case 'table':
        content = h('postcast-content', [node])
        items.push(content)
        break
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'blockquote':
      case 'ul':
      case 'ol':
        // caption = createCaption({props: { hidden: true }, children: [node]})
        content = h('postcast-content', [node])
        // items.push(h('postcast-frame', [content, caption]))
        // items.push(h('postcast-frame', [content]))
        items.push(content)
        break
      case 'p':
        if (onlyImages(node)) {
          content = h('postcast-content', [node])
          items.push(content)
        } else {
          caption = createCaption({children: [node]})
          items.push(caption)
        }
        break
      case 'pre':
        const { children, properties } = node.children[0]
        content = h('postcast-content', [
          h('postcast-code', properties, children)
        ])
        items.push(content)
        break
      // case 'ul':
      // case 'ol':
      //   const uls = node.children.filter((c) => !['\n'].includes(c.value))
      //   for (const child of uls) {
      //     caption = createCaption({props: { hidden: true }, children: [child]})
      //     content = h('postcast-content', [h('ul', [child])])
      //     items.push(h('postcast-frame', [content, caption]))
      //   }
      //   break
      default:
        console.warn(`${tagName} is not processed`)
        break
    }
  }
  return u('root', items)
}

const replacePhonemes = (phonemes, text) => {
  if (!phonemes) return text
  const re = new RegExp(Object.keys(phonemes).join('|'), 'gi')

  return text.replace(re, (matched) => phonemes[matched.toLowerCase()])
}

const captioner = ({ data }) => ({ props, children }) => {
  const [ node ] = children
  const { phonemes } = data || {}
  let textToSpeech = ''

  visit(node, 'text', ({ value }) => {
    textToSpeech += value
  })

  return h('postcast-caption', {
    ...props,
    textToSpeech: replacePhonemes(phonemes, textToSpeech) },
    [node]
  )
}

const onlyImages = (node) => {
  const { children } = node
  const filtered = children.filter((c) => !['\n'].includes(c.value))

  for (const child of filtered) {
    if ((child.tagName === 'a' && child.children[0].tagName !== 'img') || (child.tagName !== 'a' && child.tagName !== 'img')) return false
  }

  return true
}
