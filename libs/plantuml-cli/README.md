# plantuml-cli

[![Docker Pulls][docker-pulls-badge]][docker-url]
[![Docker Image Size][docker-size-badge]][docker-url] [![License: MIT][license-badge]][license-url]

Lightweight Docker image for [PlantUML][plantuml-url] command-line diagram generation.

## Quick reference

- **Image**: [interrogate/plantuml-cli][docker-url]
- **Maintained by**: [interrogate-io](https://github.com/interrogate-io)
- **Issues**: [GitHub Issues](https://github.com/interrogate-io/interrogate/issues)
- **Supported architectures**: `amd64`
- **Base image**: Azul Zulu JRE

## Quick start

```bash
docker run --rm -v $(pwd):/data interrogate/plantuml-cli diagram.puml
```

This command will generate a PNG diagram from your PlantUML file.

## What is this?

A Docker image that packages the PlantUML command-line interface with all necessary dependencies
(including GraphViz) for generating diagrams. Built on Azul Zulu JRE for a minimal footprint, this
image provides a reliable and portable way to render PlantUML diagrams.

## Tags

- `latest`: Latest stable release
- `x.y.z`: Specific version releases

## Usage

### Basic Examples

Generate PNG (default):

```bash
docker run --rm -v $(pwd):/data interrogate/plantuml-cli diagram.puml
```

Generate SVG:

```bash
docker run --rm -v $(pwd):/data interrogate/plantuml-cli -tsvg diagram.puml
```

Process multiple files:

```bash
docker run --rm -v $(pwd):/data interrogate/plantuml-cli *.puml
```

### Volume Mount

The container uses `/data` as its working directory. Mount your local directory containing PlantUML
files to this path:

```bash
docker run --rm -v /path/to/diagrams:/data interrogate/plantuml-cli [options] files
```

## Configuration

### Environment Variables

| Variable    | Description             | Default |
| ----------- | ----------------------- | ------- |
| `JAVA_OPTS` | Additional Java options | none    |

Example with custom Java memory settings:

```bash
docker run --rm \
  -v $(pwd):/data \
  -e JAVA_OPTS="-Xmx512m" \
  interrogate/plantuml-cli diagram.puml
```

## Image Details

Only one variant is currently provided: Debian-based using Azul Zulu JRE, chosen for its minimal
footprint while maintaining full PlantUML functionality.

## License

[MIT][license-url] © James Lafferty

## Acknowledgments

This project is inspired by [Daniel Stockhammer's docker-plantuml][original-url], with modifications
to use Azul Zulu JRE for a more compact image size.

[docker-pulls-badge]: https://img.shields.io/docker/pulls/interrogate/plantuml-cli.svg
[docker-size-badge]: https://img.shields.io/docker/image-size/interrogate/plantuml-cli/latest.svg
[license-badge]: https://img.shields.io/badge/License-MIT-yellow.svg
[docker-url]: https://hub.docker.com/r/interrogate/plantuml-cli
[license-url]: https://github.com/interrogate-io/interrogate/blob/main/LICENSE
[plantuml-url]: https://plantuml.com
[original-url]: https://github.com/dstockhammer/docker-plantuml
