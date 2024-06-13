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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

type AppleMapField = {
  control: Control<MemeType>;
  initCoordinates?: { lat: number | undefined; lng: number | undefined };
  updateCoordinates?: (
    lat: number | undefined,
    lng: number | undefined
  ) => void;
};

const AppleMapField = ({
  control,
  initCoordinates,
  updateCoordinates,
}: AppleMapField) => {
  const token = process.env.NEXT_PUBLIC_MAPKIT_TOKEN;
  const [showMap, setShowMap] = useState<boolean>(
    initCoordinates?.lat && initCoordinates?.lng ? true : false
  );

  useEffect(() => {
    if (!showMap) {
      updateCoordinates && updateCoordinates(undefined, undefined);
    }
  }, [showMap]);

  return (
    <FormField
      control={control}
      name="latlng"
      render={({ field }) => (
        <FormItem className="rounded-lg border p-4">
          <FormLabel>Meme Location</FormLabel>
          <div className="flex flex-row  justify-between">
            <FormDescription>
              Do you know where this meme is located?
            </FormDescription>
            <Switch
              id="showMap"
              checked={showMap}
              onCheckedChange={() => {
                setShowMap(!showMap);
                // updateCoordinates && updateCoordinates(undefined, undefined);
              }}
            />
          </div>
          {showMap && (
            <div className="flex flex-col space-y-3">
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
                  initCoordinates={initCoordinates}
                  updateCoordinates={updateCoordinates}
                />
              </div>
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    disabled
                    placeholder="lat"
                    value={field.value?.lat || ""}
                  />
                </FormControl>
                <FormControl>
                  <Input
                    disabled
                    placeholder="lng"
                    value={field.value?.lng || ""}
                  />
                </FormControl>
              </div>
            </div>
          )}
        </FormItem>
      )}
    />
  );
};

export default AppleMapField;
