import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full  w-full flex flex-col justify-center items-center">
      <div className=" text-[6vw]">Page Not Found</div>
      <br />
      <Link
        href="/"
        className=" text-[4vw] font-extrabold text-blue-800 hover:text-yellow-600"
      >
        Return Home
      </Link>
    </div>
  );
}
