import MemeForm from "@/components/form/MemeForm";
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

  const meme = await db.meme.findFirst({
    where: {
      id: memeId,
    },
    include: {
      creator: true,
    },
  });

  if (!meme) return notFound();

  //mongodb pulls status as string
  const typedMeme: memeType = {
    ...meme,
    status: meme.status as MemeStatusTypes,
  };

  return <MemeForm formType="edit" meme={typedMeme} />;
};

export default Page;
