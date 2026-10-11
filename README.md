# Shatter

Shatter is a browser-based gravity-well rock shooter. Fly on momentum, curve gunfire around the star, split armored rocks through their fragments, and save the guided torpedo for the threats that will not break in time.

## Run it

```sh
npm ci
npm run dev
```

For a static production build:

```sh
npm run build
npm run preview
```

## Controls

- Arrows or WASD: turn and thrust
- Space: fire the gun
- F: launch the homing torpedo
- P or Escape: pause/resume
- Enter: confirm menus
- M: mute audio

The field wraps at every edge. The star pulls rocks and bullets, but never the ship or torpedo. Use that difference to bend shots around the core.
