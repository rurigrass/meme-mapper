import { db } from "@/lib/db";
import { useQuery } from "@tanstack/react-query";

export type PageProps = {
  // params: { [key: string]: string | string[] | undefined };
  [key: string]: string | string[] | undefined;
};

const Page = (searchParams: PageProps) => {
  // const take = 3;
  // const skip = 0;

  const skip = Number(searchParams["page"] ?? "1");
  const take = Number(searchParams["per_page"] ?? "5");

  // const {} = useQuery

  console.log("THE PROPS ", searchParams);

  const getMemes = async () => {
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

  getMemes();

  return (
    <div>
      DETECTIVE 🕵️‍♂️
      {/* {memes.map((meme) => (
        <div>{meme}</div>
      ))} */}
      <div>RESULTS HERE</div>
      <div className="">PAGINATION CONTROLS HERE</div>
    </div>
  );
};

export default Page;
