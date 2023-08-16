import { z } from "zod";
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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
  video: z.custom<File>(),
  // .refine((files) => files?.length == 1, "Image is required."),
  // .refine(
  //   (files) => files?.[0]?.size <= MAX_FILE_SIZE,
  //   `Max file size is 5MB.`
  // )
  // .refine(
  //   (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //   ".jpg, .jpeg, .png and .webp files are accepted."
  // ),
});

export type MemeType = z.infer<typeof MemeValidator>;
