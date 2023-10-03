import Game from "@/components/game/Game";
import Map from "@/components/game/Map";
import TestMap from "@/components/game/TestMap";
import RequestedMemes from "@/components/user/RequestedMemes";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    userId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { userId } = params;

  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      createdMemes: true,
      scores: true,
    },
    orderBy: { createdAt: "desc" },
  });

  if (!user) return notFound();

  return user ? (
    <>
      <div className=" text-[8vw] ml-2">Hello {user.username}</div>
      <RequestedMemes requestedMemes={user.createdMemes} />
    </>
  ) : (
    <div>Loading...</div>
  );
};

export default Page;
