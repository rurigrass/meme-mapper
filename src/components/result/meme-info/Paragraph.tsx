"use client";
import { motion } from "framer-motion";

interface ParagraphProps {
  text: string;
}

const Paragraph = ({ text }: ParagraphProps) => {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.05 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        opacity: { duration: 0.4 },
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 10,
      transition: {
        // type: "easein",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className="font-extrabold text-2xl lg:text-3xl py-3 md:py-5 px-1.5 md:px-3 flex flex-wrap"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span variants={child} className="mr-1" key={index}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default Paragraph;
