import { World } from "miniplex"
import * as THREE from "three"
import transforms from "./systems/transforms"

export type BaseEntity = {
  transform?: THREE.Object3D
}

export type System = {
  cleanup?(): void
  update?(delta: number): void
}

export function start<E extends BaseEntity>(setup: (world: World<E>) => void) {
  /* Set up world */
  const world = new World<E>()

  /* Set up Three.js */
  const scene = new THREE.Scene()

  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)

  /* Add camera */
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 20

  /* Set up systems */
  const systems = [transforms(world, scene)]

  /* Set up world */
  setup(world)

  /* Ticker */
  let raf = 0
  let time = performance.now()
  function animate() {
    /* Queue next invocation */
    raf = requestAnimationFrame(animate)

    /* Calculate delta time */
    const now = performance.now()
    const dt = THREE.MathUtils.clamp((now - time) / 1000, 0, 0.2)
    time = now

    /* Execute systems */
    systems.forEach((system) => system.update?.(dt))

    /* Render */
    renderer.render(scene, camera)
  }
  animate()

  return () => {
    cancelAnimationFrame(raf)
    world.clear()
    systems.forEach((system) => system.cleanup?.())
  }
}
