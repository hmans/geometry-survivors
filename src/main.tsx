import {
  AmbientLight,
  DirectionalLight,
  DodecahedronGeometry,
  IcosahedronGeometry,
  Mesh,
  MeshStandardMaterial
} from "three"
import "./index.css"
import * as engine from "./minigame/engine"
import {
  AutoRotate,
  autorotateSystem,
  IAutoRotateEntity
} from "./plugins/autorotate"

type Entity = engine.BaseEntity & Partial<IAutoRotateEntity>

engine.start<Entity>(({ world, addSystem }) => {
  /* Add more systems */
  addSystem(autorotateSystem(world))

  {
    const light = world.add({ transform: new DirectionalLight("white", 1.2) })
    light.transform.position.set(10, 20, 30)
  }

  {
    world.add({ transform: new AmbientLight("purple", 0.2) })
  }

  {
    const entity = world.add({
      transform: new Mesh(
        new DodecahedronGeometry(),
        new MeshStandardMaterial({ color: "orange" })
      )
    })

    entity.transform.position.set(-3, 0, 0)
  }

  {
    const mesh = world.add({
      transform: new Mesh(
        new IcosahedronGeometry(),
        new MeshStandardMaterial({ color: "hotpink" })
      )
    })

    world.addComponent(mesh, AutoRotate, { speed: 3 })
  }
})
