const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response, next ) => {

    if(!req.headers.authorization) {
        return res.status(401).json({
            ok: false,
            msg: 'Ho hay token en la petición'
        })
    }

    // Leer el token
    const [,token] = req.headers.authorization.split(" ");

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token incorrecto'
        })
    }
}

module.exports = {
    validarJWT
}
