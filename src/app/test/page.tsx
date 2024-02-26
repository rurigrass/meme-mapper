"use client";

import LoadingScreen from "@/components/canvas/LoadingScreen";
import { useState } from "react";

const Page = ({}) => {
  const [loadingEnded, setLoadingEnded] = useState<boolean>(false);
  return (
    <LoadingScreen
      loadingEnded={loadingEnded}
      setLoadingEnded={setLoadingEnded}
    />
  );
};

export default Page;
