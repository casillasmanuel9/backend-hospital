const { Router } = require('express');
const { validarJWT } = require('../middlewares/vallidat-jwt');
const { getTodo, getDocumentosCollection } = require('../controllers/todo');

const router = Router();


router.get('/:busqueda', validarJWT, getTodo);
router.get('/collection/:tabla/:busqueda', validarJWT, getDocumentosCollection);

module.exports = router;
