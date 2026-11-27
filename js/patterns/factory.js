// ---------- FACTORY PATTERN ----------
// Factories centralize object creation so object literals are not repeated.

import { store } from "./singleton.js";
import { formatManila } from "../utils/manilaTime.js";
import { getInitials } from "../utils/helpers.js";

// Builds a patient/appointment record.
export const AppointmentFactory = {
  create({ name, age, condition }) {
    return {
      id: store.nextId(),
      name: String(name).trim(),
      age: Number(age),
      condition: String(condition).trim(),
      status: "Waiting",
      createdAt: formatManila(),
      describe() {
        return this.name + " — Age " + this.age + " · " + this.condition;
      }
    };
  }
};

// Builds DOM cards from trusted catalog data using safe text nodes.
export const UICardFactory = {
  createDoctorCard(doctor) {
    const card = document.createElement("article");
    card.className = "card";

    const top = document.createElement("div");
    top.className = "doctor-top";

    const avatar = document.createElement("span");
    avatar.className = "avatar";
    avatar.textContent = getInitials(doctor.name);

    const name = document.createElement("h3");
    name.textContent = doctor.name;

    top.append(avatar, name);

    const specPill = document.createElement("span");
    specPill.className = "spec-pill";
    specPill.textContent = doctor.specialty;

    const schedule = document.createElement("p");
    schedule.className = "schedule";
    const clock = document.createElement("i");
    clock.className = "fa-regular fa-clock";
    clock.setAttribute("aria-hidden", "true");
    schedule.append(clock, document.createTextNode(" " + doctor.schedule));

    card.append(top, specPill, schedule);
    return card;
  },

  createServiceCard(service) {
    const card = document.createElement("article");
    card.className = "card";

    const iconWrap = document.createElement("div");
    iconWrap.className = "service-icon";
    const icon = document.createElement("i");
    icon.className = "fa-solid " + service.icon;
    icon.setAttribute("aria-hidden", "true");
    iconWrap.appendChild(icon);

    const name = document.createElement("h3");
    name.textContent = service.name;

    const desc = document.createElement("p");
    desc.className = "muted small";
    desc.textContent = service.desc;

    const price = document.createElement("span");
    price.className = "service-price";
    price.textContent = service.price;

    card.append(iconWrap, name, desc, price);
    return card;
  }
};

// Builds a small notification model for the toast UI.
export const NotificationFactory = {
  create(type, message) {
    const icons = {
      success: "fa-circle-check",
      error: "fa-circle-exclamation",
      info: "fa-circle-info"
    };
    return {
      type: type,
      message: message,
      icon: icons[type] || icons.info
    };
  }
};
