document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("plannerForm");
    const resultContainer = document.getElementById("resultContainer");

    // Загружаем параметры из localStorage при загрузке страницы
    const storedMinPlaces = localStorage.getItem("minPlaces");
    const storedTransport = localStorage.getItem("transport");

    if (storedMinPlaces) {
        document.getElementById("minPlaces").value = storedMinPlaces;
    }

    if (storedTransport) {
        document.getElementById("transport").value = storedTransport;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        const minPlaces = parseInt(document.getElementById("minPlaces").value);
        const transport = document.getElementById("transport").value;

        // Сохраняем введенные значения в localStorage
        localStorage.setItem("minPlaces", minPlaces);
        localStorage.setItem("transport", transport);

        // Генерируем и отображаем результат
        generateSchedule(minPlaces, transport);
    });

    function generateSchedule(minPlaces, transport) {
        const daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
        resultContainer.innerHTML = ""; // Очищаем предыдущий результат

        const schedule = daysOfWeek.map(day => {
            return `<div class="day-schedule">
                        <h3>${day}</h3>
                        <p>Минимум ${minPlaces} мест(а) посещено.</p>
                        <p>Способ передвижения: ${transport}</p>
                    </div>`;
        }).join("");

        resultContainer.innerHTML = `<h2>Ваш план на неделю:</h2>${schedule}`;
    }
});
