"use client";
import { useFrame, extend, useThree, Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import CustomObject from "./CustomObject";
// import { DoubleSide } from "three";

// extend({ OrbitControls });

const Globe = () => {
  const [spin, setSpit] = useState(true);
  const cubeRef = useRef();
  const groupRef = useRef();

  const { camera, gl } = useThree();

  useFrame((state, delta) => {
    if (spin === true) {
      //   groupRef.current.rotation.y += 0.01;
      //   cubeRef.current.rotation.x += 0.01;
    }

    //ANIMATION TO LOOK AT CENTER FROM OUTSIDE
    // const angle = state.clock.elapsedTime;
    // state.camera.position.x = Math.sin(angle) * 8;
    // state.camera.position.z = Math.cos(angle) * 8;
    // state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* <orbitControls args={[camera, gl.domElement]} /> */}
      <directionalLight position={[1, 2, 3]} intensity={1} />
      <ambientLight intensity={0.5} />
      <mesh scale={3}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  );
};

export default Globe;
