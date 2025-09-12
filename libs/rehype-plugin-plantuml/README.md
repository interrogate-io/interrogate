# @interrogate/rehype-plugin-plantuml

[![NPM version][npm-badge]][npm-url] [![LICENSE][license-badge]][license-url]

[Rehype][rehype] plugin to process PlantUML diagrams into SVG during HTML transformation.

## Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [License](#license)

## Installation

```bash
npm install @interrogate/rehype-plugin-plantuml
```

For optimal use with Markdown processing, also install:

```bash
npm install @interrogate/remark-plugin-plantuml
```

## Usage

```js
import rehype from "rehype"
import rehypePlantuml from "@interrogate/rehype-plugin-plantuml"

const result = await rehype().use(rehypePlantuml).process(/* your HTML */)
```

## API

### `rehype().use(rehypePlantuml[, options])`

Transform PlantUML diagram nodes into SVG during the HTML transformation process.

This plugin is designed to work in conjunction with
[@interrogate/remark-plugin-plantuml][remark-plantuml] for a complete Markdown to HTML
transformation pipeline.

## License

[MIT][license-url] © James Lafferty

[npm-badge]: https://img.shields.io/npm/v/@interrogate/rehype-plugin-plantuml.svg
[npm-url]: https://www.npmjs.com/package/@interrogate/rehype-plugin-plantuml
[license-badge]: https://img.shields.io/npm/l/@interrogate/rehype-plugin-plantuml.svg
[license-url]: https://github.com/james-lafferty/interrogate/blob/main/LICENSE
[rehype]: https://github.com/rehypejs/rehype
[remark-plantuml]: https://www.npmjs.com/package/@interrogate/remark-plugin-plantuml
