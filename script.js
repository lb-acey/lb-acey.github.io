document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");

  // Füge die fade-out-Klasse hinzu
  setTimeout(() => {
    loadingScreen.classList.add("fade-out");

    // Warte, bis die Animation endet, bevor der Ladebildschirm entfernt wird
    loadingScreen.addEventListener("animationend", () => {
      loadingScreen.remove(); // Entferne den Ladebildschirm aus dem DOM

      // Starte den Typing-Effekt, nachdem der Ladebildschirm entfernt wurde
      startTypingEffect();
    });
  }, 1000); // Zeige den Ladebildschirm für mindestens 1 Sekunde
});

// Modals
const modals = document.querySelectorAll(".modal");
const projects = document.querySelectorAll(".project");
const closes = document.querySelectorAll(".close");

projects.forEach(project => {
  project.addEventListener("click", () => {
    const id = project.getAttribute("data-modal");
    const modal = document.getElementById(id);
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // Deaktiviert das Scrollen
  });
});

closes.forEach(btn => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    modal.style.display = "none";
    document.body.style.overflow = ""; // Aktiviert das Scrollen wieder
  });
});

window.addEventListener("click", e => {
  modals.forEach(modal => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = ""; // Aktiviert das Scrollen wieder
    }
  });
});

// Dark/Light Mode Toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  themeToggle.textContent = document.body.classList.contains("light-mode") ? "🌙" : "☀️";
});

// Scroll-to-Top Button
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Mobile Navigation Toggle
const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");

menuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("show");
  if (mobileNav.classList.contains("show")) {
    document.body.style.overflow = "hidden"; // Scrollen deaktivieren
  } else {
    document.body.style.overflow = ""; // Scrollen wieder aktivieren
  }
});

// Schließe das Menü, wenn ein Link angeklickt wird
const mobileNavLinks = mobileNav.querySelectorAll("a");
mobileNavLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("show");
    document.body.style.overflow = ""; // Scrollen wieder aktivieren
  });
});

// Progress Bars Animation
const progressBars = document.querySelectorAll(".progress");

const progressObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progress = entry.target;
      const width = progress.getAttribute("data-width");
      progress.style.width = width;
    }
  });
});

progressBars.forEach(bar => progressObserver.observe(bar));

// Typing-Effekt für den Header
function startTypingEffect() {
  const headerTitle = document.querySelector("header h1");
  const text = "Acey | Lucas";
  let index = 0;

  function typeEffect() {
    if (index < text.length) {
      headerTitle.textContent += text[index];
      index++;
      setTimeout(typeEffect, 100); // Geschwindigkeit der Animation
    } else {
      // Blinker-Animation hinzufügen, nachdem der Typing-Effekt abgeschlossen ist
      headerTitle.innerHTML += '<span class="blinker">|</span>';
    }
  }

  headerTitle.textContent = ""; // Leeren, bevor die Animation startet
  typeEffect();
}

// Dynamisches Jahr im Footer
const footer = document.querySelector("footer p");
const currentYear = new Date().getFullYear();
footer.innerHTML = `🖥️ Coded with ♥ by Lucas – © ${currentYear}`;

// Begrüßung basierend auf der Tageszeit
const greetingElement = document.createElement("p");
const hours = new Date().getHours();
let greeting;

if (hours < 12) {
  greeting = "Good Morning!";
} else if (hours < 18) {
  greeting = "Good Afternoon!";
} else {
  greeting = "Good Evening!";
}

greetingElement.textContent = greeting;
document.querySelector("header").appendChild(greetingElement);

// Live-Zeit-Anzeige
const timeElement = document.createElement("p");
document.querySelector("header").appendChild(timeElement);

function updateTime() {
  const now = new Date();
  timeElement.textContent = now.toLocaleTimeString();
}

setInterval(updateTime, 1000);
updateTime();

let visitorCount = localStorage.getItem("visitorCount") || 0;
visitorCount++;
localStorage.setItem("visitorCount", visitorCount);

const visitorElement = document.createElement("p");
visitorElement.textContent = `You are visitor number: ${visitorCount}`;
document.querySelector("footer").appendChild(visitorElement);

window.addEventListener("scroll", () => {
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const percentage = (window.scrollY / maxScroll) * 100;
  document.getElementById("scroll-indicator").style.width = `${percentage}%`;
});

const projectcards = document.querySelectorAll(".project");

projectcards.forEach(project => {
  project.addEventListener("mousemove", e => {
    const rect = project.getBoundingClientRect();
    const x = e.clientX - rect.left; // X-Position der Maus relativ zur Karte
    const y = e.clientY - rect.top;  // Y-Position der Maus relativ zur Karte

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10; // Maximal 10 Grad
    const rotateY = ((x - centerX) / centerX) * -10;

    project.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  project.addEventListener("mouseleave", () => {
    project.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  });
});

tsParticles.load("particles-js", {
  particles: {
    number: {
      value: 100, // Anzahl der Sterne
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#ffffff", // Weiße Sterne
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.8,
      random: true, // Funkeln
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.3,
        sync: false,
      },
    },
    size: {
      value: 3,
      random: true,
    },
    move: {
      enable: true,
      speed: 0.2, // Langsame Bewegung
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse", // Sterne bewegen sich weg, wenn die Maus darüber ist
      },
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4,
      },
    },
  },
  retina_detect: true,
});

let konamiCode = [];
const secretCode = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";

window.addEventListener("keydown", (e) => {
  konamiCode.push(e.key);
  if (konamiCode.join("").includes(secretCode)) {
    alert("Why did you use the Konami Code? This is not a game!");
    konamiCode = [];
  }
});

