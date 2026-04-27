import React from "react";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

export default function Sun() {
  const sunTexture = useLoader(TextureLoader, "/textures/sun.jpg");
  return (
    <mesh>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial map={sunTexture} />
    </mesh>
  );
}
