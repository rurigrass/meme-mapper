// "use client";

// import { Canvas } from "@react-three/fiber";
import { Globe } from "@/components/canvas";
import TikTok from "@/components/game/TikTok";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";

export default async function Home() {
  // const session = await getAuthSession();

  return (
    <main className="pt-20">
      <h1>home</h1>
      {/* <pre>{JSON.stringify(session)}</pre> */}
      <div className="flex justify-start z-50">
        {/* <TikTok /> */}
        {/* <code>{JSON.stringify(process.env.GOOGLE_MAPS_API_KEY)}</code> */}
        <Link href={"/admin"}>
          <Button>Admin</Button>
        </Link>
        <Link href={"/game/cllxusaza000116c2ljpc0hyo"}>
          <Button>Game</Button>
        </Link>
      </div>
      <div className="absolute inset-0">
        <Globe />
      </div>
    </main>
  );
}
