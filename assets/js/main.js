/* =========================================================
   Hochzeitsgeschenk-Website – zentrales JavaScript
   - Mobile-Navigation
   - Header Scroll-Effekt
   - Scroll-Reveal Animationen
   - Bildergalerie mit Lightbox (nur auf Restaurant-Seiten)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileNav();
  initScrollReveal();
  initGalleryLightbox();
});

/* ---------- Header: Hintergrund beim Scrollen ---------- */
function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

/* ---------- Mobile Navigation ---------- */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "✕" : "☰";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    });
  });
}

/* ---------- Scroll-Reveal ---------- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  if (!("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ---------- Bildergalerie + Lightbox ---------- */
/*
  Hinweis zu fehlenden Bildern: Solange keine echten Fotos im jeweiligen
  Ordner "assets/images/restaurant-X/" liegen, greift die globale Funktion
  handleGalleryImgError() (siehe unten) und verwandelt die Kachel in einen
  dezenten Platzhalter. Die Klick-/Lightbox-Logik prüft den Zustand jeder
  Kachel bei jedem Klick neu (nicht nur einmal beim Laden der Seite), damit
  das zuverlässig funktioniert, egal wann ein Bild lädt oder fehlschlägt.
*/
function initGalleryLightbox() {
  const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
  const lightbox = document.querySelector(".lightbox");
  if (!galleryItems.length || !lightbox) return;

  const lightboxImg = lightbox.querySelector("img");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  const prevBtn = lightbox.querySelector(".lightbox-prev");
  const nextBtn = lightbox.querySelector(".lightbox-next");

  let currentIndex = 0;

  const isUsable = (item) =>
    !item.classList.contains("is-placeholder") && item.hasAttribute("data-full");

  const usableItems = () => galleryItems.filter(isUsable);

  const openLightbox = (item) => {
    const items = usableItems();
    currentIndex = items.indexOf(item);
    if (currentIndex === -1) return;
    updateLightboxImage(items);
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  };

  const updateLightboxImage = (items) => {
    const item = items[currentIndex];
    if (!item) return;
    lightboxImg.src = item.getAttribute("data-full");
    lightboxImg.alt = item.getAttribute("data-alt") || "";
  };

  const showPrev = () => {
    const items = usableItems();
    if (!items.length) return;
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateLightboxImage(items);
  };

  const showNext = () => {
    const items = usableItems();
    if (!items.length) return;
    currentIndex = (currentIndex + 1) % items.length;
    updateLightboxImage(items);
  };

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (!isUsable(item)) return;
      openLightbox(item);
    });
  });

  closeBtn?.addEventListener("click", closeLightbox);
  prevBtn?.addEventListener("click", showPrev);
  nextBtn?.addEventListener("click", showNext);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showPrev();
    if (event.key === "ArrowRight") showNext();
  });
}

/* Hinweis: Die Fallback-Funktionen handleCardImgError() und
   handleGalleryImgError() für fehlende Bilder sind bewusst als Inline-Script
   im <head> jeder HTML-Seite definiert (nicht hier), damit sie garantiert
   verfügbar sind, sobald ein <img>-Tag beim Rendern einen Ladefehler
   auslöst – auch wenn das noch vor dem Laden dieser Datei passiert. */
