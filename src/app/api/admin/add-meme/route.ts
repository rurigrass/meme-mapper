import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { MemeValidator } from "@/lib/validators/meme";
import { z } from "zod";

export async function POST(req: Request) {
  const session = await getAuthSession();
  if (!session?.user) {
    return new Response("Unauthorised", { status: 401 });
  }

  console.log("THE SESSION ", session);

  //converts the request to json
  const body = await req.json();
  // validated the json and destructures it.
  const { name, url } = MemeValidator.parse(body);

  try {
    //Check if meme exists already / TODO: need to make string lowercase and no gaps etc
    const memeNameExists = await db.meme.findFirst({
      where: {
        name,
      },
    });

    if (memeNameExists) {
      return new Response("This Meme already exists", { status: 409 });
    }

    //Push the meme to the DB - session.user should also have id i think
    await db.meme.create({
      data: {
        name,
        url,
        creatorId: session.user.id,
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
