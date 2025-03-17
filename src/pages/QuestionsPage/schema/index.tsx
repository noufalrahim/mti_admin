import { z } from "zod"

export const questionFormSchema = z.object({
    questionEnglish: z.string().min(2, { message: "Question in English is required" }),
    questionMalayalam: z.string(),
    ageGroup: z.string().min(1, { message: "Age group is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    severity: z.number().min(1, { message: "Severity must be at least 1" }).max(10, { message: "Severity cannot exceed 10" }),
});
