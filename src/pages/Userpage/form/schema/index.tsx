import { z } from "zod";

export const userFormSchema = z.object({
    phone: z.string()
        .regex(/^[0-9]{10}$/, { message: "Phone number must be a valid 10-digit number" })
});
