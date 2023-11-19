import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { ScoreValidator } from "@/lib/validators/score";
import { z } from "zod";

export async function POST(req: Request) {
  //MAKE SURE USER IS LOGGED IN
  const session = await getAuthSession();
  if (!session?.user) {
    return new Response("Unauthorised", { status: 401 });
  }

  try {
    const body = await req.json();
    console.log("RESPONSE DATA ", body);

    const { score, memeId } = ScoreValidator.parse(body);

    console.log("validator ", score);
    console.log("validator ", memeId);

    await db.score.create({
      data: {
        score,
        memeId,
        playerId: session.user.id,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 });
    }
    return new Response("Could not add meme", { status: 500 });
  }
}
