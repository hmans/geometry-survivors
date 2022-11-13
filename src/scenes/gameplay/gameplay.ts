import { World } from "miniplex";
import {
  AmbientLight,
  DirectionalLight,
  IcosahedronGeometry,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  Object3D,
} from "three";
import { Entity } from "./ecs";
import transforms from "./systems/transforms";

export function start(world: World<Entity>, root: Object3D) {
  /* Set up systems */
  const systems = [transforms(world, root)];

  /* Set up world */
  world
    .add({ transform: new DirectionalLight("white", 1.2) })
    .transform.position.set(10, 20, 30);

  world.add({ transform: new AmbientLight("purple", 0.2) });

  world.add({
    transform: new Mesh(
      new IcosahedronGeometry(),
      new MeshStandardMaterial({ color: "hotpink" })
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
    world.clear();
    systems.forEach((system) => system.cleanup?.());
  };
}
