"use client";

import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "./Loader";
// import { TextureLoader } from "three/src/loaders/TextureLoader";

// const [color, normal, aoMap] = useLoader(TextureLoader, [
//   "./map/color.jpg",
//   "./map/normal.png",
//   "./map/occlusion.jpg",
// ]);

// const Earth = () => {
//   const earth = useGLTF("./planet/scene.gltf");

//   return (
//     <primitive object={earth.scene} scale={3.5} position-y={0} rotation-y={0} />
//   );
// };

const Globe = () => {
  return (
    // <Canvas
    //   shadows
    //   frameloop="demand"
    //   dpr={[1, 2]}
    //   gl={{ preserveDrawingBuffer: true }}
    //   camera={{
    //     fov: 45,
    //     near: 0.1,
    //     far: 200,
    //     position: [-4, 3, 6],
    //   }}
    // >
    //   <Suspense fallback={<CanvasLoader />}>
    //     <OrbitControls
    //       autoRotate
    //       enableZoom={false}
    //       maxPolarAngle={Math.PI / 2}
    //       minPolarAngle={Math.PI / 2}
    //     />
    //     <Earth />
    //   </Suspense>
    // </Canvas>

    <Canvas>
      {/* <Suspense fallback={<CanvasLoader />}> */}
      <ambientLight intensity={0.1} />
      <directionalLight intensity={16.5} position={[1, 0, -0.25]} />
      <mesh scale={2.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      {/* </Suspense> */}
    </Canvas>
  );
};

export default Globe;
