import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MemeType } from "@/lib/validators/meme";
import { Control } from "react-hook-form";
import AppleMapRequest from "../AppleMapRequest";
import { memeType } from "@/lib/types";
import { Input } from "@/components/ui/input";

type AppleMapField = {
  control: Control<MemeType>;
  meme?: memeType;
  updateCoordinates?: (lat: number, lng: number) => void;
};

const AppleMapField = ({ control, meme, updateCoordinates }: AppleMapField) => {
  const token = process.env.NEXT_PUBLIC_MAPKIT_TOKEN;

  return (
    <FormField
      control={control}
      name="latlng"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Meme Location</FormLabel>
          <FormDescription>
            Please pin the location of the meme on the map
          </FormDescription>
          <div className=" w-full h-52 rounded-md overflow-hidden cursor-crosshair">
            {/* <Map
                initCoordinates={{ lat: meme?.lat, lng: meme?.lng }}
                updateCoordinates={(lat: number, lng: number) =>
                  form.setValue("latlng", { lat, lng })
                }
              /> */}
            <AppleMapRequest
              token={token as string}
              initCoordinates={{ lat: meme?.lat, lng: meme?.lng }}
              //   updateCoordinates={(lat: number, lng: number) =>
              //     form.setValue("latlng", { lat, lng })
              //   }
              updateCoordinates={updateCoordinates}
            />
          </div>
          <div className="flex gap-2">
            <FormControl>
              <Input disabled placeholder="lat" value={field.value.lat} />
            </FormControl>
            <FormControl>
              <Input disabled placeholder="lng" value={field.value.lng} />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AppleMapField;
