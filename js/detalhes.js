const params = new URLSearchParams(window.location.search);
const numero = params.get('numero');

async function drawPokemon(id) {
    
    const pokemon = await getPokemon('pokemon/' + id);

    document.title = `Pokemon - ${capitalizeFirstLetter(pokemon.name)}`;

    document.getElementById('anterior').innerHTML = await getPokemonAnterior(pokemon.id);
    document.getElementById('proximo').innerHTML = await getPokemonProximo(pokemon.id);

    document.querySelector('h1').innerHTML = `${pokemon.id.toString().padStart(3, '0')} - ${capitalizeFirstLetter(pokemon.name)}`

    let descriptions = await getPokemon('pokemon-species/' + pokemon.id);
    let description = Array.from(descriptions.flavor_text_entries).filter(item => item.language.name == 'en')
    document.getElementById('descricao').innerHTML = description[0].flavor_text.replace('\f', ' ');

    document.getElementById('imgPoke').innerHTML = carousel(pokemon.sprites);
    document.getElementById('altura').innerHTML = `${pokemon.height / 10} m`
    document.getElementById('peso').innerHTML = `${pokemon.weight / 10} kg`

    let buttons = document.getElementById('tipos');
    buttons.innerHTML = '';
    pokemon.types.forEach((value, index) => {
        let name = getTipo(value.type.name);
        buttons.innerHTML += `<button class="btn btn-secondary btn-lg btn-${name} text-white">${name}</button>`
    });

    let sons = document.getElementById('sons');
    sons.innerHTML = '<span class="fw-bold mb-0 me-2">Sons:</span>';
    if (pokemon.cries.latest != null)
        sons.innerHTML += `<i class="bi bi-play-circle fs-1 me-3" onclick="document.getElementById('latest').play()"></i><audio controls id='latest' hidden><source src="${pokemon.cries.latest}" type="audio/ogg"></audio>`
    if (pokemon.cries.legacy != null)
        sons.innerHTML += `<i class="bi bi-play-circle fs-1" onclick="document.getElementById('legacy').play()"></i><audio controls id='legacy' hidden><source src="${pokemon.cries.legacy}" type="audio/ogg"></audio>`

    const yValues = [];
    pokemon.stats.forEach((value, index) => {
        yValues.push(value.base_stat)
    })

    document.querySelector("#chartReport").innerHTML = '<canvas id="myChart"></canvas>';

    const xValues = ["HP", "Ataque", "Defesa", "Ataque Especial", "Defesa Especial", "Velocidade"];
    const barColors = ["#FE0000", "#EE7F30", "#F7D02C", "#F85687", "#77C755", "#678FEE"];
    new Chart("myChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: "Status"
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

async function getPokemonAnterior(numero) {
    const pokemonAnterior = await getPokemon('pokemon/' + (numero - 1));
    if (pokemonAnterior != null)
        return `<button class='btn btn-outline-danger btn-10' onclick='drawPokemon(${pokemonAnterior.id})'>
                    ${pokemonAnterior.id.toString().padStart(3, '0')}<br>${capitalizeFirstLetter(pokemonAnterior.name)}
                </button>`
    else return `<span></span>`;
}

async function getPokemonProximo(numero) {
    const pokemonProximo = await getPokemon('pokemon/' + (numero + 1));
    if (pokemonProximo != null)
        return `<button class='btn btn-outline-danger btn-10' onclick='drawPokemon(${pokemonProximo.id})'>
                    ${pokemonProximo.id.toString().padStart(3, '0')}<br>${capitalizeFirstLetter(pokemonProximo.name)}
                </button>`
    else return `<span></span>`;
}

document.addEventListener("DOMContentLoaded", async () => {
    
    drawPokemon(numero);

    document.querySelector('form').addEventListener("submit", function (e) {
        e.preventDefault();
        search();
    });
});

async function search() {
    if (loading) return;
    let search = document.querySelector('input[type="search"]').value;
    if (search == '') {
        drawPokemon(numero);
    }
    else {
        const pokemon = await searchPokemon();
        drawPokemon(pokemon.id);
    }
}
