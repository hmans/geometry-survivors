import { World } from "miniplex";
import { MathUtils, Object3D } from "three";
import { Entity } from "./ecs";
import transforms from "./systems/transforms";

export function start(
  world: World<Entity>,
  root: Object3D,
  setup: (world: World<Entity>) => void
) {
  /* Set up systems */
  const systems = [transforms(world, root)];

  /* Set up world */
  setup(world);

  /* Ticker */
  let raf = 0;
  let time = performance.now();
  function animate() {
    raf = requestAnimationFrame(animate);

    const now = performance.now();
    const dt = MathUtils.clamp((now - time) / 1000, 0, 0.2);
    time = now;

    systems.forEach((system) => system.update?.(dt));
  }
  animate();

  return () => {
    cancelAnimationFrame(raf);
    world.clear();
    systems.forEach((system) => system.cleanup?.());
  };
}
