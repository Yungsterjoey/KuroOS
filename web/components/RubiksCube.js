// Stained Glass Rubik's Cube - 3x3 grid of "model" pieces
// Each piece is its own glass panel that can animate independently

class RubiksLogo {
  constructor(container, size = 120) {
    this.container = container
    this.size = size
    this.pieceSize = size / 3
    this.pieces = []
    this.rotation = { x: -20, y: 25 }
    this.targetRotation = { x: -20, y: 25 }
    this.autoRotate = true
    this.touching = false
    this.animatingPiece = null
    
    this.init()
    this.animate()
    this.startPieceAnimations()
  }
  
  init() {
    // Create cube container
    this.cube = document.createElement('div')
    this.cube.className = 'rubiks-cube'
    this.cube.style.cssText = `
      width: ${this.size}px;
      height: ${this.size}px;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.1s ease-out;
    `
    
    // Wrapper with perspective
    this.wrapper = document.createElement('div')
    this.wrapper.style.cssText = `
      width: ${this.size}px;
      height: ${this.size}px;
      perspective: ${this.size * 3}px;
      perspective-origin: 50% 50%;
    `
    this.wrapper.appendChild(this.cube)
    this.container.appendChild(this.wrapper)
    
    // Create 6 faces, each with 3x3 grid
    const faces = [
      { transform: `translateZ(${this.size/2}px)`, name: 'front' },
      { transform: `rotateY(180deg) translateZ(${this.size/2}px)`, name: 'back' },
      { transform: `rotateY(-90deg) translateZ(${this.size/2}px)`, name: 'left' },
      { transform: `rotateY(90deg) translateZ(${this.size/2}px)`, name: 'right' },
      { transform: `rotateX(90deg) translateZ(${this.size/2}px)`, name: 'top' },
      { transform: `rotateX(-90deg) translateZ(${this.size/2}px)`, name: 'bottom' },
    ]
    
    // Stained glass colors - dark, rich tones
    const colors = [
      ['#1a0a2e', '#2d1b4e', '#1e3a5f'], // Deep purples/blues
      ['#0d2137', '#1a3a52', '#0f2940'], // Ocean blues
      ['#1f0f30', '#2a1545', '#351a5a'], // Royal purples
      ['#0a1628', '#142438', '#1a3048'], // Midnight blues
      ['#1a0f28', '#251540', '#301a55'], // Violet
      ['#0f1a2a', '#182838', '#1f3545'], // Steel blue
    ]
    
    faces.forEach((face, faceIndex) => {
      const faceEl = document.createElement('div')
      faceEl.className = `cube-face face-${face.name}`
      faceEl.style.cssText = `
        position: absolute;
        width: ${this.size}px;
        height: ${this.size}px;
        transform: ${face.transform};
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);
        gap: 2px;
        padding: 2px;
        background: rgba(0,0,0,0.3);
        border-radius: 8px;
      `
      
      // Create 9 pieces per face
      for (let i = 0; i < 9; i++) {
        const piece = this.createPiece(colors[faceIndex][i % 3], faceIndex, i)
        faceEl.appendChild(piece.element)
        this.pieces.push(piece)
      }
      
      this.cube.appendChild(faceEl)
    })
    
    // Touch/mouse handlers
    this.setupInteraction()
  }
  
  createPiece(baseColor, faceIndex, pieceIndex) {
    const el = document.createElement('div')
    el.className = 'cube-piece'
    
    // Stained glass effect
    el.style.cssText = `
      background: linear-gradient(
        135deg,
        ${baseColor}ee 0%,
        ${this.lighten(baseColor, 20)}aa 30%,
        ${baseColor}dd 70%,
        ${this.darken(baseColor, 20)}ff 100%
      );
      border-radius: 4px;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      overflow: hidden;
      box-shadow: 
        inset 1px 1px 2px rgba(255,255,255,0.15),
        inset -1px -1px 2px rgba(0,0,0,0.3),
        0 0 10px ${baseColor}44;
    `
    
    // Glass shine
    const shine = document.createElement('div')
    shine.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        135deg,
        rgba(255,255,255,0.2) 0%,
        transparent 40%,
        transparent 60%,
        rgba(255,255,255,0.05) 100%
      );
      pointer-events: none;
    `
    el.appendChild(shine)
    
    // Lead/metal border effect (stained glass)
    const border = document.createElement('div')
    border.style.cssText = `
      position: absolute;
      inset: 0;
      border: 1px solid rgba(40, 40, 50, 0.8);
      border-radius: 4px;
      pointer-events: none;
      box-shadow: inset 0 0 3px rgba(0,0,0,0.5);
    `
    el.appendChild(border)
    
    return {
      element: el,
      faceIndex,
      pieceIndex,
      offset: { x: 0, y: 0, z: 0 },
      baseColor
    }
  }
  
  lighten(color, percent) {
    const num = parseInt(color.replace('#', ''), 16)
    const amt = Math.round(2.55 * percent)
    const R = Math.min(255, (num >> 16) + amt)
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt)
    const B = Math.min(255, (num & 0x0000FF) + amt)
    return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`
  }
  
  darken(color, percent) {
    const num = parseInt(color.replace('#', ''), 16)
    const amt = Math.round(2.55 * percent)
    const R = Math.max(0, (num >> 16) - amt)
    const G = Math.max(0, ((num >> 8) & 0x00FF) - amt)
    const B = Math.max(0, (num & 0x0000FF) - amt)
    return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`
  }
  
  setupInteraction() {
    let startX, startY, startRotX, startRotY
    
    const onStart = (e) => {
      this.touching = true
      this.autoRotate = false
      const touch = e.touches?.[0] || e
      startX = touch.clientX
      startY = touch.clientY
      startRotX = this.rotation.x
      startRotY = this.rotation.y
    }
    
    const onMove = (e) => {
      if (!this.touching) return
      const touch = e.touches?.[0] || e
      const deltaX = touch.clientX - startX
      const deltaY = touch.clientY - startY
      
      this.rotation.y = startRotY + deltaX * 0.5
      this.rotation.x = Math.max(-60, Math.min(60, startRotX - deltaY * 0.5))
      this.targetRotation = { ...this.rotation }
    }
    
    const onEnd = () => {
      this.touching = false
      // Resume auto-rotate after 2 seconds
      setTimeout(() => {
        if (!this.touching) this.autoRotate = true
      }, 2000)
    }
    
    this.wrapper.addEventListener('mousedown', onStart)
    this.wrapper.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('mouseup', onEnd)
    window.addEventListener('touchend', onEnd)
  }
  
  startPieceAnimations() {
    // Every 2-3 seconds, animate a random piece
    const animatePiece = () => {
      if (this.animatingPiece) return
      
      const piece = this.pieces[Math.floor(Math.random() * this.pieces.length)]
      this.animatingPiece = piece
      
      // Pull out
      const pullAmount = 15 + Math.random() * 10
      const axis = ['x', 'y', 'z'][Math.floor(Math.random() * 3)]
      const direction = Math.random() > 0.5 ? 1 : -1
      
      piece.element.style.transform = `translate3d(
        ${axis === 'x' ? pullAmount * direction : 0}px,
        ${axis === 'y' ? pullAmount * direction : 0}px,
        ${axis === 'z' ? pullAmount * direction : 0}px
      )`
      
      // Push back after delay
      setTimeout(() => {
        piece.element.style.transform = 'translate3d(0, 0, 0)'
        setTimeout(() => {
          this.animatingPiece = null
        }, 500)
      }, 300 + Math.random() * 200)
    }
    
    setInterval(animatePiece, 2000 + Math.random() * 1000)
  }
  
  animate() {
    if (this.autoRotate) {
      this.rotation.y += 0.3
    }
    
    this.cube.style.transform = `rotateX(${this.rotation.x}deg) rotateY(${this.rotation.y}deg)`
    
    requestAnimationFrame(() => this.animate())
  }
}

// Export for use
window.RubiksLogo = RubiksLogo
