"use client";

import MemeForm from "@/components/admin/MemeForm";
import { getAuthSession } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";
import { useCustomToast } from "@/components/ui/use-custom-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

interface PageProps {
  params: {
    memeId: string;
  };
}

const Page = () => {
  const { data: session } = useSession();
  const { loginToast } = useCustomToast();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      loginToast("You need to log in to submit a meme");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  }, [session, loginToast, router]);

  if (!session) {
    return (
      <div className="h-full flex items-center justify-center font-extrabold text-5xl">
        you need to log in
      </div>
    );
  } else {
    return (
      <div className="py-4">{session && <MemeForm formType="request" />}</div>
    );
  }
};

export default Page;
