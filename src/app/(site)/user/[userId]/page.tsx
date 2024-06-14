import Game from "@/components/game/Game";
import Map from "@/components/game/Map";
import RequestedMemes from "@/components/user/RequestedMemes";
import ScoresSection from "@/components/user/ScoresSection";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { memeType } from "@/lib/types";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    userId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const session = await getAuthSession();
  const { userId } = params;

  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      createdMemes: true,
      scores: true,
    },
    // orderBy: [{ createdMemes: {_count} }],
  });

  const numberOfVerifiedMemes = await db.meme.count({
    where: { verified: true },
  });

  console.log("NUMBER ", numberOfVerifiedMemes);

  if (!user) return notFound();

  return user ? (
    <>
      <div className=" text-[8vw] ml-2">
        {session?.user.id === userId && "Hello"} {user.username}
      </div>
      <ScoresSection
        scores={user.scores}
        numberOfLevels={numberOfVerifiedMemes}
      />
      <RequestedMemes requestedMemes={user.createdMemes as memeType[]} />
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default Page;
