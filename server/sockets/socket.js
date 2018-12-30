const {
    io
} = require('../server');
const Usuario = require('../clasess/Usuario')

const enviarMensaje = require('../mensajes/enviarMensaje')




const usuario = new Usuario();

io.on('connection', (client) => {



    client.on('entrarChat', (data, callback) => {



        if (!data.nombre) {

            return callback({
                ok: false,
                message: 'El nombre es necesario'
            })

        }



        let usuarios = usuario.agregarPersona(client.id, data.nombre);


        client.broadcast.emit('listadoDePersonas', { usuarios: usuario.getPersonasConectadasAlChat() })

        callback({
            ok: true,
            usuarios: usuarios
        })



    })





    client.on('disconnect', () => {

        let personaBorrada = usuario.deletePersonFromChatById(client.id);

        client.broadcast.emit('notificarUsuarioAbandonoSalaDeChat', enviarMensaje('Administrador', `El usuario ${personaBorrada.nombre} ha abandonado la sala`))
        client.broadcast.emit('listadoDePersonas', { usuarios: usuario.getPersonasConectadasAlChat() })

        console.log(`El usuario ${personaBorrada.nombre} ha abandonado la sala`);



    })


    client.on('crearMensaje', (data) => {

        let persona = usuario.getPersonaById(client.id)

        let mensaje = enviarMensaje(persona.nombre, data.mensaje)

        client.broadcast.emit('crearMensaje', mensaje)
    })



    client.on('mensajePrivado', (data) => {


        let personaRemite = usuario.getPersonaById(client.id)
        let personaDestino = usuario.getPersonaById(data.id)

        let mensje = {
            mensaje: data.mensaje,
            de: personaRemite.nombre,
            para: personaDestino.nombre
        }


        client.broadcast.to(data.id).emit('mensajePrivado', mensje)

    })





});