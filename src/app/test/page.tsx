import PointsBar from "@/components/game/PointsBar";

interface pageProps {}

const Page = ({}) => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <PointsBar points={4500} />
    </div>
  );
};

export default Page;