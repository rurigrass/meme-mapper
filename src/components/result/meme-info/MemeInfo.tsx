import { memeType } from "@/lib/types";
import DescriptionImage from "./DescriptionImage";

type MemeProps = {
  meme: memeType;
};

const MemeInfo = ({ meme }: MemeProps) => {
  return (
    <div className="flex h-full">
      <DescriptionImage
        imageUrl={meme.screenshotUrl ? meme.screenshotUrl : meme.fileUrl}
      />
      <div>here is text</div>
    </div>
  );
};

export default MemeInfo;
