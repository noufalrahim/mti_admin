import { z } from "zod"

export const categoryFormSchema = z.object({
    name: z.string().min(2, { message: "Question in English is required" }),

});
