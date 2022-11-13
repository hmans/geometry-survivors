import { useLayoutEffect, useRef } from "react"
import { Group } from "three"
import { world } from "./ecs"
import * as gameplay from "./gameplay"
import * as engine from "./engine"

export default function GameplayScene() {
  const group = useRef<Group>(null!)

  useLayoutEffect(() => {
    return engine.start(world, group.current, gameplay.start)
  }, [])

  return <group ref={group} />
}
