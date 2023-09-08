// "use client";

// import { Canvas } from "@react-three/fiber";
import { Globe } from "@/components/canvas";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  // const session = await getAuthSession();

  return (
    <main className="relative flex align-middle justify-center h-[100svh]">
      {/* <pre>{JSON.stringify(session)}</pre> */}
      <div className="flex flex-col justify-start absolute container z-10 pt-20">
        {/* <code>{JSON.stringify(process.env.GOOGLE_MAPS_API_KEY)}</code> */}
        <Link href={"/admin"}>
          <Button>Admin</Button>
        </Link>
        <Link href={"/game/cllxusaza000116c2ljpc0hyo"}>
          <Button>Game</Button>
        </Link>
      </div>
      <Globe />
    </main>
  );
}
