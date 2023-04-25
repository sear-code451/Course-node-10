// Exportados
const { check } = require('express-validator');
const { Router } = require('express');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const { 
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
 } = require( '../middlewares' )

const { 
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
} = require('../helpers/db-validators');

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPath,
} = require('../controllers/usuarios');

// Enlaces
const router = Router();

router.get('/', usuariosGet );

router.put('/:id',
[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
]
, usuariosPut ),

router.post('/',
[

    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check( 'password', 'El password es obligatorio y más de 6 letras').isLength( { min: 6 } ),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol').custom( esRoleValido ),
    // NOTA: si no sabes que hace "esRoleValido", explicacion( markdown\esRoleValido.md )
    validarCampos

], usuariosPost );

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole( 'ADMIN_ROLE', 'VENTAS_ROLE' ),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete );

router.patch('/', usuariosPath );


module.exports = router;