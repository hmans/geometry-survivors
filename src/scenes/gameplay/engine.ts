import { World } from "miniplex"
import { MathUtils, Object3D } from "three"
import { BaseEntity, Entity } from "./ecs"
import { autorotateSystem } from "./plugins/autorotate"
import transforms from "./systems/transforms"

export function start<E extends BaseEntity>(
  world: World<E>,
  root: Object3D,
  setup: (world: World<E>) => void
) {
  /* Set up systems */
  const systems = [transforms(world, root), autorotateSystem(world as any)]

  /* Set up world */
  setup(world)

  /* Ticker */
  let raf = 0
  let time = performance.now()
  function animate() {
    raf = requestAnimationFrame(animate)

    const now = performance.now()
    const dt = MathUtils.clamp((now - time) / 1000, 0, 0.2)
    time = now

    systems.forEach((system) => system.update?.(dt))
  }
  animate()

  return () => {
    cancelAnimationFrame(raf)
    world.clear()
    systems.forEach((system) => system.cleanup?.())
  }
}
