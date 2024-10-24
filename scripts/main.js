(function () {
    document.addEventListener("DOMContentLoaded", function () {
        setTimeout(() => {
            const navigationEntries = performance.getEntriesByType("navigation");
            let loadTime = 0;

            if (navigationEntries.length > 0) {
                loadTime = navigationEntries[0].loadEventEnd - navigationEntries[0].startTime;
            }

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
    });
})();
