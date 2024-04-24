//los middlewares son funciones que se ejecutan antes de una ruta
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from '../config.js'


export const autgRequire = (req, res, next) => {

    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: 'no token, authorization denied' });

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "invalid token" });

        req.user = user// es la peticion q llega y lo guardo alli

        next()

    })

}