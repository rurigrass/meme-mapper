import { memeType } from "@/lib/types";
import DescriptionImage from "./DescriptionImage";

type MemeProps = {
  meme: memeType;
};

const MemeInfo = ({ meme }: MemeProps) => {
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

export default MemeInfo;
