# Office Plus 3D scene (source)

TypeScript source for `public/office-3d.js`. The built bundle is committed, so you only need this folder when you change the 3D office.

```
npm install
npm run build:3d      # writes source/office-3d.js  -> copy it to public/office-3d.js
node scripts/test-v57-character.cjs
node scripts/test-v57-head.cjs
```

The page talks to the scene through `window.office3d` (zoomBy, rotateBy, setRotating, reset, setView ...).
