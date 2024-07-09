import Image from "next/image";
import Link from "next/link";

type DetectiveMemeType = {
  id: string;
  name: string;
  fileUrl: string;
  screenshotUrl: string;
};

const DetectiveMeme = ({ meme }: { meme: DetectiveMemeType }) => {
  const { name, fileUrl, screenshotUrl } = meme;
  //USE SCREENSHOT IF FILE IS VIDEO
  let image = fileUrl.includes("/video") ? screenshotUrl : fileUrl;

  return (
    <Link
      className="flex border-2 rounded-lg shadow-sm bg-card overflow-hidden m-2 w-full lg:w-[600px] max-w-full"
      href={`/detective/${meme.id}`}
    >
      <div className="relative h-[200px] w-[200px] sm:h-[300px] sm:w-[300px]">
        <Image
          alt={image}
          src={image}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="p-2 text-center"> {name}</div>
    </Link>
  );
};

export default DetectiveMeme;
