import { memeType } from "@/lib/types";
import DescriptionImage from "./DescriptionImage";
import Paragraph from "@/components/result/meme-info/Paragraph";
import { motion } from "framer-motion";

type MemeProps = {
  meme: memeType;
};

const perspective = {
  initial: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { delay: 0.5 * 0.1 },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
    },
  },
};

const MemeInfo = ({ meme }: MemeProps) => {
  return (
    <motion.div
      className="grid grid-rows-2 md:grid-rows-none md:grid-cols-2 h-full"
      variants={perspective}
      animate="enter"
      exit="exit"
      initial="initial"
    >
      <DescriptionImage
        imageUrl={meme.screenshotUrl ? meme.screenshotUrl : meme.fileUrl}
      />
      <div>
        <Paragraph text={meme.description ? meme.description : ""} />
      </div>
    </motion.div>
  );
};

export default MemeInfo;
