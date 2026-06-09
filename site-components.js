"use strict";
// site-components.js — Kimochi vanilla JS
// Requires: menu-data.js (MENU_SECTIONS, TOPPINGS, SPECIALTY, parseItem)

/* ───────────────── Menu rendering ───────────────── */

function renderMenuSection({ name, sub, items, pickHint, note, single }) {
  const parsed = items.map(parseItem);
  const listClass = "menu-item-list" + ((single || parsed.length <= 4) ? " menu-item-list--single" : "");
  const itemsHtml = parsed.map(it =>
    `<div class="menu-item">${it.label}${it.caffeine ? '<span class="caf-mark">*</span>' : ""}</div>`
  ).join("");
  let noteHtml = "";
  if (note) {
    const noteContent = note.includes("slush")
      ? `Make it a <em>SLUSH</em>`
      : note.toUpperCase().includes("OAT")
        ? `Upgrade to <em>OAT MILK</em>`
        : note;
    noteHtml = `<div class="menu-banner"><span>${noteContent}</span></div>`;
  }
  return `
    <div class="menu-category">
      <div class="menu-category-head${noteHtml ? " menu-category-head--has-note" : ""}">
        <h3>${name}</h3>
        ${sub ? `<p>${sub}</p>` : ""}
      </div>
      ${noteHtml}
      ${pickHint ? `<div class="menu-pick-hint">${pickHint}</div>` : ""}
      <div class="${listClass}">${itemsHtml}</div>
    </div>`;
}

function renderToppingsCol() {
  const baseItems = TOPPINGS.base.items.map(t => {
    const p = parseItem(t.name);
    return `<div class="menu-item"${t.note ? ' style="grid-column:1/-1"' : ""}>
      ${p.label}${p.caffeine ? '<span class="caf-mark">*</span>' : ""}
      ${t.note ? `<div style="font-size:12px;font-weight:500;color:var(--fg-muted);margin-top:2px">${t.note}</div>` : ""}
    </div>`;
  }).join("");

  const jellyItems = TOPPINGS.jelly.items.map(t => {
    const p = parseItem(t.name);
    return `<div class="menu-item">${p.label}${p.caffeine ? '<span class="caf-mark">*</span>' : ""}</div>`;
  }).join("");

  const poppingItems = TOPPINGS.popping.items.map(t =>
    `<div class="menu-item">${t.name}</div>`
  ).join("");

  const mutedHead = `background:transparent;color:var(--color-matcha);padding:0;margin-bottom:8px`;
  const mutedH3 = `color:var(--color-matcha);font-size:20px`;

  return `
    <div class="menu-category">
      <div class="menu-category-head"><h3>Toppings</h3></div>
      <div class="menu-item-list">${baseItems}</div>
    </div>
    <div class="menu-category">
      <div class="menu-category-head" style="${mutedHead}"><h3 style="${mutedH3}">Jelly</h3></div>
      <div class="menu-item-list">${jellyItems}</div>
    </div>
    <div class="menu-category">
      <div class="menu-category-head" style="${mutedHead}"><h3 style="${mutedH3}">Popping Boba</h3></div>
      <div class="menu-item-list">${poppingItems}</div>
    </div>`;
}

function renderSpecialtyBlock() {
  const { series, specialtyEspresso, espresso, season } = SPECIALTY;

  const cards = series.map((d, i) => `
    <article class="specialty-card">
      <div class="specialty-card-media">
        <image-slot id="spec-${d.id}" shape="rounded" radius="18"
          placeholder="Drop ${d.name} photo"
          style="width:100%;height:300px;display:block"></image-slot>
      </div>
      <div class="specialty-card-body">
        <h3 class="specialty-card-name">${d.name}${d.caffeine ? '<span class="caf-mark">*</span>' : ""}</h3>
        <span class="specialty-card-base">${d.base}</span>
        <ul class="specialty-card-build">
          ${d.build.map(line => `<li>${line}</li>`).join("")}
        </ul>
      </div>
    </article>`).join("");

  const specEspressoItems = specialtyEspresso.map(e => `
    <div class="espresso-item">
      <span class="espresso-item-name">${e.name}<span class="caf-mark">*</span></span>
      <span class="espresso-item-build">${e.build}</span>
    </div>`).join("");

  const espressoItems = espresso.map(e => `
    <div class="espresso-item">
      <span class="espresso-item-name">${e.name}<span class="caf-mark">*</span></span>
      <span class="espresso-item-build">${e.build}</span>
    </div>`).join("");

  return `
    <div class="specialty">
      <div class="specialty-hero">
        <span class="specialty-hero-eyebrow">Seasonal feature · ${season}</span>
        <h2 class="specialty-hero-script">Specialty Drink Series</h2>
        <p class="specialty-hero-lead">A rotating cast of signature builds — layered, named, and made to order. Here while the season lasts.</p>
      </div>
      <div class="specialty-series">${cards}</div>
      <div class="espresso-bar">
        <div class="espresso-bar-inner">
          <div class="espresso-col espresso-col--specialty">
            <div class="espresso-bar-head">
              <h2>Iced Specialty Espresso</h2>
              <p>House signatures over a double shot.</p>
            </div>
            <div class="espresso-list">${specEspressoItems}</div>
          </div>
          <div class="espresso-col">
            <div class="espresso-bar-head">
              <h2>Iced Espresso</h2>
              <p>The everyday bar.</p>
            </div>
            <div class="espresso-list espresso-list--two">${espressoItems}</div>
          </div>
        </div>
        <p class="espresso-legend"><span class="caf-mark">*</span> Contains caffeine · Sub oat milk on any drink</p>
      </div>
    </div>`;
}

function renderMenu() {
  const byId = Object.fromEntries(MENU_SECTIONS.map(s => [s.id, s]));
  const sec = id => byId[id];

  const col1 = renderMenuSection({ ...sec("classic-milk-tea"), single: true })
    + renderMenuSection(sec("milk-tea"));
  const col2 = renderMenuSection({ ...sec("iced-or-hot-tea"), single: true })
    + renderMenuSection(sec("hot-cocoa"))
    + renderMenuSection(sec("tea-latte"));
  const col3 = renderMenuSection(sec("fruit-tea"))
    + renderMenuSection(sec("lemonade"));
  const col4 = renderToppingsCol();

  const menuHtml = `
  ${renderSpecialtyBlock()}  
  <div class="menu">
      <div class="menu-body">
        <h1 class="menu-title">Everyday Menu</h1>
        <p class="menu-subtitle">Bubble tea · Lemonade · Espresso — made fresh, served slow.</p>
        <p class="menu-caffeine-note"><span class="caf-mark">*</span>&nbsp; Contains caffeine</p>
        <div class="menu-grid">
          <div class="menu-col">${col1}</div>
          <div class="menu-col">${col2}</div>
          <div class="menu-col">${col3}</div>
          <div class="menu-col">${col4}</div>
        </div>
      </div>
    </div>`;

  document.querySelector(".menu-section").innerHTML = menuHtml;
}

/* ───────────────── Header scroll behavior ───────────────── */

function initHeader() {
  const header = document.querySelector(".site-header");
  const btn = document.getElementById("order-btn");
  function update() {
    const scrolled = window.scrollY > window.innerHeight * 0.55 - 84;
    header.classList.toggle("is-scrolled", scrolled);
    if (btn) {
      btn.classList.toggle("btn--primary", scrolled);
      btn.classList.toggle("btn--ghost-light", !scrolled);
    }
  }
  update();
  window.addEventListener("scroll", update, { passive: true });
}

/* ───────────────── Active nav via IntersectionObserver ───────────────── */

function initNav() {
  const navLinks = document.querySelectorAll(".nav a");
  const ids = ["home", "menu", "story", "visit"];
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.remove("active"));
        const link = document.querySelector(`.nav a[href="#${e.target.id}"]`);
        if (link) link.classList.add("active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) obs.observe(el);
  });
}

/* ───────────────── Boot ───────────────── */

document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  initHeader();
  initNav();
});
