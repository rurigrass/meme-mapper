import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
  //FILTER OUT LEVELS USER HAS ALREADY PLAYED
  // const session = await getAuthSession();
  // if (!session?.user) {

  // }

  try {
    // Get the total count of verified memes
    const totalCount = await db.meme.count({
      where: {
        verified: true,
      },
    });

    // Generate a random offset
    const randomOffset = Math.floor(Math.random() * totalCount);

    // Retrieve a random meme
    const meme = await db.meme.findFirst({
      where: {
        verified: true,
      },
      skip: randomOffset,
    });

    console.log(meme?.name);

    return new Response(meme?.id);
  } catch (error) {
    // if (error instanceof z.ZodError) {
    //   return new Response(error.message, { status: 422 });
    // }
    return new Response("Could not save score", { status: 500 });
  }
}
