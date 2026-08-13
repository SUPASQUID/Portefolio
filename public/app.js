/**
 * Portfolio BEJAOUI HAITEM — interactions.
 *
 * Tout le contenu est déjà dans le HTML : ce script ne fait qu'ouvrir,
 * fermer, filtrer et copier. Si le JavaScript est désactivé, la page reste
 * entièrement lisible.
 */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Écran de chargement ---------------------------------------------- */

  var boot = document.getElementById('boot');
  if (boot) {
    window.setTimeout(function () {
      boot.classList.add('is-fading');
    }, reduced ? 0 : 900);
    window.setTimeout(function () {
      if (boot.parentNode) boot.parentNode.removeChild(boot);
    }, reduced ? 60 : 1500);
  }

  /* --- Menu latéral (mobile) -------------------------------------------- */

  var side = document.getElementById('side');
  var burger = document.getElementById('burger');
  var scrim = document.getElementById('scrim');

  function openDrawer() {
    side.classList.add('is-open');
    scrim.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-locked');
  }

  function closeDrawer() {
    side.classList.remove('is-open');
    scrim.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    if (!openOverlay) document.body.classList.remove('is-locked');
  }

  if (burger) {
    burger.addEventListener('click', function () {
      if (side.classList.contains('is-open')) closeDrawer();
      else openDrawer();
    });
  }

  if (scrim) scrim.addEventListener('click', closeDrawer);

  var sideClose = document.getElementById('side-close');
  if (sideClose) sideClose.addEventListener('click', closeDrawer);

  /* Un clic sur un lien de navigation referme le menu. */
  Array.prototype.forEach.call(document.querySelectorAll('.side__nav a'), function (a) {
    a.addEventListener('click', closeDrawer);
  });

  /* --- Panneaux (détail projet, lecture de veille) ----------------------- */

  var openOverlay = null;
  var lastFocus = null;

  function openPanel(el) {
    if (!el) return;
    closeDrawer();
    lastFocus = document.activeElement;
    el.hidden = false;
    openOverlay = el;
    document.body.classList.add('is-locked');

    var panel = el.querySelector('.panel');
    if (panel) {
      panel.scrollTop = 0;
      var focusable = panel.querySelector('[data-close]');
      if (focusable) focusable.focus();
    }

    /* Le bouton « retour » du navigateur et le geste de retour sur mobile
       referment le panneau plutôt que de quitter la page. */
    try {
      history.pushState({ panel: el.id }, '', '#' + el.id);
    } catch (e) {
      /* navigation par historique indisponible : on continue sans */
    }
  }

  function closePanel(fromPopstate) {
    if (!openOverlay) return;
    openOverlay.hidden = true;
    openOverlay = null;
    document.body.classList.remove('is-locked');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    if (!fromPopstate) {
      try {
        if (history.state && history.state.panel) history.back();
      } catch (e) {
        /* rien */
      }
    }
  }

  window.addEventListener('popstate', function () {
    if (openOverlay) closePanel(true);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (openOverlay) closePanel();
    else if (side.classList.contains('is-open')) closeDrawer();
  });

  /* Fermeture par le voile et par les boutons ; un clic dans le panneau
     ne referme pas. */
  Array.prototype.forEach.call(document.querySelectorAll('[data-overlay]'), function (ov) {
    ov.addEventListener('click', function (e) {
      if (e.target === ov) closePanel();
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll('[data-close]'), function (btn) {
    btn.addEventListener('click', closePanel);
  });

  /* Piège de focus simple : Tab reste dans le panneau ouvert. */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab' || !openOverlay) return;
    var focusables = openOverlay.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  /* Ouverture depuis les cartes projet et les entrées de veille. */
  function bindOpener(selector, prefix) {
    Array.prototype.forEach.call(document.querySelectorAll(selector), function (el) {
      var target = document.getElementById(prefix + '-' + el.getAttribute('data-' + prefix));
      el.addEventListener('click', function () {
        openPanel(target);
      });
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openPanel(target);
        }
      });
    });
  }

  bindOpener('[data-project]', 'project');
  bindOpener('[data-veille]', 'veille');

  /* Ouverture directe via l'adresse (#project-0, #veille-2). */
  if (window.location.hash) {
    var direct = document.querySelector(window.location.hash + '[data-overlay]');
    if (direct) {
      direct.hidden = false;
      openOverlay = direct;
      document.body.classList.add('is-locked');
    }
  }

  /* --- Filtres de projets ------------------------------------------------ */

  var filters = document.querySelectorAll('[data-filter]');
  var cards = document.querySelectorAll('[data-cat]');
  var count = document.getElementById('project-count');
  var activeLabel = document.getElementById('filter-active');

  Array.prototype.forEach.call(filters, function (btn) {
    btn.addEventListener('click', function () {
      var value = btn.getAttribute('data-filter');
      var visible = 0;

      Array.prototype.forEach.call(cards, function (card) {
        var match = value === 'Tous' || card.getAttribute('data-cat') === value;
        card.hidden = !match;
        if (match) visible++;
      });

      Array.prototype.forEach.call(filters, function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });

      if (count) count.textContent = visible + (visible > 1 ? ' projets' : ' projet');
      if (activeLabel) activeLabel.textContent = value === 'Tous' ? '' : '— ' + value;
    });
  });

  /* --- Veilles supplémentaires ------------------------------------------ */

  var toggle = document.getElementById('veille-toggle');
  var moreList = document.getElementById('veille-more');

  if (toggle && moreList) {
    var initialLabel = toggle.textContent;
    toggle.addEventListener('click', function () {
      var open = moreList.hidden;
      moreList.hidden = !open;
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'masquer' : initialLabel;
    });
  }

  /* --- Copie de l'adresse e-mail ---------------------------------------- */

  var copyBtn = document.getElementById('copy-mail');
  var copyLabel = document.getElementById('copy-label');
  var copyTimer = null;

  if (copyBtn && copyLabel) {
    copyBtn.addEventListener('click', function () {
      var mail = copyBtn.getAttribute('data-mail');

      function done() {
        copyLabel.textContent = 'copié ✓';
        window.clearTimeout(copyTimer);
        copyTimer = window.setTimeout(function () {
          copyLabel.textContent = 'copier';
        }, 2000);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(mail).then(done, fallback);
      } else {
        fallback();
      }

      function fallback() {
        var input = document.createElement('textarea');
        input.value = mail;
        input.setAttribute('readonly', '');
        input.style.position = 'absolute';
        input.style.left = '-9999px';
        document.body.appendChild(input);
        input.select();
        try {
          document.execCommand('copy');
          done();
        } catch (e) {
          window.location.href = 'mailto:' + mail;
        }
        document.body.removeChild(input);
      }
    });
  }
})();
