import { z } from "zod"

export const milestoneFormSchema = z.object({
    question: z.string().min(2, { message: "Question in English is required" }),
    milestone: z.string().min(2, { message: "Milestone is required" })

});
