import { z } from 'zod'
//de esta manera validamos los datos ingresados por el usuario q contengan lo necesario para ingresar

export const registerSchema = z.object({
    username: z.string({
        required_error: 'username is required'
    }),
    email: z.string({
        required_error: ' Email is required'
    }).email({
        message: "invalid email"
    }),
    password: z.string({
        required_error: ' password is required'
    }).min(6, {
        message: "password must be at least 6 characters"
    }),
})
export const loginSchema = z.object({
    email: z.string({
        required_error: ' Email is required'
    }).email({
        message: "invalid email"
    }),
    password: z.string({
        required_error: ' password is required'
    }).min(6, {
        message: "password must be at least 6 characters"
    }),
})