import DescriptionImage from "./DescriptionImage";

type MemeProps = {
  meme: {
    createdAt: Date;
    creatorId: string | null; // Allow for null value
    fileUrl: string;
    screenshotUrl?: String;
    id: string;
    lat: number;
    lng: number;
    name: string;
    updatedAt: Date;
    url: string;
    verified: boolean;
  };
};

const Description = ({ meme }: MemeProps) => {
  return (
    <div>
      <div>
        <DescriptionImage
          imageUrl={meme.screenshotUrl ? meme.screenshotUrl : meme.fileUrl}
        />
      </div>
      <div>here is text</div>
    </div>
  );
};

export default Description;
