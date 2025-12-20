---
sidebar_position: 100
---

# Reducers

Reducers are like stored procedures in SQL, except they're written in a different language and then run in a WebAssembly VM. The game calls these functions to perform actions, they update DB state - for example writing a new chat message to the DB - and then all subscribers are notified of the change.

As someone writing a 3rd party application you should generally **not** call reducers - this is botting and violates CWL's terms of service. They are documented on this website only for informational purposes.
