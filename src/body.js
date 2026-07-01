import * as THREE from 'three'

export default class Body {
    constructor(mass, position, color) {
        this.mass = mass
        this.position = position
        this.velocity = new THREE.Vector3(0, 0, 0)
        this.acceleration = new THREE.Vector3(0, 0, 0)

        const radius = 0.6 * Math.cbrt(mass)

        const geometry = new THREE.SphereGeometry(radius, 32, 32)
        const material = new THREE.MeshBasicMaterial({ color })
        
        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.position.copy(this.position)
    }

    updateMesh() {
        this.mesh.position.copy(this.position)
    }
}