const pokemonName = document.querySelector('.pokemonName');
const pokemonNum = document.querySelector('.pokemonNum');
const pokemonImg = document.querySelector('.pokemonImg');

const form = document.querySelector('form');
const input = document.querySelector('.inputSearch');
const btnPrev = document.querySelector('.btnPrev');
const btnNext = document.querySelector('.btnNext');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponsive = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponsive.status === 200){
        const data = await APIResponsive.json();
        return data;
    }
}

const renderPokemon = async (pokemon) =>{
    
    pokemonName.innerHTML = 'Carregando...';
    pokemonNum.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonName.innerHTML = data.name;
        pokemonNum.innerHTML = data.id;
        pokemonImg.src = data['sprites']['versions']['generation-viii']['icons']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    }else{
        pokemonName.innerHTML='Não encontrado';
        pokemonNum.innerHTML='';
        pokemonImg.style.display ='none';
    }
}

form.addEventListener('submit',(evento)=>{
    evento.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener('click',()=>{
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
      }
});

btnNext.addEventListener('click',()=>{
    searchPokemon+=1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);