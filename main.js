import * as THREE from 'three'
import { createScene } from './src/scene.js'
import Body from './src/body.js'
import { applyGravity, applyPhysics } from './src/physics.js'

const { scene, camera, renderer, controls } = createScene()

const G = 1
const dt = 0.02

//sun and planet
const sun  = new Body(1000, new THREE.Vector3(0, 0, 0), 0xffaa00)
const planet = new Body(80, new THREE.Vector3(40, 0, 0), 0x3399ff)
planet.velocity = new THREE.Vector3(0, 5, 0)
const satellite = new Body(0.5, new THREE.Vector3(44, 0, 0), 0xfff4e0)
satellite.velocity = new THREE.Vector3(0, 5 + 4.47, 0)

const bodies = [sun, planet, satellite]

scene.add(sun.mesh)
scene.add(planet.mesh)
scene.add(satellite.mesh)

// render loop
function animate(){
  requestAnimationFrame(animate) //call animate again next frame
  applyPhysics(bodies, G, dt)
  controls.update()
  renderer.render(scene, camera)
}
animate()


