import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { MemeVoteValidator } from "@/lib/validators/vote";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { memeId, voteType } = MemeVoteValidator.parse(body);
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    //check if user has already voted on this post
    const existingVote = await db.vote.findFirst({
      where: {
        voterId: session.user.id,
        memeId,
      },
    });

    //This is just checking the meme with that id exists
    const meme = await db.meme.findUnique({
      where: {
        id: memeId,
      },
    });

    if (!meme) {
      return new Response("Meme not found", { status: 404 });
    }

    if (existingVote) {
      if (existingVote.type === voteType) {
        //if the vote type is the same as the existing vote, delete the vote.
        //this finds the vote and deletes it
        await db.vote.delete({
          where: {
            voterId_memeId: {
              memeId,
              voterId: session.user.id,
            },
          },
        });
        return new Response("OK");
      }

      // if vote type is different from the existing vote, update the vote
      await db.vote.update({
        where: {
          voterId_memeId: {
            memeId,
            voterId: session.user.id,
          },
        },
        data: {
          type: voteType,
        },
      });

      return new Response("OK");
    }

    // if no existing vote, create a new vote
    await db.vote.create({
      data: {
        memeId,
        voterId: session.user.id,
        type: voteType,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not register vote at this time, please try again later",
      { status: 500 }
    );
  }
}
