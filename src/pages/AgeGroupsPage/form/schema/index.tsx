import { z } from "zod"

export const agegroupFormSchema = z.object({
    startAge: z.number().min(0).max(5),
    endAge: z.number().min(0).max(5),
});
