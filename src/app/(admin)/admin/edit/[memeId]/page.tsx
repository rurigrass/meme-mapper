import MemeForm from "@/components/admin/MemeForm";
import { db } from "@/lib/db";
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
  });

  if (!meme) return notFound();

  return <MemeForm meme={meme} />;
};

export default Page;
