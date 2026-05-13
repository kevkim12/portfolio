const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open") ?? false;
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open navigation");
  }
});

const galleryImage = document.querySelector("[data-gallery-image]");
const galleryTitle = document.querySelector("[data-gallery-title]");
const galleryCaption = document.querySelector("[data-gallery-caption]");
const galleryThumbs = [...document.querySelectorAll("[data-gallery-thumb]")];
const galleryPrev = document.querySelector("[data-gallery-prev]");
const galleryNext = document.querySelector("[data-gallery-next]");
let activeGalleryIndex = 0;

const setGallerySlide = (index) => {
  if (!galleryImage || galleryThumbs.length === 0) {
    return;
  }

  activeGalleryIndex = (index + galleryThumbs.length) % galleryThumbs.length;
  const activeThumb = galleryThumbs[activeGalleryIndex];

  galleryImage.setAttribute("src", activeThumb.dataset.src ?? "");
  galleryImage.setAttribute("alt", activeThumb.dataset.alt ?? "");

  if (galleryTitle) {
    galleryTitle.textContent = activeThumb.dataset.title ?? "";
  }

  if (galleryCaption) {
    galleryCaption.textContent = activeThumb.dataset.caption ?? "";
  }

  galleryThumbs.forEach((thumb, thumbIndex) => {
    thumb.classList.toggle("is-active", thumbIndex === activeGalleryIndex);
  });
};

galleryThumbs.forEach((thumb, index) => {
  thumb.addEventListener("click", () => setGallerySlide(index));
});

galleryPrev?.addEventListener("click", () => setGallerySlide(activeGalleryIndex - 1));
galleryNext?.addEventListener("click", () => setGallerySlide(activeGalleryIndex + 1));
