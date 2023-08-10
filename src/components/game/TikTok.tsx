"use client";
import { useEffect, useRef, useState } from "react";

interface TikTokProps {}

const TikTok = ({}) => {
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setReload((prevReload) => !prevReload);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <iframe
      // src={src}
      src="https://www.tiktok.com/embed/7245661854192733466"
      className="h-screen"
      allow="encrypted-media;"
      //   key={reload} // Key change triggers component re-render
      key={reload.toString()}
    />
  );
};

export default TikTok;
