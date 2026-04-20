document.addEventListener("DOMContentLoaded", () => {
  setupBookingNavbar();
});

function setupBookingNavbar() {
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  const navbar = document.getElementById("navbar");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("active");
      mainNav.classList.toggle("show");
    });

    document.addEventListener("click", (e) => {
      if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
        mainNav.classList.remove("show");
        navToggle.classList.remove("active");
      }
    });

    const links = mainNav.querySelectorAll("a");
    links.forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("show");
        navToggle.classList.remove("active");
      });
    });
  }

  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }
}