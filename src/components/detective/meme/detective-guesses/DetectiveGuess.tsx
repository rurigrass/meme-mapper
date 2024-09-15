"use client";
import { formatTimeToNow } from "@/lib/utils";
import { Guess, User } from "@prisma/client";
import { useRef } from "react";

type ExtendedGuess = Guess & {
  // votes
  detective: User;
};

type DetectiveGuessTypes = {
  guess: ExtendedGuess;
};

const DetectiveGuess = ({ guess }: DetectiveGuessTypes) => {
  const guessRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={guessRef} className="flex flex-col">
      {/* <div>you can add the user avatar or name here.</div> */}
      DetectiveGuess
      <div className="ml-2 flex items-center gap-x-2">
        <p className="text-sm font-medium text-gray-900">
          {guess.detective.username}
        </p>
        <p className="max-h-40 truncate text-xs text-zinc-500">
          {formatTimeToNow(new Date(guess.createdAt))}
        </p>
      </div>
      <p className="text-sm text-zinc-900 mt-2">{guess.text}</p>
    </div>
  );
};

export default DetectiveGuess;
