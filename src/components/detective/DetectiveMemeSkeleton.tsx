import { Skeleton } from "../ui/skeleton";

const DetectiveMemeSkeleton = () => {
  return (
    <div className="flex border-2 rounded-lg shadow-sm bg-card overflow-hidden m-2 w-full lg:w-[600px] max-w-full">
      <Skeleton className="h-[200px] w-[200px] sm:h-[300px] sm:w-[300px]" />
      <div className="flex flex-1 p-3 justify-center">
        <Skeleton className="h-8 w-[80%] rounded-xl" />
      </div>
    </div>
  );
};

export default DetectiveMemeSkeleton;
