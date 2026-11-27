// ---------- Pure helpers ----------
// No DOM reads/writes except the optional query helper.

// Build initials for an avatar circle ("Dr. John Mac" -> "JM").
export function getInitials(fullName) {
  const words = String(fullName).replace("Dr.", "").trim().split(" ");
  const first = words[0] ? words[0][0] : "";
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

// Escape untrusted text if it ever must be interpolated into HTML.
export function escapeHTML(value) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(value).replace(/[&<>"']/g, (char) => map[char]);
}

// Short query-selector helper.
export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

// Delay a function until calls stop for `delay` ms.
export function debounce(fn, delay = 200) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
