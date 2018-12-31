class Usuario {


    constructor() {
        this.personasConectadasAlchat = [];

    }


    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala };
        this.personasConectadasAlchat.push(persona);

        return this.personasConectadasAlchat;
    }

    getPersonaById(id) {
        return this.personasConectadasAlchat.filter(persona => persona.id === id)[0]
    }

    getPersonasConectadasAlChat() {
        return this.personasConectadasAlchat;
    }

    getPersonasConectadasAlChatPorSala(sala) {
        return this.personasConectadasAlchat.filter(persona => persona.sala === sala)

    }

    deletePersonFromChatById(id) {


        let personaRetirada = this.getPersonaById(id);
        this.personasConectadasAlchat = this.personasConectadasAlchat.filter(persona => persona.id !== id);
        return personaRetirada;
    }
}



module.exports = Usuario;