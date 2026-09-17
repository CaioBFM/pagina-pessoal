(function () {
    "use strict";

    var html = document.documentElement;
    var themeButton = document.getElementById("theme-toggle");
    var themeIcon = themeButton.querySelector("i");
    var storageKey = "caio-portfolio-theme";

    function setTheme(theme) {
        var isDark = theme === "dark";
        html.setAttribute("data-theme", theme);
        themeButton.setAttribute("aria-pressed", String(isDark));
        themeButton.setAttribute("aria-label", isDark ? "Ativar tema claro" : "Ativar tema escuro");
        themeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }

    var savedTheme = localStorage.getItem(storageKey);
    setTheme(savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
    themeButton.addEventListener("click", function () {
        var next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        setTheme(next);
        localStorage.setItem(storageKey, next);
    });

    document.querySelectorAll(".navbar-burger").forEach(function (burger) {
        burger.addEventListener("click", function () {
            var menu = document.getElementById(burger.dataset.target);
            burger.classList.toggle("is-active");
            menu.classList.toggle("is-active");
            burger.setAttribute("aria-expanded", String(menu.classList.contains("is-active")));
        });
    });

    document.querySelectorAll("#menu a").forEach(function (link) {
        link.addEventListener("click", function () {
            document.querySelector(".navbar-burger").classList.remove("is-active");
            document.getElementById("menu").classList.remove("is-active");
        });
    });

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (item) { observer.observe(item); });
    document.getElementById("ano").textContent = new Date().getFullYear();
})();
