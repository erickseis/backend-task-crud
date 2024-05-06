import express from "express"; /*para que node detecte esta sintaxis hay que modificar en el package.json un "type":module*/
//app.js tiene como finalidad arrancar el servidor o guardar su configuracion
import morgan from "morgan";
import cookieParser from "cookie-parser"; // cada vez q ve una cookie lo convierte en un json

import authRoutes from '../routes/auth.routes.js'
import taskRoutes from '../routes/tasks.routes.js'

import serverless from "serverless-http";
import router from "../routes/auth.routes.js";


const app = express();

app.use(morgan('dev'));
app.use(express.json()) // de esta manera estamos indicando que vamos a utoilizar el metodo json desde express para visualizar lo que pasamos a nuestra base de datos en la terminal con los metodos y convertir los req.body a formato json
app.use(cookieParser())

app.use("/api", authRoutes); // de esta manera especificamos que queremos todas las rutas comiencen con "/api" , ejemplo http://localhost:3000/api
app.use("/api", taskRoutes);

app.use('/.netlify/functions/server', router);
export const handler = serverless(app)
export default app;