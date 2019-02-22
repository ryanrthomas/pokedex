export default class Pokemon {
    constructor(data) {
        this._id = data._id
        this.name = data.name
        this.url = data.url
        this.height = data.height
        this.weight = data.weight
        this.base_experience = data.base_experience
        this.types = data.types
        this.sprites = data.sprites
    }
    getTemplate() {
        // Get template for Pokemon types
        let listOfTypes = ''
        for (let i = 0; i < this.types.length; i++) {
            let type = this.types[i].type.name
            listOfTypes += type + ", "
        }

        // Get template for images
        let spriteImage = this.sprites.front_default

        return `
        <div class="card">
        <div class="card-body">
            <img src=("${spriteImage}")>
            <h3 class="card-title">${this.name}</h3>
            <h5 class="card-subtitle mb-2 text-muted">Type: ${listOfTypes}</h5>
            <p class="card-text">Weight: ${this.weight}</p>
            <p class="card-text">Height: ${this.height}</p>
            <p class="card-text">Base Experience: ${this.base_experience} XP</p>
            <button class="btn btn-danger" onclick="app.controllers.pokeController.addPokemon()">Capture!</button>
        </div>
        </div>
        `
    }
}