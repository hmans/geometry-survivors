import { Environment } from "@react-three/drei";
import { Suspense } from "react";

export default function GameplayScene() {
  return (
    <Suspense>
      <Environment preset="sunset" />

      <mesh>
        <icosahedronGeometry />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </Suspense>
  );
}
