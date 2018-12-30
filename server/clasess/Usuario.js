class Usuario {


    constructor() {
        this.personasConectadasAlchat = [];

    }


    agregarPersona(id, nombre) {
        let persona = { id, nombre };
        this.personasConectadasAlchat.push(persona);

        return this.personasConectadasAlchat;
    }

    getPersonaById(id) {
        return this.personasConectadasAlchat.filter(persona => persona.id === id)[0]
    }

    getPersonasConectadasAlChat() {
        return this.personasConectadasAlchat;
    }

    deletePersonFromChatById(id) {
        let personaRetirada = this.getPersonaById(id);
        this.personasConectadasAlchat.filter(persona => persona.id !== id);
        return personaRetirada;
    }
}



module.exports = Usuario;