import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MemeType } from "@/lib/validators/meme";
import { Control } from "react-hook-form";

interface DescriptionFieldProps {
  control: Control<MemeType>;
}

const DescriptionField = ({ control }: DescriptionFieldProps) => {
  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Meme description</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Please add a short description about the meme"
              {...field}
            />
          </FormControl>
          {/* <FormDescription>
            Submit the name of the Meme
          </FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DescriptionField;
