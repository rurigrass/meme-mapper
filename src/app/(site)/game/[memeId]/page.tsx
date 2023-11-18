import Game from "@/components/game/Game";
import Map from "@/components/game/Map";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    memeId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { memeId } = params;
  const session = await getAuthSession();
  const meme = await db.meme.findFirst({
    where: {
      id: memeId,
    },
  });

  if (!meme) return notFound();

  return meme ? <Game meme={meme} session={session} /> : <div>Loading...</div>;
};

export default Page;
