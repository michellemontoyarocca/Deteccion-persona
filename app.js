const video = document.getElementById("cam");
const canvas = document.getElementById("overlay");
const ctx = canvas.getContext("2d");
const logEl = document.getElementById("log");
const statusEl = document.getElementById("status");
const tabEl = document.getElementById("tab");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");

let running = false;
let stream = null;
let lastExampleAt = 0;

function log(message) {
  logEl.textContent = `[${new Date().toLocaleTimeString()}] ${message}\n` + logEl.textContent;
}

function drawFrame() {
  if (!running) return;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Recuadro ilustrativo fijo. Aquí no hay un detector entrenado.
  const x = canvas.width * 0.35;
  const y = canvas.height * 0.25;
  const width = canvas.width * 0.3;
  const height = canvas.height * 0.45;
  ctx.strokeStyle = "#5df0cf";
  ctx.lineWidth = 4;
  ctx.strokeRect(x, y, width, height);

  const cooldown = Math.max(2, Number(document.getElementById("cooldown").value || 8));
  if (Date.now() - lastExampleAt > cooldown * 1000) {
    lastExampleAt = Date.now();
    log("Recuadro de ejemplo actualizado. Ninguna imagen se envió.");
  }
  requestAnimationFrame(drawFrame);
}

document.addEventListener("visibilitychange", () => {
  tabEl.textContent = `Pestaña: ${document.visibilityState}`;
});

startButton.onclick = async () => {
  if (running) return;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;
    await video.play();
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    running = true;
    startButton.disabled = true;
    stopButton.disabled = false;
    statusEl.textContent = "Estado: vista previa local";
    log("Cámara iniciada. Demostración sin análisis ni envío de imágenes.");
    drawFrame();
  } catch {
    statusEl.textContent = "Estado: sin acceso a cámara";
    log("No se pudo abrir la cámara. Revisa los permisos del navegador.");
  }
};

stopButton.onclick = () => {
  running = false;
  stream?.getTracks().forEach(track => track.stop());
  stream = null;
  video.srcObject = null;
  startButton.disabled = false;
  stopButton.disabled = true;
  statusEl.textContent = "Estado: detenido";
  log("Vista previa detenida.");
};
