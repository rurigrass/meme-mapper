import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function GET(req: NextRequest) {
  //this is an array of all the memes user is allowed to play
  let memesInGame;
  //this is the id of the current meme in url if there is.
  let memeId;
  if (typeof req.url === "string") {
    const url = new URL(req.url);
    memeId = url.searchParams.get("memeId") || "";
  } else {
    memeId = "";
  }

  try {
    const session = await getAuthSession();
    if (session?.user) {
      const verifiedMemesPlayedByUser = await db.score.findMany({
        where: { playerId: session?.user.id, meme: { status: "APPROVED" } },
        distinct: ["memeId"],
        select: { memeId: true },
      });

      // console.log(
      //   "NUMBER LEVELS PLAYED BY USER ",
      //   verifiedMemesPlayedByUser.length
      // );
      // console.log("ID OF LEVELS PLAYED BY USER ", verifiedMemesPlayedByUser);

      const numberOfVerifiedMemes = await db.meme.count({
        where: { status: "APPROVED" },
      });
      // console.log("NUMBER OF MEMES ", numberOfVerifiedMemes);

      if (verifiedMemesPlayedByUser.length >= numberOfVerifiedMemes) {
        //THEYVE PLAYED ALL THE MEMES
        //GET ONE THAT HASENT BEEN CACHED
        //if CACHE TAKe ALL MEMES AND TAKE AWAY CACHE
        // console.log(
        //   "USER IS LOGGED IN, HAS PLAYED ALL THE MEMES, CHECK THE CACHE"
        // );
        //NEEED TO DO CACHE
        const playedMemesInCache = await redis.lrange(
          `${session?.user.id}-memes-played`,
          0,
          -1
        );
        // console.log("MEMES PLAYED BY USER IN CACHE ", playedMemesInCache);

        const unplayedMemes = await db.meme.findMany({
          where: {
            status: "APPROVED",
            id: {
              not: {
                in: playedMemesInCache.map((x) => x),
              },
            },
          },
        });

        if (unplayedMemes.length <= 0) {
          //HERE CONFIRM TO THE PLAYER THAT THEY HAVE PLAYED THROUGH ALL THE MEMES
          redis.del(`${session?.user.id}-memes-played`);
          memesInGame = await db.meme.findMany({
            where: {
              status: "APPROVED",
              id: { not: memeId },
            },
          });
          // console.log(
          //   "NEW MEMES TO PICK FROM MUST EXCLUDE CURRENT MEME ",
          //   memesInGame
          // );
        } else {
          memesInGame = unplayedMemes;
        }
      } else {
        // console.log("MEMES LEFT FOR USER TO PLAY: ");
        //HERE YOU MUST GET A RANDOM MEME OF THE ONES THAT HAVENT BEEN PLAYED
        const unplayedMemes = await db.meme.findMany({
          where: {
            status: "APPROVED",
            id: {
              not: {
                in: verifiedMemesPlayedByUser.map((x) => x.memeId),
              },
            },
          },
        });
        // console.log("REMAINING MEMES ", unplayedMemes);
        memesInGame = unplayedMemes;
      }
    } else {
      // ---- // NOT LOGGED IN // ---- //
      //USE CACHE ONLY -
      const verifiedMemesPlayedInCache = await redis.lrange(
        `${req.cookies.get("userId")?.value}-memes-played`,
        0,
        -1
      );

      // console.log(
      //   "LOGGED OUT: MEMES IN THE CACHE : ",
      //   verifiedMemesPlayedInCache
      // );

      const unplayedMemes = await db.meme.findMany({
        where: {
          status: "APPROVED",
          id: {
            not: {
              in: verifiedMemesPlayedInCache.map((x) => x),
            },
          },
        },
      });
      // console.log(
      //   "$$$$$$$$$ All memes excluding ones from cache ",
      //   unplayedMemes
      // );

      if (unplayedMemes.length <= 0) {
        //HERE CONFIRM TO THE PLAYER THAT THEY HAVE PLAYED THROUGH ALL THE MEMES
        redis.del(`${req.cookies.get("userId")?.value}-memes-played`);
        memesInGame = await db.meme.findMany({
          where: {
            status: "APPROVED",
            id: { not: memeId },
          },
        });
        // console.log(
        //   "NEW MEMES TO PICK FROM MUST EXCLUDE CURRENT MEME ",
        //   memesInGame
        // );
      } else {
        memesInGame = unplayedMemes;
      }
    }

    if (memesInGame && memesInGame.length > 0) {
      // Generate a random index
      const randomIndex = Math.floor(Math.random() * memesInGame.length);
      // Access the corresponding id
      const randomMemeId = memesInGame[randomIndex].id;
      // console.log("RANDOMMEME ", randomMemeId);
      return new Response(randomMemeId);
    } else {
      // Handle the case where no memes match the criteria - you have completed the game! - start again go to cache
      return new Response("No matching memes found", { status: 404 });
    }
  } catch (error) {
    // if (error instanceof z.ZodError) {
    //   return new Response(error.message, { status: 422 });
    // }
    return new Response("Could not fetch random", { status: 500 });
  }
}
