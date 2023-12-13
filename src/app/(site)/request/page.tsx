import MemeForm from "@/components/admin/MemeForm";

interface PageProps {
  params: {
    memeId: string;
  };
}

const Page = () => {
  // make sure there is auth
  const token = process.env.NEXT_PUBLIC_MAPKIT_TOKEN;

  return (
    <div className="py-4">
      <MemeForm formType="request" />
    </div>
  );
};

export default Page;
