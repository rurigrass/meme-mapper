import MemeForm from "@/components/admin/MemeForm";

interface PageProps {
  params: {
    memeId: string;
  };
}

const Page = () => {
  // make sure there is auth

  return <MemeForm formType="request" />;
};

export default Page;
