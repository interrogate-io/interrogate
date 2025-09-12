# @interrogate/remark-plugin-plantuml

[Remark](https://github.com/remarkjs/remark) plugin to process PlantUML diagrams in markdown.

## What is this?

This plugin processes PlantUML code blocks in markdown and attaches diagram data as additional
properties. It's designed to work in conjunction with
[@interrogate/rehype-plugin-plantuml](https://github.com/james-lafferty/interrogate/tree/main/packages/rehype-plugin-plantuml)
for rendering the final HTML output.

## When should I use this?

Use this plugin when you want to:

- Include PlantUML diagrams in your markdown documentation
- Process PlantUML syntax during the markdown transformation phase
- Generate documentation with PlantUML diagrams (e.g., in Docusaurus)

## Installation

```bash
npm install @interrogate/remark-plugin-plantuml
```

## Usage

```js
import remarkPlantuml from "@interrogate/remark-plugin-plantuml"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"

const processor = unified().use(remarkParse).use(remarkPlantuml).use(remarkRehype)
```

## Example

### Inline PlantUML

```markdown
# My Document

Here's a sequence diagram:

\`\`\`plantuml @startuml Alice -> Bob: Hello Bob --> Alice: Hi there @enduml \`\`\`
```

### External PlantUML Files

You can also reference external PlantUML files using standard markdown image syntax:

```markdown
![Sequence Diagram](./path/to/diagram.puml)
```

## API

### `remarkPlantuml()`

Transform PlantUML code blocks in markdown and attach diagram data as properties to be consumed by
rehype plugins.

## License

[MIT](LICENSE) © James Lafferty

[Remark](https://github.com/remarkjs/remark) plugin to process PlantUML diagrams in markdown.

## What is this?

This plugin processes PlantUML code blocks in markdown and attaches diagram data as additional
properties. It's designed to work in conjunction with
[@interrogate/rehype-plugin-plantuml](https://github.com/james-lafferty/interrogate/tree/main/packages/rehype-plugin-plantuml)
for rendering the final HTML output.

## When should I use this?

Use this plugin when you want to:

- Include PlantUML diagrams in your markdown documentation
- Process PlantUML syntax during the markdown transformation phase
- Generate documentation with PlantUML diagrams (e.g., in Docusaurus)

## Installation

```bash
npm install @interrogate/remark-plugin-plantuml
```

## Usage

```js
import remarkPlantuml from "@interrogate/remark-plugin-plantuml"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"

const processor = unified().use(remarkParse).use(remarkPlantuml).use(remarkRehype)
```

## Example

```markdown
# My Document

Here's a sequence diagram:

\`\`\`plantuml @startuml Alice -> Bob: Hello Bob --> Alice: Hi there @enduml \`\`\`
```

## API

### `remarkPlantuml()`

Transform PlantUML code blocks in markdown and attach diagram data as properties to be consumed by
rehype plugins.

## License

[MIT](LICENSE) © James Lafferty
