//index.js tiene como finalidad arrancar la app
import app from '../src/functions/app.js' //como dato cuando importamos un componente propio debos agregar la extension ".js" sino dara error
import { connectDB } from './db.js'

connectDB(); // inicia primero conexion a base de datos
app.listen(4000) // luego inicia el servidor
console.log('Server on port', 4000)