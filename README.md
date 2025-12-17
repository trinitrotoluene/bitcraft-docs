# bitcraft-docs

Welcome to the **unofficial** Bitcraft documentation. The aim of this project is to lower the barrier to entry for those interested in building their own tools for the game.

> [!WARNING]  
> This project is **not** affiliated with Bitcraft or Clockwork labs.
> We will not accept PRs for or publish information that enables users to break the terms of service.

## Contributing

Contributions are welcome! For new content or significant edits it's worth discussing it before you spend a lot of time on it - you can find me in the bitminers Discord or raise an issue in this repo.

If you want to contribute to or edit an existing article, see the `website/src/docs` folder.

The auto-generated documentation comes from `schema-compiler`.

There are plans to maintain a set of markdown files that can be merged into the schema to populate the `remarks` section. Once this functionality is present the README will be updated with instructions if you'd like to contribute to them.

## Guide

This project is a monorepo containing the following packages:

### schema-parser

This is a utility that converts the JSON schema served by maincloud bitcraft modules to a representation that's more pleasant to work with.

### schema-compiler

This package ingests a schema that schema-parser has parsed and emits a structured set of markdown files - it can be provided with additional metadata that will be merged with the emitted files in order to annotate known tables/columns with additional information.

### website

This is a docusaurus-based website that is intended to contain a mix of hand-written documentation as well as the automatically generated schema documentation.
