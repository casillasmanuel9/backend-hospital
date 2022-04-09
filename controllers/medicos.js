const { request } = require('express');
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

const actualizarMedico = async (req = request, res = response) => {

    const { uid } = req;
    const { id } = req.params;
    try {

        const medicoDB = await Medico.findById(id);
        if (!medicoDB) {
            return res.json(404).json({
                ok: true,
                msg: 'Medico no encontrado'
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, { new: true });
        return res.status(201).json({
            ok: true,
            medico: medicoActualizado
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });
    }
}

const eliminarMedico = async (req, res = response) => {

    const { id } = req.params;
    try {
        const medicoDB = await Medico.findById(id);

        if (!medicoDB) {
            return res.json(404).json({
                ok: true,
                msg: 'Medico no encontrado'
            })
        }

        await Medico.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Medico Eliminado'
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'Contacte al administrador'
        });
    }
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