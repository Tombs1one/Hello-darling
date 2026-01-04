/* ================= CANVAS: STARS + SHOOTING STARS ================= */

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* ---------- Twinkling stars ---------- */
const stars = Array.from({ length: 260 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.6 + 0.4,
  a: Math.random(),
  d: Math.random() * 0.02 + 0.006
}));

/* ---------- Shooting stars ---------- */
let shootingStars = [];

function spawnShootingStar() {
  const side = Math.floor(Math.random() * 4);
  let x, y, vx, vy;

  if (side === 0) {        // left → right
    x = -150; y = Math.random() * innerHeight;
    vx = 8; vy = 4;
  } else if (side === 1) { // right → left
    x = innerWidth + 150; y = Math.random() * innerHeight;
    vx = -8; vy = 4;
  } else if (side === 2) { // top → down
    x = Math.random() * innerWidth; y = -150;
    vx = 4; vy = 8;
  } else {                // bottom → up
    x = Math.random() * innerWidth; y = innerHeight + 150;
    vx = 4; vy = -8;
  }

  shootingStars.push({ x, y, vx, vy, life: 0 });
}

/* Elegant frequency */
setInterval(() => {
  spawnShootingStar();
}, 5000 + Math.random() * 1500);

/* ---------- Animate ---------- */
function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Twinkle
  stars.forEach(s => {
    s.a += s.d;
    if (s.a > 1 || s.a < 0.2) s.d *= -1;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${s.a})`;
    ctx.fill();
  });

  // Shooting stars
  shootingStars.forEach((s, i) => {
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.vx * 10, s.y - s.vy * 10);
    ctx.strokeStyle = "rgba(255,255,255,0.65)";
    ctx.lineWidth = 2;
    ctx.stroke();

    s.x += s.vx;
    s.y += s.vy;
    s.life++;

    if (
      s.life > 120 ||
      s.x < -300 || s.x > canvas.width + 300 ||
      s.y < -300 || s.y > canvas.height + 300
    ) {
      shootingStars.splice(i, 1);
    }
  });

  requestAnimationFrame(animateStars);
}
animateStars();


/* ================= BALLOONS ================= */

const balloonLayer = document.getElementById("balloonLayer");
const balloonColors = [
  "#a0c4ff",
  "#bdb2ff",
  "#cdb4db",
  "#ffc8dd",
  "#90dbf4",
  "#b8e1ff"
];

setInterval(() => {
  const balloon = document.createElement("div");
  balloon.className = "balloon";
  balloon.style.left = Math.random() * 90 + "vw";
  balloon.style.background =
    `linear-gradient(135deg, ${
      balloonColors[Math.floor(Math.random() * balloonColors.length)]
    }, #00000022)`;

  balloon.onclick = e => {
    spawnConfetti(e.clientX, e.clientY);
    balloon.remove();
  };

  balloonLayer.appendChild(balloon);
  setTimeout(() => balloon.remove(), 18000);
}, 1600);


/* ================= CONFETTI (GOOD ONE) ================= */

function spawnConfetti(originX, originY) {
  for (let i = 0; i < 70; i++) {
    const c = document.createElement("div");
    c.style.position = "fixed";
    c.style.width = Math.random() > 0.6 ? "10px" : "6px";
    c.style.height = Math.random() > 0.5 ? "14px" : "8px";
    c.style.background = `hsl(${Math.random() * 360},100%,70%)`;
    c.style.left = originX + "px";
    c.style.top = originY + "px";
    c.style.zIndex = 9998;
    document.body.appendChild(c);

    let x = originX, y = originY;
    let vx = (Math.random() - 0.5) * 4;
    let vy = Math.random() * -6 - 2;
    let gravity = 0.35;
    let spread = 1;
    let rot = Math.random() * 360;
    let rs = (Math.random() - 0.5) * 10;

    (function fall() {
      vy += gravity;
      y += vy;
      spread += 0.015;
      x += vx * spread;
      rot += rs;

      c.style.left = x + "px";
      c.style.top = y + "px";
      c.style.transform = `rotate(${rot}deg)`;

      y < innerHeight + 50
        ? requestAnimationFrame(fall)
        : c.remove();
    })();
  }
}


/* ================= ENVELOPE + PAPER ================= */

const envelope = document.getElementById("envelope");
const paper = document.getElementById("paper");
const title = document.getElementById("title");

envelope.addEventListener("click", () => {
  envelope.classList.add("open");
  paper.classList.add("open");
  title.style.opacity = "0";
});

document.getElementById("resetBtn").addEventListener("click", e => {
  e.stopPropagation();
  envelope.classList.remove("open");
  paper.classList.remove("open");
  title.style.opacity = "1";
});


/* ================= NEXT → PAGE 3 ================= */

document.getElementById("nextBtn").addEventListener("click", () => {
  document.body.classList.add("fade-out");

  setTimeout(() => {
    window.location.href = "page3.html";
  }, 700);
});