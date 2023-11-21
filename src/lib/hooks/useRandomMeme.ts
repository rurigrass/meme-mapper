import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useRandomMeme = (memeId: string) => {
  return useQuery({
    queryKey: ["randomMeme", memeId],
    queryFn: async () => {
      const { data } = await axios.get(`/api/game/random`, {
        params: { memeId }, // Pass memeId as a query parameter
      });
      return data as string;
    },
  });
};
