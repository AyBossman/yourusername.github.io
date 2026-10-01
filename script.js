// ===== Route map data =====
// Content lives in one object, so the HTML stays clean and
// a new stop only needs one new entry here.
const stops = {
  boston: {
    line: "Origin",
    color: "var(--ink)",
    title: "Boston, Massachusetts",
    body: "Where I'm from and where I've built my career in IT infrastructure, cybersecurity, and healthcare systems."
  },
  security: {
    line: "Red line",
    color: "var(--red)",
    title: "Cybersecurity Analyst",
    body: "Protecting systems and the people who rely on them. I hold Security+ and I'm working on my M.S. in Cybersecurity."
  },
  cloud: {
    line: "Orange line",
    color: "var(--orange)",
    title: "Cloud Solutions Architect",
    body: "Designing infrastructure that scales. My AWS Solutions Architect certification is the first stop on this line."
  },
  data: {
    line: "Green line",
    color: "var(--green)",
    title: "Health Data Analyst",
    body: "Turning healthcare data into decisions that improve health equity — the focus of my MPH work."
  },
  travel: {
    line: "Blue line ✈",
    color: "var(--blue)",
    title: "Kyoto, Japan",
    body: "The place I'd most like to travel to: temples, gardens, and a city that blends deep history with modern technology."
  }
};

const panel = document.getElementById("stop-panel");
const panelLine = document.getElementById("panel-line");
const panelTitle = document.getElementById("panel-title");
const panelBody = document.getElementById("panel-body");
const stopEls = document.querySelectorAll(".stop");

function showStop(key) {
  const stop = stops[key];
  panelLine.textContent = stop.line;
  panelTitle.textContent = stop.title;
  panelBody.textContent = stop.body;
  // One CSS variable drives the panel's accent color
  panel.style.setProperty("--active", stop.color);

  stopEls.forEach(el => el.classList.toggle("is-active", el.dataset.stop === key));
}

stopEls.forEach(el => {
  el.addEventListener("click", () => showStop(el.dataset.stop));
  // SVG <g> elements aren't real buttons, so add keyboard support
  el.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      showStop(el.dataset.stop);
    }
  });
});

showStop("boston");

// ===== Screenshot lightbox =====
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");

document.querySelectorAll(".shot").forEach(btn => {
  const img = btn.querySelector("img");

  // If a screenshot file is missing, show a clear note instead of a broken image.
  // The image may have already failed before this script ran, so check both ways.
  const markMissing = () => {
    btn.classList.add("missing");
    btn.disabled = true;
    btn.textContent = "Add " + img.getAttribute("src");
  };
  if (img.complete && img.naturalWidth === 0) markMissing();
  else img.addEventListener("error", markMissing);

  btn.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = btn.closest("figure").querySelector("figcaption").textContent;
    lightbox.showModal();
  });
});

document.getElementById("lightbox-close").addEventListener("click", () => lightbox.close());

// Close when clicking the dark backdrop
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) lightbox.close();
});
