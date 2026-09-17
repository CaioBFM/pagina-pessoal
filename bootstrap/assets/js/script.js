(function () {
    "use strict";

    var html = document.documentElement;
    var themeButton = document.getElementById("theme-toggle");
    var themeIcon = themeButton ? themeButton.querySelector("i") : null;
    var storageKey = "caio-portfolio-theme";

    function setTheme(theme) {
        var isDark = theme === "dark";
        html.setAttribute("data-bs-theme", theme);
        if (themeButton) {
            themeButton.setAttribute("aria-pressed", String(isDark));
            themeButton.setAttribute("aria-label", isDark ? "Ativar tema claro" : "Ativar tema escuro");
        }
        if (themeIcon) {
            themeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
        }
    }

    var savedTheme = localStorage.getItem(storageKey);
    var preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(savedTheme || preferredTheme);

    if (themeButton) {
        themeButton.addEventListener("click", function () {
            var nextTheme = html.getAttribute("data-bs-theme") === "dark" ? "light" : "dark";
            setTheme(nextTheme);
            localStorage.setItem(storageKey, nextTheme);
        });
    }

    document.querySelectorAll("#menu .nav-link").forEach(function (link) {
        link.addEventListener("click", function () {
            var menu = document.getElementById("menu");
            if (menu && menu.classList.contains("show")) {
                bootstrap.Collapse.getOrCreateInstance(menu).hide();
            }
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

    document.querySelectorAll(".reveal").forEach(function (element) {
        observer.observe(element);
    });

    document.getElementById("ano").textContent = new Date().getFullYear();
})();
