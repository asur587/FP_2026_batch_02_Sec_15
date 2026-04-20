document.addEventListener("DOMContentLoaded", () => {
  setupRevealOnScroll();
  setupMouseParallax();
  setupTiltCards();
  setupGSAPParallax();
  setupFloatingCardsInteraction();
});

function setupRevealOnScroll() {
  const revealElements = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
}

function setupMouseParallax() {
  const clouds = document.querySelector(".clouds");
  const mountains = document.querySelector(".mountains");
  const foreground = document.querySelector(".foreground");
  const starsLayer = document.querySelector(".stars-layer");
  const travelIcons = document.querySelector(".travel-icons");

  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 26;
    const y = (e.clientY / window.innerHeight - 0.5) * 26;

    if (starsLayer) starsLayer.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    if (clouds) clouds.style.transform = `translate(${x}px, ${y}px)`;
    if (mountains) mountains.style.transform = `translate(${x * 0.45}px, ${y * 0.45}px)`;
    if (travelIcons) travelIcons.style.transform = `translate(${x * 0.65}px, ${y * 0.5}px)`;
    if (foreground) foreground.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });
}

function setupTiltCards() {
  const tiltCards = document.querySelectorAll(".tilt-card");

  tiltCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function setupGSAPParallax() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".hero-content", {
    y: 90,
    opacity: 0.85,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.to(".clouds", {
    y: 80,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.to(".mountains", {
    y: 40,
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.utils.toArray(".availability-card, .offer-card, .planner-card, .testimonial-card").forEach(card => {
    gsap.from(card, {
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%"
      }
    });
  });
}

function setupFloatingCardsInteraction() {
  const floatingCards = document.querySelectorAll(".hero-floating-card");

  floatingCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.boxShadow = "0 20px 45px rgba(94,231,255,0.22)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "";
    });
  });
}