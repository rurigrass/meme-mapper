import TikTok from "@/components/game/TikTok";
import { getAuthSession } from "@/lib/auth";

export default async function Home() {
  const session = await getAuthSession();

  return (
    <main className="">
      <h1>home</h1>
      <pre>{JSON.stringify(session)}</pre>
      <div className="flex justify-start">
        {/* <TikTok /> */}
        <code>{JSON.stringify(process.env.GOOGLE_MAPS_API_KEY)}</code>

        <div>hi</div>
      </div>
    </main>
  );
}
