import { fetchData } from "@/api/services/fetchData";
import { useQuery } from "@tanstack/react-query";

export const useFetchData = <T>(key: string, url: string) => {
  return useQuery<T>({
    queryKey: [key],
    queryFn: () => fetchData<T>(url),
  });
};
