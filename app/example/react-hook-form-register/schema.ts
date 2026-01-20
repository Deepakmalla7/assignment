import z, { email } from "zod";


export const registerSchema = z.object({
    firstName:z.string().min(1,"First Name is required"),
    lastName:z.string().min(1,"Last Name is required"),
    age:z.coerce.number().min(18,"Age must be at least 18"),
    email:z.string().min(1,"email is required"),
    password:z.string().min(6,"password should be 6 chars"),
});

export type RegisterType = z.infer<typeof registerSchema>;