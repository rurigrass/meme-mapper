import { z } from "zod";

export const ScoreValidator = z.object({
  score: z.number(),
});

export type ScoreType = z.infer<typeof ScoreValidator>;
