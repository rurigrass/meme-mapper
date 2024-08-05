"use client";
import { VoteType } from "@prisma/client";

type MemeVoteClientProps = {
  memeId: string;
  initialVotesAmounts: number;
  initialVote?: VoteType | null;
};

const MemeVoteClient = ({}: MemeVoteClientProps) => {
  return <div>MemeVoteClient</div>;
};

export default MemeVoteClient;
