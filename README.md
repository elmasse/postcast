# Postcast

A react component to create a postcast using markdown files.

## Install

`<Postcast />` requires `react` and `react-dom` as peer dependencies.

```bash
npm install postcast react react-dom
```

## Usage

`<Postcast />` requires a `src` that should be a url pointing to a markdown file.

```js
import React from 'react'

export default () => <Postcast src="/guides/getting-started.md" />

```

### Higlighting code

`<Postcast />` uses `highlight.js` internally to parse code fence blocks in markdown. You should load the css file of your choice for highlight themes.

```js
import React from 'react'
// eslint-disable-next-line 
import css from 'highlight.js/styles/atom-one-light.css'


export default () => <Postcast src="/guides/getting-started.md" />

```

## Documentation

- `src`: url pointing to a markdown file.


