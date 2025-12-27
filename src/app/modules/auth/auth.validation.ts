import { z } from 'zod';

const register = z.object({
    body: z.object({
        name: z.string(),
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
    }),
});

const login = z.object({
    body: z.object({
        email: z.string().email('Invalid email address'),
        password: z.string(),
    }),
});

export const AuthValidation = {
    register,
    login,
};
