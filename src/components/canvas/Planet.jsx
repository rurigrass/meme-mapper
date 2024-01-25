import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";

const Planet = () => {
  const [color, normal, aoMap] = useLoader(TextureLoader, [
    "/assets/color.jpg",
    "/assets/normal.png",
    "/assets/occlusion.jpg",
  ]);

  const planetRef = useRef();

  useFrame(() => {
    planetRef.current.rotation.y += 0.003;
  });

  return (
    <>
      <OrbitControls makeDefault />
      <ambientLight intensity={0.1} />
      <directionalLight intensity={3.5} position={[-1, 1, 1]} />

      <mesh ref={planetRef} scale={1.5} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        {/* <meshNormalMaterial /> */}
        <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
      </mesh>
    </>
  );
};

export default Planet;
