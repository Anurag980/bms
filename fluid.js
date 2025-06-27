const canvas = document.getElementById("fluid-bg");
const ctx = canvas.getContext("2d");

let width, height;
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const particles = Array.from({ length: 60 }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  radius: Math.random() * 2 + 1,
  dx: (Math.random() - 0.5) * 0.8,
  dy: (Math.random() - 0.5) * 0.8
}));

function draw() {
  ctx.clearRect(0, 0, width, height);

  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#004F9E";
    ctx.globalAlpha = 0.6;
    ctx.fill();

    for (let other of particles) {
      const dist = Math.hypot(p.x - other.x, p.y - other.y);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(other.x, other.y);
        ctx.strokeStyle = "rgba(0, 195, 137, 0.15)";
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > width) p.dx *= -1;
    if (p.y < 0 || p.y > height) p.dy *= -1;
  }

  ctx.globalAlpha = 1.0;
  requestAnimationFrame(draw);
}
draw();