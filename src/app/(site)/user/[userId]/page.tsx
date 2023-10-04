import Game from "@/components/game/Game";
import Map from "@/components/game/Map";
import TestMap from "@/components/game/TestMap";
import RequestedMemes from "@/components/user/RequestedMemes";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    userId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const session = await getAuthSession();
  const { userId } = params;

  console.log(session);

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

  if (!user) return notFound();

  return user ? (
    <>
      <div className=" text-[8vw] ml-2">
        {session?.user.id === userId && "Hello"} {user.username}
      </div>
      <RequestedMemes requestedMemes={user.createdMemes} />
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default Page;
