const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".site-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
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

const navLinks = [...document.querySelectorAll(".site-nav a")];
const localNavSections = navLinks
  .map((link) => {
    const url = new URL(link.href);
    const id = url.hash.slice(1);
    const section = id ? document.getElementById(id) : null;
    return section && url.pathname === window.location.pathname ? { link, section } : null;
  })
  .filter(Boolean);

const setActiveNavLink = (activeLink) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link === activeLink);
  });
};

if (localNavSections.length > 0) {
  setActiveNavLink(localNavSections[0].link);

  const navObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visibleEntry) {
        return;
      }

      const activeSection = localNavSections.find(({ section }) => section === visibleEntry.target);
      if (activeSection) {
        setActiveNavLink(activeSection.link);
      }
    },
    { rootMargin: "-24% 0px -54% 0px", threshold: [0.1, 0.35, 0.6] }
  );

  localNavSections.forEach(({ section }) => navObserver.observe(section));
}

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

const projectTabs = [...document.querySelectorAll("[role='tab'][aria-controls^='projects-']")];

const setProjectTab = (activeTab) => {
  projectTabs.forEach((tab) => {
    const isActive = tab === activeTab;
    const panelId = tab.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;

    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.setAttribute("tabindex", isActive ? "0" : "-1");

    if (panel) {
      panel.hidden = !isActive;
    }
  });
};

projectTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => setProjectTab(tab));
  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const nextTab = projectTabs[(index + direction + projectTabs.length) % projectTabs.length];
    nextTab.focus();
    setProjectTab(nextTab);
  });
});
