---
trigger: always_on
---

When you run any shell command, prefix it with `direnv exec .`. This will ensure the command is run in a nix-shell that has the appropriate dependencies and tools for this project (such as `gh` and `npm`)