import AppleResultMap from "@/components/result/AppleResultMap";
import { haversineDistance } from "@/lib/utils";

const page = ({}) => {
  return (
    <div className="h-full mx-3">
      <div className="h-[90%] grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-3 ">
        <div className=" bg-green-500 rounded-md lg:row-span-2">left</div>
        <div className=" bg-orange-500 rounded-md lg:col-span-2">right</div>
        <div className=" bg-purple-500 rounded-md">right</div>
        <div className="hidden lg:block bg-blue-500 rounded-md">right</div>
      </div>
      <div className="h-[10%] ">
        <div className="bg-gray-500 rounded-md w-full h-full my-3">final</div>
      </div>
    </div>
  );
};

export default page;
