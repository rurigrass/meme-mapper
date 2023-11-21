import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
  //FILTER OUT LEVELS USER HAS ALREADY PLAYED
  // const session = await getAuthSession();
  // if (!session?.user) {

  // }

  const url = new URL(req.url);
  let memeId;
  if (url) {
    memeId = url.searchParams.get("memeId");
  } else {
    memeId = "";
  }
  // const memeId = url.searchParams.get("memeId");

  try {
    //OLD WAY DIDNT WORK
    // Get the total count of verified memes
    // const totalCount = await db.meme.count({
    //   where: {
    //     verified: true,
    //   },
    // });
    // Generate a random offset
    // const randomOffset = Math.floor(Math.random() * totalCount);
    // const meme = await db.meme.findFirst({
    //   where: {
    //     verified: true,
    //   },
    //   skip: randomOffset,
    // });

    const memes = await db.meme.findMany({
      where: {
        verified: true,
        id: memeId !== null ? { not: { equals: memeId } } : undefined,
      },
    });

    if (memes.length > 0) {
      // Generate a random index
      const randomIndex = Math.floor(Math.random() * memes.length);
      // Access the corresponding id
      const randomMemeId = memes[randomIndex].id;
      console.log("RANDOMMEME ", randomMemeId);
      return new Response(randomMemeId);
    } else {
      // Handle the case where no memes match the criteria - you have completed the game!
      return new Response("No matching memes found", { status: 404 });
    }
  } catch (error) {
    // if (error instanceof z.ZodError) {
    //   return new Response(error.message, { status: 422 });
    // }
    return new Response("Could not save score", { status: 500 });
  }
}
