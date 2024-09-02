import { Vote } from "@prisma/client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

type DetectiveMemeType = {
  id: string;
  name: string;
  fileUrl: string;
  screenshotUrl: string;
  votes: Vote[];
};

type ApiResponse = {
  totalDetectiveMemes: number;
  detectiveMemes: DetectiveMemeType[];
};

//THIS WAS FOR PAGINATION
// export const useDetectiveMemes = (page: number, per_page: number) => {
//   return useQuery<ApiResponse>({
//     queryKey: ["detectiveMemes", page, per_page],
//     queryFn: async () => {
//       const { data } = await axios.get(`/api/detective`, {
//         params: { page, per_page },
//       });
//       return data;
//     },
//   });
// };

export const useInfiniteDetectiveMemes = (per_page: number) => {
  return useInfiniteQuery({
    queryKey: ["infiniteDetectiveMemes"],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get<ApiResponse>(`/api/detective`, {
        params: { page: pageParam, per_page },
      });
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const maxPages = Math.ceil(lastPage.totalDetectiveMemes / per_page);
      const nextPage = allPages.length + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
  });
};
