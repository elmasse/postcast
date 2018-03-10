# Postcast

[![Greenkeeper badge](https://badges.greenkeeper.io/postcast/postcast.svg)](https://greenkeeper.io/)

A react component to create a postcast using markdown files.

[![Build Status](https://travis-ci.org/postcast/postcast.svg?branch=master)](https://travis-ci.org/postcast/postcast)

## Install

`Postcast` requires `react` and `react-dom` as peer dependencies.

```bash
npm install postcast react react-dom
```

## Usage

### With URL

You can specify a url pointing to a markdown file using the `src` config:

```js
import React from 'react'

export default () => <Postcast src="/guides/getting-started.md" />

```

### With inline markdown

Markdown can be passed using a children function:

```js
<Postcast lang="es-AR">
    {() => `#Hola Mundo!`}
</Postcast>

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

