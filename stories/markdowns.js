export const simple = 
`# This is a Title

And this is a paragraph.
`

export const longParagraph = 
`---
title: Title
---

A *paragraph* with \`Code in text\` and links like [example.com](/somehwhere) and more text. And this is a longer text that should exceed the limits for a paragraph. Believe me, Chrome is a piece of crap on Linux machines. But hey, don't get me wrong, Linux is good.

Anoter Paragraph.  
With Line breaks.
`

export const withTitleInYAML =
`---
title: This is a Title from YAML
---

And this is a paragraph.
`

export const withTextInSpanish =
`# Esto es un título

Y esto es un párrafo que está en Español.
`
export const withLanguage =
`---
lang: es-AR
---
# Esto es un título

Y esto es un párrafo que está en Español.
`

export const withPhonemes = 
`---
title: This is a Title from YAML
---

And this is a paragraph that contains again, the word yaml.
`


export const withPhonemesInYAML = 
`---
title: This is a Title from YAML
phonemes:
   yaml: /yæməl/
---

And this is a paragraph that contains again, the word yaml.
`

export const withConfig =
`---
lang: es-AR
phonemes:
   yaml: /iámel/
   framework: /fréim uorc/
   slides: /es láidz/
---

# Presentaciones en Español

A veces contienen palabras en inglés. Como por ejemplo "framework que nos permite crear slides". 
O pueden ser siglas que se leen en inglés como YAML.
`
