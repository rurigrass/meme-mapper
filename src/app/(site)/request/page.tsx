import MemeForm from "@/components/admin/MemeForm";
import { getAuthSession } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";
import { useCustomToast } from "@/components/ui/use-custom-toast";

interface PageProps {
  params: {
    memeId: string;
  };
}

const Page = async () => {
  // make sure there is auth
  const token = process.env.NEXT_PUBLIC_MAPKIT_TOKEN;
  const session = await getAuthSession();
  const { loginToast } = useCustomToast();

  if (!session) {
    return loginToast();
  } else {
    return (
      <div className="py-4">{session && <MemeForm formType="request" />}</div>
    );
  }
};

export default Page;
