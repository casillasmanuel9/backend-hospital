const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const fs = require('fs');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

const actualizarImagen = (tipo, id, nombreArchivo) => {
    console.log(tipo, id, nombreArchivo);
    return new Promise(async (resolve, reject) => {
        switch (tipo) {
            case 'medicos': {
                try {
                    const medico = await Medico.findById(id);
                    if (!medico) {
                        return reject('No es un medico por id');
                    }

                    const pathViejo = `./uploads/medicos/${medico.img}`;
                    borrarImagen(pathViejo);

                    medico.img = nombreArchivo;

                    await medico.save();
                    return resolve('medico actualizado con éxito');
                } catch (error) {
                    return reject('No se pudo actualizar el medico');
                }
            }
            case 'usuarios': {
                try {
                    const usuario = await Usuario.findById(id);
                    console.log(usuario);
                    if (!usuario) {
                        return reject('No es un usuario por id');
                    }

                    const pathViejo = `./uploads/usuarios/${usuario.img}`;
                    borrarImagen(pathViejo);

                    usuario.img = nombreArchivo;

                    await usuario.save();
                    return resolve('usuario actualizado con éxito');
                } catch (error) {
                    return reject('No se pudo actualizar el usuario');
                }
            }
            case 'hospitales': {
                try {
                    const hospital = await Hospital.findById(id);
                    if (!hospital) {
                        return reject('No es un hospital por id');
                    }

                    const pathViejo = `./uploads/hospitales/${hospital.img}`;
                    borrarImagen(pathViejo);

                    hospital.img = nombreArchivo;

                    await hospital.save();
                    return resolve('hospital actualizado con éxito');
                } catch (error) {
                    return reject('No se pudo actualizar el hospital');
                }
            }

            default:
                return reject('Tipo no valido');
        }
    });
}

module.exports = {
    actualizarImagen
}