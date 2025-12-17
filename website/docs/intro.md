---
sidebar_position: 1
---

# Getting started

## Definitions

Let's start by defining some terms you're likely to see thrown around in the context of writing an app connected to the Bitcraft backend.

### Reducers

You can think of reducers like stored procedures in other database systems. They are functions you call to modify data.

:::warning
Do not call reducers. This will likely get you banned.
:::
### Subscriptions

When a reducer changes data, that change needs to be broadcast to anyone interested in that data. Subscriptions are how your app tells SpacetimeDB what data you're interested in receiving.

### Bindings

SpacetimeDB exposes an endpoint that you can call to retrieve the database schema. They also provide a CLI tool that can generate `bindings` from that schema. This is effectively an SDK that allows you to deal with tables/reducers and the connection in a more abstract way.

### sats-json

This is a representation of SATS (a custom data format used by SpacetimeDB) in JSON. If you are using bindings, you do not have to care about this. You can read more about it [here](https://spacetimedb.com/docs/sats-json).

## Generating bindings

### Retrieving the schema

First, we need to retrieve the schema from one of the region modules - it is exposed via HTTP. The returned JSON needs to be remapped slightly so the SpacetimeDB CLI can consume it - an example command to do so is given below:

```bash
# replace bitcraft-1 with bitcraft-global if you're looking for the global bindings
curl -s \
  'https://bitcraft-early-access.spacetimedb.com/v1/database/bitcraft-1/schema?version=9' | \
  jq '{ V9: . }' \
  > schema.json
```

### SpacetimeDB CLI

First, make sure you have the latest version of the SpacetimeDB CLI installed - you can find the installation instructions [here](https://spacetimedb.com/install).

You have a choice of 3 languages when generating bindings:

- TypeScript (`--lang=typescript`)
- Rust (`--lang=rust`)
- C# (`--lang=cs`)

Then, you can run the following command to generate bindings for the language of your choice (see options for `--lang` above):

```sh
spacetime generate --lang typescript --out-dir bindings --module-def schema.json
```

For guidance on how to use the generated code, check out the official [SDK quickstarts](https://spacetimedb.com/docs/sdks) examples.

## Logging in

See the [SpacetimeDB authorization docs](https://spacetimedb.com/docs/http/authorization) for more information.

First, call this endpoint to get an access code sent to your email address:

```
curl -X POST https://api.bitcraftonline.com/authentication/request-access-code?email=example%40example.com
```

Then, exchange the access code you received from your email for an authentication token.

```
curl -X POST "https://api.bitcraftonline.com/authentication/authenticate?email=example%40example.com&accessCode=123456"
```

The JWT in the response will be your credential for logging in to the game - it does not expire, however it does require a recent steam authticket. The easiest way to do this is to log in to the game via the official client, however there are also projects working to automate this process.

## Hello, Bitcraft!

Here is a minimal snippet that should get you connected - at this point it's time to start exploring!

Use `conn.Db` to see what tables are available to you, but remember that they will not be populated with data if you don't have an active subscription on them.

```ts
DbConnection.builder()
  .withUri("wss://bitcraft-early-access.spacetimedb.com")
  .withModuleName("bitcraft-1")
  .withToken(process.env.AUTH_TOKEN)
  .onConnect((conn, identity) => console.log("Hello, Bitcraft!"))
  .build();

await new Promise(() => {});
```

To start querying, refer to the quickstart examples linked in the bindings section above as well as the [query syntax](https://spacetimedb.com/docs/sql) reference.

## Useful links

- [Bitminers Discord server](https://discord.gg/DzWmy6UrRm)
- [Prebuilt bindings](https://github.com/BitCraftToolBox/BitCraft_Bindings)
- [Static game data dumps](https://github.com/BitCraftToolBox/BitCraft_GameData)
- [infernap's steamauth](https://github.com/infernap12/steam-auth)
