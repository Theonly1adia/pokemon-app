let fetchButton = document.getElementById("fetch-button");
let pokemonInput = document.getElementById("pokemon-code");
let outputDiv = document.getElementById("pokemon-output");

fetchButton.addEventListener("click", handleFetch);

async function handleFetch(){
    console.log("Hello Pokemon!");
    let pokemonCode = pokemonInput.value.toLowerCase();

    try {
        let result = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonCode}`);
        
        if (!result.ok) {
            throw new Error("Pokémon not found");
        }

        let data = await result.json();
        console.log(data); // Proof of life

    let pokemonName= data.name;
    let pokemonIndex = data.id;
    let pokemonAbility = data.abilities[0].ability.name;
    let pokemonType = data.types[0].type.name;
    let imgURL = data.sprites.front_default;

    console.log(imgURL);
    console.log(pokemonName);

    createPokemon({
        id: pokemonIndex,
        name: pokemonName,
        type: pokemonType,
        sprite: imgURL,
    });

} catch (error) {
    console.error(error.message);
    outputDiv.innerHTML = `<p class="text-danger">Error: ${error.message}</p>`;
}
}

function createPokemon(pokemon) {
    const pokemonCard = `
        <div class="card pokemon-card">
            <img src="${pokemon.sprite}" class="card-img-top" alt="${pokemon.name}">
            <div class="card-body">
                <h5 class="card-title">#${pokemon.id} - ${pokemon.name}</h5>
                <p class="card-text">Type: ${pokemon.type}</p>
            </div>
        </div>
    `;
    outputDiv.innerHTML = pokemonCard;
}