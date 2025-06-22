import { deleteData } from "@/api/services/deleteData";
import { ID } from "@/types";
import { useMutation } from "@tanstack/react-query";

export const useDeleteData = (url: string) => {
    return useMutation<void, Error, { id: ID }>({
        mutationFn: ({ id }) => deleteData(`${url}/delete/${id}`),
    });
};
