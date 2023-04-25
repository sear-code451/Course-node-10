
// Requires
const { check } = require('express-validator');
const { Router } = require('express');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');


// Proceedings
const router = Router();

// Router

router.post('/login', [
    check( 'correo', 'the correo is mandatory' ).isEmail(),
    check( 'password', 'The password is neccessary' ).not().isEmpty(),
    validarCampos
], login );


module.exports = router;