# bitcraft-docs

Welcome to the **unofficial** Bitcraft documentation. The aim of this project is to lower the barrier to entry for those interested in building their own tools for the game.

> [!WARNING]  
> This project is **not** affiliated with Bitcraft or Clockwork labs.
> We will not accept PRs for or publish information that enables users to break the terms of service.

## Contributing

TODO

## Guide

This project is a monorepo containing the following packages:

### schema-parser

This is a utility that converts the JSON schema served by maincloud bitcraft modules to a representation that's more pleasant to work with.

### schema-compiler

This package ingests a schema that schema-parser has parsed and emits a structured set of markdown files - it can be provided with additional metadata that will be merged with the emitted files in order to annotate known tables/columns with additional information.

### website

This is a docusaurus-based website that is intended to contain a mix of hand-written documentation as well as the automatically generated schema documentation.
