import Link from "next/link";
import { toast } from "./use-toast";
import { buttonVariants } from "@/components/ui/button";

export const useCustomToast = () => {
  const loginToast = (message?: string) => {
    let description;

    message
      ? (description = message)
      : (description = "You need to be logged in to do that.");

    const { dismiss } = toast({
      title: "Login required.",
      description: description,
      variant: "destructive",
      action: (
        <Link
          href="/login"
          onClick={() => dismiss}
          className={buttonVariants({ variant: "outline" })}
        >
          Login
        </Link>
      ),
    });
  };
  return { loginToast };
};
