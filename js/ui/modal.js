// ---------- Accessible modal ----------
// role="dialog" + aria-modal, Escape to close, backdrop click, focus return.

let lastFocused = null;

function onKeydown(event) {
  if (event.key === "Escape") {
    closeModal();
  }
}

export function openModal({ title, rows = [] }) {
  closeModal();
  lastFocused = document.activeElement;

  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  backdrop.id = "modal-backdrop";

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "modal-title");

  const head = document.createElement("div");
  head.className = "modal-head";

  const heading = document.createElement("h3");
  heading.id = "modal-title";
  heading.textContent = title;

  const close = document.createElement("button");
  close.type = "button";
  close.className = "modal-close";
  close.setAttribute("aria-label", "Close");
  const closeIcon = document.createElement("i");
  closeIcon.className = "fa-solid fa-xmark";
  closeIcon.setAttribute("aria-hidden", "true");
  close.appendChild(closeIcon);
  close.addEventListener("click", closeModal);

  head.append(heading, close);

  const body = document.createElement("dl");
  body.className = "modal-body";
  rows.forEach((row) => {
    const term = document.createElement("dt");
    term.textContent = row[0];
    const value = document.createElement("dd");
    value.textContent = row[1];
    body.append(term, value);
  });

  modal.append(head, body);
  backdrop.appendChild(modal);

  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) {
      closeModal();
    }
  });

  document.body.appendChild(backdrop);
  document.addEventListener("keydown", onKeydown);
  close.focus();
}

export function closeModal() {
  const existing = document.getElementById("modal-backdrop");
  if (existing) {
    existing.remove();
  }
  document.removeEventListener("keydown", onKeydown);

  if (lastFocused && typeof lastFocused.focus === "function") {
    lastFocused.focus();
  }
  lastFocused = null;
}
