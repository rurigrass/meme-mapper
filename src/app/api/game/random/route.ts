import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { unique } from "next/dist/build/utils";
import { z } from "zod";

export async function GET(req: Request) {
  //ORDER OF THINGS TO DO

  //IF LOGGED IN
  //1 ------ If user has played all the memes:
  //go to cache
  //
  //2 ------If user hasnt played all the memes:
  //get array of remaining memes and get a random one from there

  //IF NOT LOGGED IN -
  //DO CACHE

  //CACHE
  //it should post the memeId to the tail of the redis array
  //it should fetch the memes array from redis
  //get array of remaining memes not in cache and go from there

  //FILTER OUT LEVELS USER HAS ALREADY PLAYED
  const session = await getAuthSession();
  if (session?.user) {
    const verifiedMemesPlayedByUser = await db.score.findMany({
      where: { playerId: session?.user.id, meme: { verified: true } },
      distinct: ["memeId"],
      select: { memeId: true },
    });

    console.log("LEVELS PLAYED BY USER ", verifiedMemesPlayedByUser.length);

    const numberOfVerifiedMemes = await db.meme.count({
      where: { verified: true },
    });
    console.log("NUMBER OF MEMES ", numberOfVerifiedMemes);

    if (verifiedMemesPlayedByUser.length >= numberOfVerifiedMemes) {
      console.log(
        "USER IS LOGGED IN, HAS PLAYED ALL THE MEMES, CHECK THE CACHE"
      );
    }

    // const numberOfLevelsPlayedByUser = await db.score.count({
    //   where: { playerId: session?.user.id },
    //   distinct: ["memeId"],
    // });
    // console.log("NUMBER OF LEVELS PLAYED BY USER ", numberOfLevelsPlayedByUser);

    // const numberOfLevels = await db.user.
  }

  const url = new URL(req.url);
  let memeId;
  if (url) {
    memeId = url.searchParams.get("memeId");
  } else {
    memeId = "";
  }

  // const memeId = url.searchParams.get("memeId");

  try {
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
