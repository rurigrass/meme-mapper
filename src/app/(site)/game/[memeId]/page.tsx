import { db } from "@/lib/db";

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

  return (
    <div>
      page
      <div>{JSON.stringify(meme)}</div>
    </div>
  );
};

export default Page;
