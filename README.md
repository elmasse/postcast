# Postcast

A react component to create a postcast using markdown files.

## Install

`Postcast` requires `react` and `react-dom` as peer dependencies.

```bash
npm install postcast react react-dom
```

## Usage

`Postcast` requires a `src` that should be a url pointing to a markdown file.

```js
import React from 'react'

export default () => <Postcast src="/guides/getting-started.md" />

```

### Higlighting code

**Postcast** uses `highlight.js` internally to parse code fence blocks in markdown. You should load the css file of your choice for highlight themes.

```js
import React from 'react'
// eslint-disable-next-line 
import css from 'highlight.js/styles/atom-one-light.css'


export default () => <Postcast src="/guides/getting-started.md" />

```

## Documentation

- `src` {String}: url pointing to a markdown file.
- `file` {File}: a File object that points to a markdown file. If this is present `src` is ignored
- `lang` {String}: The language in the format `IETF`. Example: `en-US` (English as used in the United States)
- `phonemes` {Object}: A map of `{word: phoneme}` to be used for all occurrencies. The `phoneme` is a `String` but it must be defined in between `/`. Example: `{ yaml: '/yæməl/' }`

### YAML configuration

Markdown files can contain `YAML` configuration blocks (`frontmatter`). These are the configs that are read by Postcast:

- `title`: If present, it will generate an `h1` tag with the title value.
- `lang`: If present, it will override the `lang` configuration.
- `phonemes`: if present, it will override the `phonemes` configuration.

