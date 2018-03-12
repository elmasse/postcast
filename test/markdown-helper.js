
export const create = ({ yaml = {}, content = '' }) => {
  const header = (yaml) => {
    const keys = Object.keys(yaml)
    let body = ''

    if (!yaml || ! keys.length) return ''
    
    for (let key of keys) {
      body += `${key}: ${yaml[key]}\n`
    }

    return `---\n${body}\n---\n`
  }

  return `${header(yaml)}${content}`
}
