var divbarraLateralPersonas = $('#divUsuarios')
var formEnviarMensaje = $('#formEnviarMensaje')
var txtMensaje = $('#txtMensaje')
var divChatbox = $('#divChatbox')


var params = new URLSearchParams(window.location.search);

var nombreSala = params.get('sala')
var nombreUsuario = params.get('nombre')

function visualizarListaDeUsuariosConectadosAlChat(personas) {

    var html = '';
    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span> ' + nombreSala + '</span></a>';
    html += '</li>';


    for (var i = 0; i < personas.length; i++) {

        html += '<li>';
        html += '<a id="usuarioList" data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + ' <small class="text-success">online</small></span></a>';
        html += '</li>';


    }

    divbarraLateralPersonas.html(html)
}

function mosrarMensajesEnSalaDeChat(mensaje, yo) {

    var htlm = '';

    var fecha = new Date(mensaje.feccha)

    var hora = formatAMPM(fecha)

    if (yo) {

        htlm += '<li class="reverse">'
        htlm += '<div class="chat-content">'
        htlm += '<h5>' + mensaje.nombre + '</h5>'
        htlm += '<div class="box bg-light-inverse">' + mensaje.mensaje + '</div>'
        htlm += '</div>'
        htlm += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>'
        htlm += '<div class="chat-time"> ' + hora + '</div>'
        htlm += '</li>'

    } else {

        htlm += '<li>'
        htlm += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>'
        htlm += '<div class="chat-content">'
        htlm += '<h5>' + mensaje.nombre + '</h5>'
        htlm += '<div class="box bg-light-info">' + mensaje.mensaje + '</div>'
        htlm += '</div>'
        htlm += '<div class="chat-time">' + hora + ' am</div>'
        htlm += '</li>'

    }





    divChatbox.append(htlm);
}


function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}


divbarraLateralPersonas.on('click', 'a', function() {

    var id = $(this).data('id');

    if (id) {
        console.log(id);
    }


})


formEnviarMensaje.on('click', function(e) {

    e.preventDefault();

    var mensaje = txtMensaje.val();

    if (mensaje.trim().length === 0) {
        return
    }

    // Enviar información
    socket.emit('crearMensaje', {
        usuario: nombreUsuario,
        mensaje: txtMensaje.val()
    }, function(resp) {
        txtMensaje.val('').focus();
        mosrarMensajesEnSalaDeChat(resp, true)
        scrollBottom()
    });




})


function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}