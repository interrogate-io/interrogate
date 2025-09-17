# @interrogate/rehype-plugin-plantuml

[![NPM version][npm-badge]][npm-url] [![License: MIT][license-badge]][license-url]

Transform PlantUML diagrams into SVG during HTML transformation with [Rehype][rehype].

## Quick reference

- **Package**: [@interrogate/rehype-plugin-plantuml][npm-url]
- **Maintained by**: [interrogate-io](https://github.com/interrogate-io)
- **Issues**: [GitHub Issues](https://github.com/interrogate-io/interrogate/issues)

## Installation

```bash
npm install @interrogate/rehype-plugin-plantuml
```

For optimal use with Markdown processing, also install:

```bash
npm install @interrogate/remark-plugin-plantuml
```

## What is this?

A [Rehype][rehype] plugin that converts PlantUML diagram nodes into SVG during HTML transformation.
It works in conjunction with [@interrogate/remark-plugin-plantuml][remark-plantuml] to provide a
complete Markdown-to-HTML transformation pipeline for PlantUML diagrams.

## When should I use this?

- When you need to convert PlantUML diagrams to SVG in your HTML processing pipeline
- When you're using Rehype for HTML transformations
- As part of a documentation system that includes PlantUML diagrams
- In combination with [@interrogate/remark-plugin-plantuml][remark-plantuml] for Markdown processing

## Usage

Basic usage with Rehype:

```js
import rehype from "rehype"
import rehypePlantuml from "@interrogate/rehype-plugin-plantuml"

const result = await rehype().use(rehypePlantuml).process(/* your HTML */)
```

### Output Structure

For code blocks, the default output structure is:

```html
<figure>
  <pre><code class="language-plantuml"><!-- PlantUML source --></code></pre>
  <svg><!-- Generated diagram --></svg>
</figure>
```

For images (`.puml` files), the default output structure is:

```html
<figure>
  <svg><!-- Generated diagram --></svg>
</figure>
```

## API

### `rehype().use(rehypePlantuml[, options])`

Transform PlantUML diagram nodes into SVG during the HTML transformation process.

#### Options

```typescript
{
  // Show PlantUML source code for image references (default: false)
  includeCodeForImages?: boolean,

  // Place the diagram before the code block (default: false)
  placeDiagramFirst?: boolean
}
```

#### Example with Options

```js
import rehype from "rehype"
import rehypePlantuml from "@interrogate/rehype-plugin-plantuml"

// Show source code for images and place diagrams first
const result = await rehype()
  .use(rehypePlantuml, {
    includeCodeForImages: true,
    placeDiagramFirst: true,
  })
  .process(/* your HTML */)
```

## License

[MIT][license-url] © James Lafferty

[npm-badge]: https://img.shields.io/npm/v/@interrogate/rehype-plugin-plantuml.svg
[npm-url]: https://www.npmjs.com/package/@interrogate/rehype-plugin-plantuml
[license-badge]: https://img.shields.io/npm/l/@interrogate/rehype-plugin-plantuml.svg
[license-url]: https://github.com/interrogate-io/interrogate/blob/main/LICENSE
[rehype]: https://github.com/rehypejs/rehype
[remark-plantuml]: https://www.npmjs.com/package/@interrogate/remark-plugin-plantuml
