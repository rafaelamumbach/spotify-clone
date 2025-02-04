const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
    // URL da API (JSON Server)
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.status);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Dados recebidos da API:", data);
            displayResults(data);
        })
        .catch((error) => {
            console.error('Erro na requisição:', error);
        });
}

function displayResults(results) {
    resultPlaylist.classList.add("hidden");

    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    if (results.length > 0) {
        // Exibe o primeiro resultado
        artistName.innerText = results[0].name;
        artistImage.src = results[0].urlImg;
    } else {
        // Caso não haja resultados
        artistName.innerText = "Nenhum artista encontrado";
        artistImage.src = ""; // Ou uma imagem padrão
    }

    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }

    requestApi(searchTerm);
});