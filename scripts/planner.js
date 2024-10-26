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

        // Очищаем предыдущий результат
        resultContainer.innerHTML = "";

        // Заголовок "Ваш план на неделю"
        const title = document.createElement("h2");
        title.textContent = "Ваш план на неделю:";
        resultContainer.appendChild(title);

        // Создаём расписание на каждый день недели
        daysOfWeek.forEach(day => {
            const daySchedule = document.createElement("div");
            daySchedule.classList.add("day-schedule");

            const dayTitle = document.createElement("h3");
            dayTitle.textContent = day;
            daySchedule.appendChild(dayTitle);

            const placesInfo = document.createElement("p");
            placesInfo.textContent = `Минимум ${minPlaces} мест(а) посещено.`;
            daySchedule.appendChild(placesInfo);

            const transportInfo = document.createElement("p");
            transportInfo.textContent = `Способ передвижения: ${transport}`;
            daySchedule.appendChild(transportInfo);

            // Добавляем блок дня в контейнер с результатами
            resultContainer.appendChild(daySchedule);
        });
    }
});