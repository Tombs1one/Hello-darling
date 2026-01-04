const confettiLayer = document.getElementById("confetti-layer");

const emojis = ["🍫","🍗","🎂","🍰","🤣","🫂","✨","💎"];

function spawnConfetti() {
  const el = document.createElement("div");

  const isEmoji = Math.random() < 0.25;

  if (isEmoji) {
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.fontSize = Math.random() * 26 + 18 + "px";
  } else {
    el.style.width = Math.random() * 10 + 6 + "px";
    el.style.height = Math.random() * 28 + 18 + "px";
    el.style.background = `hsl(${Math.random()*360},90%,65%)`;
    el.style.borderRadius = "6px";
  }

  el.style.position = "absolute";
  el.style.left = Math.random() * 100 + "vw";
  el.style.top = "-50px";
  el.style.opacity = 0.9;

  const rotation = Math.random() * 360;
  const spin = (Math.random() - 0.5) * 6;
  let y = -50;
  let x = parseFloat(el.style.left);
  let speed = Math.random() * 1.2 + 0.6;

  confettiLayer.appendChild(el);

  function fall() {
    y += speed;
    el.style.top = y + "px";
    el.style.transform = `rotate(${rotation + y * spin}deg)`;
    if (y < window.innerHeight + 60) {
      requestAnimationFrame(fall);
    } else {
      el.remove();
    }
  }

  fall();
}

/* ================= FLOATING GIFS ================= */
const gifLayer = document.getElementById("floating-gifs");

// Add your GIFs here
const floatingGifs = [
  "floating-gifs/cat.gif",
  "floating-gifs/cute.gif",
  "floating-gifs/cosytales.gif",
  "floating-gifs/dance1.gif",
  "floating-gifs/dance2.webp"
];

function spawnFloatingGif() {
  const gif = document.createElement("div");
  gif.classList.add("floating-gif");

  const gifSrc = floatingGifs[Math.floor(Math.random() * floatingGifs.length)];
  gif.style.backgroundImage = `url("${gifSrc}")`;

  // Random size
  const size = Math.random() * 30 + 50;
  gif.style.width = size + "px";
  gif.style.height = size + "px";

  // Random position
  gif.style.left = Math.random() * 100 + "vw";
  gif.style.top = Math.random() * 100 + "vh";

  // Random animation duration
  gif.style.animationDuration = Math.random() * 6 + 6 + "s";

  gifLayer.appendChild(gif);

  // Remove after some time
  setTimeout(() => {
    gif.remove();
  }, 20000);
}

// Spawn occasionally (not flooding)
setInterval(spawnFloatingGif, 4000);


setInterval(spawnConfetti, 180);

document.getElementById("nextBtn").addEventListener("click", () => {
  document.body.classList.add("fade-out");

  setTimeout(() => {
    window.location.href = "page4.html";
  }, 800); // matches CSS transition
});