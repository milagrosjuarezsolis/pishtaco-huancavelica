/* =========================================================
   LÓGICA: El Pishtaco de Huancavelica
   Usa los datos de datos.js (PIEZAS, PERSONAJES, LUGARES, ESCENAS).
   ========================================================= */

const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Barra: sólida al bajar + menú de celular ---------- */
const barra = document.getElementById("barra");
const hamburguesa = document.getElementById("hamburguesa");

hamburguesa.addEventListener("click", () => {
  const abierto = barra.classList.toggle("abierta");
  hamburguesa.setAttribute("aria-expanded", abierto);
  hamburguesa.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
});
document.querySelectorAll(".menu a").forEach((a) =>
  a.addEventListener("click", () => {
    barra.classList.remove("abierta");
    hamburguesa.setAttribute("aria-expanded", "false");
  })
);

/* ---------- Un solo listener de scroll: barra + parallax ---------- */
const fondoPortada = document.querySelector(".portada .fondo");
let pendiente = false;
function alHacerScroll() {
  const y = window.scrollY;
  barra.classList.toggle("solida", y > 40 || barra.classList.contains("abierta"));
  // Parallax mínimo: solo escritorio y sin "reducir movimiento"
  if (fondoPortada && !reducirMovimiento && window.innerWidth > 900 && y < window.innerHeight * 1.2) {
    fondoPortada.style.transform = "translate3d(0," + (y * 0.08).toFixed(1) + "px,0)";
  }
  pendiente = false;
}
window.addEventListener("scroll", () => {
  if (!pendiente) { pendiente = true; requestAnimationFrame(alHacerScroll); }
}, { passive: true });
alHacerScroll();

/* ---------- Enlace activo del menú según la sección visible ---------- */
const enlacesMenu = document.querySelectorAll(".menu a");
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((e) => {
    if (e.isIntersecting) {
      enlacesMenu.forEach((a) => a.classList.toggle("activo", a.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach((s) => observador.observe(s));

/* ---------- Piezas transmedia ---------- */
function imagenHTML(img, cargaDiferida) {
  return '<img src="' + img.src + '" alt="' + img.alt + '" width="' + img.w + '" height="' + img.h + '"' +
    (cargaDiferida ? ' loading="lazy"' : "") + ">";
}
function visualPieza(p) {
  if (p.tipo === "instagram") {
    return '<div class="visual visual-instagram">' +
      p.imagenes.map((i) => '<div class="lamina">' + imagenHTML(i, true) + "</div>").join("") + "</div>";
  }
  if (p.tipo === "comic") {
    return '<div class="visual visual-comic">' +
      p.imagenes.map((i) => '<div class="lamina">' + imagenHTML(i, true) + "</div>").join("") + "</div>";
  }
  if (p.tipo === "lamina") {
    return '<div class="visual"><div class="lamina" style="--giro:1.5deg">' + imagenHTML(p.imagenes[0], true) + "</div></div>";
  }
  return '<div class="visual visual-ancha">' + imagenHTML(p.imagenes[0], true) + "</div>";
}
const contPiezas = document.getElementById("lista-piezas");
PIEZAS.forEach((p) => {
  const art = document.createElement("article");
  art.className = "pieza";
  art.innerHTML =
    visualPieza(p) +
    '<div class="texto">' +
      '<div class="numero" aria-hidden="true">' + p.numero + "</div>" +
      '<div class="medio">' + p.medio + "</div>" +
      "<h3>" + p.titulo + "</h3>" +
      "<p>" + p.texto + "</p>" +
      '<dl class="ficha-uso"><dt>Acción</dt><dd>' + p.accion + "</dd><dt>Motivación</dt><dd>" + p.motivacion + "</dd></dl>" +
      '<p class="puente">' + p.puente + "</p>" +
      (p.enlace ? '<a class="boton chico" href="' + p.enlace.url + '" target="_blank" rel="noopener">' + p.enlace.texto + " ↗</a>" : "") +
    "</div>";
  contPiezas.appendChild(art);
});

/* ---------- Avance (puntos del mapa vistos + escenas resueltas) ---------- */
const vistos = new Set();
let escenaActual = 0;
const totalPasos = LUGARES.length + ESCENAS.length;
function actualizarAvance() {
  const etiqueta = document.getElementById("avance-menu");
  if (!etiqueta) return;
  const hechos = vistos.size + Math.min(escenaActual, ESCENAS.length);
  etiqueta.textContent = "Avance " + Math.round((hechos / totalPasos) * 100) + "%";
}

/* ---------- Mapa ---------- */
const cajaMapa = document.getElementById("mapa-caja");
const listaLugares = document.getElementById("lista-lugares");
const ficha = document.getElementById("ficha");
LUGARES.forEach((lugar) => {
  // Punto sobre el mapa
  const boton = document.createElement("button");
  boton.className = "punto";
  boton.style.left = lugar.x + "%";
  boton.style.top = lugar.y + "%";
  boton.setAttribute("aria-label", lugar.titulo);
  boton.tabIndex = -1; // con teclado se usa la lista de abajo
  boton.innerHTML = '<span class="nombre-punto">' + lugar.titulo + "</span>";
  cajaMapa.appendChild(boton);
  // Mismo lugar en la lista (más fácil de tocar en celular y con teclado)
  const item = document.createElement("button");
  item.className = "lugar-btn";
  item.textContent = lugar.titulo;
  listaLugares.appendChild(item);
  const abrir = () => abrirFicha(lugar, boton, item);
  boton.addEventListener("click", abrir);
  item.addEventListener("click", abrir);
});
function abrirFicha(lugar, boton, item) {
  document.querySelectorAll(".punto.activo, .lugar-btn.activo").forEach((p) => p.classList.remove("activo"));
  boton.classList.add("activo", "visto");
  item.classList.add("activo", "visto");
  item.setAttribute("aria-pressed", "true");
  vistos.add(lugar.id);
  actualizarAvance();
  ficha.innerHTML =
    '<span class="etiqueta">' + lugar.tipo + "</span>" +
    "<h3>" + lugar.titulo + "</h3>" +
    (lugar.img ? '<img src="' + lugar.img + '" alt="">' : "") +
    "<p>" + lugar.texto + "</p>" +
    '<p style="font-size:0.85rem;color:#6d5844">Lugares vistos: ' + vistos.size + " de " + LUGARES.length + "</p>";
  if (window.innerWidth <= 900) ficha.scrollIntoView({ behavior: reducirMovimiento ? "auto" : "smooth", block: "nearest" });
}

/* ---------- Selector de personajes (pestañas) ---------- */
/* Pestañas reutilizables (personajes y galería): clic, flechas, Inicio y Fin */
function crearPestanas(contenedor, panel, elementos, opciones) {
  const botones = elementos.map((el, i) => {
    const b = document.createElement("button");
    b.className = opciones.clase;
    b.id = opciones.prefijo + "-" + el.id;
    b.setAttribute("role", "tab");
    b.setAttribute("aria-controls", panel.id);
    b.innerHTML = opciones.contenido(el);
    b.addEventListener("click", () => elegir(i, false));
    b.addEventListener("keydown", (e) => {
      let destino = null;
      if (e.key === "ArrowRight") destino = (i + 1) % elementos.length;
      if (e.key === "ArrowLeft") destino = (i - 1 + elementos.length) % elementos.length;
      if (e.key === "Home") destino = 0;
      if (e.key === "End") destino = elementos.length - 1;
      if (destino !== null) { e.preventDefault(); elegir(destino, true); }
    });
    contenedor.appendChild(b);
    return b;
  });
  function elegir(i, enfocar) {
    botones.forEach((b, j) => {
      b.setAttribute("aria-selected", j === i);
      b.tabIndex = j === i ? 0 : -1;
    });
    if (enfocar) {
      botones[i].focus();
      botones[i].scrollIntoView({ behavior: reducirMovimiento ? "auto" : "smooth", block: "nearest", inline: "center" });
    }
    panel.setAttribute("aria-labelledby", botones[i].id);
    opciones.alElegir(elementos[i], i);
  }
  elegir(0, false);
}

/* ---------- Selector de personajes ---------- */
const expediente = document.getElementById("expediente");
crearPestanas(document.getElementById("selector"), expediente, PERSONAJES, {
  clase: "retrato",
  prefijo: "pestana",
  contenido: (p) =>
    '<span class="marco"><img src="' + (p.cara || p.img) + '" alt="" loading="lazy"></span>' +
    '<span class="nombre">' + p.nombre + "</span>",
  alElegir: mostrarPersonaje
});

function mostrarPersonaje(p, i) {
  const datos = Object.entries(p.datos).map(([k, v]) => "<div><dt>" + k + "</dt><dd>" + v + "</dd></div>").join("");
  expediente.innerHTML =
    '<div class="figura' + (p.cubrir ? " cubrir" : "") + '"><img src="' + p.img + '" alt="' + p.nombre + ', ' + p.rol + '"></div>' +
    '<div class="dossier">' +
      '<div class="folio">Expediente ' + String(i + 1).padStart(2, "0") + " / " + String(PERSONAJES.length).padStart(2, "0") + "</div>" +
      '<span class="etiqueta">' + p.rol + "</span>" +
      "<h3>" + p.nombre + "</h3>" +
      '<p class="frase">' + p.texto + "</p>" +
      '<dl class="datos">' + datos + "</dl>" +
    "</div>";
  expediente.classList.remove("entrando");
  void expediente.offsetWidth;
  expediente.classList.add("entrando");
}

/* ---------- Galería con visor ---------- */
const rejilla = document.getElementById("rejilla");
const visor = document.getElementById("visor");
const visorImg = document.getElementById("visor-img");
const visorPie = document.getElementById("visor-pie");
let abridor = null;

crearPestanas(document.getElementById("pestanas-galeria"), rejilla, GALERIA, {
  clase: "pestana-galeria",
  prefijo: "carpeta",
  contenido: (c) => c.nombre + ' <span class="cuenta">' + c.imagenes.length + "</span>",
  alElegir: (c) => {
    rejilla.innerHTML = "";
    c.imagenes.slice(0, 6).forEach((im) => {
      const b = document.createElement("button");
      b.className = "miniatura";
      b.innerHTML = '<img src="' + im.mini + '" alt="" loading="lazy"><span>' + im.pie + "</span>";
      b.setAttribute("aria-label", "Ver en grande: " + im.pie);
      b.addEventListener("click", () => abrirVisor(im, b));
      rejilla.appendChild(b);
    });
  }
});

function abrirVisor(im, boton) {
  abridor = boton;
  visorImg.src = im.grande;       // la imagen grande se carga solo ahora
  visorImg.width = im.w;
  visorImg.height = im.h;
  visorImg.alt = im.pie;
  visorImg.hidden = false;
  visorPie.textContent = im.pie;
  if (typeof visor.showModal === "function") visor.showModal();
  else window.open(im.grande, "_blank");
}
document.getElementById("visor-cerrar").addEventListener("click", () => visor.close());
visor.addEventListener("click", (e) => { if (e.target === visor) visor.close(); }); // toque en el fondo
visor.addEventListener("close", () => {
  visorImg.removeAttribute("src");
  visorImg.hidden = true;
  if (abridor) abridor.focus();
});

/* ---------- Simulación: reconstruye el caso ---------- */
const cajaEscena = document.getElementById("escena");
const mano = document.getElementById("mano");
const tablero = document.getElementById("tablero");
const barraProgreso = document.getElementById("barra-progreso");
const progresoTexto = document.getElementById("progreso-texto");
const cartasJuego = PERSONAJES.filter((p) => !p.soloTarjeta);
const TABLERO_VACIO = '<li class="vacio">Todavía no hay pistas.</li>';
let errores = 0;

function barajar(lista) {
  const copia = lista.slice();
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}
function repartir() {
  mano.innerHTML = "";
  barajar(cartasJuego).forEach((p) => {
    const carta = document.createElement("button");
    carta.className = "carta";
    carta.dataset.id = p.id;
    carta.innerHTML = '<img src="' + p.cara + '" alt=""><span>' + p.nombre + "</span>";
    carta.addEventListener("click", () => jugar(p.id, carta));
    mano.appendChild(carta);
  });
}
function mostrarEscena() {
  barraProgreso.style.width = (escenaActual / ESCENAS.length) * 100 + "%";
  if (escenaActual >= ESCENAS.length) return mostrarFinal();
  const e = ESCENAS[escenaActual];
  progresoTexto.textContent = "Escena " + (escenaActual + 1) + " de " + ESCENAS.length;
  cajaEscena.innerHTML =
    '<div class="lugar">' + e.lugar + "</div><h3>" + e.titulo + "</h3>" +
    '<p class="pregunta">' + e.pregunta + "</p>" +
    '<div class="respuesta" id="respuesta" aria-live="polite"></div>';
}
function jugar(id, carta) {
  const e = ESCENAS[escenaActual];
  if (!e) return;
  const respuesta = document.getElementById("respuesta");
  if (id === e.correcta) {
    carta.disabled = true;
    respuesta.className = "respuesta bien";
    respuesta.innerHTML = "<strong>✓ ¡Correcto!</strong> " + e.revela;
    if (escenaActual === 0) tablero.innerHTML = "";
    const li = document.createElement("li");
    li.innerHTML = "<strong>" + e.titulo + ":</strong> " + e.revela;
    tablero.appendChild(li);
    escenaActual++;
    actualizarAvance();
    mano.querySelectorAll(".carta").forEach((c) => (c.style.pointerEvents = "none"));
    setTimeout(() => {
      mano.querySelectorAll(".carta").forEach((c) => (c.style.pointerEvents = ""));
      mostrarEscena();
    }, 2200);
  } else {
    errores++;
    carta.classList.remove("temblor");
    void carta.offsetWidth;
    carta.classList.add("temblor");
    respuesta.className = "respuesta mal";
    respuesta.innerHTML = "<strong>✗ No es esa carta.</strong> Pista: " + e.pista;
  }
}
function mostrarFinal() {
  progresoTexto.textContent = "Caso reconstruido · " + errores + (errores === 1 ? " error" : " errores");
  cajaEscena.innerHTML =
    '<div class="final"><div class="lugar">Días después · Final abierto</div><h3>¿Se acabó?</h3>' +
    "<p>Gabriel encontró el sombrero negro del Pishtaco junto a una nota: <em>«La muerte no fue el final.»</em> Entonces escuchó tres golpes entre la neblina.</p>" +
    '<div class="toc">Toc. Toc. Toc.</div><button class="boton" id="reiniciar">Jugar otra vez ↻</button></div>';
  document.getElementById("reiniciar").addEventListener("click", reiniciar);
}
function reiniciar() {
  escenaActual = 0;
  errores = 0;
  tablero.innerHTML = TABLERO_VACIO;
  repartir();
  mostrarEscena();
  actualizarAvance();
}

repartir();
mostrarEscena();
actualizarAvance();

/* ---------- Toc. Toc. Toc.: golpes con sonido (Web Audio, sin archivos) ---------- */
let audio = null, salidaAudio = null;
function prepararAudio() {
  if (audio) return;
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  audio = new Ctx();
  salidaAudio = audio.createGain();
  salidaAudio.gain.value = 0.7;
  salidaAudio.connect(audio.destination);
  // eco de cueva
  const eco = audio.createDelay(); eco.delayTime.value = 0.21;
  const retorno = audio.createGain(); retorno.gain.value = 0.32;
  const filtroEco = audio.createBiquadFilter(); filtroEco.type = "lowpass"; filtroEco.frequency.value = 1200;
  salidaAudio.connect(eco); eco.connect(filtroEco); filtroEco.connect(retorno); retorno.connect(eco); retorno.connect(audio.destination);
}
function sonarGolpe(t) {
  // golpe grave en madera
  const osc = audio.createOscillator(), g = audio.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(150, t);
  osc.frequency.exponentialRampToValueAtTime(48, t + 0.2);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(1, t + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.38);
  osc.connect(g); g.connect(salidaAudio); osc.start(t); osc.stop(t + 0.42);
  // chasquido de la puerta
  const largo = Math.floor(audio.sampleRate * 0.09), buffer = audio.createBuffer(1, largo, audio.sampleRate), datos = buffer.getChannelData(0);
  for (let i = 0; i < largo; i++) datos[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / largo, 4);
  const ruido = audio.createBufferSource(); ruido.buffer = buffer;
  const filtro = audio.createBiquadFilter(); filtro.type = "bandpass"; filtro.frequency.value = 700; filtro.Q.value = 1.4;
  const g2 = audio.createGain(); g2.gain.value = 0.8;
  ruido.connect(filtro); filtro.connect(g2); g2.connect(salidaAudio); ruido.start(t);
}
const destello = document.createElement("div");
destello.className = "destello"; destello.setAttribute("aria-hidden", "true");
document.body.appendChild(destello);
const bloqueGolpes = document.querySelector(".golpes");
const palabrasToc = document.querySelectorAll(".toc-grande span");
function reiniciarClase(el, clase) { el.classList.remove(clase); void el.offsetWidth; el.classList.add(clase); }
function tocarPuerta() {
  prepararAudio();
  if (audio && audio.state === "suspended") audio.resume();
  const inicio = audio ? audio.currentTime + 0.05 : 0;
  palabrasToc.forEach((palabra, i) => {
    if (audio) sonarGolpe(inicio + i * 0.62);
    setTimeout(() => {
      reiniciarClase(palabra, "golpeando");
      reiniciarClase(bloqueGolpes, "temblando");
      reiniciarClase(destello, "activo");
    }, 50 + i * 620);
  });
}
document.getElementById("tocar").addEventListener("click", tocarPuerta);
document.querySelector(".toc-grande").addEventListener("click", tocarPuerta);

/* ---------- Brasas que suben en la portada ---------- */
const lienzo = document.querySelector(".brasas");
if (lienzo && !reducirMovimiento && lienzo.getContext) {
  const ctx = lienzo.getContext("2d");
  let ancho = 0, alto = 0, visible = true, corriendo = false;
  const brasas = [];
  function medir() {
    const r = lienzo.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    ancho = r.width; alto = r.height;
    lienzo.width = ancho * dpr; lienzo.height = alto * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function nuevaBrasa(alInicio) {
    return { x: ancho * (0.3 + Math.random() * 0.7), y: alInicio ? Math.random() * alto : alto + 10,
      r: 0.6 + Math.random() * 1.9, v: 0.25 + Math.random() * 0.75, fase: Math.random() * 6.3, brillo: 0.4 + Math.random() * 0.6 };
  }
  medir();
  for (let i = 0; i < (window.innerWidth < 600 ? 22 : 46); i++) brasas.push(nuevaBrasa(true));
  window.addEventListener("resize", medir);
  function dibujar() {
    if (!visible) { corriendo = false; return; }
    ctx.clearRect(0, 0, ancho, alto);
    brasas.forEach((b) => {
      b.y -= b.v; b.fase += 0.025; b.x += Math.sin(b.fase) * 0.35;
      const a = Math.max(0, Math.min(1, b.y / alto)) * b.brillo;
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255," + (70 + Math.round(b.r * 35)) + ",45," + a.toFixed(2) + ")";
      ctx.shadowColor = "rgba(255,50,20,0.9)"; ctx.shadowBlur = 10;
      ctx.fill();
      if (b.y < -10) Object.assign(b, nuevaBrasa(false));
    });
    requestAnimationFrame(dibujar);
  }
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !corriendo) { corriendo = true; requestAnimationFrame(dibujar); }
  }).observe(lienzo);
}

/* ---------- Inclinación 3D al pasar el ratón (solo con ratón) ---------- */
const INCLINABLES = ".lamina, .miniatura, .escena-oscura, .figura";
if (!reducirMovimiento && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  document.documentElement.classList.add("con-3d");
  let actual = null;
  const soltar = () => {
    if (!actual) return;
    actual.classList.remove("inclinando");
    actual.style.setProperty("--rx", "0deg"); actual.style.setProperty("--ry", "0deg");
    actual = null;
  };
  document.addEventListener("pointermove", (e) => {
    const el = e.target.closest ? e.target.closest(INCLINABLES) : null;
    if (el !== actual) soltar();
    if (!el) return;
    actual = el;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
    el.classList.add("inclinando");
    el.style.setProperty("--ry", ((px - 0.5) * 12).toFixed(2) + "deg");
    el.style.setProperty("--rx", ((0.5 - py) * 10).toFixed(2) + "deg");
    el.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
    el.style.setProperty("--my", (py * 100).toFixed(1) + "%");
  });
  document.addEventListener("pointerleave", soltar);

  /* Linterna en el banner: la luz sigue al ratón */
  const banner = document.querySelector(".banner-cine"), fondoBanner = document.querySelector(".fondo-banner");
  if (banner && fondoBanner) {
    banner.classList.add("con-linterna");
    banner.addEventListener("pointermove", (e) => {
      const r = fondoBanner.getBoundingClientRect();
      fondoBanner.style.setProperty("--lx", (e.clientX - r.left) + "px");
      fondoBanner.style.setProperty("--ly", (e.clientY - r.top) + "px");
    });
  }
}

/* ---------- Aparición suave al bajar (una sola vez por bloque) ---------- */
if (!reducirMovimiento && "IntersectionObserver" in window) {
  document.querySelectorAll(
    "main section:not(.portada) .etiqueta:not(.revelar), main .titulo-seccion:not(.revelar), main .intro, .mapa-grid, .selector, .expediente, .sim-escena, .sim-mano, .panel, .pieza, .recorrido, .banner-cine .contenedor, .pestanas-galeria, .rejilla, .acordeon"
  ).forEach((el) => el.classList.add("revelar"));
  document.documentElement.classList.add("js-revelar");
  const aparecer = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("visible"); aparecer.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  document.querySelectorAll(".revelar").forEach((el) => aparecer.observe(el));
}
