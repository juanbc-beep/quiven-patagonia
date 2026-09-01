/* ---------- efectos de canvas 2D, sin dependencias externas ---------- */
window.Q3D = (function () {
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  // partículas prerenderizadas: un createRadialGradient() nuevo por partícula,
  // por frame (150 brasas + 9 humos, 60 veces por segundo) es carísimo en
  // Canvas2D. Se prepara una vez una paleta chica de sprites (círculo con
  // gradiente ya "horneado") y cada frame sólo se hace drawImage() escalado
  // -- mismo resultado visual, sin asignar un gradiente nuevo por partícula.
  let _sprites = null;
  function spritesFuego() {
    if (_sprites) return _sprites;
    const SIZE = 64, R = SIZE / 2;
    const hornear = (r, g_, b) => {
      const cv = document.createElement('canvas');
      cv.width = SIZE; cv.height = SIZE;
      const gg = cv.getContext('2d');
      const grad = gg.createRadialGradient(R, R, 0, R, R, R);
      grad.addColorStop(0, 'rgba(' + r + ',' + g_ + ',' + b + ',1)');
      grad.addColorStop(1, 'rgba(' + r + ',' + g_ + ',' + b + ',0)');
      gg.fillStyle = grad;
      gg.beginPath(); gg.arc(R, R, R, 0, 6.2832); gg.fill();
      return cv;
    };
    const PASOS = 16;
    const brasas = [];
    for (let i = 0; i < PASOS; i++) {
      const t = i / (PASOS - 1);
      brasas.push(hornear(Math.round(lerp(255, 199, t)), Math.round(lerp(219, 72, t)), Math.round(lerp(133, 18, t))));
    }
    _sprites = { brasas, PASOS, humo: hornear(230, 224, 214) };
    return _sprites;
  }

  /* ---------- fuego y brasas: partículas reales sobre canvas 2D ---------- */
  function fuego(canvas, densidad, dprMax) {
    const g = canvas.getContext('2d');
    const dens = densidad == null ? 1 : densidad;
    let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, dprMax || 1.5);
    // se lee siempre del contenedor, nunca del propio canvas -- observar el
    // canvas y fijar su tamaño desde su propia medida es un bucle de
    // retroalimentación (crece sin límite en ciertos reflows de mobile/resize)
    const padre = canvas.parentElement;
    const armar = () => {
      W = Math.min(4000, padre.clientWidth) || 1;
      H = Math.min(4000, padre.clientHeight) || 1;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(armar);
    ro.observe(padre);
    armar();

    // brasas ambiente por toda la sección, no una columna de llama al centro:
    // nacen de punta a punta y suben lento -- pocas y chicas, el video de
    // fondo tiene que verse, esto es apenas un polvo de chispas encima
    const N = Math.max(45, Math.round(150 * dens));
    const NH = Math.max(3, Math.round(9 * dens));
    const parts = [];
    const humos = [];

    const resetParticula = p => {
      p.x = 0.03 + Math.random() * 0.94;
      p.y = 1.04 + Math.random() * 0.14;
      p.vx = (Math.random() - 0.5) * 0.035;
      p.vy = -(0.055 + Math.random() * 0.13);
      p.vida = 0;
      p.velRitmo = 0.08 + Math.random() * 0.13;
      p.r = 0.003 + Math.random() * 0.009;
      p.fase = Math.random() * 6.28;
    };
    for (let i = 0; i < N; i++) {
      const p = {};
      resetParticula(p);
      p.vida = Math.random();
      p.y = 1.04 - p.vida * 1.25; // ya distribuidas en toda la altura al cargar, no solo abajo
      parts.push(p);
    }

    const resetHumo = h => {
      h.x = 0.5 + (Math.random() - 0.5) * 0.9;
      h.y = 1.1 + Math.random() * 0.3;
      h.v = 0.035 + Math.random() * 0.055;
      h.r = 0.24 + Math.random() * 0.36;
      h.rot = Math.random() * 6.28;
      h.vr = (Math.random() - 0.5) * 0.1;
    };
    for (let i = 0; i < NH; i++) { const h = {}; resetHumo(h); h.y = Math.random() * 0.9; humos.push(h); }

    let inten = 1, iv = 1, activo = true, muerto = false, last = performance.now();
    const { brasas: spritesBrasa, PASOS, humo: spriteHumo } = spritesFuego();

    const loop = now => {
      if (muerto) return;
      requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!activo) return;
      iv = lerp(iv, inten, 1 - Math.pow(0.01, dt * 60));
      g.clearRect(0, 0, W, H);

      // humo: manchas suaves ascendentes, muy tenues
      g.save();
      humos.forEach(h => {
        h.y -= h.v * dt * iv * 0.5;
        h.rot += h.vr * dt;
        if (h.y < -0.35) resetHumo(h);
        const cx = h.x * W, cy = h.y * H, rad = h.r * Math.max(W, H) * 0.55;
        const op = clamp(0.1 * iv * (1 - h.y), 0, 0.11);
        if (op <= 0.002) return;
        g.globalAlpha = op;
        g.drawImage(spriteHumo, cx - rad, cy - rad, rad * 2, rad * 2);
      });
      g.restore();

      // brasas: partículas aditivas, de amarillo pálido a rojo profundo
      g.save();
      g.globalCompositeOperation = 'lighter';
      parts.forEach(p => {
        p.vida += dt * p.velRitmo * iv;
        if (p.vida >= 1) { resetParticula(p); return; }
        p.x += (p.vx + Math.sin(now / 900 + p.fase) * 0.01) * dt * iv;
        p.y += p.vy * dt * iv;
        const cx = p.x * W, cy = p.y * H;
        if (cy < -0.05 * H) return;
        const rad = Math.max(0.5, p.r * Math.max(W, H) * (1 - p.vida * 0.4));
        const alfa = Math.pow(1 - p.vida, 1.6) * 0.7;
        const sprite = spritesBrasa[Math.min(PASOS - 1, Math.floor(p.vida * PASOS))];
        g.globalAlpha = alfa;
        g.drawImage(sprite, cx - rad, cy - rad, rad * 2, rad * 2);
      });
      g.restore();
    };
    requestAnimationFrame(loop);

    return {
      setIntensity(v) { inten = clamp(v, 0.05, 2); },
      setActive(v) { activo = !!v; },
      dispose() { muerto = true; ro.disconnect(); }
    };
  }

  return { fuego };
})();
