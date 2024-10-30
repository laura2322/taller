const API_KEY = '46798249-674e13c0dd113e3a7a367a64b'; // Reemplaza con tu propia API KEY de Pixabay
const searchButton = document.getElementById('search-button');
const keywordInput = document.getElementById('keyword');
const imageContainer = document.getElementById('image-container');

searchButton.addEventListener('click', () => {
    const keyword = keywordInput.value;
    fetchImages(keyword);
});

async function fetchImages(keyword) {
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(keyword)}&image_type=photo&per_page=5`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.hits.length > 0) {
            displayImages(data.hits);
        } else {
            imageContainer.innerHTML = '<p>No se encontraron imágenes.</p>';
        }
    } catch (error) {
        console.error('Error fetching images:', error);
        imageContainer.innerHTML = '<p>Error al cargar las imágenes.</p>';
    }
}

function displayImages(images) {
    imageContainer.innerHTML = ''; // Limpiar el contenedor

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.webformatURL; // URL de la imagen
        imgElement.alt = image.tags; // Etiquetas de la imagen
        imageContainer.appendChild(imgElement); // Agregar imagen al contenedor
    });
}
