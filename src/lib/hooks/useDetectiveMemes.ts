import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useDetectiveMemes = (page: number, per_page: number) => {
  return useQuery({
    queryKey: ["detectiveMemes", page],
    queryFn: async () => {
      const { data } = await axios.get(`/api/detective`, {
        params: { page, per_page },
      });
      return data as string;
    },
  });
};
