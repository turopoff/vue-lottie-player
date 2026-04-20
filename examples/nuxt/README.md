# vue-lottie-player Nuxt 3 example

Nuxt 3 example application for the local `vue-lottie-player` package.

The dependency is linked with `file:../..`, so build the library first when you
want the example to consume the latest packaged output.

The package is registered through `plugins/vue-lottie-player.client.js`, and
the example page keeps `<ClientOnly>` around player usage so the server render
stays clear of browser-only Lottie APIs.

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production build

```bash
npm run build
```
