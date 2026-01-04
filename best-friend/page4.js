/* ================= BACKGROUND CONFETTI ================= */

const confettiLayer = document.getElementById("confetti-layer");

function spawnBackgroundConfetti() {
  const el = document.createElement("div");
  const emojis = ["✨", "💎", "🎂", "🍰"];

  if (Math.random() < 0.25) {
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.fontSize = Math.random() * 18 + 14 + "px";
  } else {
    el.style.width = Math.random() * 10 + 6 + "px";
    el.style.height = Math.random() * 30 + 14 + "px";
    el.style.background = `hsl(${Math.random()*360},80%,70%)`;
    el.style.borderRadius = "6px";
  }

  el.style.position = "fixed";
  el.style.left = Math.random() * 100 + "vw";
  el.style.top = "-40px";
  el.style.opacity = 0.85;
  el.style.zIndex = 0;

  confettiLayer.appendChild(el);

  let y = -40;
  let speed = Math.random() * 1.2 + 0.6;
  let rot = Math.random() * 360;

  function fall() {
    y += speed;
    rot += 1;
    el.style.top = y + "px";
    el.style.transform = `rotate(${rot}deg)`;
    if (y < window.innerHeight + 60) {
      requestAnimationFrame(fall);
    } else {
      el.remove();
    }
  }

  fall();
}

setInterval(spawnBackgroundConfetti, 160);

function explodeEmoji(x, y, emojis) {
  for (let i = 0; i < 30; i++) {
    const el = document.createElement("div");
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.position = "fixed";
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.fontSize = Math.random() * 20 + 20 + "px";
    el.style.zIndex = 6;

    document.body.appendChild(el);

    let vx = (Math.random() - 0.5) * 10;
    let vy = (Math.random() - 0.8) * 12;
    let gravity = 0.5;

    function animate() {
      vy += gravity;
      x += vx;
      y += vy;
      el.style.left = x + "px";
      el.style.top = y + "px";

      if (y < window.innerHeight + 50) {
        requestAnimationFrame(animate);
      } else {
        el.remove();
      }
    }

    animate();
  }
}

/* ================= SMOOTH SHOOTING STAR ================= */

starIcon.onclick = () => {
  let x = Math.random() * innerWidth;
  let y = Math.random() * innerHeight;

  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 5 + 7; // smooth, not too fast

  const trail = [];
  const maxTrail = 18;

  const star = document.createElement("canvas");
  star.width = innerWidth;
  star.height = innerHeight;
  star.style.position = "fixed";
  star.style.top = 0;
  star.style.left = 0;
  star.style.pointerEvents = "none";
  star.style.zIndex = 2;

  document.body.appendChild(star);
  const ctx = star.getContext("2d");

  function animate() {
    ctx.clearRect(0, 0, star.width, star.height);

    trail.push({ x, y });
    if (trail.length > maxTrail) trail.shift();

    // draw trail
    ctx.beginPath();
    for (let i = 0; i < trail.length; i++) {
      const p = trail[i];
      ctx.lineTo(p.x, p.y);
    }
    ctx.strokeStyle = "rgba(255,255,255,0.7)";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.stroke();

    // move star
    x += Math.cos(angle) * speed;
    y += Math.sin(angle) * speed;

    if (
      x < -200 || x > innerWidth + 200 ||
      y < -200 || y > innerHeight + 200
    ) {
      star.remove();
      return;
    }

    requestAnimationFrame(animate);
  }

  animate();
};

/* ================= HEART EMOJI EXPLOSION (SLOW + SPREAD) ================= */

heartIcon.onclick = (e) => {
  const emojis = ["💗","♥️","🖤","🧡","🩵","🩶","🩷","💙","💚","💛","💜"];

  const originX = e.clientX;
  const originY = e.clientY;

  for (let i = 0; i < 30; i++) {
    const el = document.createElement("div");
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const size = Math.random() * 18 + 18;
    el.style.fontSize = size + "px";
    el.style.position = "fixed";
    el.style.left = originX + "px";
    el.style.top = originY + "px";
    el.style.pointerEvents = "none";
    el.style.zIndex = 3;

    document.body.appendChild(el);

    let x = originX;
    let y = originY;

    // gentle outward push
    let angle = Math.random() * Math.PI * 2;
    let velocity = Math.random() * 2 + 1.5;

    let vx = Math.cos(angle) * velocity;
    let vy = Math.sin(angle) * velocity - 2.5;

    let gravity = 0.08;      // very soft fall
    let drift = 0.002;      // slow widening
    let rotation = Math.random() * 360;
    let rotationSpeed = (Math.random() - 0.5) * 1.5;

    function animate() {
      vy += gravity;
      vx += vx * drift;

      x += vx;
      y += vy;
      rotation += rotationSpeed;

      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.transform = `rotate(${rotation}deg)`;

      if (y < window.innerHeight + 80) {
        requestAnimationFrame(animate);
      } else {
        el.remove();
      }
    }

    animate();
  }
};

/* ================= BUTTERFLY EMOJI EXPLOSION (FLOATY + SOFT) ================= */

butterflyIcon.onclick = (e) => {
  const originX = e.clientX;
  const originY = e.clientY;

  for (let i = 0; i < 22; i++) {
    const el = document.createElement("div");
    el.textContent = "🦋";

    const size = Math.random() * 16 + 20;
    el.style.fontSize = size + "px";
    el.style.position = "fixed";
    el.style.left = originX + "px";
    el.style.top = originY + "px";
    el.style.pointerEvents = "none";
    el.style.zIndex = 3;

    document.body.appendChild(el);

    let x = originX;
    let y = originY;

    // lighter, upward-biased motion
    let angle = Math.random() * Math.PI * 2;
    let velocity = Math.random() * 1.6 + 1.2;

    let vx = Math.cos(angle) * velocity;
    let vy = Math.sin(angle) * velocity - 3.2;

    let gravity = 0.04;     // VERY light fall
    let drift = 0.006;     // flutter widening
    let sway = Math.random() * 0.04 + 0.01;

    let rotation = Math.random() * 360;
    let rotationSpeed = (Math.random() - 0.5) * 2;

    function animate() {
      vy += gravity;
      vx += Math.sin(y * sway) * 0.05; // flutter wobble
      vx += vx * drift;

      x += vx;
      y += vy;
      rotation += rotationSpeed;

      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.transform = `rotate(${rotation}deg)`;

      if (y < window.innerHeight + 100) {
        requestAnimationFrame(animate);
      } else {
        el.remove();
      }
    }

    animate();
  }
};


/* ================= BYE EMOJI EXPLOSION ================= */

const byeBtn = document.getElementById("byeBtn");
const sadEmojis = ["😭", "☹️", "😢", "🥺"];

byeBtn.addEventListener("click", () => {
  const rect = byeBtn.getBoundingClientRect();
  const ox = rect.left + rect.width / 2;
  const oy = rect.top + rect.height / 2;

  for (let i = 0; i < 40; i++) {
    const emoji = document.createElement("div");
    emoji.textContent = sadEmojis[Math.floor(Math.random() * sadEmojis.length)];
    emoji.style.position = "fixed";
    emoji.style.left = ox + "px";
    emoji.style.top = oy + "px";
    emoji.style.fontSize = Math.random() * 14 + 20 + "px";
    emoji.style.pointerEvents = "none";
    emoji.style.zIndex = 9999;

    document.body.appendChild(emoji);

    let x = ox, y = oy;
    let vx = (Math.random() - 0.5) * 8;
    let vy = Math.random() * -8 - 2;

    function animate() {
      vy += 0.35;
      x += vx;
      y += vy;
      emoji.style.left = x + "px";
      emoji.style.top = y + "px";
      if (y < window.innerHeight + 40) {
        requestAnimationFrame(animate);
      } else {
        emoji.remove();
      }
    }

    animate();
  }
});