import { Vector3, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { OrbitControls, useTexture } from "@react-three/drei";
import React, { memo, useMemo, useRef } from "react";
import { RigidBody } from "@react-three/rapier";
import Clouds from "./Clouds";

type EarthProps = {
  position: Vector3;
};

const Earth = ({ position }: EarthProps) => {
  const [earthTexture, earthNormalMap, earthSpecularMap, earthDisplacementMap] =
    useTexture([
      "/assets/planets/earth.jpeg",
      // "/assets/planets/earth_normal.jpeg",
      // "/assets/planets/earth_specular.jpeg",
      // "/assets/planets/earth_displacement.jpeg",
    ]);

  const planetRef = useRef<any>();

  useFrame(() => {
    planetRef.current.rotation.y += 0.001;
  });

  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <RigidBody type="fixed" colliders="ball">
        <mesh ref={planetRef} scale={1.5} position={position}>
          <sphereGeometry args={[1, 32, 32]} />
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

export default memo(Earth);
