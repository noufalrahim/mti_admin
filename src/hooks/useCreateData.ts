import { createData } from "@/api/services/createData";
import { useMutation } from "@tanstack/react-query";

export const useCreateData = <T>(url: string) => {
    return useMutation<T, Error, T>({
        mutationFn: (data) => createData<T>(url, data),
    });
};