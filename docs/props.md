# Props

- `name`: Optional animation name used for debugging and `lottie-web` instance tracking.
- `source`: Required primary input. Use `{ kind: "url", value: string }` for remote/local URLs or `{ kind: "data", value: animationJson }` for imported JSON data.
- `src`: Deprecated bridge prop for URL or relative-path animations.
- `animationData`: Deprecated bridge prop for in-memory animation JSON.
- `loop`: `true`, `false`, or a number. Default: `false`.
- `autoplay`: Starts playback immediately. Default: `true`.
- `renderer`: `"svg"`, `"canvas"`, or `"html"`. Default: `"svg"`.
- `width`: Player width as string or number. Default: `"200px"`.
- `height`: Player height as string or number. Default: `"200px"`.
- `background`: Container background color. Default: `"transparent"`.

`source` cannot be combined with `src` or `animationData`. The legacy props still work during migration, but they emit a development deprecation warning.

The default package uses the CSP-friendlier light player. Import from `vue-lottie-player/full` when you need After Effects expression support.
