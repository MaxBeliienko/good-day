(function () {
  "use strict";

  /* Mobile navigation toggle */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
      });
    });
  }

  /* Cookie consent banner */
  var COOKIE_KEY = "GoodDay_cookie_consent";
  var banner = document.querySelector(".cookie-banner");
  if (banner) {
    var stored = null;
    try {
      stored = localStorage.getItem(COOKIE_KEY);
    } catch (e) {}
    if (!stored) {
      window.setTimeout(function () {
        banner.classList.add("is-visible");
      }, 600);
    }
    var accept = banner.querySelector("[data-cookie-accept]");
    var reject = banner.querySelector("[data-cookie-reject]");
    function hideBanner(value) {
      try {
        localStorage.setItem(COOKIE_KEY, value);
      } catch (e) {}
      banner.classList.remove("is-visible");
    }
    if (accept)
      accept.addEventListener("click", function () {
        hideBanner("accepted");
      });
    if (reject)
      reject.addEventListener("click", function () {
        hideBanner("rejected");
      });
  }

  /* Contact form (front-end only demo submission) */
  var form = document.querySelector("#contact-form");
  if (form) {
    var status = form.querySelector(".form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      if (status) {
        status.textContent =
          "Mesajınız alındı. Sizinle en kısa sürede iletişime geçeceğiz.";
        status.className = "form-status success";
      }
      window.setTimeout(function () {
        window.location.href = "thank-you.html";
      }, 700);
    });
  }

  /* Scroll reveal for cards/sections */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Active nav link highlighting by current page */
  var current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === current) link.classList.add("active");
  });
})();
