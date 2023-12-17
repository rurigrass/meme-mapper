import Image from "next/image";

interface DescriptionImageProps {
  imageUrl: string;
}

const DescriptionImage = ({ imageUrl }: DescriptionImageProps) => {
  return (
    <div className="relative h-full w-[50%] rounded-md ">
      <Image
        src={imageUrl}
        alt="image"
        fill
        objectFit="cover"
        quality={100}
        style={{ padding: ".5rem", overflow: "hidden", borderRadius: "1rem" }}
      />
    </div>
  );
};

export default DescriptionImage;
