import AppleMap from "@/components/game/AppleMap";

const Page = ({}) => {
  const token = process.env.MAPKIT_TOKEN;

  return (
    <div className=" h-full w-full">{token && <AppleMap token={token} />}</div>
  );
};

export default Page;
