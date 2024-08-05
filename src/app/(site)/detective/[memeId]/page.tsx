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

//These 2 are overiding the default options from nextjs. - this ensures a hard reload everytime to get the freshest comments.
//https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
// export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";

const Page = async ({ params }: PageProps) => {
  const { memeId } = params;
  const token = process.env.NEXT_PUBLIC_MAPKIT_TOKEN;

  //FIRST GET IT IF ITS CACHED IF NOT FETCH FROM PRISMA
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

  //   console.log("MEMEMEMEME", meme);
  return (
    <div className="h-full xl:container mx-2 pb-1.5 grid grid-cols-5 gap-2">
      <div className="col-span-2 h-full w-full rounded-md overflow-hidden">
        <DetectiveMap token={token as string} />
      </div>
      <div className="col-span-3 h-full grid grid-rows-5 gap-2">
        <div className=" row-span-2">
          <DetectiveMemeContainer meme={typedMeme} />
        </div>
        <div className="row-span-3">feed</div>
      </div>
    </div>
  );
};

export default Page;
