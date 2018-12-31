const {
    io
} = require('../server');
const Usuario = require('../clasess/Usuario')

const enviarMensaje = require('../mensajes/enviarMensaje')




const usuario = new Usuario();

io.on('connection', (client) => {



    client.on('entrarChat', (data, callback) => {

        let sala = data.sala;


        if (!data.nombre || !sala) {

            return callback({
                ok: false,
                message: 'El nombre/sala es necesario'
            })

        }


        client.join(sala)



        usuario.agregarPersona(client.id, data.nombre, data.sala);
        let usuariosPorSala = usuario.getPersonasConectadasAlChatPorSala(sala)


        client.broadcast.to(sala).emit('listadoDePersonas', { usuarios: usuariosPorSala })

        callback({
            ok: true,
            usuarios: usuariosPorSala
        })



    })





    client.on('disconnect', () => {

        let personaBorrada = usuario.deletePersonFromChatById(client.id);
        let sala = personaBorrada.sala;

        client.broadcast.to(sala).emit('notificarUsuarioAbandonoSalaDeChat', enviarMensaje('Administrador', `El usuario ${personaBorrada.nombre} ha abandonado la sala`))
        usuario.deletePersonFromChatById(client.id);
        client.broadcast.to(sala).emit('listadoDePersonas', { usuarios: usuario.getPersonasConectadasAlChatPorSala(sala) })

        console.log(`El usuario ${personaBorrada.nombre} ha abandonado la sala`);



    })


    client.on('crearMensaje', (data, callback) => {

        let persona = usuario.getPersonaById(client.id)

        let mensaje = enviarMensaje(persona.nombre, data.mensaje)

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje)

        callback(mensaje)
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