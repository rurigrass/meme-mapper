import Game from "@/components/game/Game";
import Map from "@/components/game/Map";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { MemeStatusTypes, memeType } from "@/lib/types";
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

  //mongodb pulls status as string
  const typedMeme: memeType = {
    ...meme,
    status: meme.status as MemeStatusTypes,
  };

  return meme ? (
    <Game meme={typedMeme} session={session} />
  ) : (
    <div>Loading...</div>
  );
};

export default Page;
