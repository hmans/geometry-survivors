import { World } from "miniplex"
import {
  AmbientLight,
  DirectionalLight,
  IcosahedronGeometry,
  Mesh,
  MeshStandardMaterial
} from "three"
import { Entity } from "./ecs"
import { AutoRotate } from "./plugins/autorotate"

export function start(world: World<Entity>) {
  const light = world.add({ transform: new DirectionalLight("white", 1.2) })

  light.transform.position.set(10, 20, 30)

  world.add({ transform: new AmbientLight("purple", 0.2) })

  const mesh = world.add({
    transform: new Mesh(
      new IcosahedronGeometry(),
      new MeshStandardMaterial({ color: "hotpink" })
    )
  })

  world.addComponent(mesh, AutoRotate, { speed: 0.5 })
}
