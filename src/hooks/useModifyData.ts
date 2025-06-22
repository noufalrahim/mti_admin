import { editData } from "@/api/services/updateData";
import { ID } from "@/types";
import { useMutation } from "@tanstack/react-query";

type WithId = { id: ID};

export const useModifyData = <T extends WithId>(baseUrl: string) => {
  return useMutation<T, Error, T>({
    mutationFn: (data) => editData<T>(`${baseUrl}/update/${data.id}`, data),
  });
};
