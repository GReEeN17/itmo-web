document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("plannerForm");
    const resultContainer = document.getElementById("resultContainer");
    const removeFormButton = document.getElementById("removeFormButton");

    const storedMinPlaces = localStorage.getItem("minPlaces");
    const storedTransport = localStorage.getItem("transport");

    if (storedMinPlaces) {
        document.getElementById("minPlaces").value = storedMinPlaces;
    }

    if (storedTransport) {
        document.getElementById("transport").value = storedTransport;
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

        resultContainer.innerHTML = "";

        const title = document.createElement("h2");
        title.textContent = "Ваш план на неделю:";
        resultContainer.appendChild(title);

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

            resultContainer.appendChild(daySchedule);
        });

        form.style.display = "none";
        removeFormButton.style.display = "inline";
    }

    removeFormButton.addEventListener("click", () => {
        form.style.display = "block";
        removeFormButton.style.display = "none";
        resultContainer.innerHTML = "";
    });
});