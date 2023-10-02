import Game from "@/components/game/Game";
import Map from "@/components/game/Map";
import TestMap from "@/components/game/TestMap";
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
  });

  if (!user) return notFound();

  return user ? (
    <div className=" text-[10vw]">Hello {user.username}</div>
  ) : (
    <div>Loading...</div>
  );
};

export default Page;
