/* ══════════════════════════════════════════════════════
   Ravi Kumar — Portfolio Scripts
   ══════════════════════════════════════════════════════ */

/* ── Star-field Canvas ─────────────────────────────────
   Renders animated floating particles on the background
   canvas for a "space" aesthetic.                       */
(function initStarField() {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");
  let stars = [];
  const STAR_COUNT = 120;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.6 + 0.2,
        dx: (Math.random() - 0.5) * 0.15,
        dy: (Math.random() - 0.5) * 0.15,
        pulse: Math.random() * Math.PI * 2,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of stars) {
      s.x += s.dx;
      s.y += s.dy;
      s.pulse += 0.012;

      // wrap around
      if (s.x < 0) s.x = canvas.width;
      if (s.x > canvas.width) s.x = 0;
      if (s.y < 0) s.y = canvas.height;
      if (s.y > canvas.height) s.y = 0;

      const a = s.alpha + Math.sin(s.pulse) * 0.2;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 200, 240, ${Math.max(0, a)})`;
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => {
    resize();
    createStars();
  });
  resize();
  createStars();
  draw();
})();

/* ── Mobile Hamburger Menu ─────────────────────────── */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
  hamburger.setAttribute(
    "aria-expanded",
    hamburger.classList.contains("open").toString(),
  );
});
// Close menu on link click
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
  });
});

/* ── Active Nav Link Highlighting ──────────────────── */
const sections = document.querySelectorAll("section[id]");
const navItems = navLinks.querySelectorAll("a");

function updateActiveLink() {
  const scrollY = window.scrollY + 100;
  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");
    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach((a) => {
        a.classList.remove("active");
        if (a.getAttribute("href") === `#${id}`) {
          a.classList.add("active");
        }
      });
    }
  });
}

/* ── Navbar Scroll Effect ──────────────────────────── */
const navbar = document.getElementById("navbar");
const scrollTopBtn = document.getElementById("scroll-top");

function handleScroll() {
  const scrolled = window.scrollY > 50;
  navbar.classList.toggle("scrolled", scrolled);
  scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
  updateActiveLink();
}
window.addEventListener("scroll", handleScroll, { passive: true });

/* ── Scroll-to-top ─────────────────────────────────── */
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ── Intersection Observer for Reveal Animations ───── */
const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger children slightly
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);
reveals.forEach((el) => revealObserver.observe(el));

/* ── Console easter egg ────────────────────────────── */
console.log(
  "%c⚡ Ravi Kumar — Portfolio",
  "color: #7b5cff; font-size: 18px; font-weight: bold;",
);
console.log(
  "%cBuilt with pure HTML, CSS & Vanilla JS. No frameworks!",
  "color: #22d3ee; font-size: 12px;",
);
