import AppleMap from "@/components/game/AppleMap";

const Page = ({}) => {
  const token = process.env.MAPKIT_TOKEN;

  return <div className="h-80 w-80">{token && <AppleMap token={token} />}</div>;
};

export default Page;
