import Game from "@/components/game/Game";
import Map from "@/components/game/Map";
import TestMap from "@/components/game/TestMap";
import { db } from "@/lib/db";

interface PageProps {
  params: {
    memeId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { memeId } = params;

  const meme = await db.meme.findFirst({
    where: {
      id: memeId,
    },
  });

  return <Game meme={meme} />;
};

export default Page;
