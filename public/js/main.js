/* =========================================
   DASHWAY MAIN JAVASCRIPT
========================================= */

/* =========================================
   SCROLL REVEAL ANIMATIONS
========================================= */

const revealElements = document.querySelectorAll(
  ".reveal-left, .reveal-right, .reveal-up, .footer-reveal",
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");

      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* =========================================
   HERO SLIDER
========================================= */

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDots = document.querySelectorAll(".hero-dot");
const nextButton = document.querySelector(".hero-next");
const prevButton = document.querySelector(".hero-prev");

let currentSlide = 0;
let heroInterval;

/* Show slide */

function showSlide(index) {
  if (!heroSlides.length) return;

  if (index >= heroSlides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = heroSlides.length - 1;
  } else {
    currentSlide = index;
  }

  heroSlides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentSlide);
  });

  heroDots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

/* Next */

function nextSlide() {
  showSlide(currentSlide + 1);
}

/* Previous */

function previousSlide() {
  showSlide(currentSlide - 1);
}

/* Automatic slider */

function startHeroSlider() {
  stopHeroSlider();

  heroInterval = setInterval(() => {
    nextSlide();
  }, 6000);
}

/* Stop slider */

function stopHeroSlider() {
  if (heroInterval) {
    clearInterval(heroInterval);
  }
}

/* Arrow buttons */

if (nextButton) {
  nextButton.addEventListener("click", () => {
    nextSlide();
    startHeroSlider();
  });
}

if (prevButton) {
  prevButton.addEventListener("click", () => {
    previousSlide();
    startHeroSlider();
  });
}

/* Dots */

heroDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    startHeroSlider();
  });
});

/* Start */

if (heroSlides.length > 1) {
  startHeroSlider();
}

/* =========================================
   PAUSE HERO WHILE MOUSE IS OVER IT
========================================= */

const heroSection = document.querySelector(".hero-section");

if (heroSection) {
  heroSection.addEventListener("mouseenter", () => {
    stopHeroSlider();
  });

  heroSection.addEventListener("mouseleave", () => {
    startHeroSlider();
  });
}

/* =========================================
   DARK MODE
========================================= */

const themeToggle = document.querySelector("#themeToggle");

const savedTheme = localStorage.getItem("dashway-theme");

/* Apply saved theme */

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
}

/* Update toggle icon */

function updateThemeButton() {
  if (!themeToggle) return;

  const icon = themeToggle.querySelector("i");
  const text = themeToggle.querySelector("span");

  const darkMode = document.body.classList.contains("dark-mode");

  if (darkMode) {
    icon.className = "fas fa-sun";

    if (text) {
      text.textContent = "Light Mode";
    }
  } else {
    icon.className = "fas fa-moon";

    if (text) {
      text.textContent = "Dark Mode";
    }
  }
}

/* Toggle */

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem("dashway-theme", isDark ? "dark" : "light");

    updateThemeButton();
  });
}

/* Initialize */

updateThemeButton();

/* =========================================
   SMOOTH ANCHOR LINKS
========================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

/* =========================================
   PREVENT HERO FROM RUNNING IF TAB IS HIDDEN
========================================= */

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopHeroSlider();
  } else {
    startHeroSlider();
  }
});
/* =========================================
   HEADER MENU
========================================= */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("active");

    mobileMenu.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");

    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });
}

/* =========================================
   MOBILE SERVICES ACCORDION
========================================= */

const mobileServicesToggle = document.getElementById("mobileServicesToggle");

const mobileServicesContent = document.getElementById("mobileServicesContent");

if (mobileServicesToggle && mobileServicesContent) {
  mobileServicesToggle.addEventListener("click", () => {
    const isOpen = mobileServicesToggle.classList.toggle("active");

    mobileServicesContent.classList.toggle("active");

    mobileServicesToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false",
    );
  });
}

/* =========================================
   CLOSE MOBILE MENU WHEN LINK IS CLICKED
========================================= */

const mobileLinks = document.querySelectorAll(".mobile-menu a");

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.classList.remove("active");
    mobileMenu.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Open menu");
  });
});

/* =========================================
   SEARCH TOGGLE
========================================= */

const searchToggle = document.getElementById("searchToggle");

const headerSearch = document.getElementById("headerSearch");

if (searchToggle && headerSearch) {
  searchToggle.addEventListener("click", () => {
    headerSearch.classList.toggle("active");

    const input = headerSearch.querySelector("input");

    if (headerSearch.classList.contains("active") && input) {
      setTimeout(() => {
        input.focus();
      }, 200);
    }
  });
}

/* =========================================
   CLOSE SEARCH WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener("click", (event) => {
  if (!headerSearch || !searchToggle) return;

  const clickedInsideSearch = headerSearch.contains(event.target);

  const clickedSearchButton = searchToggle.contains(event.target);

  if (!clickedInsideSearch && !clickedSearchButton) {
    headerSearch.classList.remove("active");
  }
});

/* =========================================
   CLOSE MOBILE MENU ON RESIZE
========================================= */

window.addEventListener("resize", () => {
  if (window.innerWidth > 850) {
    if (menuToggle) {
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }

    if (mobileMenu) {
      mobileMenu.classList.remove("active");
    }

    if (mobileServicesToggle) {
      mobileServicesToggle.classList.remove("active");
      mobileServicesToggle.setAttribute("aria-expanded", "false");
    }

    if (mobileServicesContent) {
      mobileServicesContent.classList.remove("active");
    }
  }
});
[];
/* =========================================
   GOOGLE TRANSLATION
========================================= */

const translationToggle = document.getElementById("translationToggle");

const translationMenu = document.getElementById("translationMenu");

const translationFlag = document.getElementById("translationFlag");

const currentLanguage = document.getElementById("currentLanguage");

/* -----------------------------------------
   Translation menu
----------------------------------------- */

if (translationToggle && translationMenu) {
  translationToggle.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen = translationMenu.classList.toggle("active");

    translationToggle.classList.toggle("active", isOpen);

    translationToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

/* -----------------------------------------
   Load Google Translate
----------------------------------------- */

window.googleTranslateElementInit = function () {
  if (window.google && window.google.translate) {
    new google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,fr,es,de,pt,zh-CN,ja",
        autoDisplay: false,
      },
      "google_translate_element",
    );
  }
};

/* -----------------------------------------
   Dynamically load Google Translate script
----------------------------------------- */

if (!document.querySelector("script[data-google-translate]")) {
  const googleScript = document.createElement("script");

  googleScript.src =
    "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

  googleScript.async = true;

  googleScript.setAttribute("data-google-translate", "true");

  document.head.appendChild(googleScript);
}

/* -----------------------------------------
   Select language
----------------------------------------- */

const languageOptions = document.querySelectorAll(".language-option");

languageOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const language = option.dataset.lang;

    const flag = option.dataset.flag;

    const name = option.dataset.name;

    /* Update button */

    if (translationFlag) {
      translationFlag.textContent = flag;
    }

    if (currentLanguage) {
      currentLanguage.textContent = name;
    }

    /* Close menu */

    translationMenu?.classList.remove("active");

    translationToggle?.classList.remove("active");

    translationToggle?.setAttribute("aria-expanded", "false");

    /* English = original language */

    if (language === "en") {
      setGoogleLanguage("en");
      return;
    }

    /* Other languages */

    setGoogleLanguage(language);
  });
});

/* -----------------------------------------
   Tell Google Translate what language
----------------------------------------- */

function setGoogleLanguage(language) {
  const googleSelect = document.querySelector(".goog-te-combo");

  if (!googleSelect) {
    return;
  }

  googleSelect.value = language;

  googleSelect.dispatchEvent(new Event("change"));
}

/* -----------------------------------------
   Close translation menu outside
----------------------------------------- */

document.addEventListener("click", (event) => {
  if (!translationMenu) {
    return;
  }

  if (
    !translationMenu.contains(event.target) &&
    !translationToggle?.contains(event.target)
  ) {
    translationMenu.classList.remove("active");

    translationToggle?.classList.remove("active");

    translationToggle?.setAttribute("aria-expanded", "false");
  }
});
/* =========================================================
   ABOUT PAGE - ACHIEVEMENT COUNTERS
========================================================= */

const counters = document.querySelectorAll(".counter-num");

if (counters.length) {
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target);

        let current = 0;

        const duration = 1800;
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Smooth easing
          const easedProgress = 1 - Math.pow(1 - progress, 3);

          current = Math.floor(target * easedProgress);

          counter.textContent = current.toLocaleString();

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString();
          }
        };

        requestAnimationFrame(updateCounter);

        observer.unobserve(counter);
      });
    },
    {
      threshold: 0.5,
    },
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}
/* =========================================================
   ADMIN SHIPMENT HISTORY SEARCH & FILTER
========================================================= */

const shipmentSearch = document.getElementById("shipmentSearch");
const shipmentStatusFilter = document.getElementById("shipmentStatusFilter");

const shipmentRows = document.querySelectorAll(".shipment-row");

function filterShipments() {
  const searchValue = shipmentSearch
    ? shipmentSearch.value.toLowerCase().trim()
    : "";

  const statusValue = shipmentStatusFilter ? shipmentStatusFilter.value : "all";

  shipmentRows.forEach((row) => {
    const rowText = row.textContent.toLowerCase();
    const rowStatus = row.dataset.status;

    const matchesSearch = !searchValue || rowText.includes(searchValue);

    const matchesStatus = statusValue === "all" || rowStatus === statusValue;

    row.style.display = matchesSearch && matchesStatus ? "" : "none";
  });
}

if (shipmentSearch) {
  shipmentSearch.addEventListener("input", filterShipments);
}

if (shipmentStatusFilter) {
  shipmentStatusFilter.addEventListener("change", filterShipments);
}
// ============================================
// SHIPMENT TRACKING PAGE
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  const trackingPage =
    document.querySelector(".tracking-page") ||
    document.querySelector(".track-page");

  if (!trackingPage) return;

  // ============================================
  // TRACKING FORM VALIDATION
  // ============================================

  const trackingForm = document.querySelector("#trackingForm");
  const trackingInput = document.querySelector("#trackingNumber");
  const trackingError =
    document.querySelector("#trackingError") ||
    document.querySelector("#trackingFormError");

  if (trackingForm && trackingInput) {
    trackingForm.addEventListener("submit", (e) => {
      const trackingNumber = trackingInput.value.trim();

      if (!trackingNumber) {
        e.preventDefault();

        if (trackingError) {
          trackingError.textContent = "Please enter your tracking number.";
          trackingError.classList.add("show");
        }

        trackingInput.classList.add("input-error");
        trackingInput.focus();
        return;
      }

      // DashWay tracking numbers start with DW
      if (!/^DW\d+$/i.test(trackingNumber)) {
        e.preventDefault();

        if (trackingError) {
          trackingError.textContent =
            "Please enter a valid DashWay tracking number.";
          trackingError.classList.add("show");
        }

        trackingInput.classList.add("input-error");
        trackingInput.focus();
        return;
      }

      trackingInput.classList.remove("input-error");

      if (trackingError) {
        trackingError.classList.remove("show");
      }
    });

    trackingInput.addEventListener("input", () => {
      trackingInput.classList.remove("input-error");

      if (trackingError) {
        trackingError.classList.remove("show");
      }
    });
  }

  // ============================================
  // DELIVERY PROGRESS & TRUCK ANIMATION
  // ============================================

  const progressCard = document.querySelector(".track-progress-card");
  const progressBar = document.querySelector("#deliveryProgressFill");
  const progressText = document.querySelector("#trackingProgressPercent");
  const deliveryTruck = document.querySelector("#trackingProgressTruck");

  if (progressCard) {
    const currentStatus = (progressCard.dataset.currentStatus || "")
      .trim()
      .toLowerCase();

    const statusStages = [
      "pending",
      "picked up",
      "in transit",
      "arrives airport",
      "package departed",
      "arrived country of destination",
      "awaiting custom clearance",
      "custom clearance",
      "out for delivery",
      "delivered",
    ];

    let progress = 0;

    if (currentStatus === "cancelled") {
      progress = 0;
    } else {
      const stageIndex = statusStages.findIndex((s) => s === currentStatus);

      if (stageIndex !== -1) {
        progress = Math.round((stageIndex / (statusStages.length - 1)) * 100);
      } else {
        // Fallback: Calculate percentage based on logged history steps
        const historyCount = parseInt(
          progressCard.dataset.historyCount || "1",
          10,
        );
        progress = Math.min(
          100,
          Math.round((historyCount / statusStages.length) * 100),
        );
      }
    }

    // Animate fill bar width
    if (progressBar) {
      setTimeout(() => {
        progressBar.style.width = `${progress}%`;
      }, 300);
    }

    // Move delivery truck along the track
    if (deliveryTruck) {
      setTimeout(() => {
        deliveryTruck.style.left = `${progress}%`;
      }, 300);
    }

    // Animate percentage count up
    if (progressText) {
      animateTrackingNumber(progressText, 0, progress, 1000);
    }
  }

  // ============================================
  // TIMELINE REVEAL ANIMATION
  // ============================================

  const timelineItems = document.querySelectorAll(".tracking-timeline-item");

  if (timelineItems.length) {
    const timelineObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
      },
    );

    timelineItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 100}ms`;
      timelineObserver.observe(item);
    });
  }

  // ============================================
  // CURRENT STATUS HIGHLIGHT
  // ============================================

  const currentStatusBadge = document.querySelector(".tracking-status-current");

  if (currentStatusBadge) {
    currentStatusBadge.classList.add("status-active");
  }

  // ============================================
  // COPY TRACKING NUMBER
  // ============================================

  const copyButton = document.querySelector("#copyTrackingNumber");
  const trackingNumberDisplay = document.querySelector(
    ".tracking-number-value",
  );

  if (copyButton && trackingNumberDisplay) {
    copyButton.addEventListener("click", async () => {
      const trackingNumber = trackingNumberDisplay.textContent.trim();

      try {
        await navigator.clipboard.writeText(trackingNumber);

        const originalHTML = copyButton.innerHTML;

        copyButton.innerHTML = '<i class="fa-solid fa-check"></i>';

        setTimeout(() => {
          copyButton.innerHTML = originalHTML;
        }, 2000);
      } catch (error) {
        console.error("Unable to copy tracking number:", error);
      }
    });
  }

  // ============================================
  // SMOOTH SCROLL TO TRACKING RESULTS
  // ============================================

  const resultSection = document.querySelector("#trackingResult");

  if (resultSection && window.location.hash === "#trackingResult") {
    setTimeout(() => {
      resultSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  }
});

// ============================================
// ANIMATE PERCENTAGE COUNTER
// ============================================

function animateTrackingNumber(element, start, end, duration) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;

    const progress = Math.min(elapsed / duration, 1);

    const easedProgress = 1 - Math.pow(1 - progress, 3);

    const currentValue = Math.round(start + (end - start) * easedProgress);

    element.textContent = `${currentValue}%`;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}
if (deliveryTruck) {
  setTimeout(() => {
    // Keep position clamped safely between 0% and 100%
    const clampedProgress = Math.max(0, Math.min(progress, 100));

    deliveryTruck.style.left = `${clampedProgress}%`;
    deliveryTruck.style.setProperty("--progress", `${clampedProgress}%`);
  }, 300);
}
