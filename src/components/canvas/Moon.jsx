import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useRef } from "react";
import { Physics, RigidBody } from "@react-three/rapier";

const Moon = () => {
  const [color, normal, aoMap] = useLoader(TextureLoader, [
    "/assets/color.jpg",
    "/assets/normal.png",
    "/assets/occlusion.jpg",
  ]);

  const moonRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.elapsedTime - 2;
    const radius = 4; // Adjust this value as needed
    const orbitSpeed = 0.5; // Adjust this value as needed
    const position = { x: -1.3, y: 0, z: 5 };

    // Set positions with the calculated values
    moonRef.current.position.x =
      position.x + Math.cos(elapsedTime * orbitSpeed) * radius;
    moonRef.current.position.z =
      position.z - Math.sin(elapsedTime * orbitSpeed) * radius;
    moonRef.current.position.y = 0.25;
  });

  return (
    <>
      {/* <OrbitControls makeDefault /> */}

      {/* <ambientLight intensity={0.1} />
      <directionalLight intensity={3.5} position={[-1, 1, 1]} /> */}

      {/* <Physics debug> */}
      <RigidBody type="fixed" colliders="ball">
        <mesh ref={moonRef} scale={0.375} position={[0, 0, 0]}>
          <sphereGeometry args={[1, 64, 64]} />
          {/* <meshNormalMaterial /> */}
          <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
        </mesh>
      </RigidBody>
      {/* </Physics> */}
    </>
  );
};

export default Moon;
