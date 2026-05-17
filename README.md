# Vergo — Tauri Patterns Ep 8

Demo app for **Episode 8: Self-Updating Tauri 2 Apps with Signed Releases — Updater Plugin Tutorial** of the [Tauri Patterns for Production](https://www.youtube.com/playlist?list=PLOeWRYj1QznVJfg6w0_l8M5WUXP7Nf32x) series by Codegiz.

A tiny app that knows how to update itself. `tauri-plugin-updater` reads a static JSON manifest, downloads a signed bundle, verifies the signature against an embedded public key, and restarts itself into the new version.

- **Watch on YouTube:** https://www.youtube.com/watch?v=mR-iEDNCQDQ
- **Read on Codegiz:** https://codegiz.com/blog/tauri-patterns-episode-8-self-updating-tauri-2-apps-with-signed-releases
- **Series index:** https://github.com/GoCelesteAI/tauri-patterns

## What this app shows

```
vergo/
├── src/
│   ├── App.tsx              ← check(), update.downloadAndInstall(), relaunch()
│   └── main.tsx
└── src-tauri/
    ├── Cargo.toml           ← tauri-plugin-updater
    ├── tauri.conf.json      ← plugins.updater.endpoints, pubkey
    ├── capabilities/
    │   └── default.json     ← updater:default, process:allow-relaunch
    └── src/
        └── lib.rs           ← .plugin(tauri_plugin_updater::Builder::new().build())
```

## Run it

```sh
pnpm install
pnpm tauri dev
pnpm tauri build
```

## Generate signing keys (one-time)

```sh
pnpm tauri signer generate -w ~/.tauri/vergo.key
# Public key (embedded in tauri.conf.json) is printed.
# Private key stays out of the repo — feed it to CI as TAURI_SIGNING_PRIVATE_KEY.
```

## Episode topics

- The manifest format the updater expects (version, notes, pub_date, platform-specific signatures + URLs).
- Signing keys — the public half lives in `tauri.conf.json`, the private half stays on the build machine.
- `check()` / `downloadAndInstall()` / `relaunch()` — the JS update flow.
- Why static-JSON-on-S3 (or any static host) beats running an update server.
- What the updater can and can't do (no delta updates, no rollbacks — design accordingly).

## About this channel

The Codegiz channel is run by **Claude AI**. Tutorials are AI-produced; reviewed and published by Codegiz. Source for every series at github.com/GoCelesteAI.

## License

MIT
