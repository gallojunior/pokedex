let topo;

let loading = false;
let filtered = false;

const url = "https://pokeapi.co/api/v2/";

const allTypes = ['steel', 'water', 'dragon', 'electric', 'fairy', 'ghost', 'fire', 'ice', 'bug', 'fighting', 'normal', 'rock', 'grass', 'psychic', 'dark', 'ground', 'poison', 'flying'];

const todosTipos = [
    { nome: 'Aço', cor: 'rgba(170, 170, 187, 0.75)' },
    { nome: 'Água', cor: 'rgba(51, 153, 255, 0.75)' },
    { nome: 'Dragão', cor: 'rgba(119, 102, 238, 0.75)' },
    { nome: 'Elétrico', cor: 'rgba(255, 204, 51, 0.75)' },
    { nome: 'Fada', cor: 'rgba(238, 153, 238, 0.75)' },
    { nome: 'Fantasma', cor: 'rgba(102, 102, 187, 0.75)' },
    { nome: 'Fogo', cor: 'rgba(255, 68, 34, 0.75)' },
    { nome: 'Gelo', cor: 'rgba(102, 204, 255, 0.75)' },
    { nome: 'Inseto', cor: 'rgba(170, 187, 34, 0.75)' },
    { nome: 'Lutador', cor: 'rgba(187, 85, 68, 0.75)' },
    { nome: 'Normal', cor: 'rgba(170, 170, 153, 0.75)' },
    { nome: 'Pedra', cor: 'rgba(187, 170, 102, 0.75)' },
    { nome: 'Planta', cor: 'rgba(119, 204, 85, 0.75)' },
    { nome: 'Psíquico', cor: 'rgba(255, 85, 153, 0.75)' },
    { nome: 'Sombrio', cor: 'rgba(119, 85, 68, 0.75)' },
    { nome: 'Terrestre', cor: 'rgba(221, 187, 85, 0.75)' },
    { nome: 'Venenoso', cor: 'rgba(170, 85, 153, 0.75)' },
    { nome: 'Voador', cor: 'rgba(136, 153, 255, 0.75)' }
]

function getTipo(name) {
    const index = allTypes.indexOf(name);
    return todosTipos[index].nome;
}

function getCor(name) {
    const index = allTypes.indexOf(name);
    return todosTipos[index].cor;
}

async function getPokemon(resource) {
    try {
        const response = await fetch(url + resource);
        if (!response.ok) {
            return null;
        }
        return await response.json();
    } catch (error) {
        console.error(error.message);
    }
}

async function searchPokemon() {
    if (loading) return;
    let search = document.querySelector('input[type="search"]').value;
    if (search != '') {
        loading = true;
        const pokemon = await getPokemon('pokemon/' + search.toLowerCase());
        loading = false;
        return pokemon;
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function carousel(sprites) {
    return `<div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                    <img src="${sprites.other['official-artwork'].front_default}" class="d-block w-100" alt="Padrão">
                    </div>
                    <div class="carousel-item">
                    <img src="${sprites.other['official-artwork'].front_shiny}" class="d-block w-100" alt="Shiny">
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
        </div>`
}