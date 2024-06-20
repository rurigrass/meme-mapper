import { db } from "@/lib/db";

export type PageProps = {
  params: { [key: string]: string | string };
};

const Page = async (props: PageProps) => {
  const take = 3;
  const skip = 0;
  const memes = await db.meme.findMany({
    take,
    skip,
    where: { status: { equals: "DETECTIVE" } },
    select: {
      id: true,
      name: true,
    },
    orderBy: { createdAt: "desc" },
  });

  console.log(memes);

  return <div>DETECTIVE 🕵️‍♂️</div>;
};

export default Page;
