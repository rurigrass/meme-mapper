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

export const fetchDetectiveMemes = async ({
  pageParam,
  per_page,
}: {
  pageParam: number;
  per_page: number;
}) => {
  console.log("PAAGEPARAMMMM ", pageParam);

  // const per_page = 6; // Or set this dynamically
  const { data } = await axios.get<ApiResponse>(`/api/detective`, {
    params: { page: pageParam, per_page },
  });
  return data;
};
