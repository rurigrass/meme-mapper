import { z } from "zod";
const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "video/mp4",
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
  video: z
    .instanceof(File, { message: "Video or Image file is required" })
    .refine((file) => file !== undefined && file.size > 0, {
      message: "Video or Image file is required",
    })
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "only .jpg, .jpeg, .png and .mp4 files are accepted."
    ),
  // z.custom<File>().refine((file) => file.length !== 0, {
  //   message: "File is required",
  // }),
  // .refine(
  //   (files) => files?.[0]?.size <= MAX_FILE_SIZE,
  //   `Max file size is 5MB.`
  // )
});

export type MemeType = z.infer<typeof MemeValidator>;
