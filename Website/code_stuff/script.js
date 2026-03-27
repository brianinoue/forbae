// nav-bar menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');

    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('open');
    });
});

// homeBtn
const homeBtn = document.getElementById("homeBtn");

homeBtn.addEventListener("click", (e) => {
    e.preventDefault();        // stop default anchor behavior
    window.scrollTo(0, 0);     // instantly jump to top
    location.reload();          // refresh the page
});

// background2 stars
const starContainer = document.getElementById('stars');
const numStars = 150;

for (let i = 0; i < numStars; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.top = `${Math.random() * 100}%`;
  star.style.left = `${Math.random() * 100}%`;
  star.style.animationDuration = `${Math.random() * 3 + 2}s`;
  star.style.opacity = Math.random();
  star.style.transform = `scale(${Math.random() * 1.5 + 0.5})`;
  starContainer.appendChild(star);
}

//auto type
var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 100 - Math.random() * 50;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    document.body.appendChild(css);
};

// haiku fade in
document.addEventListener("DOMContentLoaded", () => {
  const haiku = document.getElementById("haiku1");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        haiku.classList.add("visible");
        observer.unobserve(haiku); // remove if you want it to repeat
      }
    });
  }, {
    threshold: 0.3
  });

  observer.observe(haiku);
});
document.addEventListener("DOMContentLoaded", () => {
    const haiku = document.getElementById("haiku1");

    // Split content into pieces: text vs <br>
    haiku.innerHTML = haiku.innerHTML
        .split(/(<br>)/g) // keep <br> as separate array items
        .map(part => {
            if (part === "<br>") return "<br>"; // preserve line breaks
            // wrap each character of text in a span
            return part.split("").map(char => {
                if (char === " ") return " "; // preserve spaces
                return `<span class="haiku-letter">${char}</span>`;
            }).join("");
        })
        .join("");
});

// meteors
const starsContainer = document.getElementById("stars");
function createMeteor() {
    const meteor = document.createElement("div");
    meteor.classList.add("meteor");

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const safeRadiusX = 200; // horizontal buffer around center
    const safeRadiusY = 150; // vertical buffer around center

    let x, y;

    // Use bias to spawn more meteors at the top
    do {
        x = Math.random() * window.innerWidth;
        // Exponent > 1 biases y toward top
        y = Math.pow(Math.random(), 1.8) * window.innerHeight; 
    } while (
        x > centerX - safeRadiusX &&
        x < centerX + safeRadiusX &&
        y > centerY - safeRadiusY &&
        y < centerY + safeRadiusY
    );

    meteor.style.top = y + "px";
    meteor.style.left = x + "px";

    // Random duration for natural fall
    const duration = Math.random() * 1 + 0.5;
    meteor.style.animationDuration = duration + "s";

    starsContainer.appendChild(meteor);

    setTimeout(() => {
        meteor.remove();
    }, duration * 1000);
}

// Increase spawn frequency
setInterval(() => {
    if (Math.random() < 0.9) {
        createMeteor();
    }
}, 300);

// love me section
document.addEventListener("DOMContentLoaded", () => {
  let noClickCount = 0;

  // Elements
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const img = document.getElementById("loveImg");
  const question = document.querySelector(".question");

  const volumeOnIcon = document.getElementById("volumeOn");
  const volumeOffIcon = document.getElementById("volumeOff");
  const refreshBtn = document.getElementById("refreshBtn");

  const audio = {
    loveSong: document.getElementById("loveSong"),
    shocksound: document.getElementById("shocksound"),
    blink: document.getElementById("blink"),
    cry: document.getElementById("cry"),
    scary: document.getElementById("scary"),
    laugh: document.getElementById("laugh"),
  };

  const gifList = [
    "code_stuff/images/anya-forger-jumpscare.gif",
    "code_stuff/images/shock.gif",
    "code_stuff/images/nope.gif",
    "code_stuff/images/anya-spy-x-family-anime-anya-crying.gif",
    "code_stuff/images/crazy.gif",
    "code_stuff/images/gotem.gif",
    "code_stuff/images/love.gif"
  ];

  function stopAllAudio() {
    Object.values(audio).forEach(a => {
      if (a) {
        a.pause();
        a.currentTime = 0;
      }
    });
  }

  function playAudio(name) {
    stopAllAudio();
    if (audio[name]) audio[name].play();
  }

  let celebrationInterval; // global or in love me DOMContentLoaded scope

  function startCelebration() {
      const container = document.getElementById("celebration-container");
      if (!container) return;

      const symbols = ["💖", "💘", "✨", "💙", "💗", "💚", "💛", "💜", "♥️"];

      function spawnItem() {
        const item = document.createElement("div");
        item.classList.add("celebration-item");
        item.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        item.style.left = Math.random() * 100 + "vw";
        item.style.animationDuration = 2 + Math.random() * 2 + "s";
        item.style.fontSize = 20 + Math.random() * 20 + "px";

        container.appendChild(item);

        setTimeout(() => item.remove(), 4000);
      }

      // Save the interval ID so we can clear it later
      celebrationInterval = setInterval(() => {
        for (let i = 0; i < 5; i++) spawnItem();
      }, 300);
  }

  function createFrogLink() {
      if (document.getElementById("frogLink")) return;

      const frogLink = document.createElement("a");
      frogLink.href = "#todo";
      frogLink.id = "frogLink";
      frogLink.classList.add("frog-icon");

      const frogIcon = document.createElement("i");
      frogIcon.className = "fa-solid fa-frog"; // Font Awesome frog
      frogLink.appendChild(frogIcon);

      // Click handler: stop everything and remove frog
      frogLink.addEventListener("click", (e) => {
          e.preventDefault();

          // Stop all music
          Object.values(audio).forEach(a => {
              if (a) {
                  a.pause();
                  a.currentTime = 0;
              }
          });

          // Remove all existing hearts/emojis
          document.querySelectorAll(".celebration-item, .heart").forEach(el => el.remove());

          // Stop further hearts from spawning
          clearInterval(celebrationInterval);

          // Remove frog button
          frogLink.remove();

          // Navigate to #todo
          const target = document.querySelector("#todo");
          if (target) {
              target.scrollIntoView({ behavior: "auto" });
          }
      });

      document.body.appendChild(frogLink);
  }

  function answerYes() {
    if (!img || !question) return;

    createFrogLink();

    img.src = gifList[6];
    question.textContent = "I LOVE YOU TOO BEBEEE!! ₍^. .^₎⟆";

    yesBtn?.remove();
    noBtn?.remove();

    playAudio("loveSong");
    startCelebration();
  }

  function answerNo() {
    noClickCount++;

    if (noClickCount < 5) {
      const yesScale = 1 + noClickCount * 0.2;
      const noScale = 1 - noClickCount * 0.2;

      yesBtn.style.transform = `scale(${yesScale})`;
      noBtn.style.transform = `scale(${noScale})`;
    }

    switch (noClickCount) {
      case 1:
        img.src = gifList[1];
        question.textContent = "GONGGG 😨!! Do you love me?";
        playAudio("shocksound");
        break;
      case 2:
        img.src = gifList[2];
        question.textContent = "I believe you pressed the wrong button... Do you love me?";
        playAudio("blink");
        break;
      case 3:
        img.src = gifList[3];
        question.textContent = "PLEEEEASE WHY ARE YOU PRESSING NOO??? DO YOU LOVE ME???";
        playAudio("cry");
        break;
      case 4:
        img.src = gifList[4];
        question.textContent = "DO YOU LOVE MEEEEEEEEEEEEEEEEÉEEEEEÊEEEEEEEEEEĒEEEEEEEĘ";
        playAudio("scary");
        break;
      case 5:
        img.src = gifList[5];
        question.textContent = "Do you love me?";
        yesBtn.style.transform = "scale(1)";
        noBtn.style.transform = "scale(1)";
        noBtn.textContent = "Yes";
        noBtn.style.backgroundColor = "#3f8f29";
        noBtn.onclick = answerYes;

        playAudio("laugh");
        break;
    }
  }

  let isMuted = false;

  function toggleMute() {
    isMuted = !isMuted;
    document.querySelectorAll("audio").forEach(a => {
      a.muted = isMuted;
    });

    if (volumeOnIcon && volumeOffIcon) {
      volumeOnIcon.style.display = isMuted ? "none" : "inline";
      volumeOffIcon.style.display = isMuted ? "inline" : "none";
    }
  }

  yesBtn?.addEventListener("click", answerYes);
  noBtn?.addEventListener("click", answerNo);

  volumeOnIcon?.addEventListener("click", toggleMute);
  volumeOffIcon?.addEventListener("click", toggleMute);

  refreshBtn?.addEventListener("click", () => location.reload());
});

// heart fireworks
document.addEventListener("DOMContentLoaded", () => {
    const stars = document.getElementById("stars");
    const about = document.getElementById("about");
    const whistleSound = document.getElementById("fireworkWhistle");
    const explodeSound = document.getElementById("fireworkExplode");    

    whistleSound.volume = 0.5;
    explodeSound.volume = 0.7;

    about.addEventListener("click", (e) => {
        if (e.target.closest(".icon-link")) return;

        const rect = about.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        whistleSound.pause();
        whistleSound.currentTime = 0;

        const randomPitch = Math.random() * 0.6 + 0.7;
        whistleSound.playbackRate = randomPitch;

        whistleSound.play().catch(() => {});

        launchFirework(x, y);
    });

    function launchFirework(x, targetY) {
        const rocket = document.createElement("div");
        rocket.classList.add("firework");

        rocket.style.left = x + "px";

        // Random blue/white rocket color
        const colors = ["#CDEFFB", "#ffffff"];
        rocket.style.background = colors[Math.floor(Math.random() * colors.length)];
        rocket.style.boxShadow = `0 0 10px ${rocket.style.background}`;

        stars.appendChild(rocket);

        rocket.animate(
            [
                { transform: "translateY(0)" },
                { transform: `translateY(${targetY - window.innerHeight}px)` }
            ],
            {
                duration: 800,
                easing: "ease-out",
                fill: "forwards"
            }
        );

        setTimeout(() => {
            const rect = rocket.getBoundingClientRect();
            rocket.remove();

            explodeSound.pause();
            explodeSound.currentTime = 0;
            explodeSound.play().catch(() => {});

            explodeHearts(rect.left, rect.top);
        }, 800);
    }

    function explodeHearts(x, y) {
        const heartCount = 20;
        const colors = ["#6EB6FA", "#ffffff", "#83b5ff", "#77b6ff"]; // blue and white

        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement("i");
            heart.className = Math.random() > 0.5
                ? "fa-solid fa-heart heart"
                : "fa-regular fa-heart heart";

            heart.style.left = x + "px";
            heart.style.top = y + "px";

            // Random direction and distance
            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * 100 + 50;
            heart.style.setProperty("--x", Math.cos(angle) * distance + "px");
            heart.style.setProperty("--y", Math.sin(angle) * distance + "px");

            // Random color
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];

            stars.appendChild(heart);

            // RANDOMIZE removal time between 0.5s and 1.5s
            const randomLifetime = Math.random() * 1000 + 500; // ms
            setTimeout(() => heart.remove(), randomLifetime);
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const gifElement = document.getElementById("mainGif");
    const description = document.getElementById("gifDescription");

    const leftArrow = document.querySelector(".arrow-left");
    const rightArrow = document.querySelector(".arrow-right");

    // 👇 YOUR GIF LIST (update paths + text)
    const gifs = [
        {
            src: "code_stuff/gifs/hug.gif",
            text: "See each other"
        },
        {
            src: "code_stuff/gifs/play.gif",
            text: "Go on adventures"
        },
        {
            src: "code_stuff/gifs/fighting.gif",
            text: "Have fights"
        },
        {
            src: "code_stuff/gifs/cuddle.gif",
            text: "Sleep together"
        },
        {
            src: "code_stuff/gifs/baking.gif",
            text: "Bake pastries"
        },
        {
            src: "code_stuff/gifs/hanging.gif",
            text: "Hangout!"
        },
        {
            src: "code_stuff/gifs/kiss.gif",
            text: "Kiss each other"
        },
        {
            src: "code_stuff/gifs/umm.gif",
            text: "Umm hehe"
        },
    ];

    let currentIndex = 0;

    function updateGif() {
        gifElement.src = gifs[currentIndex].src;
        description.textContent = gifs[currentIndex].text;
    }

    // RIGHT → NEXT
    rightArrow.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % gifs.length;
        updateGif();
    });

    // LEFT → PREVIOUS
    leftArrow.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + gifs.length) % gifs.length;
        updateGif();
    });

    // Initialize first GIF
    updateGif();
});