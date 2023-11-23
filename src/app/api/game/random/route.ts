import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { unique } from "next/dist/build/utils";
import { z } from "zod";

export async function GET(req: Request) {
  let memesInGame;
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
  //it should post the memeId to the tail of the redis array - this is done in the push-meme route
  //it should fetch the memes array from redis -
  //get array of remaining memes not in cache and go from there

  //FILTER OUT LEVELS USER HAS ALREADY PLAYED
  const session = await getAuthSession();
  if (session?.user) {
    const verifiedMemesPlayedByUser = await db.score.findMany({
      where: { playerId: session?.user.id, meme: { verified: true } },
      distinct: ["memeId"],
      select: { memeId: true },
    });

    console.log(
      "NUMBER LEVELS PLAYED BY USER ",
      verifiedMemesPlayedByUser.length
    );
    console.log("ID OF LEVELS PLAYED BY USER ", verifiedMemesPlayedByUser);

    const numberOfVerifiedMemes = await db.meme.count({
      where: { verified: true },
    });
    console.log("NUMBER OF MEMES ", numberOfVerifiedMemes);

    if (verifiedMemesPlayedByUser.length >= numberOfVerifiedMemes) {
      //THEYVE PLAYED ALL THE MEMES
      //GET ONE THAT HASENT BEEN CACHED
      console.log(
        "USER IS LOGGED IN, HAS PLAYED ALL THE MEMES, CHECK THE CACHE"
      );
    } else {
      console.log("THERE IS ONLY ONCE MEME LEFT FOR USER TO PLAY");
      //HERE YOU MUST GET A RANDOM MEME OF THE ONES THAT HAVENT BEEN PLAYED
      const unplayedMemes = await db.meme.findMany({
        where: {
          verified: true,
          id: {
            not: {
              in: verifiedMemesPlayedByUser.map((x) => x.memeId),
            },
          },
        },
      });
      console.log("REMAINING MEMES ", unplayedMemes);
      memesInGame = unplayedMemes;
    }
  } else {
    // NOT LOGGED IN
    //USE CACHE ONLY
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
    // const memes = await db.meme.findMany({
    //   where: {
    //     verified: true,
    //     id: memeId !== null ? { not: { equals: memeId } } : undefined,
    //   },
    // });

    if (memesInGame && memesInGame.length > 0) {
      // Generate a random index
      const randomIndex = Math.floor(Math.random() * memesInGame.length);
      // Access the corresponding id
      const randomMemeId = memesInGame[randomIndex].id;
      console.log("RANDOMMEME ", randomMemeId);
      return new Response(randomMemeId);
    } else {
      // Handle the case where no memes match the criteria - you have completed the game! - start again go to cache
      return new Response("No matching memes found", { status: 404 });
    }
  } catch (error) {
    // if (error instanceof z.ZodError) {
    //   return new Response(error.message, { status: 422 });
    // }
    return new Response("Could not save score", { status: 500 });
  }
}
