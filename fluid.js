const canvas = document.getElementById("fluid-bg");
const ctx = canvas.getContext("2d");

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const PARTICLE_COUNT = 60;
const LINK_DISTANCE = 120;

const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  radius: Math.random() * 2 + 1,
  dx: (Math.random() - 0.5) * 0.8,
  dy: (Math.random() - 0.5) * 0.8
}));

function draw() {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    // Draw particle
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#004F9E";
    ctx.globalAlpha = 0.6;
    ctx.fill();

    // Draw links to nearby particles
    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dist = Math.hypot(dx, dy);

      if (dist < LINK_DISTANCE) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = "rgba(0, 195, 137, 0.15)";
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }

    // Move particle
    p.x += p.dx;
    p.y += p.dy;

    // Bounce off edges
    if (p.x < 0 || p.x > width) p.dx *= -1;
    if (p.y < 0 || p.y > height) p.dy *= -1;
  }

  ctx.globalAlpha = 1.0;
  requestAnimationFrame(draw);
}
draw();
