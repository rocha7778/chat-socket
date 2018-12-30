const crearMensaje = (nombre, mensaje) => {


    return {
        nombre,
        mensaje,
        feccha: new Date().getTime()
    }


}

module.exports = crearMensaje;