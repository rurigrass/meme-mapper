"use client";

import { Globe } from "@/components/canvas";
import SignOut from "@/components/home/SignOut";
import Text3d from "@/components/home/Text3d";
import { useRandomMeme } from "@/lib/hooks/useRandomMeme";
import { Canvas } from "@react-three/fiber";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Planet from "../components/canvas/Planet";
import MenuButtons from "@/components/canvas/MenuButtons";
import { Physics } from "@react-three/rapier";

const Home = () => {
  const router = useRouter();
  const { status, data: session } = useSession();
  const { data: randomMeme, isLoading } = useRandomMeme("");
  //ADD A LOADING STATE FOR THIS PAGE
  // console.log("IS THE PAGE LOADING: ", isLoading);
  // const isComputer = window.innerWidth > 1024;

  return (
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
      <color args={["#030202"]} attach="background" />
      <ambientLight intensity={0.2} />
      <directionalLight intensity={3.5} position={[1, 0.5, -0.4]} />
      <Physics gravity={[0, 0, 1]}>
        <MenuButtons position={[0, 0.6, 2]} />
        <Planet position={[-1.3, 0, 5]} />
      </Physics>
    </Canvas>
    // <main className="relative flex-1 align-middle justify-center h-full">
    //   {/* BODY */}
    //   <div
    //     // ref={plane}
    //     className="flex flex-col justify-start items-start gap-3 pt-10 absolute container z-20"
    //   >
    //     {/* <code>{JSON.stringify(process.env.GOOGLE_MAPS_API_KEY)}</code> */}
    //     {/* <div className=" text-[8vw]">
    //         HELLO
    //       </div> */}
    //     {/* DISABLE BELOW */}
    //     {isLoading ? (
    //       <Text3d
    //         primary="Random Meme"
    //         secondary={
    //           "Play Now" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
    //         }
    //         blocked
    //       />
    //     ) : (
    //       <button onClick={() => router.push(`/game/${randomMeme}`)}>
    //         <Text3d
    //           primary="Random Meme"
    //           secondary={
    //             "Play Now" + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
    //           }
    //         />
    //       </button>
    //     )}
    //     <Link href={"/game/cllxusaza000116c2ljpc0hyo"}>
    //       <Text3d
    //         primary="Quick Game"
    //         secondary={"Play Now" + "\xa0\xa0\xa0\xa0\xa0\xa0"}
    //       />
    //     </Link>
    //     <Link href={"/game/cllwf54ag000316d8estmtpjp"}>
    //       <Text3d
    //         primary="Image Game"
    //         secondary={"Play Now" + "\xa0\xa0\xa0\xa0\xa0\xa0"}
    //       />
    //     </Link>
    //     {/* <Link href={"/"}> */}
    //     <Text3d primary={"Meme Map"} secondary={"Coming Soon!"} blocked />
    //     {/* </Link> */}
    //     {status === "authenticated" && (
    //       <Link href={"/request"}>
    //         <Text3d primary="Request Meme" secondary="Submit Request" />
    //       </Link>
    //     )}
    //     {status === "authenticated" && session?.user.role === "ADMIN" && (
    //       <Link href={"/admin"}>
    //         <Text3d primary="Admin" secondary="Admin" />
    //       </Link>
    //     )}
    //     {status === "authenticated" ? (
    //       <SignOut>
    //         <Text3d primary="Logout" secondary="Cheerio!" />
    //       </SignOut>
    //     ) : (
    //       <Link href={"/login"}>
    //         <Text3d primary="Sign In" secondary="Welcome!" />
    //       </Link>
    //     )}
    //   </div>

    //   <Canvas
    //     style={{
    //       position: "fixed",
    //       top: "0",
    //       left: "0",
    //       width: "100%",
    //       height: "100%",
    //     }}
    //     camera={{
    //       fov: 45,
    //       near: 0.1,
    //       far: 200,
    //       position: [1, 2, 6],
    //     }}
    //   >
    //     <color args={["#030202"]} attach="background" />
    //     <Planet />
    //   </Canvas>
    // </main>
  );
};
export default Home;
