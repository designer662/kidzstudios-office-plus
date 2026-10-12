# V86.9 Eye Fix

## Fix
Resolved oversized / stretched eyes on both male and female 3D characters.

### Root cause
The blink animation overwrote eye Y-scale with a raw 0..1 value, ignoring the smaller base eye scale used by the custom male and hijab models.

### Resolution
Each eye now stores its original Y-scale when the rig is created, and blink animation multiplies against that base scale.

## Validation
- Patched source adapters and offline 3D bundle.
- Version bumped to 86.9.
