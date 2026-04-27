import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Sun from "./components/Sun";
import { Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Planet from "./components/Planet";
import AnimationController from "./components/AnimationController";
import PlanetModal from "./components/PlanetModal";
import planetData from "./utils/planetData.json";

function App() {
  const [isPaused, setIsPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlanet(null);
  };

  const planets = [
    { name: "Mercury", radius: 0.25, distance: 3, speed: 2.0 },
    { name: "Venus", radius: 0.45, distance: 4.5, speed: 1.6 },
    { name: "Earth", radius: 0.5, distance: 6, speed: 1.0 },
    { name: "Mars", radius: 0.35, distance: 8, speed: 0.8 },
    { name: "Jupiter", radius: 1.2, distance: 12, speed: 0.4 },
    { name: "Uranus", radius: 0.7, distance: 20, speed: 0.2 },
    { name: "Neptune", radius: 0.7, distance: 24, speed: 0.15 },
  ];

  return (
    <>
      <button
        onClick={() => setIsPaused(!isPaused)}
        style={{
          position: "absolute",
          zIndex: 100,
          top: "20px",
          left: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          background: isPaused ? "#4CAF50" : "#f44336",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {isPaused ? "Resume" : "Pause"}
      </button>

      <Canvas camera={{ position: [0, 10, 20], fov: 45 }}>
        <AnimationController isPaused={isPaused} setElapsed={setElapsed} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <Sun />
        {planets.map((planet) => (
          <Planet
            key={planet.name}
            name={planet.name}
            radius={planet.radius}
            distance={planet.distance}
            speed={planet.speed}
            elapsed={elapsed}
            isPaused={isPaused}
            onSelect={(planet) => {
              setSelectedPlanet(planet);
              setIsModalOpen(true);
            }}
          />
        ))}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />
        <OrbitControls
          enablePan={true}
          enableRotate={true}
          enableZoom={true}
          panSpeed={2.5}
          rotateSpeed={1.0}
          zoomSpeed={1}
          minDistance={2}
          maxDistance={1000}
          autoRotate={!isPaused}
          autoRotateSpeed={0.5}
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN,
          }}
        />
      </Canvas>
      <PlanetModal
        planet={selectedPlanet}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}

export default App;
