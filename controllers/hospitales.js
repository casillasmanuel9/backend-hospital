const { response } = require('express');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) => {

    try {
        const hospitales = await Hospital.find({}).populate('usuario', 'nombre img');
        return res.json({
            ok: true,
            hospitales
        });
    } catch (error) {
        return res.status(500).json({
            ok: true,
            msg: 'hable con el administrador'
        });   
    }
}

const crearHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({...req.body, usuario: uid});
    
    try {
        const hospitalDB = await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalDB
        })
    } catch (error) {
        console.log(error);
        return res.json(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }

    res.json({
        ok: true,
        msg: 'crearHospital'
    })
}

const actualizarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarHospital'
    })
}

const eliminarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'eliminarHospital'
    })
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}