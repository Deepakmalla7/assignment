import z from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "Enter a valid email" }),
    password: z.string().min(6, { message: "Minimum 6 characters" }),
});

export type LoginData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    firstName: z.string().min(2, { message: "Enter your first name" }),
    lastName: z.string().min(2, { message: "Enter your last name" }),
    username: z.string().min(3, { message: "Minimum 3 characters" }),
    email: z.email({ message: "Enter a valid email" }),
    password: z.string().min(6, { message: "Minimum 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Minimum 6 characters" }),
}).refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type RegisterData = z.infer<typeof registerSchema>;