const { response } = require('express');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async (req, res = response) => {
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');
    try {
        const [ usuarios, medicos, hospitales ] = await Promise.all([
            Usuario.find({nombre: regex}),
            Medico.find({nombre: regex}),
            Hospital.find({nombre: regex}),
        ]);
        return res.json({
            ok: true,
            usuarios,
            medicos, 
            hospitales
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error'
        });
    }
}

const getDocumentosCollection = async (req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    try {
        let data = [];
        switch (tabla) {
            case 'usuarios':
                data = await Usuario.find({nombre: regex});
                break;
            case 'hospitales':
                data = await Hospital.find({nombre: regex}).populate('usuario', 'nombre img');
                break;
            case 'medicos':
                data = await Medico.find({nombre: regex}).populate('usuario', 'nombre img').populate('hospital', 'nombre');
                break;
        
            default:
                return res.json(404).json({
                    ok: false,
                    msg: 'La tabla debe ser usuarios/hospitales/medicos'
                })
        }

    
        return res.json({
            ok: true,
            resultados: data
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error'
        });
    }
}

module.exports = {
    getTodo,
    getDocumentosCollection
}
