import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "font-awesome/css/font-awesome.min.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "fullpage.js/dist/fullpage.css";
import fullpage from "fullpage.js";
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Custom CSS imports
import "../css/animate.css";
import "../css/templatemo-style.css";
import "../css/responsive.css";

// Initialize Swiper
function initSwiper(selector, options) {
  if (document.querySelector(selector)) {
    new Swiper(selector, {
      modules: [Navigation, Pagination, Autoplay],
      ...options,
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      preloader.style.transition = "opacity 0.5s ease";
      preloader.style.opacity = "0";
      setTimeout(() => preloader.remove(), 500);
    }
  });

  // FullPage.js
  if (document.querySelector(".fullpage-default")) {
    new fullpage(".fullpage-default", {
      licenseKey: "gplv3-license", // Using GPLv3 key for open source use
      anchors: [
        "slide01",
        "slide02",
        "slide03",
        "slide04",
        "slide05",
        "slide06",
        "slide07",
      ],
      menu: "#nav",
      lazyLoad: true,
      navigation: true,
      navigationPosition: "right",
      scrollOverflow: true,
      responsiveWidth: 768,
      responsiveHeight: 600,
      onLeave: (origin, destination, direction) => {
        const section = destination.item;
        const animatedElements = section.querySelectorAll(".animate");
        animatedElements.forEach((el, index) => {
          setTimeout(() => {
            el.classList.add("animated", el.dataset.animate || "fadeInUp");
            el.classList.remove("animate");
          }, index * 100);
        });

        // Animate counters if in view
        if (section.querySelector(".count-number")) {
          animateCounters(section);
        }
        // Animate skills if in view
        if (section.querySelector(".skills-row")) {
          section.querySelector(".skills-row").classList.add("view");
        }
      },
    });
  }

  // Swiper configurations replacing Owl Carousel
  // Note: HTML structure needs to change from 'owl-carousel' to 'swiper'

  // Facts List
  initSwiper(".facts-list-swiper", {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    breakpoints: {
      576: { slidesPerView: 2, spaceBetween: 20 },
      992: { slidesPerView: 3, spaceBetween: 30 },
    },
    pagination: { el: ".swiper-pagination", clickable: true },
  });

  // Services List
  initSwiper(".services-list-swiper", {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    breakpoints: {
      576: { slidesPerView: 2, spaceBetween: 20 },
      992: { slidesPerView: 3, spaceBetween: 30 },
    },
    pagination: { el: ".swiper-pagination", clickable: true },
  });

  // Gallery List
  initSwiper(".gallery-list-swiper", {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      576: { slidesPerView: 2, spaceBetween: 20 },
      992: { slidesPerView: 3, spaceBetween: 30 },
    },
    pagination: { el: ".swiper-pagination", clickable: true },
  });

  // Navbar Toggle (Bootstrap 5 handles most, but custom toggle logic)
  const navbarToggle = document.querySelector(".navbar-toggle");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  if (navbarToggle && navbarCollapse) {
    navbarToggle.addEventListener("click", (e) => {
      e.preventDefault();
      navbarCollapse.classList.toggle("show");
    });

    // Close on link click
    document.querySelectorAll(".navigation-menu > li > a").forEach((link) => {
      link.addEventListener("click", () => {
        navbarCollapse.classList.remove("show");
      });
    });
  }

  // Scroll Down Button
  const nextSectionBtn = document.querySelector(".next-section");
  if (nextSectionBtn && fullpage_api) {
    nextSectionBtn.addEventListener("click", () => {
      fullpage_api.moveSectionDown();
    });
  }

  // Contact Form
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbz6DLC14VqRAvFnelR9jrP_9hIUAzZTzXpgcD4vjbsqUfu6eg2gYuPVAadN8EyuolI_cg/exec";
  const form = document.forms["google-sheet"];

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;
      submitBtn.innerText = "Sending...";
      submitBtn.disabled = true;

      fetch(scriptURL, { method: "POST", body: new FormData(form) })
        .then((response) => {
          alert("Thanks for Contacting us..! We Will Contact You Soon...");
          form.reset();
          submitBtn.innerText = originalText;
          submitBtn.disabled = false;
        })
        .catch((error) => {
          console.error("Error!", error.message);
          alert("Error sending message. Please try again.");
          submitBtn.innerText = originalText;
          submitBtn.disabled = false;
        });
    });
  }
});

function animateCounters(container) {
  const counters = container.querySelectorAll(".count-number");
  counters.forEach((counter) => {
    if (!counter.classList.contains("counted")) {
      const target = parseInt(counter.innerText);
      counter.innerText = "0";
      const duration = 1000;
      const start = performance.now();

      const step = (timestamp) => {
        const progress = Math.min((timestamp - start) / duration, 1);
        counter.innerText = Math.floor(progress * target);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          counter.innerText = target;
          counter.classList.add("counted");
        }
      };
      window.requestAnimationFrame(step);
    }
  });
}
