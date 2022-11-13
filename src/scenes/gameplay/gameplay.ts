import { World } from "miniplex";
import {
  IcosahedronGeometry,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
} from "three";
import { Entity } from "./ecs";
import transforms from "./systems/transforms";

export function start(world: World<Entity>, root: Object3D) {
  /* Set up systems */
  const systems = [transforms(world, root)];

  /* Set up world */
  world.add({
    transform: new Mesh(
      new IcosahedronGeometry(),
      new MeshBasicMaterial({ color: "hotpink" })
    ),
  });

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
    systems.forEach((system) => system.cleanup?.());
  };
}
