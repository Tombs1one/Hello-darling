/* ================= TYPEWRITER TITLE ================= */

const titleText = "HELLLLLOOOOOOOZZZZZ\nMY DARLING !!!!!!";
const titleElement = document.getElementById("animatedTitle");
let titleIndex = 0;

function typeWriter() {
  if (titleIndex < titleText.length) {
    titleElement.textContent += titleText.charAt(titleIndex);
    titleIndex++;
    setTimeout(typeWriter, 100);
  } else {
    titleElement.style.borderRight = "none";
  }
}

window.onload = () => {
  typeWriter();
};


/* ================= DIALOGUE LOGIC ================= */

let dialogueOrder = ["dialogue1", "dialogue2", "dialogue3"];

function handleAnswer(currentId, answer) {
  const current = document.getElementById(currentId);

  // If YES clicked on first dialogue
  if (currentId === "dialogue1" && answer === "yes") {
    fadeOut(current);
    setTimeout(() => {
      fadeIn(document.getElementById("dialogueYesFirst"));
    }, 500);
    return;
  }

  // If "Try again"
  if (currentId === "dialogueYesFirst" && answer === "tryAgain") {
    fadeOut(current);
    setTimeout(() => {
      fadeIn(document.getElementById("dialogue1"));
    }, 500);
    return;
  }

  // Final YES → Good gurl → Page 2
  if (answer === "yes") {
    fadeOut(current);

    const goodGurl = document.getElementById("goodGurl");
    goodGurl.classList.remove("hidden");

    setTimeout(() => {
      goodGurl.style.opacity = 1;
    }, 50);

    setTimeout(() => {
      goodGurl.style.opacity = 0;

      // 🔽 GO TO PAGE 2
      setTimeout(() => {
        window.location.href = "page2.html";
      }, 800);

    }, 1500);

  } else {
    // NO → next dialogue
    const idx = dialogueOrder.indexOf(currentId);
    const nextIdx = Math.min(idx + 1, dialogueOrder.length - 1);
    fadeOut(current);
    setTimeout(() => {
      fadeIn(document.getElementById(dialogueOrder[nextIdx]));
    }, 500);
  }
}

function fadeOut(element) {
  element.style.opacity = 0;
  setTimeout(() => {
    element.classList.add("hidden");
  }, 500);
}

function fadeIn(element) {
  element.classList.remove("hidden");
  setTimeout(() => {
    element.style.opacity = 1;
  }, 50);
}


/* ================= CANVAS: STARS + SHOOTING STARS ================= */

const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Twinkling stars
const stars = [];
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.5,
    alpha: Math.random(),
    delta: Math.random() * 0.02 + 0.01
  });
}

// Shooting stars
const shootingStars = [];

function addShootingStar() {
  const sides = ["top", "bottom", "left", "right"];
  const side = sides[Math.floor(Math.random() * sides.length)];
  let x, y, angle;

  if (side === "top") {
    x = Math.random() * canvas.width;
    y = -10;
    angle = Math.random() * Math.PI / 3 + Math.PI / 4;
  } else if (side === "bottom") {
    x = Math.random() * canvas.width;
    y = canvas.height + 10;
    angle = -Math.random() * Math.PI / 3 - Math.PI / 4;
  } else if (side === "left") {
    x = -10;
    y = Math.random() * canvas.height;
    angle = Math.random() * Math.PI / 4 - Math.PI / 8;
  } else {
    x = canvas.width + 10;
    y = Math.random() * canvas.height;
    angle = Math.PI - Math.random() * Math.PI / 4 + Math.PI / 8;
  }

  shootingStars.push({
    x,
    y,
    angle,
    speed: 3 + Math.random() * 2,
    trail: [],
    maxLength: 100
  });
}

// Rare shooting star
setInterval(addShootingStar, 7000 + Math.random() * 1000);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw stars
  stars.forEach(s => {
    s.alpha += s.delta;
    if (s.alpha <= 0 || s.alpha >= 1) s.delta *= -1;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
    ctx.fill();
  });

  // Draw shooting stars
  shootingStars.forEach((star, i) => {
    star.trail.push({ x: star.x, y: star.y });
    if (star.trail.length > star.maxLength) star.trail.shift();

    ctx.beginPath();
    star.trail.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = "rgba(255,255,255,0.7)";
    ctx.lineWidth = 2;
    ctx.stroke();

    star.x += Math.cos(star.angle) * star.speed;
    star.y += Math.sin(star.angle) * star.speed;

    if (
      star.x < -50 || star.x > canvas.width + 50 ||
      star.y < -50 || star.y > canvas.height + 50
    ) {
      shootingStars.splice(i, 1);
    }
  });

  requestAnimationFrame(animate);
}

animate();