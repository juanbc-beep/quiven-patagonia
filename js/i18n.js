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
    // "es" fijo acá a propósito, no capturado por fill() como el resto del
    // diccionario: posicionarComillas() le agrega hijos (las comillas
    // grandes) al elemento apenas carga la página, antes de que nadie
    // togglee el idioma -- si "es" se tomara recién ahí del innerHTML ya
    // tendría esos hijos adentro, horneados como si fueran el texto fuente.
    galeriaFrase: { es: 'Antes de la mesa, la mirada.', en: 'Before the table, the gaze.' },
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
    galeriaNumPlato: { es: 'PLATO', en: 'DISH' },
    galeriaZona1: { en: 'NAHUEL HUAPI' },
    galeriaZona2: { en: 'HILLSIDE' },
    galeriaZona3: { en: 'ATLANTIC · PACIFIC' },
    galeriaZona4: { en: 'HILLSIDE' },
    galeriaZona5: { en: 'VALLEY' },
    galeriaZona6: { en: 'HILLSIDE' },
    galeriaZona7: { en: 'NAHUEL HUAPI' },
    galeriaZona8: { en: 'NAHUEL HUAPI' },
    galeriaZona9: { en: 'HILLSIDE' },
    galeriaZona10: { en: 'NAHUEL HUAPI' },
    galeriaZona11: { en: 'VALLEY' },
    galeriaZona12: { en: 'VALLEY' },
    galeriaZona13: { en: 'VALLEY' },
    galeriaZona14: { en: 'VALLEY' },
    galeriaDesc1: { en: '“The first bite is cold, so the rest can grow.”' },
    galeriaDesc2: { en: '“A bite meant to be eaten standing, by hand.”' },
    galeriaDesc3: { en: '“King crab barely needs anything else.”' },
    galeriaDesc4: { en: '“Hours of cooking for a two-minute bite.”' },
    galeriaDesc5: { en: '“Even the garden can taste of fire.”' },
    galeriaDesc6: { en: '“The cut that competes with nothing else on the plate.”' },
    galeriaDesc7: { en: '“House-cured, never disguised.”' },
    galeriaDesc8: { en: '“What the lake brings, with what the forest gives.”' },
    galeriaDesc9: { en: '“Assembled in the kitchen, cut at the table.”' },
    galeriaDesc10: { en: '“The smoke reaches the table before the dish does.”' },
    galeriaDesc11: { en: '“A finish that asks no permission.”' },
    galeriaDesc12: { en: '“The hazelnut belongs here as much as the lake does.”' },
    galeriaDesc13: { en: '“To close, something small and precise.”' },
    galeriaDesc14: { en: '“Closes the table the way the lake closes: unhurried.”' },

    credencialesAria: { en: 'House credentials' },
    cred0: { en: '<svg viewBox="0 0 28 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="7" cy="8" r="6"></circle><circle cx="21" cy="8" r="6"></circle><path d="M13 6c.6-1 1.4-1 2 0"></path><circle cx="7" cy="8" r="1.6" fill="currentColor" stroke="none"></circle><circle cx="21" cy="8" r="1.6" fill="currentColor" stroke="none"></circle></svg>Travellers\' Choice 2021 · Tripadvisor' },
    cred1: { en: 'NATIONAL CHEFS’ TOURNAMENT AWARD · FEHGRA 2010' },
    cred2: { en: 'OPEN KITCHEN' },
    cred3: { en: 'LOCALLY-SOURCED PATAGONIAN PRODUCE' },
    cred4: { en: 'A HOUSE ON THE NAHUEL HUAPI' },

    descensoHint: { es: '↕ SCROLL · UN CAPÍTULO A LA VEZ', en: '↕ SCROLL · ONE CHAPTER AT A TIME' },
    terrHint: { es: '← → CAMBIAR REGIÓN', en: '← → CHANGE REGION' },
    terrKicker: { en: '02 · The Territory' },
    terrTitulo: { en: 'Four pantries, one single landscape.' },
    terrTexto: { en: 'There’s no fixed menu here: there’s a map. The sea delivers twice a week, the hillside whenever it wants, the garden whenever it can. The menu is written with whatever arrives.' },

    interludioCita: { en: '“Before it’s a dish, all of this was territory.”' },

    fuegoKicker: { en: '03 · The Fire' },
    fuegoTitulo: { en: '<span class="clip-inner">Here, the <span style="font-weight:560">ingredient</span> stops being an <span style="font-weight:120">ingredient</span>.</span>' },
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
    histBitacora1: { en: 'First place at the National Chefs’ Tournament, with a childhood dessert.' },
    histBitacoraHoy: { en: 'Today' },
    histBitacora2: { en: 'Five courses at the table. One house on the lake.' },

    casaKicker: { en: '06 · The House' },
    casaTitulo: { en: 'Upstairs, floor-to-ceiling glass, the lake as a fixed backdrop.' },
    casaTexto: { en: 'Main dining room and glazed balcony over the Nahuel Huapi. At the entrance, the bar and wine cellar. And the communal table with a direct view into the kitchen — the most requested seat in the house.' },

    vocesKicker: { en: '07 · Voices from Around the World' },
    vocesTitulo: { en: '<span class="clip-inner">No one gave them a star. Their guests did anyway.</span>' },
    vocesTexto: { en: 'The Michelin guide hasn’t reached Patagonia yet. Those who have — and who’ve eaten across half the world — left this in writing.' },
    vocesResenas: { en: 'GUEST<br>REVIEWS' },

    llegarKicker: { es: 'CÓMO LLEGAR', en: 'HOW TO GET HERE' },
    llegarBtn: { es: 'VER EN EL MAPA', en: 'VIEW ON MAP' },

    eventosKicker: { en: '08 · Events & Catering' },
    eventosTitulo: { en: 'The kitchen leaves home too.' },
    eventosTexto: { en: 'Premium catering for events of any size, with the same seasonal cooking and care served at the table. The dining room can be booked whole for small groups after something of their own — or the whole setup travels wherever it’s needed, with efficient logistics of its own.' },
    eventosCita: { en: '“Professionalism and warmth, in equal measure.”' },
    eventosBtn: { en: 'Ask about events' },

    expKicker: { en: '09 · The Experience' },
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
