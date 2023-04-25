
// Requires
const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require( '../models/usuario' )

// Proceedings
const validarJWT = async( req = request, res = response, next ) => {
    
    const token = req.header( 'x-token' );

    if( !token ) {
        return res.status(401).json( {
            msg: 'No hay token en la petición'
        } )
    }

    try {
    
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // leer el usuario(esquema usuario) que corresponde al uid
        // req.usuario = algo que vamos hacer

        const usuario = await Usuario.findById( uid );

        if( !usuario ) {
            return res.status( 401 ).json( {
                msg: 'Token no válido - usuario no existente en DB'
            } );
        }

        // Verificar si el uid tiene estado true
        if( !usuario.estado ) {
            return res.status( 401 ).json( {
                msg: 'Token no válido - usuario con {estado: false}'
            } );
        }

         req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json( {
            msg: 'Token no válido'
        } )
    }


};

module.exports = {
    validarJWT
}