// scripts/places.js
document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const placesContainer = document.getElementById("placesContainer");

    // Показываем preloader
    preloader.style.display = 'block';

    // Генерация случайного условия для фильтрации
    const randomCondition = Math.random() < 0.5; // true или false
    const url = randomCondition
        ? 'https://jsonplaceholder.typicode.com/comments?id_gte=100' // ID >= 100
        : 'https://jsonplaceholder.typicode.com/comments?id_lte=200'; // ID <= 200

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть не доступна');
            }
            return response.json();
        })
        .then(data => {
            // Скрываем preloader
            preloader.style.display = 'none';
            // Отображаем данные
            renderPlaces(data);
        })
        .catch(error => {
            preloader.style.display = 'none';
            placesContainer.innerHTML = '<p>⚠ Что-то пошло не так.</p>';
            console.error('Ошибка:', error);
        });
});

// Функция для отображения загруженных данных
function renderPlaces(data) {
    const placesContainer = document.getElementById("placesContainer");
    placesContainer.innerHTML = ''; // Очищаем контейнер

    data.forEach(item => {
        const placeElement = document.createElement('div');
        placeElement.className = 'place-item';
        placeElement.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.body}</p>
        `;
        placesContainer.appendChild(placeElement);
    });
}
