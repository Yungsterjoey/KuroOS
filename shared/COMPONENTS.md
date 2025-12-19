# Kuro Component Reference

## Locked Components (DO NOT MODIFY)

### 1. GlassCube
Interactive 3D Rubik's cube with purple GBA-style translucent faces.
- Container: `<div id="hero-cube"></div>`
- Init: `new GlassCube(container, size)`
- Features: Touch/drag rotation, block pull animations, collision detection

### 2. EtchedIcon  
3D ice sculpture icons with rune-like inverted carvings.
- Container: `<div id="icon-chat"></div>` or `<div id="icon-cube"></div>`
- Init: `new EtchedIcon(container, type, size)` where type = 'chat' | 'cube'
- Features: Auto-rotation, specular highlights, inverted rune details

### 3. Liquid Glass Panels
CSS-only glass effect matching iOS 26 spec.
- Classes: `.card`, `.nav-glass`, `.btn-glass`, `.btn-primary`, `.dropdown`, `.modal`
- Key: Low opacity bg + strong backdrop-filter blur + chiseled edge highlights

### 4. Condensation Effect
Canvas-based water droplets clustered at top of panels.
- Function: `addCondensation(element, seed)`
- Features: Realistic droplets with specular highlights, gradient fade

## Color Palette
- OLED Black: #000
- GBA Purple (cubes): rgba(140, 80, 200, 0.25)
- Primary Purple: rgba(139, 92, 246, 0.5)
- Ice White: rgba(220, 240, 255, 0.85)
- Glass Border: rgba(255, 255, 255, 0.12)

## DO NOT CHANGE
- Face transform pattern: `rotateX() rotateY() translateZ()`
- Glass background opacity: 0.025 for panels
- Blur amount: 40px
- Border width: 1.5px
