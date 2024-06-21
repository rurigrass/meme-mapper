import { db } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";

export type PageProps = {
  params: { [key: string]: string | string };
};

const Page = (props: PageProps) => {
  const take = 3;
  const skip = 0;

  // const {} = useQuery

  const getMemes = async () => {
    "use server";
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

    return {
      data: memes,
      metadata: {},
    };
  };

  return <div>DETECTIVE 🕵️‍♂️</div>;
};

export default Page;
