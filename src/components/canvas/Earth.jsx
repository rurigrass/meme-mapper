import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls, useTexture } from "@react-three/drei";
import { useRef } from "react";
import { RigidBody } from "@react-three/rapier";
import Clouds from "./Clouds";

const Earth = ({ position }) => {
  // const [color, normal, aoMap] = useLoader(TextureLoader, [
  //   // "/assets/clouds.jpeg",
  //   // "/assets/earth.jpeg",
  //   "/assets/color.jpg",
  //   "/assets/normal.png",
  //   "/assets/occlusion.jpg",
  // ]);
  const [
    earthTexture,
    //  earthNormalMap, earthSpecularMap, earthDisplacementMap
  ] = useTexture([
    "/assets/planets/earth.jpeg",
    // "/assets/planets/earth_normal.jpeg",
    // "/assets/planets/earth_specular.jpeg",
    // "/assets/planets/earth_displacement.jpeg",
  ]);

  const planetRef = useRef();

  useFrame(() => {
    planetRef.current.rotation.y += 0.001;
  });

  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <RigidBody type="fixed" colliders="ball">
        <mesh ref={planetRef} scale={1.5} position={position}>
          <sphereGeometry args={[1, 64, 64]} />
          {/* <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} /> */}
          <meshPhongMaterial
            map={earthTexture}
            // normalMap={earthNormalMap}
            // specularMap={earthSpecularMap}
            // displacementMap={earthDisplacementMap}
            // displacementScale={0.05}
          />
          <Clouds />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Earth;
