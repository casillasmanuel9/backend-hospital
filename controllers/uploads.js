const { request } = require("express");
const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/acutalizar-imagen");
const path = require('path');
const fs = require('fs');

const fileUpload = async (req = request, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidados = ['hospitales', 'medicos', 'usuarios'];
    if(!tiposValidados.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un medicos, usuarios u hospitales (tipo)'
        });
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        })
    }

    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];

    //Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if(!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });
    }

    // generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    // path
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // mover la imagen
    file.mv(path, async (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        try {
            await actualizarImagen( tipo, id, nombreArchivo );
            return res.json({
                ok: true,
                msg: 'archivo subido',
                nombreArchivo
            }); 

        } catch (error) {
            console.log(error);
            return res.json({
                ok: true,
                msg: 'error al actualizar imagen',
            });
        }
       
    });
}

const retornaImagen = ( req, res = response ) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImagen = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    console.log(pathImagen);
    // Imagen por defecto
    if (fs.existsSync(pathImagen)) {
        return res.sendFile( pathImagen );
    } else {
        const pathImagen = path.join(__dirname, `../uploads/no-img.jpg`);
        return res.sendFile( pathImagen );
    }

}


module.exports = {
    fileUpload,
    retornaImagen
}