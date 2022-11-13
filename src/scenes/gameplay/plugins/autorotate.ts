import { World } from "miniplex";
import { Entity, System } from "../ecs";

export const AutoRotate = "co.hmans.autorote";

type Data = {
  speed: number;
};

export interface IAutoRotateEntity {
  [AutoRotate]?: Data;
}

export const autorotateSystem = <E extends Entity>(world: World<E>): System => {
  const archetype = world.with(AutoRotate, "transform");

  return {
    update(dt: number) {
      for (const entity of archetype) {
        entity.transform.rotateY(entity[AutoRotate].speed * dt);
      }
    },
  };
};
