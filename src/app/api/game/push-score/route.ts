import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { ScoreValidator } from "@/lib/validators/score";
import { z } from "zod";

export async function POST(req: Request) {
  //PUSH TO CACHE TOO EVEN IF NOT USER
  //MAKE SURE USER IS LOGGED IN
  const session = await getAuthSession();
  // if (!session?.user) {
  //   return new Response("Unauthorised", { status: 401 });
  // }

  try {
    const body = await req.json();
    // console.log("RESPONSE DATA ", body);

    const { score, memeId } = ScoreValidator.parse(body);

    console.log("PUSH TO DB: the score: ", score, " the memeId: ", memeId);

    // console.log("validator score", score);
    // console.log("validator memeid", memeId);

    if (!session?.user) {
      //ADD ID TO CACHE
      console.log("THERE IS NO USER!!!! lest GOOOO");
      await redis.rpush("memes-played", memeId);
      return new Response("OK");
    } else {
      await db.score.create({
        data: {
          score,
          memeId,
          playerId: session.user.id,
        },
      });
      //ADD ID TO CACHE
      return new Response("OK");
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
    return new Response("Could not save score", { status: 500 });
  }
}
