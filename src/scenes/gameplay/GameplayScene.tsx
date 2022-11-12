import { Suspense } from "react";
import { Environment, OrbitControls } from "@react-three/drei";

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
