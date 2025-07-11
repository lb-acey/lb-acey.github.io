document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loading-screen");
  
  // Füge die fade-out-Klasse hinzu
  setTimeout(() => {
    loadingScreen.classList.add("fade-out");

    // Warte, bis die Animation endet, bevor der Ladebildschirm entfernt wird
    loadingScreen.addEventListener("animationend", () => {
      loadingScreen.remove(); // Entferne den Ladebildschirm aus dem DOM

      window.scrollTo(0, 0);

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



const particlesContainer = document.getElementById("particles-js");
particlesContainer.style.backgroundColor = document.body.classList.contains("light-mode")
  ? "#ffffff"
  : "var(--background)";

let konamiCode = [];
const secretCode = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";

window.addEventListener("keydown", (e) => {
  konamiCode.push(e.key);
  if (konamiCode.join("").includes(secretCode)) {
    alert("Why did you use the Konami Code? This is not a game!");
    konamiCode = [];
  }
});

document.addEventListener("DOMContentLoaded", () => {
  tsParticles.load("particles-js", {
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#ffffff", // Standardfarbe (Dark Mode)
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.8,
        random: true,
      },
      size: {
        value: 3,
        random: true,
      },
      move: {
        enable: true,
        speed: 0.4,
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
          mode: "repulse",
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
});

const timelineItems = document.querySelectorAll(".timeline-item");

// IntersectionObserver für die Sichtbarkeit der Timeline-Elemente
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible"); // Füge die Klasse hinzu, wenn sichtbar
    }
  });
}, {
  threshold: 0.2, // 20% des Elements müssen sichtbar sein
});

// Beobachte alle Timeline-Elemente
timelineItems.forEach((item) => observer.observe(item));

// Scroll-Event, um die Sichtbarkeit zurückzusetzen, wenn der Benutzer ganz oben ist
window.addEventListener("scroll", () => {
  if (window.scrollY === 0) {
    timelineItems.forEach((item) => item.classList.remove("visible")); // Entferne die Klasse
    timelineItems[0].classList.add("visible"); // Füge die Klasse dem ersten Element wieder hinzu
  }
});


const discordUserId = "863095378538266634"; // Your Discord ID
const spotifyContainer = document.getElementById("spotify-activity");

async function fetchSpotifyActivity() {
  try {
    const proxyUrl = "https://api.allorigins.win/get?url=";
    const apiUrl = `${proxyUrl}https://api.lanyard.rest/v1/users/${discordUserId}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.data.listening_to_spotify) {
      const spotify = data.data.spotify;
      const progress = calculateProgress(spotify.timestamps.start, spotify.timestamps.end);
      const elapsedTime = formatTime(Date.now() - spotify.timestamps.start);
      const totalTime = formatTime(spotify.timestamps.end - spotify.timestamps.start);
      const spotifyLink = `https://open.spotify.com/track/${spotify.track_id}`;

      spotifyContainer.innerHTML = `
        <div class="spotify-card">
          <img src="${spotify.album_art_url}" alt="Album Art" class="spotify-album-art">
          <div class="spotify-info">
            <p><strong><a href="${spotifyLink}" target="_blank" rel="noopener noreferrer">${spotify.song}</a></strong></p>
            <p>${spotify.artist}</p>
          </div>
          <div class="spotify-progress-bar">
            <div class="spotify-progress" style="width: ${progress}%;"></div>
          </div>
          <div class="spotify-time">
            <span>${elapsedTime}</span>
            <span>${totalTime}</span>
          </div>
        </div>
      `;
    } else {
      spotifyContainer.innerHTML = `
        <div class="spotify-card">
          <p style="color: var(--text-muted);">Not listening to Spotify right now.</p>
        </div>
      `;
    }
  } catch (error) {
    console.error("Error fetching Spotify activity:", error);
    spotifyContainer.innerHTML = `
      <div class="spotify-card">
        <p style="color: var(--text-muted);">Unable to load Spotify activity.</p>
      </div>
    `;
  }
}

function calculateProgress(start, end) {
  const currentTime = Date.now();
  const totalDuration = end - start;
  const elapsed = currentTime - start;
  return Math.min((elapsed / totalDuration) * 100, 100);
}

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Update Spotify activity every 1 second
setInterval(fetchSpotifyActivity, 5000);
fetchSpotifyActivity();

function calculateProgress(start, end) {
  const currentTime = Date.now();
  const totalDuration = end - start;
  const elapsed = currentTime - start;
  return Math.min((elapsed / totalDuration) * 100, 100);
}

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Aktualisiere die Spotify-Aktivität alle 1 Sekunde
setInterval(fetchSpotifyActivity, 1000);
fetchSpotifyActivity();