import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import DetectiveGuess from "./DetectiveGuess";
import DetectiveGuessCreate from "./DetectiveGuessCreate";

type DetectiveGuessesTypes = {
  memeId: string;
};

const DetectiveGuesses = async ({ memeId }: DetectiveGuessesTypes) => {
  const session = await getAuthSession();

  const guesses = await db.guess.findMany({
    where: {
      memeId: memeId,
      replyTo: null,
    },
    include: {
      detective: true,
      //votes
      replies: {
        include: {
          detective: true,
          //votes
        },
      },
    },
  });

  return (
    <div className="h-full flex flex-col gap-y-4 ">
      <DetectiveGuessCreate />

      <div className="flex flex-col gap-y-6">
        {guesses
          .filter((guess) => !guess.replyToId)
          .map((topLevelGuess) => {
            // const topLevelGuessVotesAmount = topLevelGuess.votes.reduce(
            //   (acc, vote) => {
            //     if (vote.type === "UP") return acc + 1;
            //     if (vote.type === "DOWN") return acc - 1;
            //     return acc;
            //   },
            //   0
            // );
            // const topLevelGuessVote = topLevelGuess.votes.find(
            //   (vote) => vote.userId === session?.user.id
            // );

            return (
              <div key={topLevelGuess.id} className="flex flex-col">
                <div className="mb-2">
                  <DetectiveGuess guess={topLevelGuess} />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DetectiveGuesses;
