import { World } from "miniplex"
import { Object3D } from "three"
import { System } from "../engine"

export default (world: World, root: Object3D): System => {
  const withTransform = world.with("transform")

  const cleanups = [
    withTransform.onEntityAdded.add((entity) => {
      root.add(entity.transform)
    }),

    withTransform.onEntityRemoved.add((entity) => {
      entity.transform.parent.remove(entity.transform)
    })
  ]

  return {
    cleanup() {
      cleanups.forEach((cleanup) => cleanup())
    }
  }
}
