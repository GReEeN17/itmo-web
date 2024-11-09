document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const placesContainer = document.getElementById("placesContainer");

    preloader.style.display = 'block';

    const randomCondition = Math.random() < 0.5;
    const url = randomCondition
        ? 'https://jsonplaceholder.typicode.com/comments?id_gte=100'
        : 'https://jsonplaceholder.typicode.com/comments?id_lte=200';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть не доступна');
            }
            return response.json();
        })
        .then(data => {
            preloader.style.display = 'none';
            renderPlaces(data);
        })
        .catch(error => {
            preloader.style.display = 'none';

            const errorElement = document.createElement('p');
            errorElement.textContent = '⚠ Что-то пошло не так.';
            placesContainer.appendChild(errorElement);

            console.error('Ошибка:', error);
        });
});

function renderPlaces(data) {
    const placesContainer = document.getElementById("placesContainer");

    while (placesContainer.firstChild) {
        placesContainer.removeChild(placesContainer.firstChild);
    }

    data.forEach(item => {
        const placeElement = document.createElement('div');
        placeElement.className = 'place-item';

        const titleElement = document.createElement('h3');
        titleElement.textContent = item.name;

        const bodyElement = document.createElement('p');
        bodyElement.textContent = item.body;


        placeElement.appendChild(titleElement);
        placeElement.appendChild(bodyElement);

        placesContainer.appendChild(placeElement);
    });
}