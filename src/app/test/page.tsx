import Paragraph from "@/components/test/Paragraph";

const paragraph =
  "A web animation tutorial featuring a gradient text scroll opacity effect using Nextjs";

const page = ({}) => {
  return (
    // <div className="h-full md:container mx-2 grid grid-cols-1 lg:grid-cols-5  lg:grid-rows-2 gap-3 mb-2 ">
    //   <div className=" bg-green-500 rounded-md lg:row-span-2 lg:col-span-2">
    //     left
    //   </div>
    //   <div className=" bg-orange-500 rounded-md lg:col-span-3">right</div>
    //   <div className=" bg-purple-500 rounded-md col-span-2">right</div>
    //   <div className="hidden lg:block bg-blue-500 rounded-md">right</div>
    // </div>
    <div className="h-full bg-orange-500 rounded-md mb-1.5 mx-1.5">
      <Paragraph text={paragraph} />
    </div>
  );
};

export default page;
