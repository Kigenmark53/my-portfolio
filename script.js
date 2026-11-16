/* ==========================================================================
   Mark Kigen — portfolio behaviour
   Reveal on scroll, sticky nav state, active section, spotlight, tilt,
   mobile menu, counters, copy-to-clipboard. No dependencies.
   ========================================================================== */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- scroll reveal ---------- */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  if (!("IntersectionObserver" in window) || reduceMotion) {
    revealItems.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    revealItems.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ---------- nav: sticky state, mobile menu ---------- */
  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  function closeMenu() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  if (nav && navToggle) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    if (navMenu) {
      navMenu.addEventListener("click", function (e) {
        if (e.target.closest("a")) closeMenu();
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  var stuckPoint = 24;
  var tickingNav = false;

  function onNavScroll() {
    if (!nav) return;
    if (tickingNav) return;
    tickingNav = true;
    window.requestAnimationFrame(function () {
      nav.classList.toggle("is-stuck", window.scrollY > stuckPoint);
      tickingNav = false;
    });
  }
  window.addEventListener("scroll", onNavScroll, { passive: true });
  onNavScroll();

  /* ---------- active section in nav ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var visible = new Set();

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      });

      // highest section in document order that is currently visible
      var activeId = null;
      sections.forEach(function (s) {
        if (!activeId && visible.has(s.id)) activeId = s.id;
      });

      navLinks.forEach(function (link) {
        link.classList.toggle(
          "is-active",
          activeId !== null && link.getAttribute("href") === "#" + activeId
        );
      });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });

    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  /* ---------- pointer spotlight ---------- */
  var spotlight = document.getElementById("spotlight");
  if (spotlight && canHover && !reduceMotion) {
    var mx = 50, my = 30, rafId = null;

    window.addEventListener("pointermove", function (e) {
      mx = (e.clientX / window.innerWidth) * 100;
      my = (e.clientY / window.innerHeight) * 100;
      if (rafId) return;
      rafId = window.requestAnimationFrame(function () {
        spotlight.style.setProperty("--mx", mx + "%");
        spotlight.style.setProperty("--my", my + "%");
        rafId = null;
      });
    }, { passive: true });
  }

  /* ---------- subtle 3D tilt ---------- */
  if (canHover && !reduceMotion) {
    var tiltEls = Array.prototype.slice.call(document.querySelectorAll("[data-tilt]"));

    tiltEls.forEach(function (el) {
      var frame = null;

      el.addEventListener("pointermove", function (e) {
        if (frame) return;
        frame = window.requestAnimationFrame(function () {
          var r = el.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width - 0.5;
          var py = (e.clientY - r.top) / r.height - 0.5;
          var max = el.classList.contains("code-card") ? 7 : 5;
          el.style.transform =
            "perspective(1200px) rotateX(" + (-py * max).toFixed(2) + "deg)" +
            " rotateY(" + (px * max).toFixed(2) + "deg) translateY(-2px)";
          frame = null;
        });
      });

      el.addEventListener("pointerleave", function () {
        el.style.transform = "";
      });
    });
  }

  /* ---------- number counters ---------- */
  var counters = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));

  function runCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    if (isNaN(target)) return;
    if (reduceMotion) { el.textContent = String(target); return; }

    var start = performance.now();
    var duration = 1100;

    function step(now) {
      var t = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(target * eased));
      if (t < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  if (counters.length && "IntersectionObserver" in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        runCounter(entry.target);
        countObserver.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { countObserver.observe(el); });
  }

  /* ---------- copy email ---------- */
  var copyBtn = document.getElementById("copyEmail");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var value = copyBtn.getAttribute("data-copy") || "";
      var label = copyBtn.querySelector(".btn__text") || copyBtn;

      function done(ok) {
        label.textContent = ok ? "Copied ✓" : "Copy failed";
        window.setTimeout(function () { label.textContent = "Copy address"; }, 1900);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(function () { done(true); }, function () { done(false); });
      } else {
        var ta = document.createElement("textarea");
        ta.value = value;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        var ok = false;
        try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
        document.body.removeChild(ta);
        done(ok);
      }
    });
  }

  /* ---------- smooth anchor offset for sticky nav ---------- */
  document.addEventListener("click", function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute("href");
    if (!id || id === "#") return;
    var target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    closeMenu();

    var offset = 84;
    var top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: top, behavior: reduceMotion ? "auto" : "smooth" });
    history.replaceState(null, "", id);
  });
})();
