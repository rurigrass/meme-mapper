import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MemeType } from "@/lib/validators/meme";
import { Control } from "react-hook-form";

interface NameFieldProps {
  control: Control<MemeType>;
}

const NameField = ({ control }: NameFieldProps) => {
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Meme name</FormLabel>
          <FormControl>
            <Input placeholder="Enter the name of the meme" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default NameField;
