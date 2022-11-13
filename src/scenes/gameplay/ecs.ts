import { World } from "miniplex"
import * as THREE from "three"
import { AutoRotate, IAutoRotateEntity } from "./plugins/autorotate"

export type System = {
  update?: (dt: number) => void
  cleanup?: () => void
}

export type BaseEntity = {
  transform?: THREE.Object3D
}

export type Entity = BaseEntity & Partial<IAutoRotateEntity>

export const world = new World<Entity>()
