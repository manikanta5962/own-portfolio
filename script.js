const rootElement = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const header = document.querySelector('.header');
const hero = document.querySelector('.hero');

let currentTheme = 'light';

function applyTheme(theme) {
    currentTheme = theme;
    rootElement.setAttribute('data-theme', theme);
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

themeToggle.addEventListener('click', () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});

window.addEventListener('load', () => {
    applyTheme('dark');
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.background = currentTheme === 'dark'
            ? 'rgba(15, 23, 42, 0.98)'
            : 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.background = currentTheme === 'dark'
            ? 'rgba(15, 23, 42, 0.95)'
            : 'rgba(255, 255, 255, 0.95)';
    }

    const scrolled = window.pageYOffset;
    const speed = scrolled * 0.2;
    hero.style.transform = `translateY(${speed}px)`;
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});





  const form = document.querySelector(".contact-form");
  const inputs = form.querySelectorAll("input, textarea");

  const status = document.createElement("p");
  status.className = "form-status";
  form.appendChild(status);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;
    status.textContent = "";
    status.className = "form-status";

    inputs.forEach((field) => {
      field.classList.remove("error");

      if (!field.value.trim()) {
        field.classList.add("error");
        valid = false;
      }

      if (field.type === "email" && field.value.trim()) {
        const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!emailPattern.test(field.value.trim())) {
          field.classList.add("error");
          valid = false;
        }
      }
    });

    if (!valid) {
      status.textContent = "Please fill all fields correctly.";
      status.classList.add("error-text");
      return;
    }

    const button = form.querySelector("button");
    const originalText = button.textContent;

    button.textContent = "Sending...";
    button.classList.add("loading");
    button.disabled = true;

    setTimeout(() => {
      status.textContent = "Message sent successfully 🚀";
      status.classList.add("success");
      form.reset();
      button.textContent = originalText;
      button.classList.remove("loading");
      button.disabled = false;
    }, 1500);
  });

  inputs.forEach((field) => {
    field.addEventListener("input", () => {
      field.classList.remove("error");
    });
  });


  
  const core = document.querySelector(".cursor-core");
  const ring = document.querySelector(".cursor-ring");
  const trail = document.querySelector(".cursor-trail");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let ringX = mouseX;
  let ringY = mouseY;

  let trailX = mouseX;
  let trailY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    core.style.left = mouseX + "px";
    core.style.top = mouseY + "px";

    createParticle(mouseX, mouseY);
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;

    trailX += (mouseX - trailX) * 0.07;
    trailY += (mouseY - trailY) * 0.07;

    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";

    trail.style.left = trailX + "px";
    trail.style.top = trailY + "px";

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  const hoverTargets = document.querySelectorAll(
    "a, button, input, textarea, select, label, .contact-form, [data-cursor='hover']"
  );

  hoverTargets.forEach((item) => {
    item.addEventListener("mouseenter", () => ring.classList.add("hover"));
    item.addEventListener("mouseleave", () => ring.classList.remove("hover"));
  });

  window.addEventListener("mousedown", () => ring.classList.add("click"));
  window.addEventListener("mouseup", () => ring.classList.remove("click"));

  function createParticle(x, y) {
    const particle = document.createElement("div");
    particle.classList.add("cursor-particle");

    const offsetX = (Math.random() - 0.5) * 60 + "px";
    const offsetY = (Math.random() - 0.5) * 60 + "px";

    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.setProperty("--moveX", offsetX);
    particle.style.setProperty("--moveY", offsetY);

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 700);
  }




  

  root.setAttribute("data-theme", "dark");

  themeToggle.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");

    if (currentTheme === "dark") {
      root.setAttribute("data-theme", "light");
      themeToggle.textContent = "Dark Mode";
    } else {
      root.setAttribute("data-theme", "dark");
      themeToggle.textContent = "Light Mode";
    }
  });

  themeToggle.textContent = "Light Mode";
