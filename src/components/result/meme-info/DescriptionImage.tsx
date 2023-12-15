interface DescriptionImageProps {
  imageUrl: string;
}

const DescriptionImage = ({ imageUrl }: DescriptionImageProps) => {
  console.log(imageUrl);

  return <div>MemeImage</div>;
};

export default DescriptionImage;
