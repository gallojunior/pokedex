function buttonTipo(tipos) {
    let buttons = '';
    tipos.forEach((value, index) => {
        let name = getTipo(value.type.name);
        buttons += `<button class="btn btn-secondary btn-${name} text-white">${name}</button>`
    })
    return buttons;
}

async function loadPokemons() {
    if (loading) return;
    loading = true;
    let div = document.getElementById('pokemons');
    for (let i = topo - 39; i <= topo; i++) {
        const pokemon = await getPokemon('pokemon/' + i);
        div.innerHTML +=
            `<div class="col">
                <a href="detalhes.html?numero=${pokemon.id}" class="text-decoration-none">
                <div class="card" style="background-color:${getCor(pokemon.types[0].type.name)}">
                    <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" class="card-img-top">
                    <div class="card-body text-white">
                        <h5 class="card-text mb-1">Nº ${pokemon.id.toString().padStart(3, '0')}</h5>
                        <h3 class="card-title">${capitalizeFirstLetter(pokemon.name)}</h3>
                        <div class="d-flex gap-2 my-2">
                            ${buttonTipo(Array.from(pokemon.types))}
                        </div>
                    </div>
                </div>
                </a>
            </div>`
    }
    loading = false;
    filtered = false;
}

async function search() {
    if (loading) return;
    let div = document.getElementById('pokemons');
    let search = document.querySelector('input[type="search"]').value;
    if (search == '') 
        initializePage();
    else {
        const pokemon = await searchPokemon();
        div.innerHTML =
            `<div class="col">
                <a href="detalhes.html?numero=${pokemon.id}" class="text-decoration-none">
                <div class="card" style="background-color:${getCor(pokemon.types[0].type.name)}">
                    <div id="imgPoke" class="card-img-top">${carousel(pokemon.sprites)}</div>
                    <div class="card-body text-white">
                        <h5 class="card-text mb-1">Nº ${pokemon.id.toString().padStart(3, '0')}</h5>
                        <h3 class="card-title">${capitalizeFirstLetter(pokemon.name)}</h3>
                        <div class="d-flex gap-2 my-2">
                            ${buttonTipo(Array.from(pokemon.types))}
                        </div>
                    </div>
                </div>
                </a>
            </div>`
        loading = false;
        filtered = true;
    }
}

async function initializePage() {
    topo = 40;
    let div = document.getElementById('pokemons');
    div.innerHTML = '';
    filtered = false;
    await loadPokemons();
}

document.addEventListener("DOMContentLoaded", async () => {
    initializePage();

    document.querySelector('form').addEventListener("submit", function (e) {
        e.preventDefault();
        search();
    })
});

window.onscroll = () => {
    if (((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 500) && !loading && !filtered) {
        topo += 40;
        loadPokemons();
    }
}