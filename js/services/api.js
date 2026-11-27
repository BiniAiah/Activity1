// ---------- API service ----------
// Talks to /api/v1/* when a backend exists and falls back to local data
// when it does not. This keeps the frontend usable offline.

import { doctors as fallbackDoctors } from "../data/doctors.js";
import { services as fallbackServices } from "../data/services.js";

const API_BASE = "/api/v1";
const TIMEOUT_MS = 4000;

async function request(path, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(API_BASE + path, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    });

    if (!response.ok) {
      throw new Error("Request failed with status " + response.status);
    }

    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

export async function getDoctors() {
  try {
    const data = await request("/doctors");
    return Array.isArray(data) && data.length > 0 ? data : fallbackDoctors;
  } catch {
    return fallbackDoctors;
  }
}

export async function getServices() {
  try {
    const data = await request("/services");
    return Array.isArray(data) && data.length > 0 ? data : fallbackServices;
  } catch {
    return fallbackServices;
  }
}

// Returns the server record when available, otherwise null so the caller
// can store the locally created appointment.
export async function createAppointment(payload) {
  try {
    return await request("/appointments", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  } catch {
    return null;
  }
}
