import { db } from "@/lib/db";

const Page = async () => {
  const memes = await db.meme.findMany({
    where: { status: { equals: "DETECTIVE" } },
  });

  console.log(memes);

  return <div>DETECTIVE 🕵️‍♂️</div>;
};

export default Page;
