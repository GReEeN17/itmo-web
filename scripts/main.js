(function () {
    document.addEventListener("DOMContentLoaded", function () {
        loadTime = Date.now()- performance.timing.navigationStart

        loadTime = loadTime / 1000;

        const loadTimeElement = document.getElementById("loadTime");
        if (loadTimeElement) {
            if (loadTime < 0.01) {
                loadTimeElement.textContent = "Страница загружена менее чем за 0.01 сек.";
            } else {
                loadTimeElement.textContent = `Страница загружена за ${loadTime.toFixed(10)} сек.`;
            }
        }

        const links = document.querySelectorAll('.nav__list-item a');
        links.forEach(link => {
            if (link.href === window.location.href) {
                link.classList.add('active');
            }
        });

        links.forEach(link => {
            link.addEventListener('mouseover', function () {
                link.style.backgroundColor = '#4CAF50';
                link.style.color = 'white';
            });

            link.addEventListener('mouseout', function () {
                link.style.backgroundColor = '';
                link.style.color = '';
            });
        });
    });
})();

const swiper = new Swiper('.swiper-container', {
    // Параметры Swiper
    slidesPerView: 2, // Количество слайдов, отображаемых одновременно
    spaceBetween: 10, // Расстояние между слайдами
    centeredSlides: true, // Центрирование активного слайда
    pagination: {
        el: '.swiper-pagination', // Элемент для пагинации
        clickable: true, // Возможность клика по пагинации
    },
    navigation: {
        nextEl: '.swiper-button-next', // Кнопка "следующий"
        prevEl: '.swiper-button-prev', // Кнопка "предыдущий"
    },
    breakpoints: {
        // Настройки для различных размеров экрана
        768: {
            slidesPerView: 2, // 2 слайда на экранах шире 768px
        },
        1200: {
            slidesPerView: 3, // 3 слайда на экранах шире 1200px
        },
    },
});

