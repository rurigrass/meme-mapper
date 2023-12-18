import Image from "next/image";

interface DescriptionImageProps {
  imageUrl: string;
}

const DescriptionImage = ({ imageUrl }: DescriptionImageProps) => {
  return (
    <div className="relative h-full w-full rounded-md ">
      <Image
        src={imageUrl}
        alt="image"
        fill
        quality={100}
        style={{
          padding: ".5rem",
          overflow: "hidden",
          borderRadius: "1rem",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default DescriptionImage;
