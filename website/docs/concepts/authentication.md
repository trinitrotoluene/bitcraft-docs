---
sidebar_position: 2
---

# Authentication

Reading [this blog post](https://spacetimedb.com/blog/who-are-you) is a good introduction to SpacetimeDB `Identity`.

Broadly, when you sign in with a 3rd party service (e.g. a cool Log in with Discord) button, the service (Discord, Google, Facebook, etc.) will provide you with a signed JWT (JSON Web Token) (which proves that they issued it), along with some metadata like your account ID and maybe your name or email address.

When you authenticate against SpacetimeDB, you can pass it any valid JWT and it will validate the signature - then it's up to the module author to write checks to enforce their authentication rules against the data in the token.

SpacetimeDB will derive an Identity from the token you supplied - this is stable because instead of relying on the JWT (which can expire), the Identity is computed from the metadata within the JWT. When a new one is issued for your account, it will point at the same Identity in SpacetimeDB, module authors can safely use it as a kind of user ID.

## User tokens

:::info
If you have a developer program token, you can disregard what is noted here as these limitations are specific to user tokens.
:::

If you've followed the instructions in [Getting started](../intro.md) you'll already be in possession of a valid JWT - this one is linked to your player identity which has some implications that are important to be aware of:

1. Signing in with a user token will log you out ingame
   - You can then log back in without signing out your application's session, but if your app is disconnected and reconnects you will be disconnected if you're ingame.
2. The token is only able to log in to the region your player is currently in
   - If your player is in region 1, your token will only be able to sign in to region 1.
   - Sessions are NOT terminated if your player switches regions, so teleporting between regions will allow you to open sessions in multiple regions using the same token. However, if those sessions disconnect they will not be able to reconnect due to the previous limitation.
3. Tokens need to be associated with a valid steam AuthTicket, if you haven't logged in/played the game in 24 hours and the session is disconnected, reconnection attempts will fail
   - You can use something like [this](https://github.com/infernap12/steam-auth) to automate the process.
