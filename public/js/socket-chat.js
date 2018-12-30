var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');

    var params = new URLSearchParams(window.location.search);

    if (!params.has('nombre')) {

        window.location = 'index.html';
        throw new Error('El nombre es necesario')


    }

    var usuario = {
        nombre: params.get('nombre')
    }

    socket.emit('entrarChat', usuario, (response) => {
        console.log(response);
    })
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
/*socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});*/

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});

socket.on('notificarUsuarioAbandonoSalaDeChat', function(data) {

    console.log(data);


})

socket.on('notificarUsuarioIngresoSalaChat', function(data) {

    console.log(data);
})

socket.on('listadoDePersonas', function(data) {

    console.log('Usuarios actuales', data);
})



socket.on('mensajePrivado', function(data) {

    console.log('Mensaje Privado', data);
})