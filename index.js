const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Creacion del servidor de express
const app = express();
app.use(cors); 

// Base de datos
dbConnection();

// Rutas
app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        msg: 'Hola Mundo'
    })
});

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ', process.env.PORT);
});