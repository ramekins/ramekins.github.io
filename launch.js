const typeTarget = document.querySelector("#launch-type");

const phrases = [
    "Glad you stopped by (˵ •̀ ᴗ - ˵)",
    "Hope you enjoy your stay!",
    "One moment please..",
    "Your user experience is ready!"
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

function initAboutReveals() {
    const revealItems = document.querySelectorAll(".about-page header, .about-page section, .about-page footer");

    if (!revealItems.length) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.16,
        rootMargin: "0px 0px -70px 0px"
    });

    revealItems.forEach((item) => observer.observe(item));
}

window.addEventListener("load", () => {
    initParticleBackground();
    initAboutReveals();
    typePhrase();
});
