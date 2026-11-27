// ---------- Hash router ----------
// The page uses in-page sections, so routing just tracks the active link.
// CSS `scroll-behavior: smooth` handles the actual scrolling.

export function initRouter() {
  const links = Array.from(document.querySelectorAll("nav a[href^='#']"));
  if (links.length === 0) {
    return;
  }

  function setActive() {
    const hash = window.location.hash || "#top";
    links.forEach((link) => {
      const isActive = link.getAttribute("href") === hash;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  window.addEventListener("hashchange", setActive);
  setActive();
}
