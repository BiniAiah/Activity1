// ---------- Asia/Manila time formatting ----------
// One shared formatter keeps timestamps consistent across the app.

const DATE_TIME = new Intl.DateTimeFormat("en-PH", {
  timeZone: "Asia/Manila",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit"
});

export function formatManila(date = new Date()) {
  return DATE_TIME.format(date);
}
