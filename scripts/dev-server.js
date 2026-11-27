// -----------------------------------------------------
// Zero-dependency static dev server for the PWA.
// ES modules and service workers need a real http:// origin,
// so open the app through this server instead of file://.
// -----------------------------------------------------

const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const PORT = Number(process.env.PORT) || 5173;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8"
};

function send(res, status, body, type) {
  res.writeHead(status, { "Content-Type": type || "text/plain; charset=utf-8" });
  res.end(body);
}

const server = http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch (error) {
    send(res, 400, "Bad request");
    return;
  }

  // No backend in this build: keep API requests as clean 404s.
  if (pathname.startsWith("/api/")) {
    send(res, 404, JSON.stringify({ error: "Not found" }), "application/json; charset=utf-8");
    return;
  }

  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  let filePath = path.resolve(ROOT, relative);

  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
    send(res, 403, "Forbidden");
    return;
  }

  fs.stat(filePath, (statError, stats) => {
    if (statError || stats.isDirectory()) {
      filePath = path.join(ROOT, "index.html");
    }

    fs.readFile(filePath, (readError, data) => {
      if (readError) {
        send(res, 404, "Not found");
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, {
        "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
        "Cache-Control": "no-cache"
      });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log("JohnMac's Hospital dev server running at http://localhost:" + PORT);
});
