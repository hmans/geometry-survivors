import { World } from "miniplex";
import * as THREE from "three";

export type Entity = {
  transform: THREE.Object3D;
};

export const world = new World<Entity>();
