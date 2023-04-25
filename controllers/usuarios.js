// Requerimientos
const bcryptjs = require('bcryptjs');
const { response, request } = require('express');
const Usuario = require( '../models/usuario' );


// Procedimiento

const usuariosGet = async(req = request, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado:true };

    const [ total, usuarios ] = await Promise.all( [

        Usuario.countDocuments( query ),        
        Usuario.find( query )
            .skip( desde )
            .limit( limite )
    ] );

    
    res.json( {
        total,
        usuarios
    } );
};

const usuariosPut = async(req, res) => {

    const { id } = req.params;
    const { _id ,password, google, correo, ...resto } = req.body;

    // console.log( req.body );

    // TODO: validar contra la base de datos
    if( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto, {new: true} );

    res.json( usuario );
};

const usuariosPost = async (req, res) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );    

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en DB
    await usuario.save();

    res.json( {
        usuario
    });
};

const usuariosDelete = async(req, res) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, { estado:false })

    res.json( usuario );
};

const usuariosPath = (req, res) => {
    res.json( {
        msg: 'patch API'
    });
};



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPath
}

