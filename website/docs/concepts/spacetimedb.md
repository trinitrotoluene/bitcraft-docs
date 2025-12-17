---
sidebar_position: 1
---

# SpacetimeDB

As with most of the articles here, start by referring to the official [SpacetimeDB docs](https://spacetimedb.com/docs/#what-is-spacetimedb).

Marketing-speak aside, from the perspective of a user trying to interact with Bitcraft we don't need to think too deeply about the rationale for SpacetimeDB as a technology. Fundamentally it's a server that speaks a very particular query language (that happens to look like SQL) - a "module" is really just some sandboxed WebAssembly code that runs a Bitcraft game server. There's a `bitcraft-global` module e.g. for empire data, and each region runs as a separate module `bitcraft-1`, `bitcraft-2`, etc.

## Tables

If you're not familiar with tables, you can think of them like an excel spreadsheet for data. Each column has a type - e.g. it might contain text, or a boolean (true/false) value, etc.

SpacetimeDB also supports more complex column types like arrays, objects and tagged unions.

If you're interested in data from a table, you have to `subscribe` to it. What that means will be explained in [Querying data](./querying-data.md).

Once you've subscribed to a table, SpacetimeDB will send you all the data you need upfront (so you essentially maintain a local mirror/cache) - and then you will receive events for when data is inserted, updated or deleted from the table. The SDKs will keep their local cache up to date and you'll be able to register custom handlers that run when these events happen.
