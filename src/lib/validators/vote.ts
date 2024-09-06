import { z } from "zod";

export const MemeVoteValidator = z.object({
  memeId: z.string(),
  voteType: z.enum(["UP", "DOWN"]),
});
export type MemeVoteRequest = z.infer<typeof MemeVoteValidator>;

export const CommentVoteValidator = z.object({
  commentId: z.string(),
  voteType: z.enum(["UP", "DOWN"]),
});
export type CommentVoteRequest = z.infer<typeof CommentVoteValidator>;
