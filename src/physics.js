import * as THREE from 'three'

export function applyGravity(planet, sun, G, dt) {
    //distance and direction(planet to sun)
    const r = sun.position.clone().sub(planet.position.clone())
    const distance = r.length()
    const direction = r.clone().normalize()

    //acceleration
    const a = G * sun.mass / (distance * distance)
    const a_v = direction.multiplyScalar(a)

    //update planet attributes
    planet.velocity.add(a_v.clone().multiplyScalar(dt))
    planet.position.add(planet.velocity.clone().multiplyScalar(dt))

    planet.updateMesh()
}

export function applyPhysics(bodies, G, dt) {
    //update accelerations
    for (const A of bodies) {
        A.acceleration.set(0, 0, 0)
        for (const B of bodies) {
            if (A === B) continue

            //A to B
            const r = B.position.clone().sub(A.position.clone())
            const distance = r.length()
            const a_A = G * B.mass / (distance * distance)
            A.acceleration.addScaledVector(r.normalize(), a_A)
        }
    }
    //integration
    for (const body of bodies) {
        body.velocity.addScaledVector(body.acceleration, dt)
        body.position.addScaledVector(body.velocity, dt)
        body.updateMesh()
    }
}