import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MemeType } from "@/lib/validators/meme";

import { Control } from "react-hook-form";

type UrlFieldProps = {
  control: Control<MemeType>;
};

const UrlField = ({ control }: UrlFieldProps) => {
  return (
    <FormField
      control={control}
      name="url"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Meme URL</FormLabel>
          <FormControl>
            <Input placeholder="URL" {...field} />
          </FormControl>
          <FormDescription>This is a link to the meme.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default UrlField;
