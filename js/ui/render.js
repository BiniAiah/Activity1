// ---------- Rendering ----------
// All DOM writes live here. Catalog data is trusted, but user data is still
// inserted with textContent / text nodes to stay XSS-safe.

import { UICardFactory } from "../patterns/factory.js";

export function renderDoctors(doctors) {
  const list = document.getElementById("doctor-list");
  list.replaceChildren();
  doctors.forEach((doctor) => {
    list.appendChild(UICardFactory.createDoctorCard(doctor));
  });
}

export function renderServices(services) {
  const list = document.getElementById("services-list");
  list.replaceChildren();
  services.forEach((service) => {
    list.appendChild(UICardFactory.createServiceCard(service));
  });
}

export function renderHospitalInfo(info) {
  const banner = document.getElementById("hospital-info");
  banner.replaceChildren();

  const parts = [
    { icon: "fa-hospital", text: info.name },
    { icon: "fa-location-dot", text: info.address },
    { icon: "fa-phone", text: info.phone }
  ];

  parts.forEach((part, index) => {
    if (index > 0) {
      banner.appendChild(document.createTextNode("  •  "));
    }
    const icon = document.createElement("i");
    icon.className = "fa-solid " + part.icon;
    icon.setAttribute("aria-hidden", "true");
    banner.append(icon, document.createTextNode(" " + part.text));
  });
}

export function renderPatients(patients) {
  const list = document.getElementById("patient-list");
  list.replaceChildren();

  if (patients.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "No patients registered yet. Use the form above.";
    list.appendChild(empty);
    return;
  }

  patients.forEach((patient) => {
    const item = document.createElement("li");
    item.className = "patient-item";
    item.dataset.id = String(patient.id);
    item.tabIndex = 0;
    item.setAttribute("role", "button");

    const name = document.createElement("strong");
    name.textContent = "#" + patient.id + " " + patient.name;

    const details = document.createElement("span");
    details.textContent = " — Age " + patient.age + " · " + patient.condition;

    const pill = document.createElement("span");
    pill.className = "status-pill";
    const icon = document.createElement("i");
    icon.className = "fa-regular fa-hourglass-half";
    icon.setAttribute("aria-hidden", "true");
    pill.append(icon, document.createTextNode(" " + patient.status));

    item.append(name, details, pill);
    list.appendChild(item);
  });
}

export function updatePatientCount(count) {
  document.getElementById("patient-count").textContent = String(count);
}

export function renderSystem(info, count, lastPatient) {
  document.getElementById("singleton-name").textContent = info.name;
  document.getElementById("singleton-info").textContent = info.address + " · " + info.phone;
  document.getElementById("singleton-count").textContent =
    "Patients stored in this instance: " + count;

  const factoryLine = document.getElementById("factory-last");
  if (lastPatient) {
    factoryLine.textContent = "Last created: " + lastPatient.describe();
  } else {
    factoryLine.textContent = "No patient created yet. Register one above.";
  }
}
