var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');

    var params = new URLSearchParams(window.location.search);

    if (!params.has('nombre') || !params.has('sala')) {

        window.location = 'index.html';
        throw new Error('El nombre/sala es necesario')


    }

    var usuario = {
        nombre: params.get('nombre'),
        sala: params.get('sala')
    }

    socket.emit('entrarChat', usuario, (response) => {

        visualizarListaDeUsuariosConectadosAlChat(response.usuarios);
    })
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});



// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    mosrarMensajesEnSalaDeChat(mensaje, false)
    scrollBottom()

});

socket.on('notificarUsuarioAbandonoSalaDeChat', function(data) {

    console.log(data);

    mosrarMensajesEnSalaDeChat(data, false)
    scrollBottom();


})

socket.on('notificarUsuarioIngresoSalaChat', function(data) {

    console.log(data);
})

socket.on('listadoDePersonas', function(data) {

    console.log('Usuarios actuales', data);

    visualizarListaDeUsuariosConectadosAlChat(data.usuarios);
})



socket.on('mensajePrivado', function(data) {

    console.log('Mensaje Privado', data);

})