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
    slidesPerView: 2,
    spaceBetween: 10,
    centeredSlides: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1200: {
            slidesPerView: 3,
        },
    },
});

