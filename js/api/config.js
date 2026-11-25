// js/config.js
const esLocal = ["localhost", "127.0.0.1"].includes(window.location.hostname);

export const BASE_URL = esLocal
  ? "http://localhost:9098/api"
  : "https://tutallerpuntocombackend.onrender.com/api"; // URL real de  backend