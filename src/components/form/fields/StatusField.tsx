import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { MemeStatusTypes } from "@/lib/types";
import { MemeType } from "@/lib/validators/meme";
import { Control } from "react-hook-form";

type StatusFieldProps = {
  control: Control<MemeType>;
};

const StatusField = ({ control }: StatusFieldProps) => {
  return (
    <FormField
      control={control}
      name="status"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">Status</FormLabel>
            <FormDescription>
              Toggle on to verify meme location.
            </FormDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{field.value}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
              <DropdownMenuRadioGroup
                value={field.value}
                onValueChange={field.onChange}
              >
                <DropdownMenuRadioItem value={MemeStatusTypes.REJECTED}>
                  Rejected
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={MemeStatusTypes.PENDING}>
                  Pending
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={MemeStatusTypes.DETECTIVE}>
                  Detective
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value={MemeStatusTypes.APPROVED}>
                  Approved
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </FormItem>
      )}
    />
  );
};

export default StatusField;
