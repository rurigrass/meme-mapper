import MemeForm from "@/components/admin/MemeForm";

interface PageProps {
  params: {
    memeId: string;
  };
}

const Page = () => {
  // make sure there is auth
  //   if (!meme) return notFound();

  return <MemeForm formType="request" />;
};

export default Page;
