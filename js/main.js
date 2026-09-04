'use strict';

/* Quiven Patagonia House Kitchen — comportamiento del sitio.
   Puerto a JS plano de la lógica del prototipo Quiven Web v5.dc.html. */

/* ---------- configuración (antes "props" editables del Design Component) ---------- */
const PROPS = {
  portalAuto: false,   // el portal de video NO se cierra solo: el usuario decide con "CONTINUAR" o haciendo scroll
  portalSegundos: 8,
  efectos3d: true,
  grano: 0.05
};

/* ---------- datos de contenido (ES, fuente) ---------- */
let EJES = [
  { n: 'MAR', t: 'Del Atlántico y del Pacífico', d: 'Pulpo entero del sur, salmón rosado y langostinos. Llega fresco dos veces por semana y define el tercer paso.', z: 'ATLÁNTICO · PACÍFICO', ing: ['pulpo', 'salmón rosado', 'langostino'] },
  { n: 'MONTAÑA', t: 'Cordero, carnes y bayas', d: 'Cordero de campo abierto alimentado a pasto, carnes rojas y aves de la zona. Alrededor, hongos de pinar que duran poco y frutos rojos de la ladera.', z: 'LADERA', ing: ['cordero', 'carnes rojas', 'aves'] },
  { n: 'TIERRA', t: 'La huerta del valle', d: 'Hortalizas, flores comestibles y brotes cortados el mismo día. Lo que no está en punto no entra: la carta cede, la huerta no.', z: 'VALLE', ing: ['hortalizas', 'flores', 'brotes'] },
  { n: 'LAGO', t: 'Agua dulce, a la vista', d: 'Trucha del mismo lago que se ve por el ventanal. Curada, ahumada en frío o apenas tibia: nunca disfrazada.', z: 'NAHUEL HUAPI', ing: ['trucha', 'ahumados', 'deshielo'] }
];
const EJES_ES = EJES;
const EJES_EN = [
  { n: 'SEA', t: 'From the Atlantic and the Pacific', d: 'Whole octopus from the south, pink salmon and prawns. It arrives fresh twice a week and defines the third course.', z: 'ATLANTIC · PACIFIC', ing: ['octopus', 'pink salmon', 'prawns'] },
  { n: 'MOUNTAIN', t: 'Lamb, red meats and berries', d: 'Grass-fed, open-range lamb, red meats and local poultry. Around it, short-lived pine forest mushrooms and wild berries from the hillside.', z: 'HILLSIDE', ing: ['lamb', 'red meats', 'poultry'] },
  { n: 'LAND', t: 'The valley garden', d: 'Vegetables, edible flowers and sprouts cut the same day. If it isn’t at its peak, it doesn’t go on the plate: the menu bends, the garden doesn’t.', z: 'VALLEY', ing: ['vegetables', 'flowers', 'sprouts'] },
  { n: 'LAKE', t: 'Fresh water, in plain sight', d: 'Trout from the very lake you see through the window. Cured, cold-smoked or barely warmed — never disguised.', z: 'NAHUEL HUAPI', ing: ['trout', 'smoked fish', 'glacial melt'] }
];

let MOMENTOS = [
  ['19:50', 'Mise en place', 'Todo pesado, cortado y contado antes de que entre el primer comensal. El servicio se gana acá.'],
  ['20:15', 'La brigada', 'Cuatro manos sobre la misma bandeja. Cada plato sale con la misma firma o no sale.'],
  ['20:35', 'El detalle final', 'Pinza, flor, brote. Lo último que toca el plato es la mano de Pablo.'],
  ['20:40', 'Sale el pase', 'Los bocados esperan segundos, no minutos. De la cocina a la mesa, sin escalas.']
];
const MOMENTOS_ES = MOMENTOS;
const MOMENTOS_EN = [
  ['19:50', 'Mise en place', 'Everything weighed, cut and counted before the first guest walks in. Service is won right here.'],
  ['20:15', 'The brigade', 'Four hands over the same tray. Every dish leaves with the same signature, or it doesn’t leave.'],
  ['20:35', 'The final touch', 'Tweezers, a flower, a sprout. The last thing to touch the plate is Pablo’s hand.'],
  ['20:40', 'The course goes out', 'Bites wait seconds, not minutes. From kitchen to table, no stops.']
];

/* dieta: notas orientativas por paso, no un certificado -- la cocina confirma
   sustituciones reales al momento de reservar o en la mesa. */
let PASOS = [
  { n: 'Bienvenida del lago', d: 'Un primer bocado frío con producto del Nahuel Huapi, servido casi sin intervención.', c: '«Empieza como empieza el lago: frío, limpio, sin adornos.»', ing: ['trucha', 'ahumado', 'brotes'], dieta: [{ k: 'pescado', t: 'contiene pescado' }] },
  { n: 'Huerta patagónica', d: 'Vegetales de estación con técnicas que buscan la textura antes que el efecto.', c: '«La huerta manda. Yo solo ordeno lo que ya estaba bien.»', ing: ['hortalizas', 'flores', 'hierbas'], dieta: [{ k: 'vegetariano', t: 'apto vegetariano' }] },
  { n: 'Del Pacífico y del Atlántico', d: 'Pulpo, salmón rosado o langostino, según lo que el mar entregue esa semana.', c: '«Cocinar acá es aceptar que el mar decide el jueves.»', ing: ['pulpo', 'salmón rosado', 'cítricos'], dieta: [{ k: 'pescado', t: 'contiene pescado' }, { k: 'mariscos', t: 'contiene mariscos' }] },
  { n: 'Cordero de montaña', d: 'El plato central: cordero patagónico, cocciones lentas y una guarnición que no compite.', c: '«El cordero pide horas. En la Patagonia nadie tiene apuro.»', ing: ['cordero', 'hongos', 'reducción'], dieta: [{ k: 'carne', t: 'contiene carne' }] },
  { n: 'Cierre dulce', d: 'Un postre de autor que reinterpreta un clásico argentino con técnica contemporánea.', c: '«Con un arroz con leche gané un torneo nacional. Todo empezó en un postre.»', ing: ['arroz con leche', 'caramelo', 'bayas'], dieta: [{ k: 'lacteos', t: 'contiene lácteos' }] }
];
const PASOS_ES = PASOS;
const PASOS_EN = [
  { n: 'Welcome from the lake', d: 'A first cold bite with Nahuel Huapi produce, served with almost no intervention.', c: '«It begins the way the lake begins: cold, clean, unadorned.»', ing: ['trout', 'smoked', 'sprouts'], dieta: [{ k: 'pescado', t: 'contains fish' }] },
  { n: 'Patagonian garden', d: 'Seasonal vegetables treated with techniques that chase texture before effect.', c: '«The garden decides. I just arrange what was already right.»', ing: ['vegetables', 'flowers', 'herbs'], dieta: [{ k: 'vegetariano', t: 'vegetarian' }] },
  { n: 'From the Pacific and the Atlantic', d: 'Octopus, pink salmon or prawns, depending on what the sea delivers that week.', c: '«Cooking here means accepting that the sea decides on Thursday.»', ing: ['octopus', 'pink salmon', 'citrus'], dieta: [{ k: 'pescado', t: 'contains fish' }, { k: 'mariscos', t: 'contains shellfish' }] },
  { n: 'Mountain lamb', d: 'The centerpiece: Patagonian lamb, slow cooking and a side that doesn’t compete for attention.', c: '«Lamb asks for hours. In Patagonia, no one is in a hurry.»', ing: ['lamb', 'mushrooms', 'reduction'], dieta: [{ k: 'carne', t: 'contains meat' }] },
  { n: 'Sweet close', d: 'A signature dessert that reinterprets an Argentine classic with contemporary technique.', c: '«I won a national tournament with a rice pudding. It all started with a dessert.»', ing: ['rice pudding', 'caramel', 'berries'], dieta: [{ k: 'lacteos', t: 'contains dairy' }] }
];

let CITAS = [
  ['Comimos en grandes restaurantes del mundo y este fue de los mejores en los que estuvimos.', 'COMENSAL INTERNACIONAL · BARILOCHE'],
  ['Cada plato mejoraba al anterior. La creatividad y la presentación estaban a otro nivel.', 'RESEÑA DE VIAJERO · TEMPORADA 2023'],
  ['Habíamos comido en restaurantes con estrella Michelin. Ninguno superó esta experiencia.', 'COMENSAL FRECUENTE DE ALTA COCINA'],
  ['El chef sale a conversar con cada mesa. Eso no lo vivimos en ningún otro lugar.', 'HUÉSPED DE PASO POR LA PATAGONIA'],
  ['La mesa comunal con vista a la cocina vale el viaje entero.', 'PAREJA DE BUENOS AIRES'],
  ['Un menú que te cuenta dónde estás parado. Patagonia en cinco tiempos.', 'CRÍTICA GASTRONÓMICA REGIONAL']
];
const CITAS_ES = CITAS;
const CITAS_EN = [
  ['We’ve eaten at great restaurants around the world, and this was one of the best we’ve had.', 'INTERNATIONAL GUEST · BARILOCHE'],
  ['Every dish topped the last. The creativity and presentation were on another level.', 'TRAVELER REVIEW · 2023 SEASON'],
  ['We’d eaten at Michelin-starred restaurants. None topped this experience.', 'FREQUENT FINE-DINING GUEST'],
  ['The chef comes out to talk with every table. We haven’t experienced that anywhere else.', 'GUEST PASSING THROUGH PATAGONIA'],
  ['The communal table with a view of the kitchen is worth the whole trip.', 'COUPLE FROM BUENOS AIRES'],
  ['A menu that tells you exactly where you are. Patagonia in five courses.', 'REGIONAL FOOD CRITIC']
];

let DESCENSO = [
  { p: 0.00, e: 'SOBREVUELO · PATAGONIA', t: 'Un plato empieza mucho antes de la cocina', x: 'Deslizá para descender. El viaje termina en una casa sobre el Nahuel Huapi.', km: '2 400' },
  { p: 0.26, e: 'CORDILLERA · CONO SUR', t: 'Hay un punto donde la cordillera toca el agua', x: 'Cuarenta y un grados al sur. Ahí abajo empieza el territorio que escribe la carta.', km: '640' },
  { p: 0.46, e: 'CAMINO DE LA COSTA', t: 'Cada curva del camino, más cerca del agua', x: 'Puentes de madera, arroyos color turquesa. Los últimos minutos antes de llegar.', km: '60' },
  { p: 0.62, e: 'LA CASA · SOBRE EL LAGO', t: 'La casa aparece entre los árboles', x: 'Un salón con vista al Nahuel Huapi, la mesa ya tendida. Quedan los últimos metros.', km: '15' },
  { p: 0.80, e: 'AV. BUSTILLO 19688 · PLANTA ALTA', t: 'Quiven Patagonia House Kitchen', x: 'Una casa sobre el lago. Adentro, cinco pasos y una cocina a la vista. Llegaste.', km: '0' }
];
const DESCENSO_ES = DESCENSO;
const DESCENSO_EN = [
  { p: 0.00, e: 'FLYOVER · PATAGONIA', t: 'A dish begins long before the kitchen', x: 'Scroll to descend. The journey ends in a house on the Nahuel Huapi.', km: '2,400' },
  { p: 0.26, e: 'MOUNTAINS · SOUTHERN CONE', t: 'There’s a point where the mountains meet the water', x: 'Forty-one degrees south. Down there begins the territory that writes the menu.', km: '640' },
  { p: 0.46, e: 'THE COASTAL ROAD', t: 'Every bend in the road, closer to the water', x: 'Wooden bridges, turquoise streams. The last few minutes before arriving.', km: '60' },
  { p: 0.62, e: 'THE HOUSE · ON THE LAKE', t: 'The house appears between the trees', x: 'A dining room facing the Nahuel Huapi, the table already set. A few steps left.', km: '15' },
  { p: 0.80, e: 'AV. BUSTILLO 19688 · UPPER FLOOR', t: 'Quiven Patagonia House Kitchen', x: 'A house on the lake. Inside, five courses and an open kitchen. You’ve arrived.', km: '0' }
];

/* etiquetas visibles de cada capítulo (data-cap es un identificador interno,
   no el texto a mostrar -- así el inglés no depende de tocar selectores) */
const CAP_LABELS = {
  Descenso: { es: 'Descenso', en: 'Descent' },
  Territorio: { es: 'Territorio', en: 'Territory' },
  Fuego: { es: 'Fuego', en: 'Fire' },
  Plato: { es: 'Plato', en: 'Dish' },
  Historia: { es: 'Historia', en: 'Story' },
  Casa: { es: 'Casa', en: 'House' },
  Voces: { es: 'Voces', en: 'Voices' },
  Eventos: { es: 'Eventos', en: 'Events' },
  Experiencia: { es: 'Experiencia', en: 'Experience' }
};

/* iconos de línea para las notas dietéticas -- nada de emojis */
const ICONOS_DIETA = {
  pescado: '<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 8c2.2-3 5.8-4.6 9-3.2M1.5 8c2.2 3 5.8 4.6 9 3.2M10.5 4.8c1.6.5 3 1.8 4 3.2-1 1.4-2.4 2.7-4 3.2M10.5 4.8c-.7 1-1 2.1-1 3.2s.3 2.2 1 3.2"/><circle cx="9.1" cy="6.5" r=".45" fill="currentColor" stroke="none"/></svg>',
  mariscos: '<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5c-.3-4.3 2.2-8 6.8-8.3-1 2-.9 4.2.2 5.7 1.6 2.1.2 4.4-2.5 4.8-1.7.2-3.6-.4-4.5-2.2z"/><path d="M3 11.5l-1.2 1.8M5.3 11l-.4 2.2M7.7 10l.4 2.2"/></svg>',
  vegetariano: '<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M8 14.2C4.5 14.2 2 11.6 2 7.7 2 4.6 4.6 2 8 2c0 5.4-2.2 8.4-6.3 8.4"/><path d="M8 2c3.4 0 6 2.6 6 5.7 0 3.2-2.5 6.5-6 6.5"/></svg>',
  carne: '<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="3.4" cy="3.4" r="1.8"/><circle cx="12.6" cy="12.6" r="1.8"/><path d="M4.7 4.7l6.6 6.6"/></svg>',
  lacteos: '<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M8 1.6c1.9 2.7 3.6 5.5 3.6 7.9a3.6 3.6 0 1 1-7.2 0c0-2.4 1.7-5.2 3.6-7.9z"/></svg>'
};
const iconoDieta = k => ICONOS_DIETA[k] || '';

/* ---------- helpers ---------- */
const q = s => document.querySelector(s);
const all = s => Array.from(document.querySelectorAll(s));
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const capLabel = sec => {
  const l = CAP_LABELS[sec.dataset.cap];
  const lang = window.I18N ? window.I18N.lang : 'es';
  return sec.dataset.num + ' · ' + (l ? (l[lang] || l.es) : sec.dataset.cap);
};

const App = {
  /* activa el juego de datos (ES/EN) que van a leer los setup de cada sección;
     re-aplica el diccionario estático. No refresca DOM ya construido -- eso
     lo hace cambiarIdioma() para el toggle en caliente. */
  setLang(lang) {
    const en = lang === 'en';
    EJES = en ? EJES_EN : EJES_ES;
    MOMENTOS = en ? MOMENTOS_EN : MOMENTOS_ES;
    PASOS = en ? PASOS_EN : PASOS_ES;
    CITAS = en ? CITAS_EN : CITAS_ES;
    DESCENSO = en ? DESCENSO_EN : DESCENSO_ES;
    if (window.I18N) window.I18N.apply(lang);
  },

  cambiarIdioma() {
    const next = window.I18N && window.I18N.lang === 'en' ? 'es' : 'en';
    this.setLang(next);
    if (this.refrescarHilo) this.refrescarHilo();
    if (this.refrescarTerritorio) this.refrescarTerritorio();
    if (this.refrescarPase) this.refrescarPase();
    if (this.refrescarMenu) this.refrescarMenu();
    if (this.refrescarVoces) this.refrescarVoces();
    if (this.refrescarHistoria) this.refrescarHistoria();
    if (this.refrescarGaleria) this.refrescarGaleria();
    this._etapa = -1;
    // pintarDescenso tiene una guarda "ya asentada" que corta la función antes
    // de tocar el texto si la posición de scroll no cambió desde el último
    // frame -- resetear solo _etapa no alcanza, hay que resetear _dP también
    // para que esa guarda no bloquee este repintado forzado sin scroll de por medio.
    this._dP = undefined;
    this.pintarDescenso(window.scrollY || document.documentElement.scrollTop || 0);
    if (this.capActual != null && this.caps) this.mostrarCap(this.caps[this.capActual]);
    // ES/EN no ocupan el mismo alto de texto -- el offsetTop cacheado de
    // cada sección puede haber corrido con el cambio de idioma.
    this._capsTops = null;
    // todos los refrescar* de arriba reescriben texto (textContent/innerHTML)
    // en los mismos elementos que llevan la comilla de cierre -- eso borra
    // la marca anterior sin avisar, hay que rehacerla con el texto nuevo.
    this.posicionarComillas();
  },

  componentDidMount() {
    this.coarse = window.matchMedia('(pointer:coarse)').matches;
    // antes esto se forzaba a false en cualquier dispositivo táctil -- alguien
    // con "reducir movimiento" activado en el sistema operativo de su celular
    // igual recibía todas las animaciones. Son dos señales distintas: coarse
    // es sobre el tipo de puntero (para hover/tilt), reduced es accesibilidad
    // real y tiene que valer en cualquier dispositivo por igual.
    this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // conexión lenta o modo ahorro de datos: no autoplayear video, la foto real alcanza
    const conn = navigator.connection || navigator.webkitConnection || navigator.mozConnection;
    this.datosLimitados = !!(conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || '')));
    // hardware limitado (poca RAM y/o pocos núcleos): bajamos densidad de
    // partículas, resolución de canvas y efectos caros -- señal de rendimiento,
    // no de accesibilidad, por eso es independiente de "reduced"
    this.gamaBaja = (navigator.deviceMemory != null && navigator.deviceMemory <= 4)
      || (navigator.hardwareConcurrency != null && navigator.hardwareConcurrency <= 4)
      || this.datosLimitados;
    document.documentElement.classList.toggle('gama-baja', this.gamaBaja);
    this.observadores = [];
    this.setLang(window.I18N ? window.I18N.lang : 'es');
    this.calcMedidas();
    // debounced: calcMedidas() hace varios getBoundingClientRect y "resize"
    // puede disparar decenas de veces por segundo arrastrando el borde de la
    // ventana o rotando el celular -- no hace falta recalcular en cada tick,
    // alcanza con una vez que el usuario termina de mover/rotar
    let tResize;
    this.onResize = () => {
      clearTimeout(tResize);
      tResize = setTimeout(() => { this.calcMedidas(); this._dGeom = null; this._paraDatos = undefined; this._capsTops = null; this._interludioTop = undefined; this.pintar(); this.posicionarComillas(); }, 150);
    };
    window.addEventListener('resize', this.onResize);
    // fuentes/imágenes que terminan de cargar después del primer pintado
    // pueden correr el alto de una sección -- se invalida una vez más acá
    // para no quedar con el offsetTop cacheado de antes de que todo asiente.
    window.addEventListener('load', () => { this._capsTops = null; }, { once: true });

    // si un video de fondo falla (red, códec no soportado, archivo corrupto),
    // el navegador ya se apoya solo en el poster -- lo pinta el propio <video>,
    // así que ocultar el elemento en el error lo rompería en vez de arreglarlo.
    // Lo único que falta es que el fallo quede anotado en vez de pasar mudo.
    all('video[poster]').forEach(v => {
      v.addEventListener('error', () => {
        console.warn('Video de fondo no disponible, se mantiene la foto poster:', v.dataset.role || v.currentSrc);
      });
    });

    this.grano();
    this.ticks();
    this.hilo();
    this.territorio();
    this.pase();
    this.menu();
    this.historia();
    // voces() antes que cursor(): arma las .voces-card recién ahí, y
    // cursor() las engancha con querySelectorAll('.voces-card') al armar
    // sus listeners -- en el orden anterior corría primero y no encontraba
    // ninguna tarjeta todavía (no existían), así que quedaban con el
    // cursor nativo del navegador aunque el CSS diga .voces-card.
    this.voces();
    this.cursor();
    this.experiencia();
    this.lazyVideo('fuego-video', 'assets/video/quiven-hero-loop.mp4');
    this.portal();
    this.tres();
    this.galeria();
    this.credenciales();

    this.onScroll = () => {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => { this._raf = null; this.pintar(); });
    };
    window.addEventListener('scroll', this.onScroll, { passive: true });
    this.pintar();

    q('#portal-enter-btn')?.addEventListener('click', this.abrirPortal);
    q('#audio-toggle-btn')?.addEventListener('click', this.toggleAudio);
    q('#lang-toggle-btn')?.addEventListener('click', () => this.cambiarIdioma());
    q('[data-role="volver-arriba"]')?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: this.reduced ? 'auto' : 'smooth' });
    });

    this.posicionarComillas();
    // las fuentes propias cargan después del primer pintado -- si esto se
    // mide contra la fuente de reserva, el « chico real puede terminar en
    // otro punto apenas Piazzolla entra y el texto reajusta su ancho. Se
    // vuelve a medir una vez que el navegador confirma que ya cargaron.
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => this.posicionarComillas());
    }
  },

  /* ---------- comillas decorativas «»: medidas, no adivinadas.
     Un « anclado por CSS puro a la esquina del bloque asume que el
     renglón 1 arranca ahí -- cierto para texto alineado a la izquierda,
     falso para texto centrado (el interludio tipográfico). Y para el
     cierre, dos técnicas de CSS puro (offset fijo en em, después ancho:0
     con overflow visible) terminaron dependiendo del motor de render, el
     ancho de pantalla o el timing de carga de la fuente. Acá las dos
     marcas se miden con el DOM real en el momento exacto de pintar
     (Range.getClientRects() sobre el contenido real, sin las marcas),
     así ninguna de las dos depende de asumir nada sobre alineación,
     ancho o fuente. Se llama de nuevo cada vez que el contenido de una
     cita puede haber cambiado: ES/EN, cambio de paso del menú, resize. */
  // objetivo opcional: un solo elemento .qv-cita puntual (ej. el cambio de
  // paso del menú, que no tiene por qué tocar ninguna otra cita del sitio).
  // Sin objetivo, recalcula todas -- pero OJO: llamarla en modo "todas"
  // antes de que una cita puntual haya terminado su propio setup (ej. el
  // recorte en palabras de Historia) es lo que causó un bug real: esta
  // función ya le había agregado sus marcas a el.textContent, y
  // splitPalabras() las leyó como si fueran parte del texto real, horneando
  // un "»»" para siempre en el DOM. Por eso setPaso() abajo pasa SIEMPRE
  // el elemento puntual, nunca la variante global.
  posicionarComillas(objetivo) {
    const lista = objetivo ? [objetivo] : all('.qv-cita');
    lista.forEach(el => {
      let abre = el.querySelector(':scope > .qv-cita-abre');
      if (!abre) {
        abre = document.createElement('span');
        abre.className = 'qv-cita-abre';
        abre.setAttribute('aria-hidden', 'true');
        abre.textContent = '«';
        el.insertBefore(abre, el.firstChild);
      }
      let cierre = el.querySelector(':scope > .qv-cita-cierre');
      if (!cierre) {
        cierre = document.createElement('span');
        cierre.className = 'qv-cita-cierre';
        cierre.setAttribute('aria-hidden', 'true');
        cierre.textContent = '»';
        el.appendChild(cierre);
      }
      const range = document.createRange();
      range.selectNodeContents(el);
      range.setStartAfter(abre);
      range.setEndBefore(cierre);
      const rects = range.getClientRects();
      if (!rects.length) return;
      const primera = rects[0];
      const ultima = rects[rects.length - 1];
      const elRect = el.getBoundingClientRect();
      abre.style.left = (primera.left - elRect.left) + 'px';
      abre.style.top = (primera.top - elRect.top + primera.height / 2) + 'px';
      cierre.style.left = (ultima.right - elRect.left) + 'px';
      cierre.style.top = (ultima.top - elRect.top + ultima.height / 2) + 'px';
    });
  },

  calcMedidas() {
    this.ancho = window.innerWidth;
    this.alto = window.innerHeight;
    const antes = this.chico;
    this.chico = this.ancho < 900;
    this.bajo = this.alto < 620;
    const hilo = q('[data-role="hilo"]');
    const movil = q('[data-role="movil"]');
    if (hilo) hilo.style.display = this.chico ? 'none' : 'block';
    if (movil) movil.style.display = this.chico ? 'flex' : 'none';
    // la fila del thumbnail/caption mobile no puede solaparse con el nav fijo:
    // se mide la altura real del nav (no un valor fijo a ojo) y se usa como
    // padding-top, así queda correcta pase lo que pase con el contenido del nav.
    const nav = q('[data-role="nav"]');
    const movilFila = q('[data-role="movil-fila"]');
    // se lee la altura del nav una sola vez y se reusa -- leerla de nuevo más
    // abajo forzaría un segundo reflow síncrono por el padding-top que se
    // escribe en el medio (todo lo que "lee" layout después de "escribir"
    // layout dispara un recálculo síncrono del navegador)
    const navH = nav ? nav.offsetHeight : 0;
    if (nav && movilFila) movilFila.style.paddingTop = (navH + 10) + 'px';
    // el readout de altitud del descenso (KM/coordenadas) también es fijo en el
    // viewport de esa sección: en mobile tiene que arrancar debajo de la barra
    // superior completa (nav + fila del thumbnail), si no se pisan.
    const altCaja = q('[data-role="d-alt-caja"]');
    if (altCaja) {
      if (this.chico && nav && movilFila) {
        altCaja.style.top = (navH + movilFila.offsetHeight + 14) + 'px';
      } else {
        // en ventanas bajas (tablet sin pantalla completa), el rail del hilo
        // -- centrado verticalmente -- puede subir lo suficiente como para
        // pisar este readout. Se corre hacia abajo solo si hace falta.
        let top = clamp(this.alto * 0.13, 80, 130);
        if (nav) top = Math.max(top, navH + 24);
        if (hilo) {
          const hiloTop = hilo.getBoundingClientRect().top;
          if (hiloTop < top + 60) top = hiloTop + 40;
        }
        altCaja.style.top = top + 'px';
      }
    }
    this.reservarCanal();
    if (antes != null && antes !== this.chico) this.tres();
  },

  /* el rail izquierdo tiene canal propio */
  reservarCanal() {
    const izq = this.chico ? 0 : 200;
    const der = 0;
    all('[data-canal]').forEach(el => {
      // guarda el padding original (la expresión clamp() tal cual, no un px resuelto)
      // antes de pisarlo, así "apagar" el canal restaura el inset propio de la sección
      // en vez de vaciarlo a 0 -- ese vaciado era el bug real detrás del contenido
      // pegado a los bordes en mobile.
      if (el._basePad === undefined) {
        el._basePad = { left: el.style.paddingLeft, right: el.style.paddingRight };
      }
      el.style.paddingLeft = izq ? izq + 'px' : el._basePad.left;
      el.style.paddingRight = der ? der + 'px' : el._basePad.right;
    });
  },

  /* ---------- portal: página de inicio, no se cierra solo salvo que lo pidas ---------- */
  portal() {
    const p = q('[data-role="portal"]');
    const v = q('[data-role="portal-video"]');
    if (v && this.datosLimitados) {
      // conexión lenta / ahorro de datos: se queda con la foto, no baja el
      // video -- display:none acá escondía el <video> ENTERO, poster
      // incluido, dejando la pantalla en negro sólido en vez de la foto.
      // El poster ya se muestra solo con no tener src que reproducir, no
      // hace falta (ni conviene) esconder el elemento.
      v.removeAttribute('src'); v.load();
    } else if (v) {
      v.muted = true; v.defaultMuted = true;
      const arrancar = () => { const pr = v.play(); if (pr && pr.catch) pr.catch(() => {}); };
      arrancar();
      v.addEventListener('loadeddata', arrancar, { once: true });
      v.addEventListener('canplay', arrancar, { once: true });
    }
    if (!p) return;
    this.bloquear(true);

    // salida automática: solo si se pide explícitamente. Nunca por scroll.
    if (PROPS.portalAuto === true) {
      const segs = Math.max(3, Number(PROPS.portalSegundos) || 8);
      const caja = q('[data-role="portal-barra-caja"]');
      const barra = q('[data-role="portal-barra"]');
      if (caja) caja.style.display = 'block';
      const t0 = Date.now();
      this.tPortal = setInterval(() => {
        const r = Math.min(1, (Date.now() - t0) / (segs * 1000));
        if (barra) barra.style.transform = 'scaleX(' + r + ')';
        if (r >= 1) this.abrirPortal();
      }, 90);
    }
  },

  bloquear(on) {
    const html = document.documentElement;
    html.style.overflow = on ? 'hidden' : '';
    document.body.style.overflow = on ? 'hidden' : '';
    // el nav, el botón de WhatsApp y "volver arriba" son fixed con menos
    // z-index que cualquier overlay (galería, portal) -- en mobile, el
    // navegador puede tardar un instante en re-estirar un position:fixed
    // a la altura real cuando la barra de direcciones se esconde/aparece
    // durante el scroll, y en ese instante se ve lo que hay detrás. Sin
    // esto, ese parpadeo dejaba asomar el botón de WhatsApp (u otro fixed)
    // por abajo mientras se scrolleaba adentro de un overlay abierto.
    ['[data-role="nav"]', '.wa-fab', '.top-fab'].forEach(s => {
      const el = q(s);
      if (el) { el.style.visibility = on ? 'hidden' : ''; }
    });
  },

  abrirPortal() {
    if (App.abierto) return;
    App.abierto = true;
    if (App.tPortal) clearInterval(App.tPortal);
    const p = q('[data-role="portal"]');
    if (p) {
      p.style.opacity = '0';
      p.style.transform = 'scale(1.12)';
      p.style.filter = 'blur(12px)';
      p.style.pointerEvents = 'none';
      setTimeout(() => { if (p) p.style.display = 'none'; }, 1600);
    }
    // display:none en el contenedor NO pausa el <video> de adentro -- sin esto
    // el video del portal (autoplay+loop) seguía decodificando frames para
    // siempre en segundo plano, el resto de la visita entera, sin que nadie
    // lo viera. En desktop de gama baja (sobre todo sin decode de video por
    // hardware) eso solo era responsable de la enorme mayoría del trabajo de
    // CPU medido en toda la página -- mobile no lo sufre igual porque casi
    // todo hardware de celular sí tiene decode de video dedicado.
    const pv = q('[data-role="portal-video"]');
    if (pv) pv.pause();
    App.bloquear(false);
    ['[data-role="nav"]', '[data-role="hilo"]', '.wa-fab'].forEach(s => {
      const el = q(s);
      if (el) { el.style.opacity = '1'; el.style.pointerEvents = 'auto'; }
    });
    App.pintar();
    App.iniciarAutoDescenso();
    App.iniciarDescensoPorPasos();
  },

  /* si nadie scrollea, el descenso se cuenta solo -- se cancela para siempre
     apenas hay una interacción real del usuario (nunca compite con su scroll) */
  iniciarAutoDescenso() {
    if (App.reduced) return;
    const zona = q('[data-role="descenso"]');
    if (!zona) return;
    let cancelado = false;
    const eventos = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
    const cancelar = () => {
      if (cancelado) return;
      cancelado = true;
      eventos.forEach(ev => window.removeEventListener(ev, cancelar));
    };
    eventos.forEach(ev => window.addEventListener(ev, cancelar, { passive: true }));
    setTimeout(() => {
      if (cancelado || (window.scrollY || document.documentElement.scrollTop) > 40) { cancelar(); return; }
      const alto = zona.offsetHeight - window.innerHeight;
      const destino = zona.offsetTop + Math.max(0, alto);
      const y0 = window.scrollY || document.documentElement.scrollTop;
      const dur = 26000;
      const inicio = performance.now();
      const paso = now => {
        if (cancelado) return;
        const t = clamp((now - inicio) / dur, 0, 1);
        window.scrollTo(0, y0 + (destino - y0) * t);
        if (t < 1) requestAnimationFrame(paso); else cancelar();
      };
      requestAnimationFrame(paso);
    }, 2200);
  },

  /* El Descenso es scroll continuo puro: cada foto solo está en su punto
     más visible durante una ventana muy angosta del recorrido (~2% del
     total). Con un scroll o flick fuerte, esa ventana se salta entera
     entre dos frames -- se pierde la pantalla completa, no solo se ve un
     poco recortada. Acá cada gesto de rueda/swipe DENTRO de la zona del
     Descenso avanza o retrocede un solo capítulo por vez, nunca más de
     uno, así que ninguno queda sin mostrarse completo. Apenas se sale de
     la zona (para arriba en el primer capítulo, para abajo en el último)
     se deja de interceptar y el scroll de la página sigue libre como
     siempre -- el resto del sitio no se entera de que esto existe.

     Los puntos de destino NO son el mismo DESCENSO[].p que usa el texto:
     el texto cambia un poco ANTES de que la foto de esa etapa termine de
     aparecer (a propósito, para el scroll continuo original), así que
     aterrizar justo en DESCENSO[i].p dejaba la foto a mitad de fundido --
     título ya cambiado, foto todavía transparentándose. P_PASOS apunta al
     CENTRO de la ventana en la que cada foto está 100% opaca (ver los
     mismos números en pintarDescenso: capas d-1..d-4 y sus umbrales de
     entra/sale) -- ahí el título YA cambió (los umbrales de DESCENSO cruzan
     antes) y la foto YA está formada del todo. */
  iniciarDescensoPorPasos() {
    const zona = q('[data-role="descenso"]');
    if (!zona) return;
    const P_PASOS = [0, 0.37, 0.55, 0.73, 0.95];
    // una etapa <-> una capa. P_PASOS apunta al centro de la ventana en la
    // que CADA foto individualmente llega a opacity:1 (ver pintarDescenso,
    // capas d-1..d-4) -- pero las ventanas de las capas vecinas se pisan a
    // propósito para que el crossfade se vea fluido mientras se scrollea
    // de verdad, así que en ese mismo p la foto de al lado también tiene
    // opacidad parcial. Fundirse() de abajo es el fundido cruzado PROPIO
    // (con su propio reloj, no atado a la posición de scroll) que
    // reemplaza a esa cuenta continua mientras un paso está en curso --
    // así nunca puede quedar una foto vecina asomando, sea cual sea el p
    // exacto en el que el scroll termine.
    const LAYERS = ['d-fondo', 'd-1', 'd-2', 'd-3', 'd-4'].map(r => q('[data-role="' + r + '"]'));
    const TXT = { etiqueta: q('[data-role="d-etiqueta"]'), titulo: q('[data-role="d-titulo"]'), texto: q('[data-role="d-texto"]'), alt: q('[data-role="d-alt"]') };
    let etapaAsentada = 0;
    let bloqueado = false;

    // puntos: en qué capítulo de los 5 estás, y saltar directo a
    // cualquiera -- mismo salto que dar un paso con rueda/swipe, así que
    // hereda el mismo fundido cruzado y sincronismo de texto.
    const dotsHost = q('[data-role="descenso-dots"]');
    const dots = [];
    if (dotsHost) {
      DESCENSO.forEach((d, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'descenso-dot';
        btn.setAttribute('aria-label', (i + 1) + ' / ' + DESCENSO.length);
        // "irAEtapa" todavía no está definida en este punto del closure,
        // pero sí lo va a estar para cuando alguien realmente haga clic
        // (recién ahí se evalúa, no al armar el botón)
        btn.addEventListener('click', () => irAEtapa(i));
        dotsHost.appendChild(btn);
        dots.push(btn);
      });
      dots[0].classList.add('is-activo');
    }
    const marcarDots = i => dots.forEach((d, n) => d.classList.toggle('is-activo', n === i));

    // el hint de "scroll = un capítulo a la vez" solo hace falta mientras
    // nadie movió nada todavía -- una vez que la persona ya dio un paso,
    // sea como sea, ya entendió la mecánica y el hint solo estorba
    const hint = q('.descenso-hint');
    const ocultarHint = () => { if (hint) hint.classList.add('is-oculto'); };

    const geom = () => ({
      top: zona.offsetTop,
      alto: Math.max(1, zona.offsetHeight - window.innerHeight)
    });
    const yActual = () => window.scrollY || document.documentElement.scrollTop;
    const estadoActual = () => {
      const { top, alto } = geom();
      const p = clamp((yActual() - top) / alto, 0, 1);
      let etapa = 0;
      DESCENSO.forEach((d, i) => { if (p >= d.p - 0.001) etapa = i; });
      return { p, etapa, top, alto };
    };
    // no interceptar si hay un overlay bloqueando el scroll de fondo
    // (galería abierta, portal) -- esa zona vive en otra capa, no acá
    const zonaLibre = () => document.documentElement.style.overflow !== 'hidden';
    const dentroDeZona = () => {
      const { top, alto } = geom();
      const y = yActual();
      return y >= top - 2 && y <= top + alto + 2;
    };

    const DUR = 480;
    // fundido cruzado propio: solo toca opacity, en dos capas nada más
    // (la que sale, la que entra) -- pintarDescenso() no participa de la
    // opacidad mientras this._descensoPasoActivo está prendido (ver ahí),
    // así que esto es la única fuente de verdad para esas dos capas
    // durante el paso, sin importar cuántos eventos de scroll tardíos
    // lleguen mientras tanto.
    const fundirCapas = (desde, hacia) => {
      const elDesde = LAYERS[desde], elHacia = LAYERS[hacia];
      if (App.reduced) {
        if (elDesde && desde !== hacia) elDesde.style.opacity = '0';
        if (elHacia) elHacia.style.opacity = '1';
        return;
      }
      const inicio = performance.now();
      const tick = now => {
        const t = clamp((now - inicio) / DUR, 0, 1);
        if (elDesde && desde !== hacia) elDesde.style.opacity = t < 1 ? String(1 - t) : '0';
        if (elHacia) elHacia.style.opacity = t < 1 ? String(t) : '1';
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    // mismo texto/altímetro que pintarDescenso, disparado a mano en el
    // mismo instante en que arranca el fundido de foto -- antes cambiaba
    // solo cuando el scroll cruzaba el viejo umbral DESCENSO[].p (bastante
    // antes de que la foto terminara de formarse), sintiéndose como dos
    // gestos separados en vez de uno solo.
    const fundirTexto = i => {
      const d = DESCENSO[i];
      [[TXT.etiqueta, d.e], [TXT.titulo, d.t], [TXT.texto, d.x]].forEach(par => {
        const el = par[0];
        if (!el) return;
        if (App.reduced) { el.textContent = par[1]; el.style.opacity = '1'; el.style.transform = 'none'; return; }
        el.style.transition = 'opacity .4s ease,transform .5s cubic-bezier(.16,1,.3,1)';
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
        setTimeout(() => { if (!el) return; el.textContent = par[1]; el.style.opacity = '1'; el.style.transform = 'none'; }, 180);
      });
      if (TXT.alt) App.odometro(TXT.alt, d.km);
      App._etapa = i;
    };

    // los scrollTo() del tween de abajo generan su propia cola de eventos
    // "scroll" que el navegador despacha con atraso -- mientras dura ese
    // atraso, this._descensoPasoActivo se mantiene prendido para que
    // pintarDescenso() no vuelva a tocar la opacidad de las capas por su
    // cuenta. Apagarla con un timeout fijo no alcanza: el drenaje no
    // siempre tarda lo mismo (confirmado midiendo, a veces un evento
    // tardío llegaba después de un timeout de 700ms y volvía a ensuciar
    // la cuenta). En cambio, cada disparo de "scrollend" reinicia una
    // cuenta regresiva corta -- recién se apaga la bandera cuando pasan
    // 250ms SIN ningún scrollend nuevo, sea cual sea cuántos hicieron
    // falta hasta ahí. Un respaldo más largo cubre el caso raro de que
    // el navegador no dispare scrollend en absoluto.
    let pasoEnCurso = null;
    let liberar = null;
    const armarLiberacion = ms => {
      clearTimeout(liberar);
      liberar = setTimeout(() => { pasoEnCurso = null; App._descensoPasoActivo = false; }, ms);
    };
    window.addEventListener('scrollend', () => {
      if (pasoEnCurso != null) armarLiberacion(250);
    });
    const irAEtapa = i => {
      const { top, alto } = geom();
      const destino = top + P_PASOS[i] * alto;
      const previa = etapaAsentada;
      etapaAsentada = i;
      pasoEnCurso = i;
      App._descensoPasoActivo = true;
      fundirCapas(previa, i);
      fundirTexto(i);
      marcarDots(i);
      ocultarHint();
      armarLiberacion(1200);
      if (App.reduced) { window.scrollTo(0, destino); return; }
      bloqueado = true;
      const y0 = yActual();
      const inicio = performance.now();
      const paso = now => {
        const t = clamp((now - inicio) / DUR, 0, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        window.scrollTo(0, y0 + (destino - y0) * ease);
        if (t < 1) requestAnimationFrame(paso);
        else bloqueado = false;
      };
      requestAnimationFrame(paso);
    };

    // los puntos también tienen que reflejar un scroll que NO pasó por
    // manejar() -- arrastrar la scrollbar a mano, Home/End, el propio
    // auto-descenso por inactividad. Se sincronizan solos con cualquier
    // scroll real, salvo mientras hay un paso propio en curso (bloqueado),
    // que ya se ocupa de marcarlos.
    window.addEventListener('scroll', () => {
      if (bloqueado || !dentroDeZona()) return;
      const { etapa } = estadoActual();
      if (etapa !== etapaAsentada) { etapaAsentada = etapa; marcarDots(etapa); ocultarHint(); }
    }, { passive: true });

    // wheel/swipe hacia abajo -> el capítulo siguiente; hacia arriba -> el
    // anterior. En el primer/último capítulo, según el sentido, se deja
    // pasar el gesto sin tocarlo (return false) y el scroll normal retoma.
    const manejar = direccion => {
      if (bloqueado || !zonaLibre() || !dentroDeZona()) return false;
      const { etapa } = estadoActual();
      if (direccion > 0) {
        if (etapa >= DESCENSO.length - 1) return false;
        irAEtapa(etapa + 1);
      } else {
        if (etapa <= 0) return false;
        irAEtapa(etapa - 1);
      }
      return true;
    };

    window.addEventListener('wheel', e => {
      if (Math.abs(e.deltaY) < 2) return;
      if (manejar(e.deltaY > 0 ? 1 : -1)) e.preventDefault();
    }, { passive: false });

    let tY0 = null;
    window.addEventListener('touchstart', e => { tY0 = e.touches[0].clientY; }, { passive: true });
    window.addEventListener('touchmove', e => {
      if (tY0 == null || bloqueado || !zonaLibre() || !dentroDeZona()) return;
      const dy = tY0 - e.touches[0].clientY;
      // umbral: un roce chico no cuenta como intención de cambiar de capítulo
      if (Math.abs(dy) < 42) return;
      const dir = dy > 0 ? 1 : -1;
      tY0 = null;
      if (manejar(dir)) e.preventDefault();
    }, { passive: false });
  },

  /* ---------- sello: 36 marcas ---------- */
  ticks() {
    all('[data-role="mapa-ticks"],[data-role="voces-ticks"]').forEach(host => {
      const n = 36;
      for (let i = 0; i < n; i++) {
        const largo = i % 3 === 0 ? 9 : 4;
        const wrap = document.createElement('span');
        wrap.style.cssText = 'position:absolute;inset:0;transform:rotate(' + (i * 360 / n) + 'deg)';
        const mark = document.createElement('span');
        mark.style.cssText = 'position:absolute;left:50%;top:0;width:1px;height:' + largo + 'px;background:rgba(224,164,95,' + (i % 3 === 0 ? 0.5 : 0.2) + ');transform:translateX(-50%)';
        wrap.appendChild(mark);
        host.appendChild(wrap);
      }
    });
  },

  grano() {
    const el = q('[data-role="grano"]');
    if (!el) return;
    const svg = "<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='180' height='180' filter='url(%23n)'/></svg>";
    el.style.backgroundImage = 'url("data:image/svg+xml;utf8,' + svg.replace(/"/g, "'") + '")';
    el.style.opacity = String(PROPS.grano != null ? PROPS.grano : 0.05);
    if (this.reduced || this.coarse) return;
    // rAF con throttle propio en vez de setTimeout: el jitter sigue siendo
    // "a los saltos" (así se ve el grano real), pero queda sincronizado con
    // el ciclo de pintado del navegador y se pausa solo en pestañas en segundo plano
    let t = 0, ultimo = 0;
    const step = now => {
      if (this.dead) return;
      requestAnimationFrame(step);
      if (now - ultimo < 90) return;
      ultimo = now;
      t++;
      el.style.transform = 'translate(' + (t % 3 - 1) * 6 + 'px,' + (t % 5 - 2) * 5 + 'px)';
    };
    requestAnimationFrame(step);
  },

  cursor() {
    const c = q('[data-role="cursor"]');
    if (!c || this.coarse) return;
    c.style.display = 'flex';
    // el círculo mide siempre 74px -- los tres "tamaños" (punto chico, aro
    // por defecto, aro con etiqueta) son un scale() sobre esa base, nunca
    // width/height: animar width/height fuerza layout en cada frame del hover,
    // en cada link y botón del sitio; scale() lo resuelve el compositor.
    const ESC_PUNTO = 16 / 74, ESC_DEFECTO = 42 / 74, ESC_ETIQUETA = 1;
    let tx = 0, ty = 0, x = 0, y = 0, quieto = 0;
    let escala = ESC_DEFECTO, escalaObjetivo = ESC_DEFECTO;
    this.onMove = e => { tx = e.clientX; ty = e.clientY; quieto = 0; };
    window.addEventListener('pointermove', this.onMove);
    const loop = () => {
      if (this.dead) return;
      const dx = tx - x, dy = ty - y;
      if (Math.abs(dx) < 0.2 && Math.abs(dy) < 0.2) { quieto++; } else { quieto = 0; }
      if (quieto < 40) { x += dx * 0.2; y += dy * 0.2; }
      const de = escalaObjetivo - escala;
      if (quieto < 40 || Math.abs(de) > 0.001) {
        escala += de * 0.25;
        c.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + escala.toFixed(3) + ')';
      }
      requestAnimationFrame(loop);
    };
    loop();
    // .voces-card entra acá aparte de [data-cursor]/a/button: no es un link,
    // así que no lleva etiqueta (ningún "LEER" que prometa un clic que no
    // hace nada) -- pero sí ya reacciona al hover (se levanta, el borde se
    // ilumina), y quedaba con el cursor nativo mientras todo lo demás con
    // reacción al hover en el sitio usa el punto animado. Solo el punto,
    // sin trocar el vocabulario de etiquetas que en el resto del sitio
    // siempre corresponde a una acción real.
    all('[data-cursor],a,button,.voces-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        const lbl = el.dataset.cursor;
        if (lbl === '') { c.style.opacity = '0'; return; }
        c.textContent = lbl || '';
        escalaObjetivo = lbl ? ESC_ETIQUETA : ESC_PUNTO;
        c.style.backgroundColor = lbl ? 'rgba(196,123,62,0.14)' : '#e0a45f';
      });
      el.addEventListener('mouseleave', () => {
        c.style.opacity = '1';
        c.textContent = '';
        escalaObjetivo = ESC_DEFECTO;
        c.style.backgroundColor = 'transparent';
      });
    });
  },

  /* ---------- hilo narrativo ---------- */
  /* el hilo no son puntos: es la cadena de producto real que atraviesa cada
     capítulo, engarzada en la línea -- el único acompañante del recorrido. */
  hilo() {
    const nodos = q('[data-role="hilo-nodos"]');
    this.caps = all('[data-cap]');
    if (!nodos) return;
    this.caps.forEach((sec, i) => {
      const wrap = document.createElement('div');
      wrap.className = 'hilo-nodo';
      wrap.style.cssText = 'position:absolute;left:0;top:' + (i / Math.max(1, this.caps.length - 1) * 100) + '%;transform:translateY(-50%);display:flex;align-items:center;gap:12px;cursor:pointer';
      const grano = document.createElement('span');
      grano.className = 'hilo-grano';
      const img = document.createElement('img');
      img.src = sec.dataset.viaje;
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      grano.appendChild(img);
      const label = document.createElement('span');
      label.textContent = capLabel(sec);
      label.style.cssText = 'font-size:0.6875rem;letter-spacing:0.16em;color:#8d7f70;white-space:nowrap;opacity:0;transform:translateX(-6px);transition:all .35s ease;text-transform:uppercase';
      wrap.appendChild(grano); wrap.appendChild(label);
      wrap.addEventListener('mouseenter', () => { label.style.opacity = '1'; label.style.transform = 'none'; });
      wrap.addEventListener('mouseleave', () => { if (this.capActual !== i) { label.style.opacity = '0'; label.style.transform = 'translateX(-6px)'; } });
      wrap.addEventListener('click', () => window.scrollTo({ top: sec.offsetTop, behavior: this.reduced ? 'auto' : 'smooth' }));
      nodos.appendChild(wrap);
      sec._nodo = { grano: grano, label: label };
    });
    this.refrescarHilo = () => { this.caps.forEach(sec => { if (sec._nodo) sec._nodo.label.textContent = capLabel(sec); }); };
  },

  pintar() {
    // estos elementos se resuelven una sola vez y se cachean -- antes se
    // hacían 6-7 querySelector nuevos en CADA scroll tick, para toda la vida
    // de la página (no solo en el Descenso), aunque ninguno de estos
    // elementos aparece ni desaparece del DOM nunca.
    if (this._pEls === undefined) {
      this._pEls = {
        hiloFill: q('[data-role="hilo-fill"]'),
        hiloBrasa: q('[data-role="hilo-brasa"]'),
        movilFill: q('[data-role="movil-fill"]'),
        arriba: q('[data-role="volver-arriba"]'),
        nav: q('[data-role="nav"]'),
        grano: q('[data-role="grano"]'),
        interludio: q('[data-role="interludio"]'),
        interludioTexto: q('.qv-interludio-cita')
      };
    }
    const pe = this._pEls;
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const y = window.scrollY || doc.scrollTop;
    const r = clamp(y / max, 0, 1);

    if (pe.movilFill) pe.movilFill.style.width = (r * 100) + '%';

    if (pe.arriba) pe.arriba.classList.toggle('is-visible', y > window.innerHeight);

    if (this.caps && this.caps.length) {
      // el offsetTop/offsetHeight de cada sección se cachea -- leerlo de las
      // 9 secciones en cada scroll tick fuerza layout aunque ninguna cambió
      // de alto desde el último frame. Se invalida en resize, cambio de
      // idioma (el texto ES/EN no mide igual) y en "load" (por si algo
      // termina de acomodar el layout después de la carga inicial).
      if (!this._capsTops) this._capsTops = this.caps.map(s => s.offsetTop);
      // activa la última sección cuyo tope ya se cruzó (con un pequeño
      // margen de anticipación). No sirve medir "cuánta sección entra en
      // pantalla": el Descenso es scroll continuo con la foto fijada
      // (sticky) mientras dura su propio recorrido, así que buena parte de
      // su alto real en el documento nunca se ve "llena" de contenido
      // propio -- con esa métrica el indicador saltaba a Territorio a
      // mitad del Descenso. El único caso que el cruce de umbral no cubre
      // es una sección final más baja que la pantalla (Eventos,
      // Experiencia): ahí puede no quedar scroll para llegar a cruzar su
      // umbral, así que al tocar el fondo real de la página se fuerza la
      // última sección activa.
      let idx = 0;
      this._capsTops.forEach((top, n) => { if (y >= top - window.innerHeight * 0.15) idx = n; });
      if (y >= max - 1) idx = this.caps.length - 1;
      if (idx !== this.capActual) {
        this.capActual = idx;
        this.mostrarCap(this.caps[idx]);
      }

      // el punto de la barra viaja entre nodos, no según el % de scroll de
      // toda la página: los nodos están espaciados por índice (uno cada
      // 1/8 de la barra), pero las secciones NO miden lo mismo -- "El
      // Descenso" por sí solo puede ocupar un cuarto de la página entera.
      // Con el % de scroll bruto, el punto llegaba a la mitad de la barra
      // (sección 2) sin haber terminado de recorrer la sección 1 todavía.
      // Acá se interpola la posición del punto entre el nodo actual y el
      // siguiente según cuánto se avanzó dentro de la sección actual.
      const nCaps = this.caps.length;
      let railFrac = 1;
      if (idx < nCaps - 1) {
        const topA = this._capsTops[idx];
        const topB = this._capsTops[idx + 1];
        const p = topB > topA ? clamp((y - topA) / (topB - topA), 0, 1) : 0;
        railFrac = (idx + p) / (nCaps - 1);
      }
      if (pe.hiloFill) pe.hiloFill.style.height = (railFrac * 100) + '%';
      if (pe.hiloBrasa) pe.hiloBrasa.style.top = 'calc(' + (railFrac * 100) + '% - 3px)';
    }

    if (pe.nav) {
      // backdrop-filter es de lo más caro de togglear -- reescribirlo en cada
      // scroll tick aunque el estado no haya cambiado fuerza una revisión de
      // repintado igual. Solo se toca el DOM cuando "sólido" realmente cambia.
      const solido = y > window.innerHeight * 0.6;
      if (solido !== this._navSolido) {
        this._navSolido = solido;
        pe.nav.style.backgroundColor = solido ? 'rgba(5,6,10,0.72)' : 'transparent';
        pe.nav.style.backdropFilter = solido ? 'blur(14px)' : 'none';
      }
    }

    this.parallax(y);
    this.pintarDescenso(y);
    this.pintarInterludio(y);
    if (pe.grano) {
      const base = PROPS.grano != null ? PROPS.grano : 0.05;
      pe.grano.style.opacity = String(base + (this.granoAvance || 0) * 0.15);
    }
  },

  /* ---------- interludio tipográfico: tiro de foco atado al scroll -- la
     única sección sin foto necesitaba su propio gesto de cámara, no solo
     un fundido de entrada fijo. El texto entra desenfocado y se enfoca del
     todo recién cuando la franja queda centrada en la pantalla (el punto
     en el que alguien scrolleando despacio se detendría a leerla), y se
     desenfoca de nuevo al irse -- como un rack focus, no un fundido. ---------- */
  pintarInterludio(y) {
    const banda = this._pEls.interludio;
    const texto = this._pEls.interludioTexto;
    if (!banda || !texto || this.reduced) return;
    if (this._interludioTop === undefined) {
      this._interludioTop = banda.offsetTop;
      this._interludioAlto = banda.offsetHeight;
    }
    const centroBanda = this._interludioTop + this._interludioAlto / 2;
    const centroPantalla = y + window.innerHeight / 2;
    const dist = Math.abs(centroBanda - centroPantalla);
    const foco = clamp(1 - dist / (window.innerHeight * 0.55), 0, 1);
    if (foco === this._interludioFoco) return;
    this._interludioFoco = foco;
    // solo propiedades que no cambian el ancho renderizado del texto --
    // letter-spacing lo hacía, y como esto corre en cada scroll tick sin
    // volver a llamar a posicionarComillas() (sería carísimo medir en cada
    // frame), la comilla de cierre quedaba pegada a una posición vieja en
    // cuanto el tracking cambiaba: el mismo bug que ya se había cazado,
    // de nuevo, por una razón nueva.
    texto.style.filter = 'blur(' + ((1 - foco) * 5).toFixed(2) + 'px)';
    texto.style.opacity = String((0.35 + foco * 0.65).toFixed(2));
  },

  mostrarCap(sec) {
    if (!sec) return;
    const idx = this.capActual;
    this.caps.forEach((s, n) => {
      if (!s._nodo) return;
      const on = n === idx;
      s._nodo.grano.classList.toggle('is-on', on);
      s._nodo.label.style.opacity = on ? '1' : '0';
      s._nodo.label.style.transform = on ? 'none' : 'translateX(-6px)';
      s._nodo.label.style.color = on ? '#e0a45f' : '#8d7f70';
    });
    const swap = (img, src) => {
      if (!img || !src || img.dataset.src === src) return;
      img.dataset.src = src;
      img.style.opacity = '0';
      img.style.transform = 'scale(1.18)';
      setTimeout(() => { if (!img) return; img.src = src; img.style.opacity = '1'; img.style.transform = 'scale(1)'; }, 300);
    };
    swap(q('[data-role="movil-img"]'), sec.dataset.viaje);
    // en mobile no hay rail con los 8 puntos a la vista como en desktop -- sin el
    // total, "01" se puede leer como un id cualquiera en vez de "vas por acá"
    const etiqueta = capLabel(sec) + ' · ' + (this.capActual + 1) + '/' + this.caps.length;
    const mc = q('[data-role="movil-cap"]');
    if (mc) mc.textContent = etiqueta;
  },

  parallax(y) {
    if (this.reduced || this.chico) return;
    // la lista de elementos y su offsetTop se resuelven una sola vez y se
    // cachean, invalidados solo en resize -- antes esto hacía un
    // querySelectorAll('[data-parallax]') + closest() + offsetTop (lectura
    // de layout) en CADA scroll tick, para toda la vida de la página, para
    // parallaxear un solo video que casi siempre está lejos de la vista
    // (incluida toda la sección de Descenso, arriba de todo).
    if (this._paraDatos === undefined) {
      this._paraDatos = all('[data-parallax]').map(el => {
        const sec = el.closest('[data-cap]');
        return sec ? { el, top: sec.offsetTop, factor: parseFloat(el.dataset.parallax) } : null;
      }).filter(Boolean);
    }
    this._paraDatos.forEach(d => {
      const rel = (y - d.top) / Math.max(1, window.innerHeight);
      if (Math.abs(rel) > 1.6) return;
      d.el.style.transform = 'translate3d(0,' + (rel * d.factor * 190) + 'px,0)';
    });
  },

  /* ---------- 01 descenso: sobrevuelo -> cordillera -> costa -> la casa,
     una secuencia fotográfica real, sin generativo -- ver conversación:
     el campo de estrellas + zoom orbital quedaba desconectado del lenguaje
     fotográfico del resto del sitio y se leía como "efecto", no como lugar. ---------- */
  pintarDescenso(y) {
    // el descenso mide ~2700px sobre una página de ~10700px -- sin esta guarda,
    // esta función hacía 10+ querySelector y reescribía estilos en cada scroll
    // tick durante TODA la página, aunque el usuario estuviera en Voces o
    // Experiencia a miles de px de acá. Los elementos se resuelven una sola vez
    // y se cachean; la geometría de la zona también, invalidada solo en resize.
    if (this._dEls === undefined) {
      const zona = q('[data-role="descenso"]');
      this._dEls = zona ? {
        zona,
        fondo: q('[data-role="d-fondo"]'),
        atmosfera: q('[data-role="d-atmosfera"]'),
        flash: q('[data-role="d-flash"]'),
        capas: [
          [q('[data-role="d-1"]'), 0.16, 0.38, 1.3, 0.4, 0.4],
          [q('[data-role="d-2"]'), 0.34, 0.56, 1.24, 0.34, 0.4],
          [q('[data-role="d-3"]'), 0.52, 0.74, 1.2, 0.3, 0.35],
          [q('[data-role="d-4"]'), 0.70, 1.02, 1.16, 0.22, 0.24]
        ],
        etiqueta: q('[data-role="d-etiqueta"]'),
        titulo: q('[data-role="d-titulo"]'),
        texto: q('[data-role="d-texto"]'),
        alt: q('[data-role="d-alt"]')
      } : null;
    }
    const els = this._dEls;
    if (!els) return;
    if (!this._dGeom) this._dGeom = { top: els.zona.offsetTop, alto: els.zona.offsetHeight };
    const alto = this._dGeom.alto - window.innerHeight;
    const p = clamp((y - this._dGeom.top) / Math.max(1, alto), 0, 1);

    // ya quedó asentada en su valor final de un lado o del otro -- no hay
    // nada nuevo que pintar hasta que el usuario vuelva a entrar en la zona.
    const primeraVez = this._dP === undefined;
    const yaAsentada = !primeraVez && ((p <= 0 && this._dP <= 0) || (p >= 1 && this._dP >= 1));
    this._dP = p;
    if (yaAsentada) return;

    // ritmo de aproximación durante el primer tramo -- se usa nada más para
    // modular el grano de fondo, no hay una fase separada que "ceder terreno"
    this.aproxAvance = clamp(p / 0.38, 0, 1);
    // presencia real dentro (o recién saliendo) del descenso: el grano de fondo
    // sube con la aproximación y se apaga solo, no queda prendido el resto del sitio
    const finZona = this._dGeom.top + this._dGeom.alto;
    const presencia = 1 - clamp((y - finZona) / window.innerHeight, 0, 1);
    this.granoAvance = this.aproxAvance * presencia;

    // la foto de fondo (sobrevuelo inicial) se queda de entrada y se apaga
    // recién cuando la primera foto real (d-1) ya está tomando su lugar --
    // el zoom lento es CSS puro (qvFondoZoom), acá solo se controla la opacidad.
    // Salvo mientras iniciarDescensoPorPasos() está corriendo su propio
    // fundido cruzado (this._descensoPasoActivo) -- ahí la opacidad de
    // fondo/capas la maneja ese fundido con su propio reloj, no la
    // posición de scroll (ver nota ahí: por diseño las ventanas de las
    // capas vecinas se pisan a propósito, y aterrizar en cualquier p fijo
    // siempre deja a la vecina asomando un poco).
    if (els.fondo && !this._descensoPasoActivo) els.fondo.style.opacity = String(1 - clamp((p - 0.16) / 0.22, 0, 1));
    // neblina de altura: un velo frío se despeja en la luz cálida de la costa
    // a medida que se avanza -- redondeado grueso a propósito: reescribir un
    // gradient de pantalla completa con un string nuevo en CADA frame de scroll
    // fuerza repintado aunque el color casi no haya cambiado -- con pasos de
    // a 2°/0.02 alcanza y sobra para que se vea continuo, y solo se toca el
    // DOM cuando el valor cambió.
    if (els.atmosfera) {
      const hue = Math.round((222 - p * 190) / 2) * 2;
      const alfa = Math.round((0.1 + Math.sin(p * Math.PI) * 0.12) * 50) / 50;
      const clave = hue + ':' + alfa;
      if (clave !== this._atmClave) {
        this._atmClave = clave;
        els.atmosfera.style.background = 'linear-gradient(180deg, hsla(' + hue + ',68%,54%,' + alfa + ') 0%, transparent 52%, hsla(' + (hue - 18) + ',78%,50%,' + (alfa * 0.75) + ') 100%)';
      }
    }
    // destello cálido justo cuando se asienta la última foto (el salón): el
    // momento de "llegada", sin depender de ningún efecto generativo.
    if (els.flash) {
      const entra = clamp((p - 0.66) / 0.08, 0, 1);
      const sale = clamp((p - 0.78) / 0.12, 0, 1);
      els.flash.style.opacity = String(entra * (1 - sale) * 0.85);
    }
    els.capas.forEach((c, i) => {
      const el = c[0];
      if (!el) return;
      const entra = clamp((p - c[1]) / 0.2, 0, 1);
      // la escala/deriva sí se dejan corriendo con el scroll incluso durante
      // el fundido propio -- da un poco de vida al acercamiento sin
      // arriesgar el fantasma de opacidad que sí hay que evitar
      const escala = c[3] - clamp((p - c[1]) / (c[5] || 0.4), 0, 1) * c[4];
      const deriva = (1 - entra) * 26;
      el.style.transform = 'scale(' + escala + ') translateY(' + deriva + 'px)';
      if (this._descensoPasoActivo) return;
      const sale = i < els.capas.length - 1 ? clamp((p - c[2]) / 0.18, 0, 1) : 0;
      el.style.opacity = String(entra * (1 - sale));
    });

    let etapa = 0;
    DESCENSO.forEach((d, i) => { if (p >= d.p) etapa = i; });
    // mientras el fundido propio de iniciarDescensoPorPasos() está corriendo,
    // el cambio de texto lo dispara ese mismo fundido (sincronizado con la
    // foto, no con este umbral) -- acá solo se actualiza this._etapa para
    // que, apenas termine, este bloque no dispare una segunda animación de
    // texto redundante en cuanto vuelva a correr con el próximo scroll.
    if (etapa !== this._etapa) {
      this._etapa = etapa;
      if (this._descensoPasoActivo) return;
      const d = DESCENSO[etapa];
      [[els.etiqueta, d.e], [els.titulo, d.t], [els.texto, d.x]].forEach(par => {
        const el = par[0];
        if (!el) return;
        el.style.transition = 'opacity .45s ease,transform .6s cubic-bezier(.16,1,.3,1)';
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
        setTimeout(() => { if (!el) return; el.textContent = par[1]; el.style.opacity = '1'; el.style.transform = 'none'; }, 300);
      });
      if (els.alt) this.odometro(els.alt, d.km);
    }
  },

  // efecto "odómetro": los dígitos ruedan por valores al azar antes de asentarse
  // en el valor final, como el contador de un instrumento real -- coherente
  // con la tipografía monoespaciada que ya usan los datos de vuelo del descenso.
  odometro(el, valor) {
    if (this.reduced) { el.textContent = valor; return; }
    const digitos = '0123456789';
    const pasos = 9;
    let paso = 0;
    const tick = () => {
      paso++;
      const t = paso / pasos;
      let out = '';
      for (let i = 0; i < valor.length; i++) {
        const ch = valor[i];
        out += (!/[0-9]/.test(ch) || Math.random() < t) ? ch : digitos[Math.floor(Math.random() * 10)];
      }
      el.textContent = out;
      if (paso < pasos) setTimeout(tick, 45);
      else el.textContent = valor;
    };
    tick();
  },

  /* ---------- canvas 2D: el fuego (partículas reales, sin dependencias externas) ---------- */
  tres() {
    if (PROPS.efectos3d === false) { this.sinTres(); return; }
    let intentos = 0;
    const arrancar = () => {
      if (this.dead) return;
      if (!window.Q3D) {
        if (++intentos > 60) { this.sinTres(); return; }
        setTimeout(arrancar, 120);
        return;
      }
      try {
        const enVista = (canvas, cb, umbrales, margen) => {
          const io = new IntersectionObserver(es => es.forEach(cb), { threshold: umbrales || 0.02, rootMargin: margen || '15% 0px' });
          io.observe(canvas);
          this.observadores.push(io);
        };
        const cf = q('[data-role="c-fuego"]');
        // "El Fuego" está bien abajo del fold: ni siquiera se crea el canvas
        // (ni sus partículas) hasta que la sección está por entrar en pantalla
        if (cf && !this.gFuego) {
          cf.style.opacity = this.chico ? '0.45' : '0.62';
          enVista(cf, e => {
            if (!this.gFuego && e.isIntersecting) {
              const densFuego = this.chico ? 0.3 : (this.gamaBaja ? 0.55 : 1);
              this.gFuego = window.Q3D.fuego(cf, densFuego, this.gamaBaja ? 1 : 1.5);
            }
            if (!this.gFuego) return;
            this.gFuego.setActive(e.isIntersecting);
            this.gFuego.setIntensity(e.isIntersecting ? 1 : 0.06);
            // este mismo margen decide cuándo se apaga, no solo cuándo se
            // prende: con 400px de buffer el canvas (casi del tamaño de la
            // pantalla, humo + brasas con blending aditivo) seguía dibujando
            // de fondo mucho después de haber scrolleado a la sección
            // siguiente -- en un desktop de gama baja eso era, medido, la
            // mayor parte del costo de CPU de toda la página. La creación
            // (baja densidad de partículas la primera vez) sigue arrancando
            // con margen para que no haya un pop-in brusco al entrar.
          }, 0.02, '60px 0px');
        }
      } catch (err) {
        console.warn('3D no disponible', err);
        this.sinTres();
      }
    };
    arrancar();
  },

  sinTres() {
    const cf = q('[data-role="c-fuego"]');
    if (cf) cf.style.display = 'none';
  },

  /* ---------- franja de credenciales: marquee infinito -- se pausa con
     :hover en mouse, pero el touch no tiene hover, así que sin esto un
     lector alcanza a leer la mitad de una frase antes de que se le escape
     de nuevo. pointerdown/up cubre touch y mouse por igual, sin duplicar
     la lógica de :hover que ya cubre el caso de mouse sin tocar nada. ---------- */
  credenciales() {
    const cont = q('.credenciales');
    if (!cont) return;
    cont.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'touch') return;
      cont.classList.add('is-paused');
    });
    cont.addEventListener('pointerup', () => cont.classList.remove('is-paused'));
    cont.addEventListener('pointercancel', () => cont.classList.remove('is-paused'));
  },

  /* ---------- 02 territorio ---------- */
  territorio() {
    const nodos = q('[data-role="mapa-nodos"]');
    const lista = q('[data-role="eje-lista"]');
    if (!nodos || !lista) return;
    const arco = q('[data-role="mapa-arco"]');
    const tit = q('[data-role="eje-titulo"]');
    const txt = q('[data-role="eje-texto"]');
    const chips = q('[data-role="eje-chips"]');
    const imgs = all('[data-eje-img]');
    const ondas = q('[data-role="mapa-ondas"]');
    const nodoEls = [], filaEls = [], filaTxtEls = [];

    EJES.forEach((e, i) => {
      const ang = (i * 90 - 90) * Math.PI / 180;
      const b = document.createElement('button');
      b.type = 'button';
      b.dataset.cursor = e.n;
      b.style.cssText = 'position:absolute;left:' + (50 + Math.cos(ang) * 42) + '%;top:' + (50 + Math.sin(ang) * 47) + '%;transform:translate(-50%,-50%);background:#0d0b0a;border:1px solid rgba(224,164,95,0.4);color:#cbbca9;font-family:inherit;font-weight:300;font-size:0.6875rem;letter-spacing:0.16em;padding:13px 13px;border-radius:999px;cursor:pointer;transition:all .4s cubic-bezier(.16,1,.3,1);white-space:nowrap';
      b.textContent = e.n;
      const act = () => { this.setEje(i); this.ciclarEje(); };
      b.addEventListener('click', act);
      if (!this.coarse) b.addEventListener('mouseenter', act);
      nodos.appendChild(b);
      nodoEls.push(b);

      const fila = document.createElement('button');
      fila.type = 'button';
      fila.style.cssText = 'display:flex;align-items:baseline;justify-content:space-between;gap:14px;background:none;border:none;border-bottom:1px solid rgba(242,236,225,0.09);padding:12px 0;cursor:pointer;text-align:left;color:#8d7f70;font-family:inherit;font-weight:300;transition:color .35s ease';
      const izq = document.createElement('span');
      izq.style.cssText = "font-family:'Piazzolla',serif;font-size:0.95rem";
      izq.textContent = '0' + (i + 1) + ' · ' + e.n;
      const der = document.createElement('span');
      der.style.cssText = 'font-size:0.6875rem;letter-spacing:0.16em;text-align:right';
      der.textContent = e.z;
      fila.appendChild(izq); fila.appendChild(der);
      fila.addEventListener('click', act);
      lista.appendChild(fila);
      filaEls.push(fila);
      filaTxtEls.push({ izq: izq, der: der });
    });

    this.setEje = i => {
      if (this.ejeActual === i) return;
      this.ejeActual = i;
      imgs.forEach((im, n) => {
        im.style.opacity = n === i ? '1' : '0';
        im.style.transform = n === i ? 'scale(1)' : 'scale(1.08)';
      });
      if (ondas && !this.reduced) {
        const s = document.createElement('span');
        s.style.cssText = 'width:54%;aspect-ratio:1/1;border:1px solid rgba(224,164,95,0.4);border-radius:50%;animation:qvOnda 2.2s ease-out forwards';
        ondas.appendChild(s);
        setTimeout(() => s.remove(), 2400);
      }
      // arco que conecta los 4 nodos como un mapa, no pestañas sueltas: se
      // corre a la posición del nodo activo (mismo lenguaje que el arco del
      // menú de pasos, pero acá resalta un cuadrante en vez de "progreso")
      const terrArco = q('[data-role="terr-arco"]');
      if (terrArco) terrArco.style.strokeDashoffset = String(-i * 69.1);
      nodoEls.forEach((b, n) => {
        const on = n === i;
        b.style.background = on ? '#c47b3e' : '#0d0b0a';
        b.style.color = on ? '#0d0b0a' : '#cbbca9';
        b.style.borderColor = on ? '#e0a45f' : 'rgba(224,164,95,0.4)';
        b.style.transform = 'translate(-50%,-50%) scale(' + (on ? 1.08 : 1) + ')';
      });
      filaEls.forEach((f, n) => { f.style.color = n === i ? '#f2ece1' : '#8d7f70'; });
      if (arco) arco.style.strokeDashoffset = String(-i * 78.5);
      if (tit) tit.textContent = EJES[i].t;
      if (txt) txt.textContent = EJES[i].d;
      if (chips) {
        chips.textContent = '';
        EJES[i].ing.forEach(g => {
          const c = document.createElement('span');
          c.style.cssText = 'font-size:0.6875rem;letter-spacing:0.12em;text-transform:uppercase;color:#cbbca9;border:1px solid rgba(242,236,225,0.16);padding:6px 10px;border-radius:999px';
          c.textContent = g;
          chips.appendChild(c);
        });
      }
    };
    this.ciclarEje = () => {
      if (this.tEje) clearInterval(this.tEje);
      this.tEje = setInterval(() => this.setEje(((this.ejeActual || 0) + 1) % EJES.length), 5400);
    };
    this.setEje(0);
    this.ciclarEje();
    this.pausarCicloFueraDeVista(nodos.closest('[data-cap]'), 'tEje', this.ciclarEje);
    // mismo lenguaje del menú de pasos: flechas cambian de cuadrante cuando
    // la sección está a la vista, sin robarle el foco al resto del sitio
    window.addEventListener('keydown', e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const sec = nodos.closest('[data-cap]');
      if (!sec) return;
      const y = window.scrollY;
      if (y < sec.offsetTop - window.innerHeight * 0.6 || y > sec.offsetTop + sec.offsetHeight) return;
      e.preventDefault();
      this.setEje(((this.ejeActual || 0) + (e.key === 'ArrowRight' ? 1 : -1) + EJES.length) % EJES.length);
      this.ciclarEje();
    });
    this.refrescarTerritorio = () => {
      EJES.forEach((e, i) => {
        nodoEls[i].textContent = e.n;
        nodoEls[i].dataset.cursor = e.n;
        filaTxtEls[i].izq.textContent = '0' + (i + 1) + ' · ' + e.n;
        filaTxtEls[i].der.textContent = e.z;
      });
      const actual = this.ejeActual;
      this.ejeActual = null;
      this.setEje(actual || 0);
    };
  },

  /* ---------- 03 fuego: reloj del pase ---------- */
  pase() {
    const marcas = q('[data-role="servicio-marcas"]');
    if (!marcas) return;
    const reloj = q('[data-role="reloj"]');
    const tit = q('[data-role="servicio-titulo"]');
    const txt = q('[data-role="servicio-texto"]');
    const imgs = all('[data-servicio-img]');
    const pie = q('[data-role="servicio-pie"]');
    const btns = [];
    MOMENTOS.forEach((m, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = m[0];
      b.style.cssText = "background:none;border:1px solid rgba(242,236,225,0.16);color:#8d7f70;font-family:'Piazzolla',serif;font-size:0.8rem;letter-spacing:0.06em;padding:13px 13px;border-radius:999px;cursor:pointer;transition:all .35s cubic-bezier(.16,1,.3,1)";
      const act = () => { this.setMomento(i); this.ciclarMomento(); };
      b.addEventListener('click', act);
      if (!this.coarse) b.addEventListener('mouseenter', act);
      marcas.appendChild(b);
      btns.push(b);
    });
    this.setMomento = i => {
      if (this.momento === i) return;
      this.momento = i;
      const m = MOMENTOS[i];
      imgs.forEach((im, n) => {
        im.style.opacity = n === i ? '1' : '0';
        im.style.transform = n === i ? 'scale(1.04)' : 'scale(1)';
      });
      if (reloj) reloj.textContent = m[0];
      if (tit) tit.textContent = m[1];
      if (txt) txt.textContent = m[2];
      if (pie) pie.textContent = (window.I18N ? window.I18N.t('servicioPiePrefix') : 'COCINA QUIVEN') + ' · ' + m[0] + ' · ' + m[1].toUpperCase();
      if (this.gFuego) this.gFuego.setIntensity(0.6 + i * 0.28);
      btns.forEach((b, n) => {
        const on = n === i;
        b.style.background = on ? '#c47b3e' : 'none';
        b.style.color = on ? '#0d0b0a' : '#8d7f70';
        b.style.borderColor = on ? '#e0a45f' : 'rgba(242,236,225,0.16)';
      });
    };
    this.ciclarMomento = () => {
      if (this.tMomento) clearInterval(this.tMomento);
      this.tMomento = setInterval(() => this.setMomento(((this.momento || 0) + 1) % MOMENTOS.length), 5200);
    };
    this.setMomento(0);
    this.ciclarMomento();
    this.pausarCicloFueraDeVista(marcas.closest('[data-cap]'), 'tMomento', this.ciclarMomento);
    this.refrescarPase = () => {
      const actual = this.momento;
      this.momento = null;
      this.setMomento(actual || 0);
    };

    // mismo lenguaje del plato y la historia: leve inclinación 3D con el mouse
    const tiltFrame = q('[data-role="servicio-tilt"]');
    const tiltSheen = q('[data-role="servicio-sheen"]');
    if (tiltFrame && !this.coarse && !this.reduced) {
      // el rect se mide una sola vez al entrar, no en cada pointermove: un
      // mouse normal dispara pointermove decenas de veces por segundo, y
      // leer getBoundingClientRect() ahí fuerza layout síncrono en cada uno
      // -- en desktops de gama baja eso se sentía como el sitio entero
      // trabado mientras se mueve el mouse sobre la zona. El elemento no
      // cambia de posición mientras el cursor sigue encima, así que una
      // sola medición alcanza.
      let tiltRect = null;
      tiltFrame.addEventListener('pointerenter', () => { tiltRect = tiltFrame.getBoundingClientRect(); });
      tiltFrame.addEventListener('pointermove', e => {
        if (!tiltRect) tiltRect = tiltFrame.getBoundingClientRect();
        const px = (e.clientX - tiltRect.left) / tiltRect.width;
        const py = (e.clientY - tiltRect.top) / tiltRect.height;
        tiltFrame.style.setProperty('--rx', ((0.5 - py) * 8) + 'deg');
        tiltFrame.style.setProperty('--ry', ((px - 0.5) * 8) + 'deg');
        tiltFrame.style.setProperty('--sc', '1.02');
        if (tiltSheen) { tiltSheen.style.setProperty('--sx', (px * 100) + '%'); tiltSheen.style.setProperty('--sy', (py * 100) + '%'); }
      });
      tiltFrame.addEventListener('pointerleave', () => {
        tiltRect = null;
        tiltFrame.style.setProperty('--rx', '0deg');
        tiltFrame.style.setProperty('--ry', '0deg');
        tiltFrame.style.setProperty('--sc', '1');
      });
      window.addEventListener('resize', () => { tiltRect = null; });
    }
  },

  /* ---------- 04 el plato en capas ---------- */
  menu() {
    const zona = q('[data-role="plato-zona"]');
    const lista = q('[data-role="paso-lista"]');
    if (!zona || !lista) return;
    const imgs = all('[data-plato-img]');
    const arco = q('[data-role="paso-arco"]');
    const num = q('[data-role="paso-num"]');
    const tit = q('[data-role="paso-titulo"]');
    const txt = q('[data-role="paso-texto"]');
    const cita = q('[data-role="paso-cita"]');
    const chips = q('[data-role="paso-chips"]');
    const ondas = q('[data-role="plato-ondas"]');
    const tilt = q('[data-role="plato-tilt"]');
    const sheen = q('[data-role="plato-sheen"]');
    const filas = [], filaTxtEls = [];
    const etapaTxt = i => i === 0 ? (window.I18N ? window.I18N.t('pasoApertura') : 'APERTURA')
      : (i === PASOS.length - 1 ? (window.I18N ? window.I18N.t('pasoCierre') : 'CIERRE') : (window.I18N ? window.I18N.t('pasoEnMesa') : 'EN MESA'));

    PASOS.forEach((p, i) => {
      const f = document.createElement('button');
      f.type = 'button';
      f.style.cssText = 'display:flex;align-items:baseline;justify-content:space-between;gap:14px;background:none;border:none;border-bottom:1px solid rgba(242,236,225,0.09);padding:11px 0;cursor:pointer;text-align:left;color:#8d7f70;font-family:inherit;font-weight:300;transition:color .35s ease,transform .35s cubic-bezier(.16,1,.3,1)';
      const a = document.createElement('span');
      a.style.cssText = "font-family:'Piazzolla',serif;font-size:0.92rem";
      a.textContent = '0' + (i + 1) + ' · ' + p.n;
      const b = document.createElement('span');
      b.style.cssText = 'font-size:0.78rem;letter-spacing:0.03em;font-variant-caps:small-caps';
      b.textContent = etapaTxt(i);
      f.appendChild(a); f.appendChild(b);
      f.addEventListener('click', () => { this.setPaso(i); this.ciclarPaso(); });
      lista.appendChild(f);
      filas.push(f);
      filaTxtEls.push({ a: a, b: b });
    });

    this.setPaso = i => {
      if (this.pasoActual === i) return;
      this.pasoActual = i;
      const p = PASOS[i];
      imgs.forEach((im, n) => im.classList.toggle('is-active', n === i));
      if (ondas && !this.reduced) {
        const s = document.createElement('span');
        s.style.cssText = 'position:absolute;inset:0;border:1px solid rgba(224,164,95,0.4);border-radius:50%;animation:qvOnda 2.2s ease-out forwards';
        ondas.appendChild(s);
        setTimeout(() => s.remove(), 2400);
      }
      if (arco) arco.style.strokeDashoffset = String(314 - 314 * ((i + 1) / PASOS.length));
      if (num) num.textContent = (window.I18N ? window.I18N.t('pasoNumPaso') : 'PASO') + ' 0' + (i + 1) + ' · ' + (window.I18N ? window.I18N.t('pasoNumDe') : 'DE') + ' 0' + PASOS.length;
      if (tit) tit.textContent = p.n;
      if (txt) txt.textContent = p.d;
      if (cita) cita.textContent = p.c;
      if (chips) {
        chips.textContent = '';
        p.ing.forEach(ing => {
          const c = document.createElement('span');
          c.style.cssText = 'font-size:0.6875rem;letter-spacing:0.12em;text-transform:uppercase;color:#cbbca9;border:1px solid rgba(242,236,225,0.16);padding:7px 11px;border-radius:999px';
          c.textContent = ing;
          chips.appendChild(c);
        });
        (p.dieta || []).forEach(nota => {
          const c = document.createElement('span');
          c.className = 'chip-dieta';
          c.innerHTML = iconoDieta(nota.k) + '<span>' + nota.t + '</span>';
          chips.appendChild(c);
        });
      }
      filas.forEach((f, n) => {
        f.style.color = n === i ? '#f2ece1' : '#8d7f70';
        f.style.transform = n === i ? 'translateX(10px)' : 'none';
        f.style.borderBottomColor = n === i ? 'rgba(224,164,95,0.5)' : 'rgba(242,236,225,0.09)';
      });
      // cita.textContent de arriba borró la marca de cierre del paso anterior --
      // puntual a esta cita, nunca la variante global (ver comentario en la
      // función: acá corre antes que historia(), tocar todas rompía Historia)
      if (cita) this.posicionarComillas(cita);
    };
    this.ciclarPaso = () => {
      if (this.tPaso) clearInterval(this.tPaso);
      this.tPaso = setInterval(() => this.setPaso(((this.pasoActual || 0) + 1) % PASOS.length), 7000);
    };

    // el plato responde al mouse con una leve inclinación 3D y un brillo que sigue al cursor
    if (tilt && !this.coarse && !this.reduced) {
      // rect cacheado al entrar, no releído en cada pointermove -- ver nota
      // igual en servicio-tilt (pase()): getBoundingClientRect() en cada
      // evento fuerza layout síncrono y en desktop de gama baja se traba.
      let platoRect = null;
      zona.addEventListener('pointerenter', () => { platoRect = zona.getBoundingClientRect(); });
      zona.addEventListener('pointermove', e => {
        if (!platoRect) platoRect = zona.getBoundingClientRect();
        const px = (e.clientX - platoRect.left) / platoRect.width;
        const py = (e.clientY - platoRect.top) / platoRect.height;
        const rx = (0.5 - py) * 14;
        const ry = (px - 0.5) * 14;
        tilt.style.transform = 'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) scale(1.03)';
        if (sheen) { sheen.style.setProperty('--sx', (px * 100) + '%'); sheen.style.setProperty('--sy', (py * 100) + '%'); }
      });
      zona.addEventListener('pointerleave', () => { platoRect = null; tilt.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'; });
      window.addEventListener('resize', () => { platoRect = null; });
    }
    this.platoMotas(q('[data-role="c-plato-motas"]'));

    let down = false, sx = 0;
    zona.addEventListener('pointerdown', e => { down = true; sx = e.clientX; });
    zona.addEventListener('pointermove', e => {
      if (!down) return;
      const d = e.clientX - sx;
      if (Math.abs(d) > 70) {
        down = false;
        this.setPaso(((this.pasoActual || 0) + (d < 0 ? 1 : -1) + PASOS.length) % PASOS.length);
        this.ciclarPaso();
      }
    });
    const end = () => { down = false; };
    zona.addEventListener('pointerup', end);
    zona.addEventListener('pointercancel', end);
    zona.addEventListener('pointerleave', end);
    if (!this.coarse) {
      zona.addEventListener('mouseenter', () => { if (this.tPaso) clearInterval(this.tPaso); });
      zona.addEventListener('mouseleave', () => this.ciclarPaso());
    }
    this.onKey = e => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const sec = zona.closest('[data-cap]');
      if (!sec) return;
      const y = window.scrollY;
      if (y < sec.offsetTop - window.innerHeight * 0.6 || y > sec.offsetTop + sec.offsetHeight) return;
      e.preventDefault();
      this.setPaso(((this.pasoActual || 0) + (e.key === 'ArrowRight' ? 1 : -1) + PASOS.length) % PASOS.length);
      this.ciclarPaso();
    };
    window.addEventListener('keydown', this.onKey);
    this.setPaso(0);
    this.ciclarPaso();
    this.pausarCicloFueraDeVista(zona.closest('[data-cap]'), 'tPaso', this.ciclarPaso);
    this.refrescarMenu = () => {
      PASOS.forEach((p, i) => {
        filaTxtEls[i].a.textContent = '0' + (i + 1) + ' · ' + p.n;
        filaTxtEls[i].b.textContent = etapaTxt(i);
      });
      const actual = this.pasoActual;
      this.pasoActual = null;
      this.setPaso(actual || 0);
    };
  },

  /* motas de luz cálida flotando sobre el plato — ambiente, no humo forzado */
  platoMotas(c) {
    if (!c || this.reduced) return;
    const g = c.getContext('2d');
    let W = 0, H = 0, motas = [];
    const dpr = Math.min(window.devicePixelRatio || 1, this.gamaBaja ? 1 : 1.5);
    const padre = c.parentElement;
    const armar = () => {
      W = Math.min(4000, padre.clientWidth); H = Math.min(4000, padre.clientHeight);
      c.width = Math.max(1, Math.round(W * dpr)); c.height = Math.max(1, Math.round(H * dpr));
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = this.gamaBaja ? 5 : (this.coarse ? 7 : 15);
      motas = [];
      for (let i = 0; i < n; i++) {
        motas.push({
          x: Math.random(), y: Math.random(),
          r: 0.6 + Math.random() * 1.5,
          v: 0.05 + Math.random() * 0.09,
          f: Math.random() * 6.28,
          a: 0.14 + Math.random() * 0.3
        });
      }
    };
    // el canvas del plato está bien abajo del fold: no hace falta medirlo,
    // llenarlo de partículas ni arrancar el loop de dibujo hasta que la
    // sección esté por entrar en pantalla
    let visible = false, iniciado = false;
    const pintar = t => {
      if (this.dead) return;
      requestAnimationFrame(pintar);
      if (!visible) return;
      g.clearRect(0, 0, W, H);
      motas.forEach(m => {
        m.y -= m.v * 0.0016;
        if (m.y < -0.06) { m.y = 1.06; m.x = Math.random(); }
        const wob = Math.sin(t / 1400 + m.f) * 0.012;
        const px = (m.x + wob) * W, py = m.y * H;
        const tw = 0.6 + Math.sin(t / 900 + m.f) * 0.4;
        g.globalAlpha = m.a * tw;
        g.fillStyle = '#e0a45f';
        g.beginPath();
        g.arc(px, py, m.r, 0, 6.2832);
        g.fill();
      });
      g.globalAlpha = 1;
    };
    const io = new IntersectionObserver(es => es.forEach(e => {
      visible = e.isIntersecting;
      if (visible && !iniciado) {
        iniciado = true;
        armar();
        const ro = new ResizeObserver(armar);
        ro.observe(padre);
        this.observadores.push(ro);
        requestAnimationFrame(pintar);
      }
    }), { threshold: 0.01, rootMargin: '400px 0px' });
    io.observe(c);
    this.observadores.push(io);
  },

  /* ---------- 05 historia: capítulos que se revelan con el scroll ---------- */
  splitPalabras(el) {
    const texto = el.textContent;
    el.textContent = '';
    texto.split(' ').forEach((palabra, i) => {
      const s = document.createElement('span');
      s.className = 'word';
      s.style.transitionDelay = (i * 0.045) + 's';
      s.textContent = palabra;
      el.appendChild(s);
      el.appendChild(document.createTextNode(' '));
    });
  },

  splitLetras(el) {
    const texto = el.textContent;
    el.textContent = '';
    let i = 0;
    const palabras = texto.split(' ');
    // las letras de una misma palabra van en un inline-block propio: el
    // navegador puede partir línea entre palabras (el espacio real que queda
    // afuera), pero nunca en medio de una -- si no, corta a mitad de palabra
    // en cualquier ancho donde el corte caiga justo entre dos letra-spans.
    palabras.forEach((palabra, wi) => {
      const w = document.createElement('span');
      w.style.cssText = 'display:inline-block;white-space:nowrap';
      palabra.split('').forEach(ch => {
        const s = document.createElement('span');
        s.className = 'letra';
        s.style.animationDelay = (i * 0.022) + 's';
        s.textContent = ch;
        w.appendChild(s);
        i++;
      });
      el.appendChild(w);
      if (wi < palabras.length - 1) el.appendChild(document.createTextNode(' '));
    });
  },

  historia() {
    all('[data-word-reveal]').forEach(el => this.splitPalabras(el));
    // letra a letra: variante distinta para no repetir siempre el mismo formato
    all('[data-letras]').forEach(el => this.splitLetras(el));
    this.refrescarHistoria = () => {
      all('[data-word-reveal]').forEach(el => this.splitPalabras(el));
      all('[data-letras]').forEach(el => this.splitLetras(el));
    };
    const objetivos = all('[data-reveal],[data-letras]');
    if (!objetivos.length) return;
    if (this.reduced) { objetivos.forEach(el => el.classList.add('is-in')); return; }
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('is-in');
    }), { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
    objetivos.forEach(el => io.observe(el));
    this.observadores.push(io);

    // mismo lenguaje del plato: leve inclinación 3D + brillo que sigue al cursor
    if (!this.coarse && !this.reduced) {
      all('.hist-photo').forEach(fig => {
        const sheen = fig.querySelector('.hist-sheen');
        // rect cacheado al entrar -- ver nota en pase()/menu(): releerlo en
        // cada pointermove fuerza layout síncrono y traba desktops de gama baja
        let figRect = null;
        fig.addEventListener('pointerenter', () => { figRect = fig.getBoundingClientRect(); });
        fig.addEventListener('pointermove', e => {
          if (!figRect) figRect = fig.getBoundingClientRect();
          const px = (e.clientX - figRect.left) / figRect.width;
          const py = (e.clientY - figRect.top) / figRect.height;
          fig.style.setProperty('--rx', ((0.5 - py) * 9) + 'deg');
          fig.style.setProperty('--ry', ((px - 0.5) * 9) + 'deg');
          if (sheen) { sheen.style.setProperty('--sx', (px * 100) + '%'); sheen.style.setProperty('--sy', (py * 100) + '%'); }
        });
        fig.addEventListener('pointerleave', () => {
          figRect = null;
          fig.style.setProperty('--rx', '0deg');
          fig.style.setProperty('--ry', '0deg');
        });
        window.addEventListener('resize', () => { figRect = null; });
      });
    }
  },

  /* ---------- 07 voces ---------- */
  voces() {
    const a = q('[data-role="marquee-a"]');
    const b = q('[data-role="marquee-b"]');
    if (!a || !b) return;
    const tarjeta = (c, i) => {
      const d = document.createElement('div');
      d.className = 'voces-card';
      // el inset shadow es el mismo lenguaje "envejecido" que .hist-photo::after
      // en La Historia -- oscurece apenas las esquinas de la tarjeta, para que
      // las citas de comensales se sientan tan de archivo como las fotos del chef
      d.style.cssText = 'flex:0 0 auto;width:min(78vw,400px);border:1px solid rgba(242,236,225,0.12);background:#0d0b0a;padding:24px 26px;border-radius:2px;display:flex;flex-direction:column;gap:14px;box-shadow:inset 0 0 28px 4px rgba(0,0,0,0.3);transition:border-color .4s ease,transform .5s cubic-bezier(.16,1,.3,1)';
      const sello = document.createElement('span');
      sello.style.cssText = "width:26px;height:26px;border-radius:50%;border:1px solid rgba(224,164,95,0.5);display:flex;align-items:center;justify-content:center;font-family:'Piazzolla',serif;font-size:0.6rem;color:#e0a45f;flex:0 0 auto";
      sello.textContent = String(i + 1);
      const p = document.createElement('p');
      p.className = 'qv-cita';
      p.style.cssText = "margin:0;font-family:'Piazzolla',serif;font-style:italic;font-size:clamp(0.94rem,2.6vw,1.14rem);line-height:1.5;color:#f2ece1";
      p.textContent = '«' + c[0] + '»';
      const s = document.createElement('span');
      s.style.cssText = 'font-size:0.6875rem;letter-spacing:0.14em;color:#8d7f70';
      s.textContent = c[1];
      d.appendChild(sello); d.appendChild(p); d.appendChild(s);
      if (!this.coarse) {
        d.addEventListener('mouseenter', () => { d.style.borderColor = 'rgba(224,164,95,0.6)'; d.style.transform = 'translateY(-6px)'; this.lento = true; });
        d.addEventListener('mouseleave', () => { d.style.borderColor = 'rgba(242,236,225,0.12)'; d.style.transform = 'none'; this.lento = false; });
      }
      return d;
    };
    const filaA = CITAS.slice(0, 3), filaB = CITAS.slice(3);
    [0, 1].forEach(() => {
      filaA.forEach((c, i) => a.appendChild(tarjeta(c, i)));
      filaB.forEach((c, i) => b.appendChild(tarjeta(c, i + 3)));
    });
    let xa = 0, xb = -b.scrollWidth / 2, visible = true;
    const io = new IntersectionObserver(es => es.forEach(e => { visible = e.isIntersecting; }), { threshold: 0.01 });
    io.observe(a.parentElement);
    this.observadores.push(io);
    const loop = () => {
      if (this.dead) return;
      requestAnimationFrame(loop);
      if (!visible) return;
      const v = this.lento ? 0.12 : 0.45;
      xa -= v; xb += v;
      const wa = a.scrollWidth / 2, wb = b.scrollWidth / 2;
      if (-xa >= wa) xa = 0;
      if (xb >= 0) xb = -wb;
      a.style.transform = 'translateX(' + xa + 'px)';
      b.style.transform = 'translateX(' + xb + 'px)';
    };
    if (!this.reduced) requestAnimationFrame(loop);
    this.refrescarVoces = () => {
      a.textContent = ''; b.textContent = '';
      const fa = CITAS.slice(0, 3), fb = CITAS.slice(3);
      [0, 1].forEach(() => {
        fa.forEach((c, i) => a.appendChild(tarjeta(c, i)));
        fb.forEach((c, i) => b.appendChild(tarjeta(c, i + 3)));
      });
      xa = 0; xb = -b.scrollWidth / 2;
    };
  },

  /* Territorio, Fuego y el Menú de Pasos se van rotando solos cada 5-7s
     (ciclarEje/ciclarMomento/ciclarPaso) para quien no interactúa -- pero
     esos setInterval() arrancaban una sola vez al cargar la página y
     seguían reescribiendo texto/estilos para siempre, aunque el visitante
     ya estuviera leyendo Historia o Voces a kilómetros de ahí. Se pausan
     apenas la sección sale de pantalla y se reanudan al volver, mismo
     lenguaje que ya usa lazyVideo() para los <video> de fondo. */
  pausarCicloFueraDeVista(el, propIntervalo, reanudar) {
    if (!el) return;
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { reanudar(); }
      else if (this[propIntervalo]) { clearInterval(this[propIntervalo]); this[propIntervalo] = null; }
    }), { threshold: 0.05 });
    io.observe(el);
    this.observadores.push(io);
  },

  /* video de platos cargado recién cuando la sección está por entrar en pantalla --
     está lejos en el scroll y no vale la pena bajarlo si nadie llega */
  /* un video de fondo no se baja ni se decodifica hasta que su sección está
     por entrar en pantalla -- antes "El Fuego" arrancaba a reproducir (y a
     bajar los 831KB enteros) apenas se cerraba el portal, sin importar si el
     usuario llegaba a scrollear hasta ahí */
  lazyVideo(role, src) {
    const v = q('[data-role="' + role + '"]');
    if (!v || this.datosLimitados || this.reduced) return;
    let cargado = false;
    // antes esto arrancaba el video una vez y desconectaba el observer --
    // el <video> quedaba decodificando en loop PARA SIEMPRE aunque el
    // usuario ya hubiera scrolleado lejos de la sección. Con 2-3 videos así
    // en la página (portal, fuego, experiencia) un desktop sin decode de
    // video por hardware terminaba con varios decodificando en simultáneo
    // sin que ninguno se viera -- esto era la causa real del lag en desktop
    // de gama baja. Ahora se pausa/reanuda según visibilidad, igual que ya
    // se hace con el canvas del fuego (setActive) y las motas del plato.
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) {
        if (!cargado) { v.src = src; cargado = true; }
        const pr = v.play();
        if (pr && pr.catch) pr.catch(() => {});
      } else if (cargado) {
        v.pause();
      }
    }), { rootMargin: '600px 0px' });
    io.observe(v);
    this.observadores.push(io);
  },

  experiencia() {
    this.lazyVideo('exp-video', 'assets/video/quiven-platos-loop.mp4');
    // el cierre del recorrido tiene que sentirse como un cierre, no como
    // un capítulo más: el fondo entra con un fundido lento y deliberado
    // (2.4s -- el resto del sitio funde entre .5s y 1s) la primera vez
    // que la sección aparece, en vez de saltar de golpe a su opacidad
    // final como hacía hasta ahora. El HTML ya trae opacity:0.22 fijo,
    // así que con reduced-motion (o sin JS) el video se ve igual que
    // siempre -- acá solo se pisa ese valor cuando SÍ hay animación.
    const v = q('[data-role="exp-video"]');
    if (v && !this.reduced) {
      v.style.opacity = '0';
      v.style.transition = 'opacity 2.4s ease';
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) { v.style.opacity = '0.22'; io.disconnect(); }
      }), { threshold: 0.15 });
      io.observe(v);
      this.observadores.push(io);
    }
  },

  /* ---------- galería de platos: capa aparte con scroll propio, no toca
     nada del recorrido principal. Cada foto se revela y se desvanece contra
     la siguiente a medida que se scrollea adentro del overlay. ---------- */
  galeria() {
    const overlay = q('[data-role="galeria"]');
    const scroller = q('[data-role="galeria-scroll"]');
    const track = q('[data-role="galeria-track"]');
    const btnAbrir = q('[data-role="galeria-abrir"]');
    const btnCerrar = q('[data-role="galeria-cerrar"]');
    const fondo = q('[data-role="galeria-fondo"]');
    const contador = q('[data-role="galeria-contador"]');
    const costura = q('[data-role="galeria-costura"]');
    const selloFijo = q('[data-role="galeria-sello-fijo"]');
    const entrada = q('[data-role="galeria-entrada"]');
    const entradaCostura = entrada ? entrada.querySelector('.galeria-entrada-costura') : null;
    const entradaCifra = q('[data-role="galeria-entrada-cifra"]');
    const entradaKicker = q('[data-role="galeria-entrada-kicker"]');
    const entradaFrase = q('[data-role="galeria-entrada-frase"]');
    // la cortina y la frase ya no viven adentro del overlay (display:none
    // hasta abrir la galería) -- son elementos aparte, siempre con layout
    // real desde que carga la página, así que las comillas se pueden
    // posicionar una sola vez acá con seguridad (getClientRects() ya no
    // devuelve vacío como cuando esto estaba anidado adentro del overlay).
    if (entradaFrase) this.posicionarComillas(entradaFrase);
    let primeraApertura = true;
    const sticky = overlay ? overlay.querySelector('.galeria-sticky') : null;
    if (!overlay || !scroller || !track || !btnAbrir) return;
    const items = all('[data-role="galeria-item"]');
    if (!items.length) return;
    const n = items.length;
    // el clip-path del wipe va sobre este marco (mismo tamaño que la foto),
    // no sobre .galeria-item (pantalla completa, con padding): si se recorta
    // el contenedor grande, el % del clip-path no corresponde 1:1 con la
    // altura real de la foto y la costura se desalinea del corte -- ver
    // nota más abajo, junto a pintarGaleria.
    const frames = items.map(it => it.querySelector('.galeria-item-frame'));
    const nombres = items.map(it => it.querySelector('.galeria-info'));
    const fotos = items.map(it => it.querySelector('.galeria-item-photo'));
    const numEls = items.map(it => it.querySelector('.galeria-num'));
    // "PLATO 07 · DE 14" -- mismo lenguaje que "PASO 01 · DE 05" en El Menú
    // de Pasos, para que la galería se lea como parte del mismo sistema de
    // numeración del sitio en vez de flotar sola. Se recalcula en el cambio
    // de idioma (PLATO/DISH) a través de refrescarGaleria.
    const pintarNumeros = () => {
      const palabra = window.I18N ? window.I18N.t('galeriaNumPlato') : 'PLATO';
      const de = window.I18N ? window.I18N.t('pasoNumDe') : 'DE';
      numEls.forEach((el, i) => {
        if (el) el.textContent = palabra + ' ' + String(i + 1).padStart(2, '0') + ' · ' + de + ' ' + String(n).padStart(2, '0');
      });
      if (entradaCifra) entradaCifra.textContent = String(n);
      if (entradaKicker) {
        const gal = window.I18N ? window.I18N.t('navGaleria') : 'Galería';
        const platos = window.I18N ? window.I18N.t('galeriaEntradaPlatos') : 'platos';
        entradaKicker.textContent = gal.toUpperCase() + ' · ' + n + ' ' + platos.toUpperCase();
      }
    };
    // en mobile, "justify-content:center" (probado primero, más simple)
    // dejaba el conjunto foto+texto pegado arriba en algunos navegadores
    // reales -- el alto de la foto se resuelve vía aspect-ratio + max-height,
    // y esa combinación con la distribución de espacio de flexbox no es
    // confiable en todos los motores. Acá se mide el alto real que ocupan
    // la foto y el texto de CADA plato (que varía según cuánto texto tenga)
    // y se reparte el sobrante a mano entre el padding de arriba y de abajo
    // -- no depende de que el navegador resuelva bien esa combinación.
    // el sello fijo (ver la nota junto a .galeria-sello-fijo en el CSS) es
    // UN SOLO elemento compartido por las 14 fotos, posicionado con la
    // misma matemática de layout que .galeria-item pero por su cuenta --
    // no mide nada, confía en que el padding de los dos coincida siempre.
    // Con el padding ahora distinto por plato (ver centrarMobile()), hay
    // que empujarle a mano el padding del plato activo en cada cambio.
    // declarado acá (antes de lo que solía ser su primer uso) porque
    // centrarMobile()/aplicarSelloFijo() ya lo necesitan en su primer
    // llamado, más abajo, antes de que abrir/pintarGaleria existan siquiera.
    let abierta = false, ultimoFoco = null, idxActual = -1, raf = null;
    let paddingsMobile = null;
    const aplicarSelloFijo = i => {
      if (!selloFijo) return;
      const p = paddingsMobile && paddingsMobile[i];
      selloFijo.style.paddingTop = p ? p.top + 'px' : '';
      selloFijo.style.paddingBottom = p ? p.bottom + 'px' : '';
    };
    const centrarMobile = () => {
      if (!this.chico) {
        items.forEach(it => { it.style.paddingTop = ''; it.style.paddingBottom = ''; });
        paddingsMobile = null;
        aplicarSelloFijo(0);
        return;
      }
      // se resetean los 14 ANTES de medir cualquiera -- si esto corre más
      // de una vez (resize, fuente que termina de cargar, cambio de
      // idioma) y se mide con el padding de la vuelta anterior todavía
      // puesto, "base" deja de ser el mínimo real de siempre y cada plato
      // termina en un lugar distinto según CUÁNDO se disparó su último
      // recálculo -- exactamente lo que se veía como fotos que no
      // coinciden ni en tamaño ni en posición entre sí.
      items.forEach(it => { it.style.paddingTop = ''; it.style.paddingBottom = ''; });
      const gapPx = parseFloat(getComputedStyle(items[0]).rowGap) || 18;
      const cs0 = getComputedStyle(items[0]);
      const baseTop = parseFloat(cs0.paddingTop) || 0;
      const baseBottom = parseFloat(cs0.paddingBottom) || 0;
      const altoCaja = items[0].clientHeight;
      const disponible = altoCaja - baseTop - baseBottom;
      const contenidos = items.map((it, i) => {
        const foto = fotos[i], info = nombres[i];
        return (foto && info) ? (foto.offsetHeight + gapPx + info.offsetHeight) : 0;
      });
      // el padding-top tiene que ser el MISMO número de píxeles en los 14
      // platos, sin excepción -- el wipe entre fotos (pintarGaleria(), acá
      // abajo) desliza el marco de una encima del otro asumiendo que las
      // dos empiezan exactamente en el mismo punto (ver la nota grande,
      // más abajo, sobre por qué el clip-path del wipe va sobre un marco
      // "del mismo tamaño que la foto"). Centrar cada plato por separado
      // según SU PROPIO texto (como se hacía antes) rompía esa igualdad:
      // en la transición entre dos platos con textos de distinto largo,
      // sus fotos arrancaban en alturas distintas y el wipe se veía como
      // dos recuadros superpuestos en vez de una cortina prolija. Se
      // calcula el margen a partir del plato con MÁS contenido (el que
      // menos espacio libre tiene) y se lo aplica a los 14 por igual --
      // en los platos con menos texto queda un resto abajo sin repartir,
      // pero eso no se nota ni se mueve; un desalineado en el wipe sí.
      const contenidoMax = Math.max.apply(null, contenidos);
      const libreMax = Math.max(0, disponible - contenidoMax);
      const topUniforme = baseTop + libreMax / 2;
      paddingsMobile = [];
      items.forEach((it, i) => {
        const bottom = Math.max(baseBottom, altoCaja - topUniforme - contenidos[i]);
        it.style.paddingTop = topUniforme + 'px';
        it.style.paddingBottom = bottom + 'px';
        paddingsMobile[i] = { top: topUniforme, bottom: bottom };
      });
      aplicarSelloFijo(idxActual >= 0 ? idxActual : 0);
    };
    pintarNumeros();
    // corre DESPUÉS de pintarNumeros(): "PLATO 01 · DE 14" es parte del
    // bloque que se mide (va dentro de .galeria-info) -- medirlo vacío
    // (antes de tener texto) da un alto de menos, y centra mal.
    centrarMobile();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(centrarMobile);
    let tCentrarGaleria, anchoCentrado = window.innerWidth;
    window.addEventListener('resize', () => {
      clearTimeout(tCentrarGaleria);
      tCentrarGaleria = setTimeout(() => {
        // en mobile, el navegador dispara "resize" todo el tiempo con solo
        // el ALTO cambiando -- la barra de direcciones que se esconde/asoma
        // al scrollear, no una rotación ni un cambio real de layout. Sin
        // este filtro, cada scroll normal por el sitio (ni siquiera adentro
        // de la galería) terminaba disparando un recálculo completo de los
        // 14 platos de la nada, con el riesgo de un parpadeo si coincide
        // con el momento justo de una transición. Solo importa el ancho.
        if (window.innerWidth === anchoCentrado) return;
        anchoCentrado = window.innerWidth;
        centrarMobile();
      }, 160);
    });
    this.refrescarGaleria = () => { pintarNumeros(); centrarMobile(); };
    // colores de fondo pre-parseados una sola vez, no en cada frame
    const colores = items.map(it => {
      const hex = (it.dataset.color || '#0d0b0a').replace('#', '');
      return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
    });

    // mismo lenguaje visual que el separador de capítulos de La Historia:
    // una costura fina + rombo, acá viajando por el borde de la cortina.
    // Se mide la foto que está entrando en CADA frame, no una vez sola:
    // en mobile la barra del navegador se esconde/aparece con el scroll y
    // eso cambia en vivo cuánto vale 68svh -- con una medida cacheada la
    // costura se iba desalineando del corte real a medida que se scrolleaba
    // más adentro de la galería, cada vez peor.
    //
    // además del cacheo, había un segundo bug (el de fondo): el clip-path
    // del wipe se aplicaba sobre .galeria-item, que ocupa TODA la pantalla
    // (100svh, con padding); la costura en cambio se calculaba con el alto
    // de la <img> (68svh). Como son cajas de referencia distintas, el % del
    // clip-path no correspondía con la posición de la costura -- coincidían
    // solo cerca de la mitad del recorrido por casualidad geométrica, y se
    // separaban hacia los extremos. Ahora el clip-path va sobre
    // .galeria-item-frame, que tiene el mismo tamaño exacto que la foto, así
    // "% de la caja recortada" y "% de la foto revelada" son la misma cosa.

    /* cada foto queda quieta la primera mitad de su tramo; en la segunda
       mitad una cortina sube desde abajo y recién ahí aparece la siguiente
       -- así se ve como el video de referencia: el fondo acompaña el scroll
       y la próxima foto se revela recién pasada la mitad de la actual. */
    const pintarGaleria = () => {
      raf = null;
      const alto = track.offsetHeight - scroller.clientHeight;
      const y = scroller.scrollTop;
      const p = clamp(y / Math.max(1, alto), 0, 1) * (n - 1);
      const i = clamp(Math.floor(p), 0, n - 1);
      const frac = p - i;
      const haySiguiente = i < n - 1;
      const wipe = haySiguiente ? clamp((frac - 0.5) / 0.5, 0, 1) : 0;
      const idx = wipe > 0.5 && haySiguiente ? i + 1 : i;

      // antes la foto que quedaba asentada como "idx" recibía scale(1.015)
      // apenas se asentaba -- como .galeria-item tenía transition:transform
      // 0.4s, eso se veía como que la foto arrancaba un poco más chica y
      // crecía en cada transición, dejando ver el marco/sombra de la capa
      // de atrás en el borde durante ese crecimiento. El sitio tampoco
      // tiene perspective en ningún ancestro de la galería, así que el
      // rotateX/rotateY que acompañaba al scale ya no se veía -- el único
      // efecto visible de todo el mecanismo era justamente ese "pop" de
      // tamaño. Se saca por completo: la foto ahora queda fija en tamaño
      // en todo momento, sin transform.
      items.forEach((it, n2) => {
        const fr = frames[n2];
        const nom = nombres[n2];
        if (n2 === i) {
          it.style.opacity = '1';
          if (fr) fr.style.clipPath = 'inset(0 0 0 0)';
          // el nombre acompaña la costura: se apaga a medida que la próxima
          // foto lo tapa, en vez de desaparecer de golpe
          if (nom) nom.style.opacity = String(1 - wipe);
          it.style.zIndex = '1';
          it.style.pointerEvents = idx === i ? 'auto' : 'none';
        } else if (haySiguiente && n2 === i + 1) {
          it.style.opacity = '1';
          // se revela de arriba hacia abajo, en el mismo sentido del scroll --
          // z-index explícito: el orden del DOM no alcanza para garantizar
          // que esta capa quede arriba de la que se está por tapar
          if (fr) fr.style.clipPath = 'inset(0 0 ' + ((1 - wipe) * 100) + '% 0)';
          // el nombre del plato que entra se revela con el mismo ritmo que
          // la foto, no de golpe: la costura "trae" ambas cosas juntas
          if (nom) nom.style.opacity = String(wipe);
          it.style.zIndex = '2';
          it.style.pointerEvents = idx === i + 1 ? 'auto' : 'none';
        } else {
          it.style.opacity = '0';
          if (nom) nom.style.opacity = '0';
          it.style.zIndex = '0';
          it.style.pointerEvents = 'none';
        }
      });

      // el corte de la costura, la foto y el color de fondo son UNA sola
      // transición: la costura no solo revela la foto, también revela el
      // color sólido de esa foto -- por eso el fondo no es un blend/gradiente
      // continuo entre los dos colores (eso se ve como un fundido lento,
      // no como un corte), sino un reparto duro en dos zonas sólidas que se
      // parte exactamente en la misma línea que la costura y el clip-path.
      const mostrarCostura = haySiguiente && wipe > 0 && wipe < 1;
      let cutFrame = null, cutRect = null;
      if ((mostrarCostura || (fondo && haySiguiente)) && sticky) {
        cutFrame = frames[i + 1];
        cutRect = cutFrame ? cutFrame.getBoundingClientRect() : null;
      }
      if (fondo) {
        const cA = 'rgb(' + colores[i].join(',') + ')';
        if (!haySiguiente || wipe <= 0) {
          fondo.style.background = cA;
        } else if (wipe >= 1) {
          fondo.style.background = 'rgb(' + colores[i + 1].join(',') + ')';
        } else if (cutRect) {
          const cB = 'rgb(' + colores[i + 1].join(',') + ')';
          const fRect = fondo.getBoundingClientRect();
          const cutY = cutRect.top + wipe * cutRect.height;
          const pct = clamp((cutY - fRect.top) / fRect.height * 100, 0, 100);
          fondo.style.background = 'linear-gradient(180deg,' + cB + ' ' + pct + '%,' + cB + ' ' + pct + '%,' + cA + ' ' + pct + '%,' + cA + ' 100%)';
        }
      }
      if (costura) {
        costura.style.opacity = mostrarCostura ? '1' : '0';
        if (mostrarCostura && sticky && cutRect) {
          // misma caja que usa el clip-path (.galeria-item-frame): "wipe *
          // altura de esta caja" da exactamente el borde del corte, sin
          // conversión entre cajas de referencia distintas.
          const s = sticky.getBoundingClientRect();
          // el ancho ahora es el de la pantalla completa (igual que el corte
          // de color de fondo), no el de la foto sola -- así ambos elementos
          // quedan leídos como un mismo sistema, de punta a punta.
          costura.style.top = (cutRect.top - s.top + wipe * cutRect.height) + 'px';
          costura.style.left = '0px';
          costura.style.width = s.width + 'px';
        }
      }
      if (idx !== idxActual) {
        idxActual = idx;
        // en mobile cada plato puede tener un padding-top/bottom distinto
        // (centrarMobile() lo ajusta según cuánto texto tenga ESE plato) --
        // el sello fijo, que comparte la misma matemática de layout pero en
        // un elemento aparte (ver la nota de arriba, junto a .galeria-sello-fijo
        // en el CSS), tiene que seguir ese mismo padding o queda desalineado
        // de la foto real apenas cambia el plato activo.
        aplicarSelloFijo(idx);
        if (contador) contador.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0');
        // el bloque de texto ya se desvanece con el wipe (arriba); esto suma
        // un gesto extra solo cuando el plato queda asentado como el actual:
        // número, nombre, zona y frase entran escalonados en vez de todos
        // juntos, vía transition-delay en CSS -- no hace falta más trabajo
        // por frame acá, un solo toggle de clase alcanza.
        nombres.forEach((el, i) => { if (el) el.classList.toggle('is-asentado', i === idx); });
        // Ken Burns lento solo en la foto que queda asentada como la actual
        // -- un solo toggle de clase, la animación (recortada por el
        // overflow:hidden de .galeria-item-frame) corre por CSS. No toca
        // tamaño ni posición de .galeria-item-photo, así que no puede
        // volver a desalinear las fotos ni el sello fijo.
        fotos.forEach((el, i) => { if (el) el.classList.toggle('is-asentado', i === idx); });
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(pintarGaleria); };

      // entrada de la galería: no un fundido de opacidad -- es uno de los
      // puntos fuertes del sitio, se merece su propia entrada. Reutiliza
      // el MISMO lenguaje visual que ya tiene el wipe entre fotos adentro
      // (costura dorada + rombo viajando por el borde). Cuatro versiones
      // anteriores de esto salieron mal, cada una por una razón distinta
      // (ver historial), pero la última seguía teniendo un problema de
      // fondo: la cortina vivía DENTRO del overlay de la galería, así que
      // lo que "se iba comiendo" al bajar era la PROPIA galería (ya
      // armada, con la foto 1 de fondo) -- no la página de Quiven en la
      // que el visitante estaba parado. Ahora la cortina es un elemento
      // aparte (ver el HTML), fixed y con más z-index que todo: arranca
      // en blanco/transparente (clip-path 0%) tapando nada, CRECE desde
      // arriba cubriendo cada vez más de lo que sea que esté en pantalla
      // -- la sección real de Quiven -- y solo cuando llega al 100% (todo
      // negro) se arma el overlay de la galería DETRÁS de esa cortina
      // (revelarGaleria) y recién ahí la cortina se retira, mostrando la
      // primera foto. La frase vive DENTRO de la franja negra que va
      // creciendo (su posición vertical es siempre la mitad de esa
      // franja), nunca pegada al borde ni afuera de él, así que se
      // forma sobre negro sólido, nunca sobre la página que todavía
      // asoma alrededor.
    // separado en dos pasos a propósito -- ver la nota larga más abajo,
    // junto a animarEntrada(), sobre por qué armar la galería recién al
    // final (como parecía obvio) terminaba constándole el doble de fps a
    // toda la Fase A.
    const prepararGaleria = () => {
      // arma la galería entera (layout real, las 14 fotos decodificando)
      // pero invisible -- overlay queda pintado y compuesto como una capa
      // más debajo de la cortina desde el arranque mismo, en vez de
      // aparecer recién al final. aria-hidden sigue en "true": aunque ya
      // esté en el DOM con layout, todavía no es lo que el visitante ve.
      overlay.style.opacity = '0';
      overlay.classList.add('is-open');
      // recién ACÁ el overlay deja de ser display:none -- centrarMobile()
      // ya había corrido una vez al cargar la página (más arriba), pero en
      // ese momento medía todo en cero (todavía oculto) y no hacía nada.
      // Sin este segundo llamado, el padding calculado quedaba pegado para
      // siempre en el mínimo de CSS, como si el cálculo nunca hubiera
      // corrido -- exactamente lo mismo que se veía ANTES de agregarlo.
      centrarMobile();
      scroller.scrollTop = 0;
      // "loading=lazy" no sirve acá: las 14 fotos están apiladas en el mismo
      // punto dentro de una capa que hasta ahora arrancaba display:none, así
      // que el navegador nunca las consideraba "cerca" del viewport hasta
      // scrollear mucho -- sin esto, la foto que entra en la cortina
      // todavía no cargó y no se ve nada hasta que por fin decide bajarla
      // sola. Se fuerza que bajen ya, apenas arranca la cortina.
      items.forEach(it => { const img = it.querySelector('img'); if (img) img.loading = 'eager'; });
      pintarGaleria();
    };
    const revelarGaleria = () => {
      // la galería ya está armada y pintada (prepararGaleria, más arriba) --
      // acá solo falta hacerla visible. Un cambio de opacidad es barato
      // (el compositor lo resuelve solo, sin volver a medir/pintar nada) y
      // encima queda oculto por la propia cortina, todavía opaca en este
      // instante exacto: no hay ningún salto visible en el cambio.
      overlay.style.opacity = '1';
      overlay.setAttribute('aria-hidden', 'false');
      this.bloquear(true);
      if (btnCerrar) btnCerrar.focus();
    };
    const animarEntrada = () => {
      if (!entrada || this.reduced) { prepararGaleria(); revelarGaleria(); return; }
      const conFrase = primeraApertura && !!entradaFrase;
      primeraApertura = false;
      // arma la galería (invisible) YA, no recién cuando la cortina llega al
      // 100% -- las 14 fotos arrancan a decodificar con toda la Fase A de
      // margen (~3s) en vez de los ~500ms que quedaban antes entre
      // "empieza a bajar la cortina" y "hace falta la foto 1 ya", y se saca
      // de encima el layout pesado de armar la galería (pintarGaleria(),
      // catorce imágenes) de encima del momento más delicado de la
      // animación (el instante de la revelación) para hacerlo temprano,
      // mientras la cortina recién está empezando a cubrir la pantalla.
      // OJO: esto NO achica el costo real de la Fase A -- ver medición
      // abajo -- mantener la página de Quiven visible de verdad debajo de
      // la cortina (el pedido explícito) sigue siendo más caro para el
      // navegador que la versión anterior, que tapaba la pantalla con el
      // fondo ya armado de la galería desde el arranque. Se probó promover
      // la cortina a su propia capa (will-change), pausar animaciones
      // ambientales (grano, logo, cursor) durante la entrada, cambiar
      // clip-path por transform, y content-visibility en las secciones --
      // ninguno achicó la diferencia medida (~28fps vs ~50fps con la
      // versión anterior, en las mismas condiciones). Ver conversación con
      // el usuario sobre el trade-off.
      prepararGaleria();
      entrada.style.transition = 'none';
      entrada.style.opacity = '1';
      entrada.style.clipPath = 'inset(0 0 100% 0)';
      if (entradaCostura) { entradaCostura.style.opacity = '1'; entradaCostura.style.top = '0%'; }
      if (entradaFrase) {
        entradaFrase.style.opacity = conFrase ? '1' : '0';
        entradaFrase.style.clipPath = 'inset(0 100% 0 0)';
        entradaFrase.style.top = '0%';
      }
      if (entradaKicker) { entradaKicker.style.opacity = '0'; entradaKicker.style.top = '0%'; }
      // fase A: la cortina crece de 0% a 100% (cubre la página actual por
      // completo). Con frase, todavía lenta para que dé tiempo a leerla
      // pero no tanto como antes (2400ms, era 3000): la Fase A es la parte
      // cara de la animación (ver la nota grande en prepararGaleria(), más
      // arriba) -- acortarla un poco reduce cuánto tiempo real paga ese
      // costo, sin resignar la lectura (la frase sigue terminando de
      // formarse bien temprano, a los 45% del recorrido). Sin frase, un
      // cover rápido (450ms). Fase B (fundido de salida, revela la
      // primera foto) al revés: más lenta que antes (900ms, era 550) para
      // que la desaparición se sienta más suave -- acá no hay costo extra
      // real: la galería ya está armada y quieta detrás, es solo un
      // cambio de opacidad, el más barato de toda la secuencia.
      const durA = conFrase ? 2400 : 450;
      const holdMs = conFrase ? 300 : 60;
      const durB = conFrase ? 900 : 280;
      const t0 = performance.now();
      const pasoA = (t) => {
        if (!abierta) return; // se cerró en el medio de la animación
        const p = Math.min(1, (t - t0) / durA);
        const borde = p * 100;
        entrada.style.clipPath = 'inset(0 0 ' + (100 - borde) + '% 0)';
        if (entradaCostura) entradaCostura.style.top = borde + '%';
        if (conFrase) {
          entradaFrase.style.top = (borde / 2) + '%';
          // la frase termina de formarse bien temprano en el recorrido
          // (borde 15% a 45%) -- para entonces ya hay franja negra de
          // sobra para contenerla, y le queda todo el resto del camino
          // para leerse tranquila antes de que aparezca la galería.
          const formado = Math.max(0, Math.min(1, (borde - 15) / 30));
          entradaFrase.style.clipPath = 'inset(0 ' + ((1 - formado) * 100) + '% 0 0)';
          // el kicker viaja pegado a la frase (mismo "top") y se revela con
          // el mismo avance -- un fundido simple, no otro clip-path propio:
          // dos revelados de izquierda a derecha uno arriba del otro se
          // hubiera visto como un tartamudeo, no como un mismo gesto.
          if (entradaKicker) { entradaKicker.style.top = (borde / 2) + '%'; entradaKicker.style.opacity = String(formado); }
        }
        if (p < 1) { requestAnimationFrame(pasoA); return; }
        setTimeout(faseB, holdMs);
      };
      const faseB = () => {
        if (!abierta) return;
        revelarGaleria();
        const t1 = performance.now();
        const pasoB = (t) => {
          if (!abierta) return;
          const p = Math.min(1, (t - t1) / durB);
          const op = String(1 - p);
          entrada.style.opacity = op;
          if (entradaCostura) entradaCostura.style.opacity = op;
          if (entradaFrase) entradaFrase.style.opacity = op;
          if (entradaKicker) entradaKicker.style.opacity = op;
          if (p < 1) { requestAnimationFrame(pasoB); return; }
          entrada.style.opacity = '0';
          if (entradaCostura) entradaCostura.style.opacity = '0';
          if (entradaFrase) entradaFrase.style.opacity = '0';
          if (entradaKicker) entradaKicker.style.opacity = '0';
        };
        requestAnimationFrame(pasoB);
      };
      requestAnimationFrame(pasoA);
    };
    const abrir = () => {
      if (abierta) return;
      abierta = true;
      ultimoFoco = document.activeElement;
      animarEntrada();
    };
    const cerrar = () => {
      if (!abierta) return;
      abierta = false;
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      // limpia el opacity inline que deja prepararGaleria() -- si no,
      // la próxima apertura arrancaría la galería en opacity:0 clavado
      // hasta que revelarGaleria() la vuelva a pisar, un instante blanco
      // (bah, negro) de más si algo tarda en llegar a esa línea.
      overlay.style.opacity = '';
      this.bloquear(false);
      if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
      // por si se cerró en medio de la animación de entrada (fase A o B
      // todavía corriendo): sus propios rAF cortan al ver "abierta" en
      // false, pero la cortina/frase pueden haber quedado a mitad de
      // opacidad -- las esconde ya mismo en vez de dejarlas colgadas.
      if (entrada) entrada.style.opacity = '0';
      if (entradaFrase) entradaFrase.style.opacity = '0';
      if (entradaKicker) entradaKicker.style.opacity = '0';
    };

    const irAIndice = destino => {
      const alto = track.offsetHeight - scroller.clientHeight;
      const paso = alto / (n - 1);
      scroller.scrollTo({ top: clamp(destino, 0, n - 1) * paso, behavior: this.reduced ? 'auto' : 'smooth' });
    };

    btnAbrir.addEventListener('click', abrir);
    if (btnCerrar) btnCerrar.addEventListener('click', cerrar);
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', e => {
      if (!abierta) return;
      if (e.key === 'Escape') { cerrar(); return; }
      // flechas: saltan al siguiente/anterior plato ya asentado (sin cortina a mitad de camino)
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); irAIndice((idxActual < 0 ? 0 : idxActual) + 1); }
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); irAIndice((idxActual < 0 ? 0 : idxActual) - 1); }
    });
    window.addEventListener('resize', () => { if (abierta) pintarGaleria(); });
  },

  toggleAudio() {
    const label = q('[data-role="audio-label"]');
    const bars = all('[data-role="audio-viz"] > span');
    if (App.ac) {
      try { App.ac.close(); } catch (e) {}
      App.ac = null;
      if (label) label.textContent = window.I18N ? window.I18N.t('navAudioOn') : 'EL LAGO';
      bars.forEach(b => { b.style.animation = 'none'; b.style.transform = 'scaleY(0.3)'; });
      return;
    }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ac = new AC();
    const len = ac.sampleRate * 4;
    const buf = ac.createBuffer(1, len, ac.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let n = 0; n < len; n++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      d[n] = last * 3.2;
    }
    const src = ac.createBufferSource();
    src.buffer = buf; src.loop = true;
    const filt = ac.createBiquadFilter();
    filt.type = 'lowpass'; filt.frequency.value = 520;
    const gain = ac.createGain();
    gain.gain.value = 0;
    gain.gain.linearRampToValueAtTime(0.12, ac.currentTime + 1.6);
    const lfo = ac.createOscillator();
    lfo.frequency.value = 0.13;
    const lg = ac.createGain();
    lg.gain.value = 0.05;
    lfo.connect(lg); lg.connect(gain.gain);
    src.connect(filt); filt.connect(gain); gain.connect(ac.destination);
    src.start(); lfo.start();
    App.ac = ac;
    if (label) label.textContent = window.I18N ? window.I18N.t('navAudioOff') : 'SILENCIO';
    bars.forEach((b, n) => { b.style.animation = 'qvPulso ' + (1.4 + n * 0.5) + 's ease-in-out infinite'; });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => App.componentDidMount());
} else {
  App.componentDidMount();
}
