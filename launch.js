const canvas = document.querySelector("#launch-sky");
const ctx = canvas.getContext("2d");
const typeTarget = document.querySelector("#launch-type");

const phrases = [
    "glad you stopped by ( •̀⩊< )",
    "hope you enjoy your stay!",
    "portfolio initializing...",
    "welcome!"
];

let width = 0;
let height = 0;
let particles = [];
let phraseIndex = 0;
let letterIndex = 0;
let deleting = false;

function resizeCanvas() {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const count = Math.max(38, Math.floor((width * height) / 23000));
    particles = Array.from({ length: count }, () => createParticle());
}

function createParticle() {
    return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.4 + 0.8,
        speed: Math.random() * 0.35 + 0.08,
        drift: Math.random() * 0.45 - 0.225,
        opacity: Math.random() * 0.35 + 0.18
    };
}

function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    for (const particle of particles) {
        particle.y -= particle.speed;
        particle.x += particle.drift;

        if (particle.y < -12 || particle.x < -12 || particle.x > width + 12) {
            Object.assign(particle, createParticle(), { y: height + 12 });
        }

        ctx.beginPath();
        ctx.fillStyle = `rgba(52, 152, 201, ${particle.opacity})`;
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    }

    connectNearbyParticles();
    requestAnimationFrame(drawParticles);
}

function connectNearbyParticles() {
    for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
            const first = particles[i];
            const second = particles[j];
            const distance = Math.hypot(first.x - second.x, first.y - second.y);

            if (distance < 120) {
                ctx.strokeStyle = `rgba(114, 199, 236, ${(1 - distance / 120) * 0.16})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(first.x, first.y);
                ctx.lineTo(second.x, second.y);
                ctx.stroke();
            }
        }
    }
}

function typePhrase() {
    const phrase = phrases[phraseIndex];
    const pause = deleting ? 36 : 72;

    if (!deleting) {
        letterIndex += 1;
        typeTarget.textContent = phrase.slice(0, letterIndex);

        if (letterIndex === phrase.length) {
            deleting = true;
            setTimeout(typePhrase, 1300);
            return;
        }
    } else {
        letterIndex -= 1;
        typeTarget.textContent = phrase.slice(0, letterIndex);

        if (letterIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
    }

    setTimeout(typePhrase, pause);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawParticles();
typePhrase();
