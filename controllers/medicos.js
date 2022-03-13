const { response } = require('express');
const Medico = require('../models/medico');

const getMedicos = async (req, res = response) => {
    try {
        const medicos = await Medico.find({}).populate('usuario', 'nombre img').populate('hospital', 'nombre');
        return res.json({
            ok: true,
            medicos
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
}

const crearMedico = async (req, res = response) => {

    const { uid } = req;
    const medicoDB = new Medico({...req.body, usuario: uid});

    try {
        await medicoDB.save();
        return res.status(201).json({
            ok: true,
            medico: medicoDB
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });
    }
}

const actualizarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarMedico'
    })
}

const eliminarMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'eliminarMedico'
    })
}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}