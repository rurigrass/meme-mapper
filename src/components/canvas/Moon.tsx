import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { memo, useRef } from "react";
import { Physics, RigidBody } from "@react-three/rapier";
import { useTexture } from "@react-three/drei";

const Moon = () => {
  const [moonTexture] = useTexture([
    "/assets/planets/moon.jpeg",
    // "/assets/normal.png",
    // "/assets/occlusion.jpg",
  ]);

  const moonRef = useRef<any>();

  useFrame(({ clock }) => {
    const elapsedTime = clock.elapsedTime - 6;
    const radius = 4; // Adjust this value as needed
    const orbitSpeed = 0.5; // Adjust this value as needed
    const position = { x: -1.3, y: 0, z: 5 };

    // Set positions with the calculated values
    moonRef.current.position.x =
      position.x + Math.cos(elapsedTime * orbitSpeed) * radius;
    moonRef.current.position.z =
      position.z - Math.sin(elapsedTime * orbitSpeed) * radius;
    moonRef.current.position.y =
      position.y - Math.cos(elapsedTime * orbitSpeed) * -1;
  });

  return (
    <>
      {/* <ambientLight intensity={0.1} />
      <directionalLight intensity={3.5} position={[-1, 1, 1]} /> */}

      {/* <Physics debug> */}
      <RigidBody type="fixed" colliders="ball">
        <mesh ref={moonRef} scale={0.375} position={[0, 0, 0]} rotation-y={10}>
          <sphereGeometry args={[1, 32, 32]} />
          {/* <meshNormalMaterial /> */}
          <meshStandardMaterial map={moonTexture} opacity={100} />
        </mesh>
      </RigidBody>
      {/* </Physics> */}
    </>
  );
};

export default memo(Moon);
