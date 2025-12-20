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
DbConnection.builder()
      .withUri(...)
      .withModuleName(...)
      .withToken(...)
      .onConnect(onConnect)
      .build();

// build() does not block, so it's your responsibility to keep the program running.
// in the C#/Rust SDKs there is the additional requirement of calling frame_tick in
// regular intervals so the SDK can perform network I/O.

async function onConnect(conn: DbConnection, identity: Identity) {
  await subscribe(conn, ["SELECT * FROM empire_state"])
  console.log([...conn.db.empireState.iter()])
}

// Helper function to wrap the callback-based API into a promise
function subscribe(conn: DbConnection, query: string[]) {
  return new Promise((resolve, reject) => {
    const subscription = conn
      .subscriptionBuilder()
      .onApplied(() => {
        console.log("Subscription active");
        resolve({
          unsubscribe: () => {
            if (subscription.isActive()) {
              subscription.unsubscribe();
            }
          },
        });
      })
      .onError((ctx) => {
        console.log("Subscription errored");
        reject(ctx);
      })
      .subscribe(query);
  });
}
```

However, you don't always want to subscribe to the entire table - remember that any subscription you retain will result in SpacetimeDB attempting to keep your local state in sync with the backend.

This means that if you try to subscribe to the entire `location_state` table, not only will you download the location of every entity in the region, but you'll get an update event for _every_ movement as well since that results in a change to this table.

That's where query filters come in. You can do simple filters on rows like "only give me the data for the claim with ID `abc123`"

```sql
SELECT t.* FROM claim_state t WHERE t.entity_id = 123456789
```

Or you can get creative and start `JOIN`ing across tables to for example only retrieve public crafts on a particular building, or the locations of buildings belonging to a particular claim, etc.

## Consuming changes

As you will have seen from previous snippets, the SDKs are callback driven - this means you register functions to handle events which are then called once you have a subscription that results in those events being fed to you.

Picking up where we left off after subscribing to empire_state, let's say we wanted to monitor that table for changes:

```typescript
async function onConnect(conn: DbConnection, identity: Identity) {
  await subscribe(conn, ["SELECT * FROM empire_state"]);
  console.log([...conn.db.empireState.iter()]);
}
```

The SDK exposes `onInsert`, `onUpdate` and `onDelete` events for each table. You will only receive these events for rows that are visible to your current set of subscriptions.

```typescript
async function onConnect(conn: DbConnection, identity: Identity) {
  await subscribe(conn, ["SELECT * FROM empire_state"]);
  console.log("initial state", [...conn.db.empireState.iter()]);

  conn.db.empireState.onInsert((ctx, row) => console.log("insert", row));
  conn.db.empireState.onUpdate((ctx, oldRow, newRow) =>
    console.log("update", oldRow, newRow),
  );
  conn.db.empireState.onDelete((ctx, row) => console.log("delete", row));
}
```

Once you've reached this point, congratulations! Now the real fun begins - learning how various tables available to you relate to in-game concepts, improving the resilience of your connection, running connections to multiple regions - the list is ever growing :D

:::info
If you'd like to start contributing to the documentation, a good place to start is [Know your tables](../know-your-tables.md) 😁
:::
