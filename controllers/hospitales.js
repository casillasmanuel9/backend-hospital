const { request } = require('express');
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

const actualizarHospital = async (req = request, res = response) => {
    const { id } = req.params;
    const { uid } = req;
    try {
        const hospitalDB = Hospital.findById(id);
        if( !hospitalDB ) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encotrado'
            });
        }

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new: true});

        res.json({
            ok: true,
            msg: 'Hospital actualizado',
            hospital: hospitalActualizado
        });
    } catch (error) {
        res.json({
            ok: false,
            msg: 'Contacte al administrador'
        });
    }
}

const eliminarHospital = async (req, res = response) => {
    const { id } = req.params;
    try {
        const hospitalDB = Hospital.findById(id);
        if( !hospitalDB ) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encotrado'
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Hospital Eliminado'
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Contacte al administrador'
        });
    }
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}