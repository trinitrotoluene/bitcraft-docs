# bitcraft-docs

Welcome to the **unofficial** Bitcraft documentation. The aim of this project is to lower the barrier to entry for those interested in building their own tools for the game.

> [!WARNING]  
> This project is **not** affiliated with Bitcraft or Clockwork labs.
> We will not accept PRs for or publish information that enables users to break the terms of service.

## Contributing

Contributions are welcome! For new content or significant edits it's worth discussing it before you spend a lot of time on it - you can find me in the bitminers Discord or raise an issue in this repo.

If you want to contribute to or edit an existing article, see the `website/src/docs` folder.

The auto-generated documentation comes from `schema-compiler`.

To manually annotate tables (reducer/type annotations are not currently supported), you create files in the `manual-docs` folder in the project root. This directory mirrors the file structure in `website/docs`, and the contents are merged with the automatically generated docs when `schema-compiler` is run with the `--manual-docs` flag (see `.github/workflow/deploy.yml`).

A manual doc file looks like this (note that `relations` is optional)

```md
---
relations:
  - table: some_other_table
    column: column_in_this_table
    foreign_column: column_in_other_table
---

Anything in here goes into the "remarks" section above the table column type in the auto-docs
```

## Guide

This project is a monorepo containing the following packages:

### schema-parser

This is a utility that converts the JSON schema served by maincloud bitcraft modules to a representation that's more pleasant to work with.

### schema-compiler

This package ingests a schema that schema-parser has parsed and emits a structured set of markdown files - it can be provided with additional metadata that will be merged with the emitted files in order to annotate known tables/columns with additional information.

### website

This is a docusaurus-based website that is intended to contain a mix of hand-written documentation as well as the automatically generated schema documentation.
