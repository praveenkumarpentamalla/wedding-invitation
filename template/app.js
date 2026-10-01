import { weddingData as d } from "./weddingData.js";
const $ = (id) => document.getElementById(id);
const media = (f) => `media/${f}`;
const fmt = (iso, o) => new Date(iso).toLocaleString("en-IN", o);

// Theme + fonts
const t = d.theme, root = document.documentElement.style;
root.setProperty("--ink", t.ink); root.setProperty("--primary", t.primary);
root.setProperty("--accent", t.accent); root.setProperty("--paper", t.paper);
root.setProperty("--h", `"${t.heading}",Georgia,serif`); root.setProperty("--b", `"${t.body}",system-ui,sans-serif`);
const fonts = [t.heading, t.body].map((f) => `family=${f.replace(/ /g, "+")}:wght@400;500`).join("&");
document.head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fonts}&display=swap">`);
if (d.hero) root.setProperty("--hero", `url(${media(d.hero)})`);

const { bride, groom, hashtag } = d.couple;
document.title = `${bride} & ${groom} · Wedding`;
$("names").innerHTML = `${bride}<i>&amp;</i>${groom}`;
$("tagline").textContent = d.tagline;
$("when").textContent = `${fmt(d.date, { day: "numeric", month: "long", year: "numeric" })} · ${d.city}`;

// Countdown
function tick() {
  const ms = Math.max(0, new Date(d.date) - Date.now());
  const v = [["Days", 864e5], ["Hours", 36e5], ["Minutes", 6e4], ["Seconds", 1e3]]
    .map(([l, u], i) => `<div><b>${Math.floor(ms / u) % (i ? [0, 24, 60, 60][i] : 1e9)}</b><span>${l}</span></div>`);
  $("count").innerHTML = v.join("");
}
tick(); setInterval(tick, 1000);

// Story, events, gallery
$("storyList").innerHTML = d.story.map((s) =>
  `<article><img src="${media(s.image)}" alt="${s.title}" loading="lazy"><div><h3>${s.title}</h3><p>${s.text}</p></div></article>`).join("");
$("eventList").innerHTML = d.events.map((e) =>
  `<article><h3>${e.name}</h3><p>${fmt(e.time, { weekday: "long", day: "numeric", month: "long", hour: "numeric", minute: "2-digit" })}<br>${e.venue}</p><a href="${e.mapUrl}" target="_blank" rel="noopener">Open in Maps</a></article>`).join("");
$("grid").innerHTML = d.gallery.map((g) => `<img src="${media(g)}" alt="Photo of ${bride} and ${groom}" loading="lazy">`).join("");

const box = $("lightbox");
$("grid").addEventListener("click", (e) => { if (e.target.tagName === "IMG") { box.querySelector("img").src = e.target.src; box.showModal(); } });
box.addEventListener("click", () => box.close());

// RSVP -> WhatsApp
$("rsvpNote").textContent = `Please reply by ${fmt(d.rsvp.deadline, { day: "numeric", month: "long", year: "numeric" })}.`;
$("rsvpForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const msg = `Hi! ${f.get("name")} here. ${f.get("going")}. Guests: ${f.get("guests")}. ${hashtag}`;
  window.open(`https://wa.me/${d.rsvp.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
});

// Music (starts only on tap, as browsers require)
if (d.music) {
  const a = new Audio(media(d.music)); a.loop = true;
  const b = $("musicBtn"); b.hidden = false;
  b.onclick = () => a.paused ? (a.play(), b.textContent = "Pause music") : (a.pause(), b.textContent = "Play music");
}
$("foot").textContent = `${hashtag} · With love, ${bride} & ${groom}`;
