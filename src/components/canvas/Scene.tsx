import { useThree } from "@react-three/fiber";
import MenuButtons from "./MenuButtons";
import Planet from "./Planet";
import { OrbitControls } from "@react-three/drei";

const Scene = () => {
  const { viewport } = useThree();

  const responsiveRatio = viewport.width / 12;
  const isComputer = window.innerWidth > 1024;

  //   console.log(viewport);
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight intensity={3.5} position={[1, 0.5, -0.4]} />
      <MenuButtons position={[isComputer ? 1 : 0, 0.6, 2]} />
      <Planet position={[isComputer ? -1.3 : 0, 0, 5]} />
    </>
  );
};

export default Scene;
