import { World } from "miniplex";
import * as THREE from "three";

export type System = {
  update?: (dt: number) => void;
  cleanup?: () => void;
};

export type Entity = {
  transform: THREE.Object3D;
};

export const world = new World<Entity>();
