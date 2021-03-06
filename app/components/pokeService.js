// Private
import Pokemon from "../models/pokemon.js"

let _pokeApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon'
})

let _limit = 964;
let _offset = 0;

let _state = {
    pokemonsApi: [],
    nextPrevPokemon: {
        nextUrl: '',
        prevUrl: ''
    },
    activePokemon: {},
    myPokemon: []
}

let _subscribers = {
    pokemonsApi: [],
    nextPrevPokemon: [],
    activePokemon: [],
    myPokemon: []
}

function setState(prop, data) {
    _state[prop] = data
    _subscribers[prop].forEach(fn => fn())
}

// Public
export default class PokeService {
    addSubscriber(prop, fn) {
        _subscribers[prop].push(fn)
    }

    get PokemonsApi() {
        return _state.pokemonsApi.map(p => new Pokemon(p));
    }

    get ActivePokemon() {
        return _state.activePokemon;
    }

    get MyPokemon() {
        return _state.myPokemon.map(p => new Pokemon(p));
    }

    getPokemonData() {
        _pokeApi.get(`?offset=${_offset}&limit=${_limit}`)
            .then(res => {
                setState('pokemonsApi', res.data.results)
            })
    }

    getDetails(url) {
        _pokeApi.get(url)
            .then(res => {
                let data = new Pokemon(res.data);
                setState('activePokemon', data);
            })
        // Scrolls to the top of the page when Pokemon is selected
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    showDetails(id) {
        let pokemon = _state.myPokemon.find(p => p._id == id)
        setState('activePokemon', pokemon)
    }

    addPokemon() {
        let pokemon = _state.myPokemon.find(p => p.name == _state.activePokemon.name)
        if (!pokemon) {
            _state.myPokemon.push(_state.activePokemon)
            _subscribers.myPokemon.forEach(fn => fn())
        }
    }

    prevPokemons() {
        _pokeApi.get(_state.nextPrevPokemon.prevUrl)
            .then(res => {
                setState('pokemonsApi', res.data.previousUrl)
            })
    }

    nextPokemons() {
        _pokeApi.get(_state.nextPrevPokemon.nextUrl)
            .then(res => {
                setState('pokemonsApi', res.data.nextUrl)
            })
    }
}