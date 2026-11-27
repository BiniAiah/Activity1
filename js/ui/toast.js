// ---------- Toast notifications ----------
// Non-blocking status messages built from NotificationFactory.

import { NotificationFactory } from "../patterns/factory.js";

function getStack() {
  let stack = document.getElementById("toast-stack");
  if (!stack) {
    stack = document.createElement("div");
    stack.id = "toast-stack";
    stack.className = "toast-stack";
    stack.setAttribute("aria-live", "polite");
    document.body.appendChild(stack);
  }
  return stack;
}

export function showToast(type, message, timeout = 3200) {
  const notification = NotificationFactory.create(type, message);
  const stack = getStack();

  const toast = document.createElement("div");
  toast.className = "toast toast-" + notification.type;
  toast.setAttribute("role", "status");

  const icon = document.createElement("i");
  icon.className = "fa-solid " + notification.icon;
  icon.setAttribute("aria-hidden", "true");

  const text = document.createElement("span");
  text.textContent = notification.message;

  toast.append(icon, text);
  stack.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(() => {
    toast.classList.remove("show");
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
    setTimeout(() => toast.remove(), 400);
  }, timeout);
}
