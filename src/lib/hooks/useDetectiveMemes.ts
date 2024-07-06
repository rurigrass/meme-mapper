import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type DetectiveMemesType = {
  id: string;
  name: string;
};

type ApiResponse = {
  totalDetectiveMemes: number;
  detectiveMemes: DetectiveMemesType[];
};

export const useDetectiveMemes = (page: number, per_page: number) => {
  return useQuery<ApiResponse>({
    queryKey: ["detectiveMemes", page, per_page],
    queryFn: async () => {
      const { data } = await axios.get(`/api/detective`, {
        params: { page, per_page },
      });
      return data;
    },
  });
};
