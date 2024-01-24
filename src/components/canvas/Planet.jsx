import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls } from "@react-three/drei";

const Planet = () => {
  const [color, normal, aoMap] = useLoader(TextureLoader, [
    "/assets/color.jpg",
    "/assets/normal.png",
    "/assets/occlusion.jpg",
  ]);

  return (
    <>
      <OrbitControls makeDefault />
      <ambientLight intensity={2} />

      <mesh scale={1.5} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 64, 64]} />
        {/* <meshNormalMaterial /> */}
        <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
      </mesh>
    </>
  );
};

export default Planet;
