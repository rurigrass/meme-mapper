"use client";

// import { Canvas } from "@react-three/fiber";
import { Globe } from "@/components/canvas";
import Text3d from "@/components/home/Text3d";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  // const session = await getAuthSession();
  // const manageMouseMove = (e: any) => {
  //   console.log(e);
  // };

  return (
    <main
      className="relative flex-1 align-middle justify-center h-full"
      onMouseMove={() => {
        // manageMouseMove(e);
        console.log("MOVEMENT yeah");
      }}
    >
      {/* <pre>{JSON.stringify(session)}</pre> */}
      {/* BODY */}
      <div className="flex flex-col justify-start items-start gap-3 pt-10 absolute container z-10">
        {/* <code>{JSON.stringify(process.env.GOOGLE_MAPS_API_KEY)}</code> */}
        <Link href={"/login"}>
          <Text3d primary="Login" secondary="Login" />
        </Link>
        <Link href={"/game/cllxusaza000116c2ljpc0hyo"}>
          <Text3d primary="Quick Game" secondary="Play Now" />
        </Link>
        <Link href={"/admin"}>
          <Text3d primary="Admin" secondary="Admin" />
        </Link>
      </div>
      <Globe />
    </main>
  );
}
