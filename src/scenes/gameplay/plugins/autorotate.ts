import { World } from "miniplex"
import { BaseEntity, System } from "../ecs"

export const AutoRotate = "co.hmans.autorote"

export interface IAutoRotateEntity {
  [AutoRotate]: {
    speed: number
  }
}

export const autorotateSystem = (
  world: World<BaseEntity & Partial<IAutoRotateEntity>>
): System => {
  const archetype = world.with(AutoRotate, "transform")

  return {
    update(dt: number) {
      for (const entity of archetype) {
        entity.transform.rotateY(entity[AutoRotate].speed * dt)
      }
    }
  }
}
