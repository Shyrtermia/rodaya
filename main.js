document.documentElement.classList.add('js');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const fold = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const soles = (n) => `S/ ${Math.round(n).toLocaleString('es-PE')}`;

/* =========================================================
   Datos de demostración
   Fotos: Unsplash (unsplash.com/license) y Pexels (pexels.com/license)
   ========================================================= */
const unsplash = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;
const pexels = (id, w) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const ART = {
  camara: '<svg viewBox="0 0 160 110"><rect x="34" y="18" width="30" height="14" rx="3" fill="#1f2937"/><rect x="18" y="28" width="124" height="66" rx="10" fill="#1f2937"/><rect x="116" y="20" width="16" height="9" rx="2" fill="#f97316"/><circle cx="66" cy="61" r="25" fill="#111827"/><circle cx="66" cy="61" r="18" fill="#1d4ed8"/><circle cx="66" cy="61" r="9" fill="#0f172a"/></svg>',
  lente: '<svg viewBox="0 0 160 110"><rect x="18" y="40" width="16" height="30" rx="3" fill="#1f2937"/><rect x="32" y="34" width="92" height="42" rx="6" fill="#1f2937"/><rect x="100" y="34" width="5" height="42" fill="#f97316"/><ellipse cx="126" cy="55" rx="12" ry="25" fill="#111827"/><ellipse cx="128" cy="55" rx="7" ry="17" fill="#1d4ed8"/></svg>',
  luz: '<svg viewBox="0 0 160 110"><rect x="44" y="8" width="72" height="54" rx="5" fill="#1f2937"/><rect x="50" y="14" width="60" height="42" rx="3" fill="#fde68a"/><path d="M80 62v24M80 86l-22 14M80 86l22 14" stroke="#1f2937" stroke-width="4" stroke-linecap="round"/></svg>',
  microfono: '<svg viewBox="0 0 160 110"><rect x="20" y="40" width="112" height="18" rx="9" fill="#1f2937"/><rect x="128" y="44" width="16" height="10" rx="3" fill="#111827"/><rect x="74" y="58" width="10" height="22" rx="2" fill="#1f2937"/><rect x="56" y="80" width="46" height="9" rx="4" fill="#1f2937"/></svg>',
  gimbal: '<svg viewBox="0 0 160 110"><rect x="72" y="58" width="16" height="42" rx="7" fill="#1f2937"/><path d="M80 58V46h30V18H60" fill="none" stroke="#374151" stroke-width="7" stroke-linejoin="round"/><rect x="40" y="10" width="44" height="28" rx="4" fill="#111827"/><circle cx="52" cy="24" r="8" fill="#1d4ed8"/></svg>',
};

const EQUIPMENT = [
  {
    id: 'sony-alpha', name: 'Cámara Sony Alpha', category: 'camaras', categoryLabel: 'Cámaras', district: 'Breña',
    hour: 12, day: 70, value: 3000, rating: 4.8, rentals: 23, art: 'camara', available: true,
    photo: (w) => unsplash('1548680307-fc476201267d', w), alt: 'Cámara Sony negra con lente, vista de cerca',
    owner: 'Sebastián G.', career: 'Comunicación Audiovisual',
    desc: 'Cámara mirrorless con video 4K, ideal para cortometrajes, entrevistas y trabajos de fotografía.',
    includes: ['Cuerpo de cámara', 'Lente kit', '2 baterías y cargador', 'Tarjeta SD 128 GB'],
  },
  {
    id: 'lente-35', name: 'Lente fijo 35 mm f/1.8', category: 'lentes', categoryLabel: 'Lentes', district: 'Miraflores',
    hour: 6, day: 35, value: 1200, rating: 4.8, rentals: 15, art: 'lente', available: true,
    photo: (w) => unsplash('1698436084537-bdae156fe48a', w), alt: 'Lente de cámara sobre una superficie blanca',
    owner: 'Valeria R.', career: 'Diseño y Fotografía',
    desc: 'Lente luminoso para retratos, entrevistas y escenas con poca luz.',
    includes: ['Lente 35 mm f/1.8', 'Parasol', 'Tapas delantera y trasera', 'Funda acolchada'],
  },
  {
    id: 'kit-softbox', name: 'Kit de luces con softbox x2', category: 'iluminacion', categoryLabel: 'Iluminación', district: 'Comas',
    hour: 10, day: 60, value: 1500, rating: 4.9, rentals: 31, art: 'luz', available: false,
    photo: (w) => pexels('7383646', w), alt: 'Estudio con luces softbox sobre trípodes',
    owner: 'Diego M.', career: 'Cine y Televisión',
    desc: 'Dos luces continuas con softbox y temperatura de color regulable para rodajes en interiores.',
    includes: ['2 luces LED con softbox', '2 trípodes de luz', 'Cables y adaptadores', 'Bolso de transporte'],
  },
  {
    id: 'shotgun', name: 'Micrófono shotgun con pértiga', category: 'audio', categoryLabel: 'Audio', district: 'Surco',
    hour: 5, day: 30, value: 1000, rating: 4.8, rentals: 19, art: 'microfono', available: true,
    photo: (w) => unsplash('1720792248948-bbc27475c8db', w), alt: 'Micrófono shotgun montado en una pértiga al aire libre',
    owner: 'Camila T.', career: 'Periodismo',
    desc: 'Micrófono direccional con pértiga y antiviento para capturar diálogos limpios en exteriores.',
    includes: ['Micrófono shotgun', 'Pértiga extensible', 'Antiviento peludo', 'Cable XLR'],
  },
  {
    id: 'gimbal', name: 'Gimbal estabilizador 3 ejes', category: 'estabilizadores', categoryLabel: 'Estabilizadores', district: 'San Miguel',
    hour: 8, day: 45, value: 1800, rating: 4.7, rentals: 11, art: 'gimbal', available: true,
    photo: (w) => unsplash('1534961165765-5c9795af911b', w), alt: 'Persona sosteniendo una cámara sobre un gimbal',
    owner: 'Andrés P.', career: 'Comunicación Audiovisual',
    desc: 'Estabilizador de tres ejes para cámaras mirrorless; tomas fluidas en movimiento.',
    includes: ['Gimbal 3 ejes', 'Placa de montaje', 'Mini trípode', 'Cable de carga'],
  },
  {
    id: 'mic-mano', name: 'Micrófono inalámbrico de mano', category: 'audio', categoryLabel: 'Audio', district: 'Los Olivos',
    hour: 4, day: 25, value: 600, rating: 4.6, rentals: 8, art: 'microfono', available: true,
    photo: (w) => unsplash('1501162425895-5b153b706aec', w), alt: 'Micrófono inalámbrico sobre un pie en un escenario',
    owner: 'Lucía F.', career: 'Comunicación y Publicidad',
    desc: 'Micrófono inalámbrico para presentaciones, entrevistas en vivo y eventos universitarios.',
    includes: ['Micrófono de mano', 'Receptor', 'Pie de micrófono', '2 pilas recargables'],
  },
];

const TESTIMONIALS = [
  { quote: 'Conseguí luces para mi corto en semana de finales sin dejar una garantía imposible.', meta: 'Testimonio de ejemplo · estudiante de Comunicación Audiovisual', initials: 'CA' },
  { quote: 'Mi cámara pasaba guardada casi todo el ciclo. Ahora la alquilo con fotos de respaldo en cada entrega.', meta: 'Testimonio de ejemplo · estudiante propietario de equipos', initials: 'PE' },
  { quote: 'Alquilé un micrófono solo por cuatro horas para una entrevista y pagué solo ese tiempo.', meta: 'Testimonio de ejemplo · estudiante de Periodismo', initials: 'PR' },
];

/* =========================================================
   Utilidades: toast, almacenamiento
   ========================================================= */
const toastEl = $('#toast');
let toastTimer;
function toast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2600);
}

const store = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* sin almacenamiento */ }
  },
};

function withFallback(img) {
  img.addEventListener('error', () => img.closest('.photo')?.classList.add('no-photo'), { once: true });
}

/* =========================================================
   Cabecera: menú móvil, sombra, sección activa
   ========================================================= */
const header = $('#site-header');
const menuToggle = $('.menu-toggle');
const navPanel = $('#navigation');

function setMenuOpen(isOpen) {
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  $('use', menuToggle).setAttribute('href', isOpen ? '#i-close' : '#i-menu');
  navPanel.classList.toggle('is-open', isOpen);
}
menuToggle.addEventListener('click', () => setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true'));
navPanel.addEventListener('click', (event) => { if (event.target.closest('a, button')) setMenuOpen(false); });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

const toTop = $('#to-top');
function onScroll() {
  const y = window.scrollY;
  header.classList.toggle('is-scrolled', y > 8);
  toTop.classList.toggle('is-visible', y > 700);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
toTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  $('.brand').focus({ preventScroll: true });
});

const spyLinks = $$('[data-spy]');
const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    spyLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.spy === entry.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
spyLinks.forEach((link) => { const target = document.getElementById(link.dataset.spy); if (target) spyObserver.observe(target); });

/* =========================================================
   Animaciones al hacer scroll y contadores
   ========================================================= */
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
$$('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
  revealObserver.observe(el);
});

function countUp(el) {
  const target = Number(el.dataset.count);
  if (reduceMotion) { el.textContent = target; return; }
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / 1200, 1);
    el.textContent = Math.round(target * (1 - (1 - t) ** 3));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
$$('[data-count]').forEach((el) => { el.textContent = '0'; setTimeout(() => countUp(el), 400); });

/* =========================================================
   HU02 · Pestañas "Cómo funciona"
   ========================================================= */
const tabs = $$('[role="tab"]');
const indicator = $('.tab-indicator');

function moveIndicator(tab) {
  indicator.style.width = `${tab.offsetWidth}px`;
  indicator.style.transform = `translateX(${tab.offsetLeft}px)`;
}
function selectTab(tab) {
  tabs.forEach((t) => {
    const selected = t === tab;
    t.setAttribute('aria-selected', String(selected));
    t.tabIndex = selected ? 0 : -1;
    document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
  });
  moveIndicator(tab);
}
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    const next = tabs.at((i + (event.key === 'ArrowRight' ? 1 : -1)) % tabs.length);
    selectTab(next);
    next.focus();
  });
});
const syncIndicator = () => moveIndicator(tabs.find((t) => t.getAttribute('aria-selected') === 'true'));
window.addEventListener('resize', syncIndicator);
document.fonts?.ready.then(syncIndicator);
syncIndicator();

/* =========================================================
   HU08 · Catálogo: filtros, orden, búsqueda, favoritos
   ========================================================= */
const list = $('#equipment-list');
const statusLine = $('#filter-status');
const emptyState = $('#empty');
const chips = $$('[data-filter]');
const favorites = new Set(store.get('rodaya-favs', []));
const state = { category: 'all', text: '', sort: 'destacados', unit: 'day', date: '' };

function renderCards() {
  const text = fold(state.text.trim());
  let items = EQUIPMENT.filter((item) =>
    (state.category === 'all' || item.category === state.category) &&
    (!text || fold(`${item.name} ${item.categoryLabel} ${item.district} ${item.desc}`).includes(text)));

  if (state.sort === 'precio') items = [...items].sort((a, b) => a[state.unit] - b[state.unit]);
  if (state.sort === 'rating') items = [...items].sort((a, b) => b.rating - a.rating);

  list.innerHTML = items.map((item) => {
    const fav = favorites.has(item.id);
    const price = state.unit === 'day' ? `${soles(item.day)} <small>/día</small>` : `${soles(item.hour)} <small>/hora</small>`;
    return `
    <article class="equipment-card" data-category="${item.category}">
      <figure class="photo card-photo">
        <img src="${item.photo(640)}" alt="${item.alt}" loading="lazy" width="640" height="480">
        <div class="photo-fallback" aria-hidden="true">${ART[item.art]}</div>
      </figure>
      <span class="tag">${item.categoryLabel}</span>
      ${item.available ? '<span class="tag tag-available">● Disponible hoy</span>' : ''}
      <button class="fav" type="button" data-fav="${item.id}" aria-pressed="${fav}" aria-label="Guardar ${item.name} en favoritos">
        <svg class="icon" aria-hidden="true"><use href="#i-heart"/></svg>
      </button>
      <div class="card-body">
        <div class="card-head">
          <h3>${item.name}</h3>
          <span class="rating"><svg class="icon" aria-hidden="true"><use href="#i-star"/></svg>${item.rating.toFixed(1)}</span>
        </div>
        <p class="card-meta">${item.categoryLabel} · ${item.district} · ${item.rentals} alquileres</p>
        <span class="verified"><svg class="icon" aria-hidden="true"><use href="#i-shield"/></svg>DNI verificado</span>
        <div class="card-foot">
          <p class="card-price">${price}</p>
          <button class="button button-accent-outline card-detail" type="button" data-detail="${item.id}">Ver detalle</button>
        </div>
      </div>
    </article>`;
  }).join('');

  $$('img', list).forEach(withFallback);
  emptyState.hidden = items.length > 0;
  const count = items.length === 1 ? '1 equipo' : `${items.length} equipos`;
  const fecha = state.date ? ` para el ${new Date(`${state.date}T12:00`).toLocaleDateString('es-PE', { day: 'numeric', month: 'long' })}` : '';
  statusLine.textContent = `${count} disponibles${fecha}`;
  list.scrollLeft = 0;
}

function setCategory(category) {
  state.category = category;
  chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.filter === category)));
  renderCards();
}

chips.forEach((chip) => chip.addEventListener('click', () => setCategory(chip.dataset.filter)));
$('#sort').addEventListener('change', (event) => { state.sort = event.target.value; renderCards(); });
$$('[data-unit]').forEach((button) => button.addEventListener('click', () => {
  state.unit = button.dataset.unit;
  $$('[data-unit]').forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
  renderCards();
}));
$('#clear-filters').addEventListener('click', () => {
  state.text = '';
  state.date = '';
  $('#qs-texto').value = '';
  setCategory('all');
});

const favCount = $('#fav-count');
function updateFavCount(bump) {
  favCount.textContent = favorites.size;
  favCount.hidden = favorites.size === 0;
  $('#fav-link').setAttribute('aria-label', `Favoritos guardados: ${favorites.size}`);
  if (bump) { favCount.classList.remove('bump'); void favCount.offsetWidth; favCount.classList.add('bump'); }
}

list.addEventListener('click', (event) => {
  const favButton = event.target.closest('[data-fav]');
  if (favButton) {
    const { fav: id } = favButton.dataset;
    const item = EQUIPMENT.find((e) => e.id === id);
    const saved = !favorites.has(id);
    if (saved) favorites.add(id); else favorites.delete(id);
    favButton.setAttribute('aria-pressed', String(saved));
    store.set('rodaya-favs', [...favorites]);
    updateFavCount(true);
    toast(saved ? `Agregado a favoritos: ${item.name}` : `Retirado de favoritos: ${item.name}`);
    return;
  }
  const detail = event.target.closest('[data-detail]');
  if (detail) openDetail(detail.dataset.detail, detail);
});

/* Búsqueda rápida del hero */
$('#quick-search').addEventListener('submit', (event) => {
  event.preventDefault();
  state.text = $('#qs-texto').value;
  state.date = $('#qs-fecha').value;
  setCategory($('#qs-categoria').value);
  $('#equipos').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  $('#equipos').focus({ preventScroll: true });
});
const today = new Date();
$('#qs-fecha').min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

updateFavCount(false);
renderCards();

/* =========================================================
   Diálogos y simulador de reserva
   ========================================================= */
const detailDialog = $('#detalle');
const accessDialog = $('#acceso');
let lastTrigger = null;

function openDialog(dialog, trigger) {
  lastTrigger = trigger || null;
  if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
  document.body.classList.add('modal-open');
}
$$('dialog').forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    if (event.target.closest('a[data-close]')) lastTrigger = null;
    if (event.target === dialog || event.target.closest('[data-close]')) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    lastTrigger?.focus();
  });
});

const booking = { item: null, mode: 'day', qty: 2 };
const LIMITS = { hour: { min: 2, max: 12 }, day: { min: 1, max: 14 } };

function renderBooking() {
  const { item, mode, qty } = booking;
  const rate = item[mode];
  const unitLabel = mode === 'hour' ? (qty === 1 ? 'hora' : 'horas') : (qty === 1 ? 'día' : 'días');
  $('#qty').textContent = `${qty} ${unitLabel}`;
  $('#qty-minus').disabled = qty <= LIMITS[mode].min;
  $('#qty-plus').disabled = qty >= LIMITS[mode].max;
  const alquiler = rate * qty;
  const garantia = item.value * .2;
  $('#b-label').textContent = `Alquiler (${soles(rate)} × ${qty} ${unitLabel})`;
  $('#b-alquiler').textContent = soles(alquiler);
  $('#b-garantia').textContent = soles(garantia);
  $('#b-total').textContent = soles(alquiler + garantia);
  $$('#detalle [data-mode]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
}

function openDetail(id, trigger) {
  const item = EQUIPMENT.find((e) => e.id === id);
  if (!item) return;
  booking.item = item;
  booking.mode = 'day';
  booking.qty = 2;
  const photo = $('#d-photo');
  photo.classList.remove('no-photo');
  photo.innerHTML = `<img src="${item.photo(1000)}" alt="${item.alt}"><div class="photo-fallback" aria-hidden="true">${ART[item.art]}</div>`;
  withFallback($('img', photo));
  $('#d-cat').textContent = item.categoryLabel;
  $('#d-nombre').textContent = item.name;
  $('#d-meta').textContent = `${item.district} · ★ ${item.rating.toFixed(1)} (${item.rentals} alquileres) · ${soles(item.hour)}/h · ${soles(item.day)}/día`;
  $('#d-desc').textContent = item.desc;
  $('#d-incluye').innerHTML = item.includes.map((i) => `<li>${i}</li>`).join('');
  const initials = item.owner.split(' ').map((p) => p[0]).join('');
  $('#d-owner').innerHTML = `<span class="avatar" aria-hidden="true">${initials}</span><div><strong>${item.owner} · ${item.career}</strong><small>✓ DNI y carné verificados</small></div>`;
  renderBooking();
  openDialog(detailDialog, trigger);
}

$$('#detalle [data-mode]').forEach((button) => button.addEventListener('click', () => {
  booking.mode = button.dataset.mode;
  booking.qty = booking.mode === 'hour' ? 4 : 2;
  renderBooking();
}));
$('#qty-minus').addEventListener('click', () => { booking.qty = Math.max(LIMITS[booking.mode].min, booking.qty - 1); renderBooking(); });
$('#qty-plus').addEventListener('click', () => { booking.qty = Math.min(LIMITS[booking.mode].max, booking.qty + 1); renderBooking(); });

$$('[data-open-dialog="acceso"]').forEach((button) => button.addEventListener('click', () => {
  const crear = button.dataset.mode === 'crear';
  $('#a-titulo').textContent = crear ? 'Crear cuenta' : 'Ingresar';
  $('#a-texto').textContent = crear
    ? 'El registro con DNI y carné universitario estará disponible en la app móvil de Rodaya. Déjanos tus datos y te avisaremos cuando se lance.'
    : 'El inicio de sesión estará disponible en la app móvil de Rodaya. Déjanos tus datos y te avisaremos cuando se lance.';
  openDialog(accessDialog, button);
}));

/* =========================================================
   HU03 · Calculadora de ganancias
   ========================================================= */
const calcForm = $('#calc-form');
const calcError = $('#calc-error');
const diasInput = $('#calc-dias');
const diasRange = $('#calc-dias-range');
const diasOut = $('#dias-out');
const COMMISSION = .10;

function paintRange() {
  diasRange.style.setProperty('--fill', `${((diasRange.value - 1) / 30) * 100}%`);
  diasOut.textContent = diasRange.value;
}

function compute({ validate = false } = {}) {
  const tarifaInput = calcForm.tarifa;
  const tarifa = Number(tarifaInput.value);
  const dias = Number(diasInput.value);
  [tarifaInput, diasInput].forEach((i) => i.removeAttribute('aria-invalid'));
  let message = '';
  if (tarifaInput.value.trim() === '' || tarifa <= 0) {
    message = 'Ingresa una tarifa por día mayor a cero';
    tarifaInput.setAttribute('aria-invalid', 'true');
  } else if (diasInput.value.trim() === '') {
    message = 'Ingresa los días de alquiler al mes';
    diasInput.setAttribute('aria-invalid', 'true');
  } else if (!Number.isInteger(dias) || dias < 1 || dias > 31) {
    message = 'Los días de alquiler deben estar entre 1 y 31';
    diasInput.setAttribute('aria-invalid', 'true');
  }
  if (validate || !message) calcError.textContent = message;
  if (message) return;
  const bruto = tarifa * dias;
  const comision = bruto * COMMISSION;
  const values = { '#r-bruto': bruto, '#r-comision': comision, '#r-neto': bruto - comision, '#r-ciclo': (bruto - comision) * 4 };
  Object.entries(values).forEach(([selector, value]) => {
    const el = $(selector);
    const text = soles(value);
    if (el.textContent !== text) {
      el.textContent = text;
      el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
    }
  });
}

calcForm.addEventListener('submit', (event) => { event.preventDefault(); compute({ validate: true }); });
calcForm.tipo.addEventListener('change', () => {
  calcForm.tarifa.value = calcForm.tipo.selectedOptions[0].dataset.rate;
  compute();
});
calcForm.tarifa.addEventListener('input', () => compute());
diasRange.addEventListener('input', () => { diasInput.value = diasRange.value; paintRange(); compute(); });
diasInput.addEventListener('input', () => {
  const v = Number(diasInput.value);
  if (v >= 1 && v <= 31) { diasRange.value = v; paintRange(); }
  compute();
});
paintRange();

/* =========================================================
   HU04 · Tarifas y garantía
   ========================================================= */
$$('#btn-ejemplo, #btn-garantia').forEach((button) => button.addEventListener('click', () => {
  const open = button.getAttribute('aria-expanded') !== 'true';
  button.setAttribute('aria-expanded', String(open));
  document.getElementById(button.getAttribute('aria-controls')).hidden = !open;
  if (button.id === 'btn-ejemplo') button.textContent = open ? 'Ocultar ejemplo' : 'Ver ejemplo';
}));

/* =========================================================
   HU07 · Testimonios con reproducción automática
   ========================================================= */
let current = 0;
let autoplay;
const quoteCard = $('.quote-card');
const dots = $('#t-dots');
dots.innerHTML = TESTIMONIALS.map((_, i) => `<button type="button" aria-label="Testimonio ${i + 1}"></button>`).join('');
const dotButtons = $$('button', dots);

function showTestimonial(index, animate = true) {
  current = (index + TESTIMONIALS.length) % TESTIMONIALS.length;
  const t = TESTIMONIALS.at(current);
  $('#t-quote').textContent = t.quote;
  $('#t-meta').textContent = t.meta;
  $('#t-avatar').textContent = t.initials;
  $('#t-count').textContent = `${current + 1} / ${TESTIMONIALS.length}`;
  dotButtons.forEach((d, i) => d.setAttribute('aria-current', String(i === current)));
  if (animate && !reduceMotion) { quoteCard.classList.remove('swap'); void quoteCard.offsetWidth; quoteCard.classList.add('swap'); }
}
function startAutoplay() {
  if (reduceMotion) return;
  stopAutoplay();
  autoplay = setInterval(() => showTestimonial(current + 1), 6000);
}
function stopAutoplay() { clearInterval(autoplay); }

$('#t-prev').addEventListener('click', () => { showTestimonial(current - 1); startAutoplay(); });
$('#t-next').addEventListener('click', () => { showTestimonial(current + 1); startAutoplay(); });
dotButtons.forEach((d, i) => d.addEventListener('click', () => { showTestimonial(i); startAutoplay(); }));
const carousel = $('.carousel');
carousel.addEventListener('mouseenter', stopAutoplay);
carousel.addEventListener('mouseleave', startAutoplay);
carousel.addEventListener('focusin', stopAutoplay);
carousel.addEventListener('focusout', startAutoplay);
showTestimonial(0, false);
startAutoplay();

/* =========================================================
   HU05 · Preguntas frecuentes: una abierta a la vez
   ========================================================= */
const faqItems = $$('.faq details');
faqItems.forEach((item) => item.addEventListener('toggle', () => {
  if (!item.open) return;
  faqItems.forEach((other) => { if (other !== item) other.open = false; });
}));

/* =========================================================
   HU06 · Formulario de contacto
   ========================================================= */
const contactForm = $('#contact-form');
const success = $('#contact-success');
const submit = $('#contact-submit');
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const mensaje = contactForm.mensaje;

mensaje.addEventListener('input', () => { $('#c-counter').textContent = `${mensaje.value.length}/400`; });

function setError(input, message) {
  const error = document.getElementById(input.getAttribute('aria-describedby'));
  error.textContent = message;
  if (message) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
  return !message;
}
const rules = {
  nombre: (v) => (v.trim() ? '' : 'Ingresa tu nombre completo'),
  correo: (v) => (EMAIL.test(v.trim()) ? '' : 'Ingresa un correo válido'),
  mensaje: (v) => (v.trim() ? '' : 'Escribe tu consulta'),
};
// Al escribir se limpia el error del campo corregido (sin mover el botón al hacer clic).
Object.keys(rules).forEach((name) => contactForm[name].addEventListener('input', () => {
  if (contactForm[name].getAttribute('aria-invalid') === 'true') setError(contactForm[name], rules[name](contactForm[name].value));
}));

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  success.textContent = '';
  const valid = Object.keys(rules).map((name) => setError(contactForm[name], rules[name](contactForm[name].value)));
  if (valid.includes(false)) {
    $('[aria-invalid="true"]', contactForm).focus();
    return;
  }
  submit.classList.add('is-loading');
  submit.textContent = 'Enviando…';
  setTimeout(() => {
    submit.classList.remove('is-loading');
    submit.textContent = 'Enviar';
    contactForm.reset();
    $('#c-counter').textContent = '0/400';
    success.textContent = '✓ Recibimos tu consulta, te responderemos en 24 h.';
    toast('Consulta enviada');
  }, reduceMotion ? 0 : 700);
});
