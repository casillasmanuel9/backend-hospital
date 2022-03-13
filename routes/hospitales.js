const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/vallidat-jwt');
const { getHospitales, crearHospital, actualizarHospital, eliminarHospital } = require('../controllers/hospitales');

const router = Router();

router.get('/', validarJWT, getHospitales);
router.post('/', [ 
    validarJWT,
    check('nombre', 'El nombre del hospital es requerido').not().isEmpty(),
    validarCampos
], crearHospital);
router.put('/:id', [ validarJWT ], actualizarHospital);
router.delete('/:id', validarJWT, eliminarHospital);

module.exports = router;
