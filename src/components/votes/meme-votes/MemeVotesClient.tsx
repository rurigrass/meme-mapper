"use client";
import { Button } from "@/components/ui/button";
import { useCustomToast } from "@/components/ui/use-custom-toast";
import { toast } from "@/components/ui/use-toast";
import { usePrevious } from "@/lib/hooks/usePrevious";
import { cn } from "@/lib/utils";
import { MemeVoteRequest } from "@/lib/validators/vote";
import { VoteType } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
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

  const { mutate: vote } = useMutation({
    mutationFn: async (voteType: VoteType) => {
      const payload: MemeVoteRequest = {
        memeId,
        voteType,
      };
      await axios.patch("/api/detective/meme/vote", payload);
    },
    onMutate: (voteType: VoteType) => {
      //THIS IS FOR OPTIMISTIC UPDATES
      if (currentVote === voteType) {
        //User is voting the same way so remove their vote
        setCurrentVote(undefined);
        if (voteType === "UP") setVotesAmount((prev) => prev - 1);
        else if (voteType === "DOWN") setVotesAmount((prev) => prev + 1);
      } else {
        //User is voting in the opposite direction so add/substract 2
        setCurrentVote(voteType);
        if (voteType === "UP")
          setVotesAmount((prev) => prev + (currentVote ? 2 : 1));
        else if (voteType === "DOWN")
          setVotesAmount((prev) => prev - (currentVote ? 2 : 1));
      }
    },
    onError: (error, voteType) => {
      if (voteType === "UP") setVotesAmount((prev) => prev - 1);
      else setVotesAmount((prev) => prev + 1);
      // reset current vote
      setCurrentVote(previousVote);

      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return loginToast();
        }
      }

      return toast({
        title: "Something went wrong.",
        description: "Your vote was not registered. Please try again later.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="flex sm:flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0">
      <Button
        onClick={() => vote("UP")}
        size="sm"
        variant="ghost"
        aria-label="upvote"
      >
        <ArrowBigUp
          className={cn("h-5 w-5 text-zinc-700", {
            " text-emerald-500 fill-emerald-500": currentVote === "UP",
          })}
        />
      </Button>
      <p className=" text-center py-2 font-medium text-sm text-zinc-900">
        {votesAmount}
      </p>
      <Button
        onClick={() => vote("DOWN")}
        size="sm"
        variant="ghost"
        aria-label="upvote"
      >
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
