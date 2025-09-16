# Interrogate

[![License: MIT][license-badge]][license-url]
[![Contributor Covenant][covenant-badge]][covenant-url]

A collection of tools for working with PlantUML diagrams in modern JavaScript/TypeScript
applications.

## Packages

### Docker

- [`plantuml-cli`](libs/plantuml-cli/README.md): Lightweight Docker image for PlantUML command-line
  diagram generation

### NPM

- [`@interrogate/plantuml-to-svg`](libs/plantuml-to-svg/README.md): Convert PlantUML markup to SVG
- [`@interrogate/remark-plugin-plantuml`](libs/remark-plugin-plantuml/README.md): Process PlantUML
  diagrams in markdown
- [`@interrogate/rehype-plugin-plantuml`](libs/rehype-plugin-plantuml/README.md): Transform PlantUML
  diagrams in HTML

## Development

This is a monorepo managed with [Lerna](https://lerna.js.org/) and uses Node.js v24.7.0.

### Prerequisites

- Node.js v24.7.0 (or use nvm)
- npm v10.x
- Docker (for `plantuml-cli` development)

### Setup

```bash
# Clone the repository
git clone https://github.com/interrogate-io/interrogate.git
cd interrogate

# Install dependencies
npm install

# Build all packages
npm run build
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. By participating in this
project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

For security issues, please see our [Security Policy](SECURITY.md).

## License

[MIT][license-url] © James Lafferty

[license-badge]: https://img.shields.io/badge/License-MIT-yellow.svg
[license-url]: LICENSE
[covenant-badge]: https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg
[covenant-url]: CODE_OF_CONDUCT.md
