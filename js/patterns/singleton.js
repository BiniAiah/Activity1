// ---------- SINGLETON PATTERN ----------
// Exactly one instance of each class exists for the whole page.

export class HospitalConfig {
  static #instance;

  constructor() {
    if (HospitalConfig.#instance) {
      throw new Error("HospitalConfig is a singleton. Use HospitalConfig.getInstance().");
    }
    this.name = "JohnMac's Hospital";
    this.address = "123 Health St., Manila";
    this.phone = "(02) 8123-4567";
    this.email = "care@johnmacshospital.ph";
    Object.freeze(this);
  }

  static getInstance() {
    if (!HospitalConfig.#instance) {
      HospitalConfig.#instance = new HospitalConfig();
    }
    return HospitalConfig.#instance;
  }
}

export class AppStore {
  static #instance;
  #patients = [];
  #counter = 0;

  constructor() {
    if (AppStore.#instance) {
      throw new Error("AppStore is a singleton. Use AppStore.getInstance().");
    }
  }

  static getInstance() {
    if (!AppStore.#instance) {
      AppStore.#instance = new AppStore();
    }
    return AppStore.#instance;
  }

  nextId() {
    this.#counter += 1;
    return this.#counter;
  }

  addPatient(patient) {
    this.#patients.push(patient);
    return patient;
  }

  getPatients() {
    return this.#patients.slice();
  }

  findPatient(id) {
    return this.#patients.find((patient) => patient.id === id) || null;
  }

  count() {
    return this.#patients.length;
  }
}

// Shared access point used across modules.
export const store = AppStore.getInstance();
