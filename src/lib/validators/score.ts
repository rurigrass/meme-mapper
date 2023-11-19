import { z } from "zod";

export const ScoreValidator = z.object({
  // id: z.string().optional(),
  memeId: z.string(),
  score: z.number(),
});

export type ScoreType = z.infer<typeof ScoreValidator>;
