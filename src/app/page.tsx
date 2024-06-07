"use client";

import { Canvas } from "@react-three/fiber";
import Earth from "../components/canvas/Earth";
import Moon from "../components/canvas/Moon";
import MenuButtons from "@/components/canvas/MenuButtons";
import { Physics } from "@react-three/rapier";
import { Perf } from "r3f-perf";
import Space from "@/components/canvas/Space";
import { OrbitControls } from "@react-three/drei";
import LoadingScreen from "@/components/canvas/LoadingScreen";
import { useState } from "react";

const Home = () => {
  const [loadingEnded, setLoadingEnded] = useState<boolean>(false);

  return (
    <div className="relative w-full h-full">
      <LoadingScreen
        loadingEnded={loadingEnded}
        setLoadingEnded={setLoadingEnded}
      />
      <Canvas
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
        }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 0, -1],
        }}
      >
        {/* <Perf position="bottom-right" /> */}
        <directionalLight intensity={3.5} position={[1, 0.5, -0.4]} />
        <Physics gravity={[0, 0, 1]}>
          {/* <Suspense fallback={<CanvasLoader />}> */}
          {/* <OrbitControls /> */}
          <MenuButtons position={[0, 0.6, 2]} />
          <Earth position={[-1.3, 0, 5]} rotationY={1} />
          <Moon />
          {/* <Space /> */}
          {/* {localStorage.theme === "dark" && <Space />} */}
          {/* </Suspense> */}
        </Physics>
      </Canvas>
    </div>
  );
};
export default Home;
