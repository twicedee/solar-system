import React, { useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import planetData from "../utils/planetData.json";

export default function Planet({
  name,
  radius,
  distance,
  speed,
  elapsed,
  isPaused,
  onSelect,
}) {
  const texture = useLoader(
    TextureLoader,
    `/textures/${name.toLowerCase()}.jpg`,
  );
  const meshref = useRef();

  const openPlanetModal = (planetId) => {
    const planet = planetData.planets.find(
      (p) => p.id === planetId.toLowerCase(),
    );
    onSelect(planet);
  };

  useFrame((state, delta) => {
    if (!isPaused) {
      meshref.current.rotation.y += delta * 0.8;
      const angle = elapsed * speed;

      meshref.current.position.z = Math.sin(angle) * distance;
      meshref.current.position.x = Math.cos(angle) * distance;
    }
  });
  return (
    <mesh
      onClick={() => openPlanetModal(name)}
      ref={meshref}
      position={[distance, 0, 0]}
    >
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}
