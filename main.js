import * as THREE from 'three'
import { createScene } from './src/scene.js'
import Body from './src/body.js'
import { applyGravity, applyPhysics } from './src/physics.js'
import { createUI } from './src/ui.js'
import { PRESETS } from './src/presets.js'

const { scene, camera, renderer, controls } = createScene()

const G = 1
let dt = 0.02

function loadPreset(name) {
  for (const body of bodies) scene.remove(body.mesh)
  bodies.length = 0

  for (const d of PRESETS[name]) {
    const body = new Body(d.mass, new THREE.Vector3(...d.pos), d.color)
    body.velocity = new THREE.Vector3(...d.v)
    bodies.push(body)
    scene.add(body.mesh)
  }
}

const PARAMS = {
    pause: false,
    speed: 1,
    presets: 'Sun-Planet-Moon',
}

function reset() {
  loadPreset(PARAMS.presets)
}

createUI(PARAMS, reset, loadPreset)

// render loop
function animate() {
  requestAnimationFrame(animate) //call animate again next frame
  if(!PARAMS.pause) {
    const steps = Math.round(PARAMS.speed)
    for (let i = 0; i < steps; i++) applyPhysics(bodies, G, dt, scene)
  }
  controls.update()
  renderer.render(scene, camera)
}
animate()


