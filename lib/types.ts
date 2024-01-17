import { z } from 'zod';

//regek untuk pola password harus minimal 1 huruf kapital, dan 1 angka
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)/;

export const signUpSchema = z
   .object({
      email: z.string().email(),
      password: z
         .string()
         .min(10, 'Password must be at least 10 characters')
         .refine(
            (value) => {
               return passwordRegex.test(value);
            },
            {
               message:
                  'The password must have at least one capital letter and one number',
            }
         ),
      confirmPassword: z.string(),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: 'Password must match',
      path: ['confirmPassword'],
   });

export type TSignUpSchema = z.infer<typeof signUpSchema>;
