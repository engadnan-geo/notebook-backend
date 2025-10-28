import z from 'zod';

export const createUserSchema = z.object({
name: z.string().min(2, 'Name must be at least 2 characters long'),
email:z.email({ message: "Invalid email address" }),
password: z
    .string()
    .min(6, { message: "password must be at least 6 characters" })
    .max(100, { message: "password must be 100 characters or fewer" }),

})