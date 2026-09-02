'use strict';
/* ---------- traducción ES/EN: diccionario + contenido dinámico en inglés ---------- */
window.I18N = (function () {
  var lang = localStorage.getItem('quiven_lang') === 'en' ? 'en' : 'es';

  var dict = {
    portalUbicacion: { en: 'BARILOCHE<br>PATAGONIA, ARGENTINA' },
    portalKicker: { en: 'TASTING MENU · CHEF PABLO QUIVEN' },
    portalTitulo: { en: 'Before the dish, a territory' },
    portalTexto: { en: 'A house on the Nahuel Huapi, five courses and everything in between.' },
    portalBtn: { en: 'ENTER' },
    portalHint: { en: 'VIDEO WITH NO SOUND · TAP ENTER TO CONTINUE' },

    navAudioOn: { en: 'THE LAKE' },
    navAudioOff: { es: 'SILENCIO', en: 'SILENCE' },
    navReservar: { en: 'BOOK A TABLE' },
    waAria: { en: 'Message us on WhatsApp' },
    volverArribaAria: { es: 'Volver arriba', en: 'Back to top' },
    navGaleria: { es: 'Galería', en: 'Gallery' },
    galeriaAria: { es: 'Galería de platos', en: 'Dish gallery' },
    galeriaTitulo: { es: 'Nuestros Platos', en: 'Our Dishes' },
    galeriaCerrarAria: { es: 'Cerrar galería', en: 'Close gallery' },
    galeriaHint: { es: 'Deslizá o usá las flechas', en: 'Scroll or use the arrow keys' },
    galeriaNombre1: { en: 'Prawn, beetroot and orange' },
    galeriaNombre2: { en: 'Grilled free-range chicken skewer' },
    galeriaNombre3: { en: 'Squash, king crab and black olive' },
    galeriaNombre4: { en: 'Pork belly and Andean potato' },
    galeriaNombre5: { en: 'Smoked eggplant and squash blossom' },
    galeriaNombre6: { en: 'Black pepper-crusted steak' },
    galeriaNombre7: { en: 'Cured trout on corn scone' },
    galeriaNombre8: { en: 'Seasonal trout and wild berries' },
    galeriaNombre9: { en: 'Stuffed matambrito and asparagus' },
    galeriaNombre10: { en: 'Trout, smoked at the table' },
    galeriaNombre11: { en: 'Patagonian chocolate and strawberry' },
    galeriaNombre12: { en: 'Green apple and hazelnut' },
    galeriaNombre13: { en: 'Cassis and lavender bonbons' },
    galeriaNombre14: { en: 'Glazed cherries and meringue' },

    credencialesAria: { en: 'House credentials' },
    cred0: { en: '<svg viewBox="0 0 28 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="7" cy="8" r="6"></circle><circle cx="21" cy="8" r="6"></circle><path d="M13 6c.6-1 1.4-1 2 0"></path><circle cx="7" cy="8" r="1.6" fill="currentColor" stroke="none"></circle><circle cx="21" cy="8" r="1.6" fill="currentColor" stroke="none"></circle></svg>Travellers\' Choice 2021 · Tripadvisor' },
    cred1: { en: 'NATIONAL CHEFS’ TOURNAMENT AWARD · FEHGRA 2010' },
    cred2: { en: 'OPEN KITCHEN' },
    cred3: { en: 'LOCALLY-SOURCED PATAGONIAN PRODUCE' },
    cred4: { en: 'A HOUSE ON THE NAHUEL HUAPI' },

    terrHint: { es: '← → CAMBIAR REGIÓN', en: '← → CHANGE REGION' },
    terrKicker: { en: '02 · The Territory' },
    terrTitulo: { en: 'Four pantries, one single landscape.' },
    terrTexto: { en: 'There’s no fixed menu here: there’s a map. The sea delivers twice a week, the hillside whenever it wants, the garden whenever it can. The menu is written with whatever arrives.' },

    fuegoKicker: { en: '03 · The Fire' },
    fuegoTitulo: { en: '<span class="clip-inner">Here, the ingredient stops being an ingredient.</span>' },
    fuegoTexto: { en: 'A night of service isn’t one thing: it’s four moments, and none of them can be rushed. Pick a time on the clock.' },

    platoKicker: { en: '04 · The Tasting Menu' },
    menuNotaDieta: { en: 'Guidance per course, not an allergen certificate. We offer vegetarian and gluten-free alternatives — tell us your case when you' },
    menuNotaDietaLink: { en: 'book or message us' },
    platoHint: { en: '↔ DRAG OR USE THE ARROW KEYS TO CHANGE COURSE' },

    histKicker: { en: '05 · The Story' },
    histChefRol: { es: 'Chef y Fundador', en: 'Chef & Founder' },
    histTitulo1: { en: 'Twenty years cooking for other names.' },
    histTexto1: { en: 'Before this house on the lake, Pablo designed other people’s menus and ran hotel kitchens. Twenty years on the line before having his own.' },
    histCita1: { en: '«In 2010 he won first place at the National Chefs’ Tournament with a deconstructed rice pudding — a childhood dessert that opened the whole country to him.»' },
    histCaption1: { en: 'FEHGRA · NATIONAL CHEFS’ TOURNAMENT, 2010' },
    histTitulo2: { en: 'With Mariana, a house of their own.' },
    histTexto2: { en: 'With <strong style="color:#f2ece1;font-weight:500">Mariana Trujillo</strong> he opened this house on the Nahuel Huapi. She greets every table; he steps out of the kitchen to talk with anyone who asks.' },
    histTexto3: { en: 'That’s what people talk about when they come back: not the dish — the table.' },
    histStat1: { en: 'NATIONAL TOURNAMENT' },
    histStat2: { en: 'COURSES AT THE TABLE' },
    histStat3: { en: 'HOUSE ON THE LAKE' },

    casaKicker: { en: '06 · The House' },
    casaTitulo: { en: 'Upstairs, floor-to-ceiling glass, the lake as a fixed backdrop.' },
    casaTexto: { en: 'Main dining room and glazed balcony over the Nahuel Huapi. At the entrance, the bar and wine cellar. And the communal table with a direct view into the kitchen — the most requested seat in the house.' },

    vocesKicker: { en: '07 · Voices from Around the World' },
    vocesTitulo: { en: '<span class="clip-inner">No one gave them a star. Their guests did anyway.</span>' },
    vocesTexto: { en: 'The Michelin guide hasn’t reached Patagonia yet. Those who have — and who’ve eaten across half the world — left this in writing.' },
    vocesResenas: { en: 'GUEST<br>REVIEWS' },

    expKicker: { en: '08 · The Experience' },
    expTitulo: { en: 'The journey ends at your table' },
    expTexto: { en: 'A tasting menu with vegetarian options and allergy alternatives, arranged when you book.' },
    expBtnReservar: { en: 'BOOK A TABLE' },

    pasoApertura: { es: 'Apertura', en: 'Opening' },
    pasoEnMesa: { es: 'En Mesa', en: 'At the Table' },
    pasoCierre: { es: 'Cierre', en: 'Closing' },
    pasoNumPaso: { es: 'PASO', en: 'COURSE' },
    pasoNumDe: { es: 'DE', en: 'OF' },
    servicioPiePrefix: { es: 'COCINA QUIVEN', en: 'QUIVEN KITCHEN' }
  };

  // valores por defecto en español, tomados del propio HTML/JS -- se completan
  // la primera vez que se aplica el diccionario, así nunca hay que duplicar
  // el texto fuente acá.
  function fill(key, node) {
    if (!dict[key]) return;
    if (dict[key].es === undefined) dict[key].es = node ? node.innerHTML : '';
  }

  function apply(newLang) {
    lang = newLang === 'en' ? 'en' : 'es';
    localStorage.setItem('quiven_lang', lang);
    document.documentElement.lang = lang === 'en' ? 'en' : 'es-AR';
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (el) {
      var key = el.getAttribute('data-i18n');
      fill(key, el);
      var val = dict[key] && dict[key][lang];
      if (val !== undefined) el.innerHTML = val;
      else if (dict[key]) el.innerHTML = dict[key].es;
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-aria]'), function (el) {
      var key = el.getAttribute('data-i18n-aria');
      if (dict[key] && dict[key].es === undefined) dict[key].es = el.getAttribute('aria-label') || '';
      var val = dict[key] && dict[key][lang];
      el.setAttribute('aria-label', val !== undefined ? val : (dict[key] ? dict[key].es : ''));
    });
    var langLabel = document.querySelector('[data-role="lang-label"]');
    if (langLabel) langLabel.textContent = lang === 'en' ? 'ES' : 'EN';
  }

  function t(key) {
    var d = dict[key];
    if (!d) return '';
    return (d[lang] !== undefined ? d[lang] : d.es) || '';
  }

  return {
    get lang() { return lang; },
    dict: dict,
    apply: apply,
    t: t
  };
})();
