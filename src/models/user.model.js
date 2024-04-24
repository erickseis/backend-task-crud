// es una forma de especificar como lucen los datos que estamos guardando
//crea una tabla para nuestro mongodb

import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({ // esto es el esquema de nuestra base de datos
    username: {
        type: String,
        require: true,
        trim: true, // esto lo que hace es limpiar el texto y quitar los espacios
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true, // esto indica que cada email guardado debe ser unico
    },
    password: {
        type: String,
        require: true,
        trim: true,
    }
}, {
    timestamps: true // esto sirve para registrar la hora en la que se creo el usuario
}) // esta estrucura es para definir

export default mongoose.model('User', userSchema) // esto es para decir que va a interactuar con la base de datos y sus metodos
// el modelo dice como guardo mis datos en la base y creara una coleccion de usuario con esta estructura para que podamos hacer consultas