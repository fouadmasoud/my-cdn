/* lucid portal UI bootstrap (Auth0-friendly, no globals required) */
(function () {
  "use strict";

  const q = (sel, root = document) => root.querySelector(sel);
  const qa = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const on = (el, ev, fn, opts) => el && el.addEventListener(ev, fn, opts);

  // Public API (optional)
  window.lucid = window.lucid || {};

  // Minimal locale helper (keeps "US" pill; expand if you later add a real locale drawer)
  function setLocaleBadge() {
    const btn = q("#navIcon-1");
    if (!btn) return;
    // If your header always renders "US" text, nothing to do. Otherwise you can
    // swap the label here based on navigator.language, e.g. "US", "UK", "DE", etc.
  }

  // Nav link helpers (aria-expanded toggles for accessibility if you later add drawers)
  function enhanceCenterLinks() {
    const links = [
      q("#navLink-0"), // Lucid Air
      q("#navLink-1"), // Lucid Gravity
      q("#navLink-2"), // Pre-Owned
      q("#navLink-3"), // Discover
    ].filter(Boolean);

    links.forEach((a) => {
      // If the link acts like a button (has role="button"), keep aria-expanded tidy.
      if (a.getAttribute("role") === "button") {
        on(a, "click", (e) => {
          // If you don’t have a drawer yet, just follow the href if present
          const href = a.getAttribute("href");
          if (href && href !== "#") return; // let it navigate
          e.preventDefault();
          const expanded = a.getAttribute("aria-expanded") === "true";
          a.setAttribute("aria-expanded", expanded ? "false" : "true");
        });
      }
    });
  }

  // Hamburger: this header markup doesn’t include a mobile menu DOM yet.
  // We’ll add a simple body class toggle you can style later if needed.
  function wireHamburger() {
    const ham = q("#sideNav-hamburger-menu");
    on(ham, "click", (e) => {
      e.preventDefault();
      document.documentElement.classList.toggle("lucid-mobile-open");
      document.body.classList.toggle("lucid-mobile-open");
    });
  }

  // Account + Help icons: keep default navigation, but ensure they’re keyboard-friendly.
  function ensureIconButtons() {
    const ids = ["#navIcon-0", "#navIcon-1", "#navIcon-2"];
    ids.forEach((s) => {
      const el = q(s);
      if (!el) return;
      el.setAttribute("tabindex", el.getAttribute("tabindex") || "0");
      // ENTER/SPACE activate when element is effectively a button
      on(el, "keydown", (evt) => {
        if (evt.key === "Enter" || evt.key === " ") {
          el.click();
          evt.preventDefault();
        }
      });
    });
  }

  // Footer: static content in your new markup — nothing to populate.

  function initNav() {
    try {
      setLocaleBadge();
      enhanceCenterLinks();
      wireHamburger();
      ensureIconButtons();
    } catch (err) {
      // Never break Auth0’s widget if something goes wrong
      console.error("[lucid:initNav] non-fatal error", err);
    }
  }

  // Export for the template to call
  window.lucid.initNav = initNav;

  // Auto-init in case the script is included on non-Auth0 pages
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNav);
  } else {
    initNav();
  }
})();
