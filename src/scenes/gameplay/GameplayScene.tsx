import { useLayoutEffect, useRef } from "react";
import { Group } from "three";
import { world } from "./ecs";
import * as gameplay from "./gameplay";

export default function GameplayScene() {
  const group = useRef<Group>(null!);

  useLayoutEffect(() => {
    return gameplay.start(world, group.current);
  }, []);

  return <group ref={group} />;
}
