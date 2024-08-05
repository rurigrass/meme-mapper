"use client";
import { Button } from "@/components/ui/button";
import { useCustomToast } from "@/components/ui/use-custom-toast";
import { usePrevious } from "@/lib/hooks/usePrevious";
import { cn } from "@/lib/utils";
import { VoteType } from "@prisma/client";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useEffect, useState } from "react";

type MemeVotesClientProps = {
  memeId: string;
  initialVotesAmount: number;
  initialVote?: VoteType | null;
};

const MemeVotesClient = ({
  memeId,
  initialVotesAmount,
  initialVote,
}: MemeVotesClientProps) => {
  const { loginToast } = useCustomToast();
  const [votesAmount, setVotesAmount] = useState<number>(initialVotesAmount);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const previousVote = usePrevious(currentVote);

  useEffect(() => {
    //run this just to ensure currentvote matches initial vote on first load
    setCurrentVote(initialVote);
  }, [initialVote]);

  return (
    <div className="flex sm:flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0">
      <Button size="sm" variant="ghost" aria-label="upvote">
        <ArrowBigUp
          className={cn("h-5 w-5 text-zinc-700", {
            " text-emerald-500 fill-emerald-500": currentVote === "UP",
          })}
        />
      </Button>
      <p className=" text-center py-2 font-medium text-sm text-zinc-900">
        {votesAmount}
      </p>
      <Button size="sm" variant="ghost" aria-label="upvote">
        <ArrowBigDown
          className={cn("h-5 w-5 text-zinc-700", {
            " text-red-500 fill-red-500": currentVote === "DOWN",
          })}
        />
      </Button>
    </div>
  );
};

export default MemeVotesClient;
