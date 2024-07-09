import DetectiveMap from "@/components/detective/meme/DetectiveMap";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    memeId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { memeId } = params;
  const { MAPKIT_TOKEN: token } = process.env;

  console.log("THE TOKEN ", token);

  //   const meme = await db.meme.findFirst({
  //     where: {
  //       id: memeId,
  //     },
  //   });

  //   if (!meme) return notFound();

  //   console.log("MEMEMEMEME", meme);
  return (
    <div className=" grid grid-cols-5">
      <div className=" col-span-2">
        <DetectiveMap token={token as string} />
      </div>
      <div className=" col-span-3">
        <div>meme</div>
        <div>feed</div>
      </div>
    </div>
  );
};

export default Page;
