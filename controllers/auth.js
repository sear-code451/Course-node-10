
// Requires
const bcryptjs = require('bcryptjs');
const { request, response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario');

// Proceedings

const login = async(req = request , res = response ) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne( { correo } );
        if( !usuario ) {
            return res.status(400).json( {
                msg: 'Usuario / password no son correctos - email'
            } )
        }

        // Si el usuario está activo
        if( !usuario.estado ) {
            return res.status(400).json( {
                msg: 'Usuario / password no son correctos - estado:{false}'
            } )
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );

        if( !validPassword ) {
            return res.status(400).json( {
                msg: 'Usuario / password no son correctos - password'
            } )
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );
        
        res.json( {
            usuario,
            token
        } );

    } catch (error) {
        console.log( error );
        return res.status(500).json( {
            msg: 'Talk to the administrator'
        } )
    }

    
};

module.exports = {
    login
}