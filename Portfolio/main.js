document.addEventListener("DOMContentLoaded", () => {
  // Loader
  window.addEventListener("load", () =>
    setTimeout(
      () => (document.getElementById("loader").style.display = "none"),
      1000
    )
  );

  // Render Data
  document.querySelector(".projects-grid").innerHTML = DATA.projects
    .map(
      (p) =>
        `<div class="project-card"><h3>${p.title}</h3><p>${p.description}</p></div>`
    )
    .join("");
  document.querySelector(".timeline").innerHTML = DATA.experience
    .map(
      (e) =>
        `<div class="timeline-item"><h4>${e.institution}</h4><p>${e.role} (${e.duration})</p></div>`
    )
    .join("");
  document.querySelector(".skills-container").innerHTML = DATA.skills
    .map(
      (s) => `<div class="skill-pill"><i class="${s.icon}"></i>${s.name}</div>`
    )
    .join("");
  document.querySelector(
    ".contact-wrapper"
  ).innerHTML = `<p>Email: ${DATA.contact.email}</p><a href="${DATA.contact.linkedin}" style="color:#8257e5">LinkedIn Profile</a>`;

  // Typing Effect
  let rIdx = 0,
    cIdx = 0,
    isDel = false;
  function type() {
    const role = DATA.roles[rIdx];
    document.getElementById("typing-text").textContent = isDel
      ? role.substring(0, cIdx--)
      : role.substring(0, cIdx++);
    if (!isDel && cIdx > role.length) {
      isDel = true;
      setTimeout(type, 2000);
    } else if (isDel && cIdx < 0) {
      isDel = false;
      rIdx = (rIdx + 1) % DATA.roles.length;
      setTimeout(type, 500);
    } else setTimeout(type, isDel ? 50 : 100);
  }
  type();

  // Scroll Animations
  const obs = new IntersectionObserver(
    (ents) =>
      ents.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("active");
      }),
    { threshold: 0.1 }
  );
  document.querySelectorAll("section").forEach((s) => obs.observe(s));
});
