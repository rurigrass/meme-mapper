import DetectiveMap from "@/components/detective/meme/DetectiveMap";
import DetectiveMemeContainer from "@/components/detective/meme/DetectiveMemeContainer";
import { db } from "@/lib/db";
import { MemeStatusTypes, memeTypeApproved } from "@/lib/types";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    memeId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { memeId } = params;
  const token = process.env.NEXT_PUBLIC_MAPKIT_TOKEN;

  const meme = await db.meme.findFirst({
    where: {
      id: memeId,
    },
  });

  if (!meme) return notFound();

  //mongodb pulls status as string
  const typedMeme: memeTypeApproved = {
    ...(meme as memeTypeApproved),
    status: meme.status as MemeStatusTypes,
  };

  //   console.log("MEMEMEMEME", meme );
  return (
    <div className="h-full xl:container mx-2 pb-1.5 grid grid-cols-5 gap-2">
      <div className="col-span-2 h-full w-full rounded-md overflow-hidden">
        <DetectiveMap token={token as string} />
      </div>
      <div className="col-span-3 h-full grid grid-rows-5">
        <div className=" row-span-2">
          <DetectiveMemeContainer meme={typedMeme} />
        </div>
        <div className=" row-span-3">feed</div>
      </div>
    </div>
  );
};

export default Page;
