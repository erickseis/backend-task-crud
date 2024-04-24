//aqui definimos que hara cada ruta especificamente
import User from '../models/user.model.js' // importamos el modelo para crear nuevos usuarios
import bcrypt from 'bcryptjs'// para encryptar la contraseña
import { createdAccessToken } from '../libs/jwt.js'

export const register = async (req, res) => {
    const { username, email, password } = req.body // indicamos que es lo que vamos a estar recibiendo desde el metodo post
    //  console.log(req.body)
    // console.log(email, password, userName) // de esta manera recibimos desde el petodo post

    try {
        const passwordHash = await bcrypt.hash(password, 10) // de esta manera encryptamos la contraseña, donde 10 es el numero de caracteres que tendra la encriptacion
        const newUser = new User({
            username,
            email,
            password: passwordHash,
        }) // de esta manera vamos indicando que cuando creamos un nuevo usuario estaremos pasando estos valores

        const userSaved = await newUser.save() // para guardar los usuarios creados en nuestra base de datos
        const token = await createdAccessToken({ id_: userSaved._id })
        res.cookie('token', token); // aqui guardamos el token
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email, // de esta manera no nos regresa la contraseña para proteger aun mas la seguridad
            createdAt: userSaved.createdAt, // hora creado el usuario
            updatedAt: userSaved.updatedAt, // hora ultima actualizacion

        }) // aqui devuelve en json lo que hemos guardado anteriormente

        // res.json({
        //     message: "User created successfully", // generamos el mensaje que fue creado correctamente
        // })
        // guardamos el dato el timpo que dura el token

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const userFound = await User.findOne({ email }); // aqui buscamos si se encuentra el email que introducimos

        if (!userFound) return res.status(400).json({ message: "user not found" }); // en caso de no encontrar se nos envia este mensaje

        const isMatch = await bcrypt.compare(password, userFound.password) // comparamos el usuario que estamos introduciendo con el usuario encontrado en la constante userFound

        if (!isMatch) return res.status(400).json({ message: "incorrect password" })// en caso  de que la contraseña no coincida dara este error
        const token = await createdAccessToken({ id: userFound._id }); // del usuario encontrada vas a tomar el id y vas a crear un token con este id

        res.cookie('token', token); // aqui guardamos el token
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt, // aqui cambiamos de usuario creado a usuario encontrado

        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}
export const logout = async (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.sendStatus(200)

}
export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)

    if (!userFound) return res.status(400).json({ message: "invalid user" })

    res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,

    })



}

