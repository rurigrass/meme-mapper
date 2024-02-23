"use client";

import SignOut from "@/components/home/SignOut";
import Text3d from "@/components/home/Text3d";
import { useRandomMeme } from "@/lib/hooks/useRandomMeme";
import { Canvas, CubeTextureProps } from "@react-three/fiber";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Earth from "../components/canvas/Earth";
import Moon from "../components/canvas/Moon";
import MenuButtons from "@/components/canvas/MenuButtons";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import Loading from "../components/home/Loading";
import Space from "@/components/canvas/Space";
import CanvasLoader from "@/components/canvas/Loader";

const Home = () => {
  //ADD A LOADING STATE FOR THIS PAGE
  // console.log("IS THE PAGE LOADING: ", isLoading);
  // const isComputer = window.innerWidth > 1024;

  return (
    <>
      <Canvas
        style={{
          position: "fixed",
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
        <directionalLight intensity={3.5} position={[1, 0.5, -0.4]} />
        <Physics gravity={[0, 0, 1]}>
          <Suspense fallback={<CanvasLoader />}>
            {/* <OrbitControls /> */}
            <MenuButtons position={[0, 0.6, 2]} />
            <Earth position={[-1.3, 0, 5]} />
            <Moon />
            <Space />
          </Suspense>
        </Physics>
      </Canvas>
    </>
  );
};
export default Home;
