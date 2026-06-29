---
sidebar_position: 100
---

# Reducers

Reducers are like stored procedures in SQL, except they're written in a different language and then run in a WebAssembly VM. The game calls these functions to perform actions, they update DB state - for example writing a new chat message to the DB - and then all subscribers are notified of the change.

As someone writing a 3rd party application you should generally **not** call reducers - this is botting and violates CWL's terms of service. They are documented on this website only for informational purposes.

> What if I'm really cool and doing good things like verifying a bug before reporting it?

Well, in that case it's worth being aware that you need to be a "signed in player" to call a reducer. This is a higher bar to meet than simply connecting to the DB as your connection doesn't "spawn" you in the game.

The following pseudocode demonstrates what you need to do to get to a "spawned" state in-game:

```ts
// onConnect

await subscribeAsync(conn, [
  "SELECT * FROM user_state WHERE entity_id = YOUR_PLAYER_ID",
]);

const userState = conn.db.userState.entityId.find(BigInt("YOUR_PLAYER_ID"));

conn.db.userState.onUpdate((ctx, oldRow, newRow) => {
  onUserStateUpdate(conn, oldRow, newRow);
});

if (userState?.canSignIn) {
  // if you can already sign in, just call sign_in
  conn.reducers.signIn({ ownerEntityId: userState.entityId });
} else {
  // otherwise, get in the queue
  conn.reducers.playerQueueJoin();
}
```

Finally, you need to implement a handler to trigger a sign-in attempt when the queueing logic updates your user_state record to `can_sign_in = true`.

```ts
// onUserStateUpdate

if (!oldState.canSignIn && newState.canSignIn) {
  conn.reducers.signIn({ ownerEntityId: newRow.entityId });
}
```
