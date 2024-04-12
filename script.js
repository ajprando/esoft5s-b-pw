function changePageTitle(title) {
    document.title = title
}

function generateInfoSection(src, pokemonName) {
    const h2 = document.createElement('h2')
    h2.id = "info-pokemon-label"
    h2.textContent = `Informações sobre ${pokemonName}`

    const img = document.querySelector('img')
    img.src = src
    img.alt = `Imagem do pokemon ${pokemonName}`

    const section = document.querySelector('#info-pokemon')

    section.appendChild(h2)
    section.appendChild(img)
}

async function getPokemonData(name) {
    // fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    //   .then((fetchData) => {
    //     return fetchData.json()
    //   })
    //   .then((jsonData) => generateInfoSection(jsonData.sprites.front_default, name))
    //   .catch((error) => console.error(error))

    try {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

        const jsonData = await data.json()

        generateInfoSection(jsonData.sprites.front_default, name)
    } catch (error) {
        console.error(error)
    }
}

function getSearchParams() {
    // Early return -> Caso location search, não faz nada.
    if (!location.search) {
        return
    }

    // URLSearchParams é uma classe que facilita a manipulação de query strings
    const urlSearchParams = new URLSearchParams(location.search)

    // Pegando o valor do parâmetro name
    const pokemonName = urlSearchParams.get('name')

    changePageTitle(`Pagina do ${pokemonName}`)
    getPokemonData(pokemonName)
}

document.addEventListener('DOMContentLoaded', function () {
    getSearchParams()
})

// Função para atualizar o contador de visitas e a última data de acesso
function updateVisitCounter() {
    let visitData = localStorage.getItem('visitData');
    if (!visitData) {
      visitData = { count: 0, lastVisit: '' };
    } else {
      visitData = JSON.parse(visitData);
    }

    visitData.count++;
    const currentDate = new Date();
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    visitData.lastVisit = formatter.format(currentDate);

    localStorage.setItem('visitData', JSON.stringify(visitData));

    // Atualizar o texto no parágrafo de dados de visita
    const visitParagraph = document.getElementById('visit-data');
    visitParagraph.textContent = `Esta página foi visitada ${visitData.count} vezes. A última visita foi: ${visitData.lastVisit}`;
  }

  // Chamada para atualizar o contador quando a página é carregada
  document.addEventListener('DOMContentLoaded', function () {
    updateVisitCounter();
  });

function handleSpriteClick(sprites) {
    const spriteArray = Object.values(sprites).filter(sprite => typeof sprite === 'string');
    let currentSpriteIndex = 0;

    const imgElement = document.querySelector('img');
    imgElement.src = spriteArray[currentSpriteIndex];

    imgElement.addEventListener('click', function () {
        currentSpriteIndex++;
        if (currentSpriteIndex >= spriteArray.length) {
            currentSpriteIndex = 0;
        }
        imgElement.src = spriteArray[currentSpriteIndex];
    });
}

async function getPokemonData(name) {
    try {
        const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const jsonData = await data.json();

        generateInfoSection(jsonData.sprites, name);
        handleSpriteClick(jsonData.sprites);
    } catch (error) {
        console.error(error);
    }
}