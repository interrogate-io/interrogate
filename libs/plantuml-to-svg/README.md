# @interrogate/plantuml-to-svg

A Node.js package to convert PlantUML markup into SVG format.

## Description

This package provides a simple way to convert PlantUML diagrams into SVG format using either the
`interrogate/plantuml-cli` Docker image or the PlantUML jar file directly.

## Prerequisites

Choose one of the following methods:

### Docker Method

- Docker installed and running on your system
- Access to pull the `interrogate/plantuml-cli` image

### JAR Method

- Java Runtime Environment (JRE) installed
- System requirements as specified in [PlantUML's documentation](https://plantuml.com/starting)

## Installation

```bash
npm install @interrogate/plantuml-to-svg
```

## Usage

```typescript
import { convertToSvg } from "@interrogate/plantuml-to-svg"

const plantUmlMarkup = `
@startuml
A -> B: Hello
B -> A: World
@enduml
`

// Convert using the default method (Docker)
const svg = await convertToSvg(plantUmlMarkup)

// Or specify the method explicitly
const svgUsingJar = await convertToSvg(plantUmlMarkup, { method: "jar" })
```

For more examples, please refer to the `test.ts` files in the source code.

## API Reference

The main entry point is `src/index.ts`, which exports the following:

- `convertToSvg(markup: string, options?: ConversionOptions): Promise<string>`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
