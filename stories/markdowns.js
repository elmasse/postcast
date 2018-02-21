export const simple = 
`# This is a Title

And this is a paragraph.
`

export const longParagraph = 
`# This is a Title

And this is a paragraph. A short one. This will be not modified.

But this one, should be splitted into 4 paragraphs since it contains more than 200 characters. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
`

export const withTitleInYAML =
`---
title: This is a Title from YAML
---

And this is a paragraph.
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
