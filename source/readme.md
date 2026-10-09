# KIDZSTUDIOS Office Plus V57 — V53 Head + Smooth Body Fix

This release uses the **exact head, eyes, hair, face and accessory geometry from V53 Head Fix**. The less successful V55/V56 head scaling is removed.

## Changes
- Restored V53 head silhouette, facial sizes, hairstyles and accessories.
- Rebuilt torso as a smooth, closely fitted curved surface with a rounded waist.
- Smoothed shoulders, sleeves, elbows, hands, hips, knees, and shoes, retaining the V53 animation pivot positions.
- Preserved shared staff directory, male/female Add/Edit Staff choice, chat, live activity and all existing Office Plus tools.
- Uses a **self-contained local** `office-3d.js` bundle. No browser CDN imports.
- Floor plan heading remains removed.

## Deployment
Extract this ZIP and deploy its **contents** to your existing Netlify site. Refresh with Ctrl+Shift+R. `office-3d.js?v=57.0` avoids old model cache. No new database migration is required.

## Build
This archive already contains the built `office-3d.js` file. To regenerate offline, run

`node scripts/build-v57-offline.cjs /path/to/known-good-v51/office-3d.js`

## Validation
The character's structural tests can confirm valid Three.js geometry and animation joints. Final appearance still needs checking on a WebGL-enabled browser/device.
