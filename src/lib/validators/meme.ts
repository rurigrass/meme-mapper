import { z } from "zod";

export const MemeValidator = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be longer tan 3 characters" })
    .max(35),
  url: z
    .string()
    .trim()
    .min(3, { message: "url must be longer tan 3 characters" })
    .max(255)
    .url(),
  video: z.string(),
});

export type MemeType = z.infer<typeof MemeValidator>;
