import { memeType } from "@/lib/types";
import DescriptionImage from "./DescriptionImage";
import Paragraph from "@/components/result/meme-info/Paragraph";

type MemeProps = {
  meme: memeType;
};

const MemeInfo = ({ meme }: MemeProps) => {
  return (
    <div className="grid grid-cols-2 h-full">
      <DescriptionImage
        imageUrl={meme.screenshotUrl ? meme.screenshotUrl : meme.fileUrl}
      />
      <div>
        <Paragraph text={meme.description ? meme.description : ""} />
      </div>
    </div>
  );
};

export default MemeInfo;
