# @interrogate/plantuml-to-svg

[![NPM version][npm-badge]][npm-url] [![License: MIT][license-badge]][license-url]

Convert PlantUML markup to SVG using Docker or JAR-based rendering.

## Quick reference

- **Package**: [@interrogate/plantuml-to-svg][npm-url]
- **Maintained by**: [interrogate-io](https://github.com/interrogate-io)
- **Issues**: [GitHub Issues](https://github.com/interrogate-io/interrogate/issues)

## Installation

```bash
npm install @interrogate/plantuml-to-svg
```

## What is this?

A Node.js package that provides a flexible API for converting PlantUML diagrams into SVG format. It
supports both Docker-based rendering using `interrogate/plantuml-cli` and direct JAR file execution.

## When should I use this?

- When you need programmatic conversion of PlantUML to SVG in Node.js
- When you want flexibility between Docker and JAR-based rendering
- When building tools that process PlantUML diagrams
- As a dependency for other tools in the PlantUML ecosystem

## Prerequisites

Choose your preferred rendering method:

### Docker Method

- Docker installed and running
- Access to pull the `interrogate/plantuml-cli` image

### JAR Method

- Java Runtime Environment (JRE) installed
- System requirements as specified in [PlantUML's documentation](https://plantuml.com/starting)

## Usage

Basic conversion using Docker (default method):

```typescript
import { convertToSvg } from "@interrogate/plantuml-to-svg"

const plantUmlMarkup = `
@startuml
A -> B: Hello
B -> A: World
@enduml
`

const svg = await convertToSvg(plantUmlMarkup)
```

Using JAR method explicitly:

```typescript
const svgUsingJar = await convertToSvg(plantUmlMarkup, { method: "jar" })
```

## API

### `convertToSvg(markup: string, options?: ConversionOptions): Promise<string>`

Converts PlantUML markup to SVG format.

#### Options

- `method`: `"docker" | "jar"` - Rendering method (default: `"docker"`)
- Additional options documentation coming soon

## License

[MIT][license-url] © James Lafferty

[npm-badge]: https://img.shields.io/npm/v/@interrogate/plantuml-to-svg.svg
[npm-url]: https://www.npmjs.com/package/@interrogate/plantuml-to-svg
[license-badge]: https://img.shields.io/npm/l/@interrogate/plantuml-to-svg.svg
[license-url]: https://github.com/interrogate-io/interrogate/blob/main/LICENSE
