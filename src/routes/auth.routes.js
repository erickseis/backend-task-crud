//para definir las rutas
//donde vamos a hacer las peticiones "get, post, delete"
import { Router } from "express";
import { login, logout, profile, register } from "./../controllers/auth.controller.js"

import { autgRequire } from "./../middlewares/validateToken.js"
import { validateSchema } from "./../middlewares/validatorMiddleware.js"
import { registerSchema, loginSchema } from "../schemas/auth.schema.js"
const router = Router();

router.post('/register', validateSchema(registerSchema), register) //aqui validamos que el usuario tenga todo lo requerido q se definio en el middleware para la creacion de usuario

router.post('/login', validateSchema(loginSchema), login)

router.post('/logout', logout)

router.get('/profile', autgRequire, profile) // primero se ejecutara autgRequire y luego profile


export default router