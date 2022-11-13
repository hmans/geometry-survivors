import { World } from "miniplex";
import {
  AmbientLight,
  DirectionalLight,
  IcosahedronGeometry,
  Mesh,
  MeshStandardMaterial,
} from "three";
import { Entity } from "./ecs";

export function start(world: World<Entity>) {
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
}
