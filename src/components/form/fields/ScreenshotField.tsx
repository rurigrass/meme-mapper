import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { memeType } from "@/lib/types";
import { MemeType } from "@/lib/validators/meme";
import { X } from "lucide-react";
import Image from "next/image";
import { Control } from "react-hook-form";

type ScreenshotFieldProps = {
  control: Control<MemeType>;
  meme?: memeType | undefined;
  screenshotPreview?: string | ArrayBuffer | null;
  setScreenshotPreview?: (preview: string | ArrayBuffer | null) => void;
  handleScreenshotChange: (e: React.FormEvent<HTMLInputElement>) => void;
};

const ScreenshotField = ({
  control,
  meme,
  screenshotPreview,
  setScreenshotPreview,
  handleScreenshotChange,
}: ScreenshotFieldProps) => {
  return (
    <FormField
      control={control}
      name="screenshot"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Meme Screenshot</FormLabel>
          <FormControl>
            <Input
              id="screenshotUrl"
              type="file"
              placeholder="Select an image file"
              accept="image/png, image/jpg, image/jpeg"
              className="hover:cursor-pointer"
              onChange={(e) => {
                field.onChange(e.target.files && e.target.files[0]),
                  handleScreenshotChange(e);
              }}
            />
          </FormControl>

          {/* SCREENSHOTPREVIEW -- SHOULD ONLY APPEAR IF MEMEFILE IS AN IMAGE */}
          <div className="mt-5 flex justify-center">
            {screenshotPreview ? (
              <div className="relative">
                <div className="absolute top-2 right-2 z-10">
                  <Button
                    onClick={() => {
                      setScreenshotPreview?.(null),
                        field.onChange(meme?.fileUrl);
                    }}
                    className="h-6 w-6 p-0 rounded-md "
                    //   variant="subtle"
                    aria-label="close modal"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <Image
                  src={screenshotPreview as string}
                  alt="Upload preview"
                  className="rounded-md"
                  height={300}
                  width={300}
                />
              </div>
            ) : (
              <>
                {
                  meme?.screenshotUrl?.includes("/image") && (
                    <Image
                      src={meme?.screenshotUrl}
                      alt="Upload preview"
                      className="rounded-md"
                      height={300}
                      width={300}
                    />
                  )
                  // : (<div>No Screenshot Found</div>)
                }
              </>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ScreenshotField;
