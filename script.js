console.log('Battalia Codex loaded');

const canvas = document.getElementById('sporeField');
const ctx = canvas.getContext('2d');

let spores = [];
const SPORE_COUNT = 150;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

for (let i = 0; i < SPORE_COUNT; i++) {
  spores.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    speed: Math.random() * 0.5 + 0.2,
    alpha: Math.random() * 0.5 + 0.3
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ff5050';

  for (let spore of spores) {
    ctx.globalAlpha = spore.alpha;
    ctx.beginPath();
    ctx.arc(spore.x, spore.y, spore.r, 0, Math.PI * 2);
    ctx.fill();

    spore.y -= spore.speed;
    if (spore.y < 0) spore.y = canvas.height;
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}

draw();
