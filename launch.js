const typeTarget = document.querySelector("#launch-type");

const phrases = [
    "glad you stopped by",
    "hope you enjoy your stay!",
    "portfolio initializing...",
    "welcome!"
];

let phraseIndex = 0;
let letterIndex = 0;
let deleting = false;

function initParticleBackground() {
    if (!window.Particles) {
        return;
    }

    Particles.init({
        selector: ".particle-background",
        color: ["#72c7ec", "#b9dfff", "#3498c9"],
        connectParticles: true,
        maxParticles: 80,
        minDistance: 130,
        sizeVariations: 3,
        speed: 0.35,
        responsive: [
            {
                breakpoint: 700,
                options: {
                    maxParticles: 42,
                    minDistance: 105
                }
            }
        ]
    });
}

function typePhrase() {
    if (!typeTarget) {
        return;
    }

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

window.addEventListener("load", () => {
    initParticleBackground();
    typePhrase();
});
