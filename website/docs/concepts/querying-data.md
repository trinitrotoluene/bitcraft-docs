---
sidebar_position: 3
---

# Querying data

## Global vs Region modules

Bitcraft's backend has the following modules

- `bitcraft-global`
- `bitcraft-1` ... through to `bitcraft-9`

The `global` module holds some limited information needed across regions like some empire-related tables, player chat tab config, etc.

Other information sits in `region` modules - these correspond to ingame regions, so R1 is the module `bitcraft-1`. These all share the same schema and generally contain more relevant information for developers.

:::info
You'll notice that the global module schema docs on this site also include a bunch of tables present in the region tables, but you can generally disregard these as the region tables are the ones actually in use.
:::

## Creating subscriptions

You declare a subscription in the SDK using an SQL-like language. It doesn't support many of the features you might expect from SQL so it's worth checking the [SQL reference](https://spacetimedb.com/docs/sql/) in the official documentation before trying to do something clever.

I'll be using the JS client in any code examples as it produces the smallest code snippets - at its simplest a subscription can be something like:

```typescript
// todo
```

However, you don't always want to subscribe to the entire table - remember that any subscription you retain will result in SpacetimeDB attempting to keep your local state in sync with the backend.

This means that if you try to subscribe to the entire `location_state` table, not only will you download the location of every entity in the region, but you'll get an update event for _every_ movement as well since that results in a change to this table.

That's where query filters come in. You can do simple filters on rows like "only give me the data for the claim with ID `abc123`", or more complicated JOINs to only get the locations of buildings belonging to claim ID `abc123`.

```sql
# todo
```

## Consuming changes

The SDKs are callback driven - this means you register functions to handle events which are then called once you have a subscription that results in those events being fed to you.

```typescript
// todo show onInsert/Update/Delete
```
