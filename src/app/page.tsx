"use client";

// import { Canvas } from "@react-three/fiber";
import { Globe } from "@/components/canvas";
import Text3d from "@/components/home/Text3d";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { useRef } from "react";

export default async function Home() {
  const plane = useRef<HTMLDivElement | null>(null);
  const maxRotate = 45;
  // const session = await getAuthSession();
  const manageMouseMove = (e: any) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    const perspective = window.innerWidth * 4;
    const rotateX = maxRotate * x - maxRotate / 2;
    const rotateY = (maxRotate * y - maxRotate / 2) * -1;
    if (plane.current) {
      plane.current.style.transform = `perspective(${perspective}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`;
    }
  };

  return (
    <main className="relative flex-1 align-middle justify-center h-full">
      {/* <pre>{JSON.stringify(session)}</pre>  */}
      {/* BODY */}
      <div
        className="h-full"
        onMouseMove={(e) => {
          manageMouseMove(e);
        }}
      >
        <div
          ref={plane}
          className="flex flex-col justify-start items-start gap-3 pt-10 absolute container z-10"
        >
          {/* <code>{JSON.stringify(process.env.GOOGLE_MAPS_API_KEY)}</code> */}
          {/* <div className=" text-[8vw]">
            HELLO
          </div> */}
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
      </div>
    </main>
  );
}
