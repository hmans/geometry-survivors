import { World } from "miniplex";
import { Object3D } from "three";

export default (world: World, root: Object3D) => {
  const withTransform = world.with("transform");

  withTransform.onEntityAdded.add((entity) => {
    console.log("hello", entity, root);
    root.add(entity.transform);
  });

  return () => {
    console.log("transform system");
  };
};
