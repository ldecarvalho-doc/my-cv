// Theme toggle (persisted) + mobile sidebar toggle.
// Plain JS, no dependencies.

(function () {
  var root = document.documentElement;
  var saved = localStorage.getItem("theme");
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  var theme = saved || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", theme);

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.getElementById("theme-toggle");
    var label = document.getElementById("theme-toggle-label");

    function updateLabel() {
      var current = root.getAttribute("data-theme");
      if (label) label.textContent = current === "dark" ? "Switch to light mode" : "Switch to dark mode";
    }
    updateLabel();

    if (toggle) {
      toggle.addEventListener("click", function () {
        var current = root.getAttribute("data-theme");
        var next = current === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        localStorage.setItem("theme", next);
        updateLabel();
      });
    }

    var menuBtn = document.getElementById("menu-btn");
    var sidebar = document.getElementById("sidebar");
    var scrim = document.getElementById("scrim");

    function closeMenu() {
      sidebar.classList.remove("open");
      scrim.classList.remove("open");
    }

    if (menuBtn && sidebar && scrim) {
      menuBtn.addEventListener("click", function () {
        sidebar.classList.toggle("open");
        scrim.classList.toggle("open");
      });
      scrim.addEventListener("click", closeMenu);
    }
  });
})();
