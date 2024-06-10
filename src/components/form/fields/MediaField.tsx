import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MemeType } from "@/lib/validators/meme";
import { Control } from "react-hook-form";
import Image from "next/image";
import { memeType } from "@/lib/types";
import { X } from "lucide-react";

type MediaFieldProps = {
  control: Control<MemeType>;
  meme?: memeType | undefined;
  preview?: string | ArrayBuffer | null;
  setPreview?: (preview: string | ArrayBuffer | null) => void;
  handleOnChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const MediaField = ({
  control,
  meme,
  preview,
  setPreview,
  handleOnChange,
}: MediaFieldProps) => {
  return (
    <FormField
      control={control}
      name="video"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Meme file</FormLabel>
          <FormControl>
            <Input
              id="video"
              type="file"
              className="hover:cursor-pointer"
              placeholder="Select a video file"
              accept="image/png, image/jpg, image/jpeg, video/mp4"
              onChange={(e) => {
                field.onChange(e.target.files && e.target.files[0]),
                  handleOnChange(e);
              }}
            />
          </FormControl>
          {/* A remove button here could be good but not essential */}
          <div className="mt-5 flex justify-center">
            {preview ? (
              <div className="relative">
                <div className="absolute top-2 right-2 z-10">
                  <Button
                    onClick={() => {
                      setPreview?.(null), field.onChange(meme?.fileUrl);
                    }}
                    className="h-6 w-6 p-0 rounded-md "
                    //   variant="subtle"
                    aria-label="close modal"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {preview?.toString().startsWith("data:image") ? (
                  <Image
                    src={preview as string}
                    alt="Upload preview"
                    className="rounded-md"
                    height={300}
                    width={300}
                  />
                ) : (
                  <video
                    width="320"
                    height="240"
                    controls
                    className="rounded-md"
                  >
                    <source src={preview as string} type="video/mp4" />
                  </video>
                )}
              </div>
            ) : (
              <>
                {meme?.fileUrl.includes("/image") && (
                  <Image
                    src={meme?.fileUrl}
                    alt="Upload preview"
                    className="rounded-md"
                    height={300}
                    width={300}
                  />
                )}
                {meme?.fileUrl.includes("/video") && (
                  <video
                    width="320"
                    height="240"
                    controls
                    className="rounded-md"
                  >
                    <source src={meme?.fileUrl} type="video/mp4" />
                  </video>
                )}
              </>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MediaField;
