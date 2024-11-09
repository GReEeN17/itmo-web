document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("plannerForm");
    const resultContainer = document.getElementById("resultContainer");
    const removeFormButton = document.getElementById("removeFormButton");

    const storedMinPlaces = localStorage.getItem("minPlaces");
    const storedTransport = localStorage.getItem("transport");
    const storedSchedule = localStorage.getItem("schedule");

    if (storedMinPlaces) {
        document.getElementById("minPlaces").value = storedMinPlaces;
    }

    if (storedTransport) {
        document.getElementById("transport").value = storedTransport;
    }

    if (storedSchedule) {
        const scheduleElements = JSON.parse(storedSchedule);
        scheduleElements.forEach(daySchedule => {
            const dayScheduleDiv = document.createElement("div");
            dayScheduleDiv.classList.add("day-schedule");

            const dayTitle = document.createElement("h3");
            dayTitle.textContent = daySchedule.day;
            dayScheduleDiv.appendChild(dayTitle);

            const placesInfo = document.createElement("p");
            placesInfo.textContent = `Минимум ${daySchedule.minPlaces} мест(а) посещено.`;
            dayScheduleDiv.appendChild(placesInfo);

            const transportInfo = document.createElement("p");
            transportInfo.textContent = `Способ передвижения: ${daySchedule.transport}`;
            dayScheduleDiv.appendChild(transportInfo);

            resultContainer.appendChild(dayScheduleDiv);
        });
        form.style.display = "none";
        removeFormButton.style.display = "inline";
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const minPlaces = parseInt(document.getElementById("minPlaces").value);
        const transport = document.getElementById("transport").value;

        localStorage.setItem("minPlaces", minPlaces);
        localStorage.setItem("transport", transport);

        generateSchedule(minPlaces, transport);
    });

    function generateSchedule(minPlaces, transport) {
        const daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];

        while (resultContainer.firstChild) {
            resultContainer.removeChild(resultContainer.firstChild);
        }

        const title = document.createElement("h2");
        title.textContent = "Ваш план на неделю:";
        resultContainer.appendChild(title);

        const scheduleArray = [];

        daysOfWeek.forEach(day => {
            const daySchedule = {
                day: day,
                minPlaces: minPlaces,
                transport: transport
            };

            const dayScheduleDiv = document.createElement("div");
            dayScheduleDiv.classList.add("day-schedule");

            const dayTitle = document.createElement("h3");
            dayTitle.textContent = day;
            dayScheduleDiv.appendChild(dayTitle);

            const placesInfo = document.createElement("p");
            placesInfo.textContent = `Минимум ${minPlaces} мест(а) посещено.`;
            dayScheduleDiv.appendChild(placesInfo);

            const transportInfo = document.createElement("p");
            transportInfo.textContent = `Способ передвижения: ${transport}`;
            dayScheduleDiv.appendChild(transportInfo);

            resultContainer.appendChild(dayScheduleDiv);
            scheduleArray.push(daySchedule);
        });

        localStorage.setItem("schedule", JSON.stringify(scheduleArray));

        form.style.display = "none";
        removeFormButton.style.display = "inline";
    }

    removeFormButton.addEventListener("click", () => {
        form.style.display = "block";
        removeFormButton.style.display = "none";
        while (resultContainer.firstChild) {
            resultContainer.removeChild(resultContainer.firstChild);
        }
        localStorage.removeItem("schedule");
    });
});