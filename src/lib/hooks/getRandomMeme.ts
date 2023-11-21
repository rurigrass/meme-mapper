import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getRandomMeme = () => {
  return useQuery({
    queryKey: ["randomMeme"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/game/random`);
      return data as string;
    },
  });
};
