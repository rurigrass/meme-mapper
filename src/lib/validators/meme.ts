import { z } from "zod";
const MAX_FILE_SIZE = 500000;
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/webm",
];
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const MemeValidator = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(3, { message: "Name must be longer tan 3 characters" })
    .max(35, { message: "Name cant be longer tan 35 characters" }),
  description: z
    .string()
    .max(200, { message: "Description can't be longer than 200 characters" }),
  url: z
    .string()
    .trim()
    .min(3, { message: "url must be longer tan 3 characters" })
    .max(255)
    .url(),
  video: z
    // .custom<File>(
    //   (file) => file instanceof File,
    //   "Video or Image file is required"
    // )
    .custom<File>()
    .refine((file) => file !== undefined, "Video or Image file is required")
    .refine(
      (file) => file !== undefined && ACCEPTED_FILE_TYPES.includes(file.type),
      "only .jpg, .jpeg, .png and .mp4 files are accepted."
    )
    .or(z.string().length(0))
    .or(z.string().includes("https://res.cloudinary.com/")),
  // .refine(
  //   (files) => files?.[0]?.size <= MAX_FILE_SIZE,
  //   `Max file size is 5MB.`
  // )
  screenshot: z
    .custom<File>()
    .refine((file) => file !== undefined, "Screenshot of meme is required")
    .refine(
      (file) => file !== undefined && ACCEPTED_IMAGE_TYPES.includes(file.type),
      "only .jpg, .jpeg, .png images are accepted."
    )
    .or(z.string().length(0))
    .or(z.string().includes("https://res.cloudinary.com/")),
  latlng: z.object({
    lat: z
      .number()
      .min(0.0000001, { message: "Please submit a valid location" })
      .max(90, { message: "Please submit a valid location" })
      .or(
        z
          .number()
          .min(-90, {
            message: "Please submit a valid location",
          })
          .max(-0.0000001, {
            message: "Please submit a valid location",
          })
      ),
    lng: z
      .number()
      .min(0.0000001, { message: "Please submit a valid location" })
      .max(180, { message: "Please submit a valid location" })
      .or(
        z
          .number()
          .min(-180, {
            message: "Please submit a valid location",
          })
          .max(-0.0000001, {
            message: "Please submit a valid location",
          })
      ),
  }),
  // lat: number(),
  // lng: number(),
  verified: z.boolean(),
});

export type MemeType = z.infer<typeof MemeValidator>;
