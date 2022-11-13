import { World } from "miniplex";
import {
  IcosahedronGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
} from "three";
import { Entity } from "./ecs";
import transforms from "./systems/transforms";

export function start(world: World<Entity>, root: Object3D) {
  console.log("Setting up world", root);

  world.add({
    transform: new Mesh(
      new IcosahedronGeometry(),
      new MeshBasicMaterial({ color: "hotpink" })
    ),
  });

  const systems = [transforms(world, root)];

  /* Ticker */
  let raf = 0;
  function animate() {
    raf = requestAnimationFrame(animate);
    systems.forEach((system) => system());
  }
  animate();

  return () => {
    cancelAnimationFrame(raf);
  };
}
