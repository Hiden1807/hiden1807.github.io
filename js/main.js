/* main.js — comportement du site. Le contenu vit dans data.js. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };

  function store(kind, key, val) {
    try {
      var s = kind === "local" ? window.localStorage : window.sessionStorage;
      if (val === undefined) return s.getItem(key);
      s.setItem(key, val);
    } catch (e) { return null; }
  }

  /* ---------------- langue ---------------- */
  var lang = store("local", "lang");
  if (lang !== "fr" && lang !== "en") lang = (navigator.language || "fr").slice(0, 2) === "en" ? "en" : "fr";
  var t = function (k) { return I18N[lang][k]; };

  function applyLang() {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach(function (el) {
      var v = I18N[lang][el.getAttribute("data-i18n")];
      if (typeof v === "string") el.textContent = v;
    });
    $("#lang").textContent = lang === "fr" ? "EN" : "FR";
    renderSkills(); renderProjects(); renderCerts(); renderContact();
    runHero();
  }

  /* ---------------- rendu des listes (textContent uniquement : pas d'injection HTML) ---------------- */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  function renderSkills() {
    var box = $("#scan"); box.textContent = "";
    var head = el("div", "row head");
    t("skills_head").forEach(function (h) { head.appendChild(el("span", "", h)); });
    box.appendChild(head);
    SKILLS.forEach(function (s) {
      var row = el("div", "row");
      row.appendChild(el("span", "", s.port));
      row.appendChild(el("span", s.state, s.state === "open" ? "open" : "open|filtered"));
      row.appendChild(el("span", "", s.service));
      row.appendChild(el("span", "", s[lang]));
      box.appendChild(row);
    });
    box.appendChild(el("div", "legend", t("skills_legend")));
  }

  function safeUrl(u) { return /^https:\/\//i.test(u) ? u : ""; }

  function renderProjects() {
    var grid = $("#projectgrid"); grid.textContent = "";
    PROJECTS.forEach(function (p) {
      var card = el("article", "card");
      card.appendChild(el("h3", "", p.name));
      card.appendChild(el("p", "", p[lang]));
      var tags = el("ul", "tags");
      p.stack.forEach(function (s) { tags.appendChild(el("li", "", s)); });
      card.appendChild(tags);
      var links = el("ul", "links");
      [["repo", "link_repo"], ["demo", "link_demo"]].forEach(function (pair) {
        var url = safeUrl(p[pair[0]]);
        if (!url) return;
        var li = el("li"), a = el("a", "", t(pair[1]));
        a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer";
        li.appendChild(a); links.appendChild(li);
      });
      if (links.children.length) card.appendChild(links);
      grid.appendChild(card);
    });
  }

  function renderCerts() {
    var grid = $("#certgrid"); grid.textContent = "";
    CERTS.forEach(function (c) {
      var card = el("article", "card");
      card.appendChild(el("h3", "", c.name));
      card.appendChild(el("span", "score", c.score));
      card.appendChild(el("p", "", c[lang]));
      grid.appendChild(card);
    });
  }

  function renderContact() {
    var ul = $("#contactlinks"); ul.textContent = "";
    var L = CONFIG.links;
    function add(label, href, ext) {
      var li = el("li"), a = el("a", "", label);
      a.href = href;
      if (ext) { a.target = "_blank"; a.rel = "noopener noreferrer"; }
      li.appendChild(a); ul.appendChild(li);
    }
    if (L.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(L.email)) add(L.email, "mailto:" + L.email, false);
    if (safeUrl(L.github)) add("GitHub", L.github, true);
    if (safeUrl(L.linkedin)) add("LinkedIn", L.linkedin, true);
    if (safeUrl(L.instagram)) add("Instagram", L.instagram, true);
  }

  /* ---------------- terminal du hero ---------------- */
  var heroToken = 0;
  async function runHero() {
    var my = ++heroToken, body = $("#termbody");
    body.textContent = "";
    var lines = I18N[lang].hero;
    var cur = el("span", "cursor");
    for (var i = 0; i < lines.length; i++) {
      var prompt = el("span", "p", "hostname@unikin:~$ "), cmd = el("span"), out = el("div", "h");
      body.appendChild(prompt); body.appendChild(cmd); body.appendChild(cur);
      for (var c = 0; c < lines[i].cmd.length; c++) {
        if (my !== heroToken) return;
        cmd.textContent += lines[i].cmd[c];
        if (!reduce) await sleep(45);
      }
      if (!reduce) await sleep(250);
      body.insertBefore(el("br"), cur);
      out.textContent = lines[i].out;
      body.insertBefore(out, cur);
      if (!reduce) await sleep(350);
    }
    if (my === heroToken) body.appendChild(el("span", "p", "hostname@unikin:~$ "));
    body.appendChild(cur);
  }

  /* ---------------- séquence de démarrage ---------------- */
  async function boot() {
    var box = $("#boot"), log = $("#bootlog");
    var done = false;
    function finish() { if (done) return; done = true; box.classList.add("done"); store("session", "booted", "1"); }
    $("#bootskip").addEventListener("click", finish);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") finish(); });
    if (reduce || store("session", "booted")) { box.classList.add("done"); return; }
    var lines = I18N[lang].boot;
    for (var i = 0; i < lines.length && !done; i++) {
      var row = el("div"), tag = el("span", "wait", "[ .... ] ");
      row.appendChild(tag); row.appendChild(document.createTextNode(lines[i]));
      log.appendChild(row);
      await sleep(150);
      tag.className = "ok"; tag.textContent = "[  OK  ] ";
      await sleep(70);
    }
    await sleep(200);
    finish();
  }

  /* ---------------- effet Matrix (canvas) ---------------- */
  function matrix() {
    var cv = $("#matrix"), ctx = cv.getContext("2d");
    var SETS = {
      mixed: "0123456789ABCDEF<>/{}#$%",
      latin: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/{}[]#$%&*+=",
      binary: "01"
    };
    var chars = (SETS[CONFIG.matrixStyle] || SETS.mixed).split("");
    var size = 16, cols, drops, w, h, mouse = { x: -999, y: -999 }, timer;

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / size);
      drops = [];
      for (var i = 0; i < cols; i++) drops.push(Math.random() * h / size);
    }
    function frame() {
      ctx.fillStyle = "rgba(5, 8, 12, 0.09)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = size + "px monospace";
      for (var i = 0; i < cols; i++) {
        var x = i * size, y = drops[i] * size;
        var near = Math.hypot(x - mouse.x, y - mouse.y) < 130;
        ctx.fillStyle = near ? "#eafff5" : (Math.random() > .975 ? "#b8ffe0" : "#00c878");
        ctx.fillText(chars[(Math.random() * chars.length) | 0], x, y);
        if (y > h && Math.random() > .975) drops[i] = 0;
        drops[i] += near ? .4 : 1;
      }
    }
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
    if (reduce) { for (var k = 0; k < 40; k++) frame(); return; }
    function start() { if (!timer) timer = setInterval(frame, 55); }
    function stop() { clearInterval(timer); timer = null; }
    document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
    start();
  }

  /* ---------------- révélation + déchiffrement des titres ---------------- */
  function scramble(node) {
    var finalText = node.textContent, glyphs = "01<>/\\{}[]#$%&*+=", step = 0, total = 14;
    if (reduce) return;
    var id = setInterval(function () {
      step++;
      var shown = "";
      for (var i = 0; i < finalText.length; i++) {
        shown += (i < (finalText.length * step) / total || finalText[i] === " ") ? finalText[i] : glyphs[(Math.random() * glyphs.length) | 0];
      }
      node.textContent = shown;
      if (step >= total) { clearInterval(id); node.textContent = finalText; }
    }, 40);
  }
  function observe() {
    var els = $$(".reveal");
    if (reduce || !("IntersectionObserver" in window)) return;
    els.forEach(function (e) {
      if (e.getBoundingClientRect().top > window.innerHeight) e.classList.add("pre");  // visible par défaut, masqué seulement sous la ligne de flottaison
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.remove("pre");
        var h = $("[data-scramble]", en.target); if (h) scramble(h);
        io.unobserve(en.target);
      });
    }, { threshold: .15 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------------- formulaire (Formspree) ---------------- */
  function form() {
    var f = $("#form"), status = $("#formstatus"), btn = $("#send"), busy = false;
    var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function mark(input, bad) { input.setAttribute("aria-invalid", bad ? "true" : "false"); return bad; }
    function say(msg, cls) { status.textContent = msg; status.className = "status " + (cls || ""); }

    f.addEventListener("submit", async function (e) {
      e.preventDefault();
      if (busy) return;
      var fName = $("#f_name"), fMail = $("#f_email"), fMsg = $("#f_msg"), fHp = $("#f_gotcha");
      var name = fName.value.trim(), mail = fMail.value.trim(), msg = fMsg.value.trim();
      var bad = [
        mark(fName, name.length < 2 || name.length > 80),
        mark(fMail, !emailRe.test(mail) || mail.length > 120),
        mark(fMsg, msg.length < 10 || msg.length > 2000)
      ].some(Boolean);
      if (bad) { say(t("f_invalid"), "err"); return; }
      if (fHp.value) { say(t("f_ok"), "ok"); f.reset(); return; }   // robot : on fait semblant
      if (!CONFIG.formspreeId || CONFIG.formspreeId === "REMPLACE_MOI") { say(t("f_unconfigured"), "err"); return; }

      busy = true; btn.disabled = true; say(t("f_sending"));
      try {
        var res = await fetch("https://formspree.io/f/" + encodeURIComponent(CONFIG.formspreeId), {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: new FormData(f)
        });
        if (!res.ok) throw new Error("HTTP " + res.status);
        say(t("f_ok"), "ok"); f.reset();
      } catch (err) {
        say(t("f_err"), "err");
      } finally {
        busy = false; btn.disabled = false;
      }
    });
  }

  /* ---------------- init ---------------- */
  function init() {
    var photo = $("#photo");
    photo.addEventListener("load", function () { photo.hidden = false; });
    if (photo.complete && photo.naturalWidth > 0) photo.hidden = false;
    var cv = $("#cvlink"); if (CONFIG.cvFile) cv.href = CONFIG.cvFile; else cv.hidden = true;
    $("#year").textContent = new Date().getFullYear();
    $("#lang").addEventListener("click", function () {
      lang = lang === "fr" ? "en" : "fr";
      store("local", "lang", lang);
      applyLang();
    });
    applyLang();
    matrix();
    observe();
    form();
    boot();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
