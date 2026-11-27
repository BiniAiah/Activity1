// ---------- App bootstrapper ----------
// The only module that wires data, patterns, UI, and events together.

import { getDoctors, getServices, createAppointment } from "./services/api.js";
import { AppStore, HospitalConfig } from "./patterns/singleton.js";
import { AppointmentFactory } from "./patterns/factory.js";
import {
  renderDoctors,
  renderServices,
  renderHospitalInfo,
  renderPatients,
  updatePatientCount,
  renderSystem
} from "./ui/render.js";
import { initRouter } from "./ui/router.js";
import { showToast } from "./ui/toast.js";
import { openModal } from "./ui/modal.js";

const store = AppStore.getInstance();
const hospital = HospitalConfig.getInstance();
let lastPatient = null;

function setFormMessage(text, state) {
  const message = document.getElementById("form-message");
  message.textContent = text;
  message.classList.toggle("is-error", state === "error");
  message.classList.toggle("is-success", state === "success");
}

function readForm() {
  return {
    name: document.getElementById("patient-name").value.trim(),
    age: document.getElementById("patient-age").value.trim(),
    condition: document.getElementById("patient-condition").value.trim()
  };
}

async function handleSubmit(event) {
  event.preventDefault();

  const { name, age, condition } = readForm();
  if (name === "" || age === "" || condition === "") {
    setFormMessage("Please fill in all fields.", "error");
    showToast("error", "Please fill in all fields.");
    return;
  }

  // Best-effort persistence; the local factory + singleton keep it working
  // when no backend is running.
  await createAppointment({ name, age, condition });

  const patient = AppointmentFactory.create({ name, age, condition });
  store.addPatient(patient);
  lastPatient = patient;

  document.getElementById("patient-form").reset();
  setFormMessage("Registered: " + patient.name + " (Total: " + store.count() + ")", "success");
  updatePatientCount(store.count());
  renderSystem(hospital, store.count(), lastPatient);
  showToast("success", "Appointment created for " + patient.name);
}

function handlePatientSelect(event) {
  const item = event.target.closest(".patient-item");
  if (!item) {
    return;
  }

  const patient = store.findPatient(Number(item.dataset.id));
  if (!patient) {
    return;
  }

  openModal({
    title: "Patient #" + patient.id,
    rows: [
      ["Name", patient.name],
      ["Age", String(patient.age)],
      ["Reason", patient.condition],
      ["Status", patient.status],
      ["Registered", patient.createdAt]
    ]
  });
}

function handlePatientKeydown(event) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    handlePatientSelect(event);
  }
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    return;
  }
  if (window.location.protocol !== "http:" && window.location.protocol !== "https:") {
    return;
  }
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch((error) => {
      console.warn("Service worker registration failed:", error);
    });
  });
}

async function init() {
  initRouter();
  renderHospitalInfo(hospital);
  renderSystem(hospital, store.count(), lastPatient);
  updatePatientCount(store.count());

  const results = await Promise.all([getDoctors(), getServices()]);
  renderDoctors(results[0]);
  renderServices(results[1]);

  document.getElementById("patient-form").addEventListener("submit", handleSubmit);
  document.getElementById("show-patients-btn").addEventListener("click", () => {
    renderPatients(store.getPatients());
  });
  document.getElementById("patient-list").addEventListener("click", handlePatientSelect);
  document.getElementById("patient-list").addEventListener("keydown", handlePatientKeydown);

  registerServiceWorker();
}

init();
