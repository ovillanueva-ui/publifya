// Publifya — lógica de la interfaz (solo front, datos de ejemplo en memoria)

const $ = (id) => document.getElementById(id);
const escapeHTML = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const formatDate = (s) => (s ? new Date(s + "T12:00:00").toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" }) : "Sin definir");
const clienteById = (id) => CLIENTES.find((c) => c.id === id);
const redById = (id) => REDES.find((r) => r.id === id);

let state = {
  clienteId: "all",
  filtro: "Todos",
  filtroRed: "all",
  filtroTipo: "all",
  vista: "table",
  modulo: "Biblioteca de contenido",
  seleccionadoId: CONTENIDOS[0]?.id ?? null,
  editId: null,
  calendarDate: new Date(2026, 9, 1),
};
const checked = new Set();

/* ---------------- Helpers de contenido visual ---------------- */

function pillHTML(estado) {
  return `<span class="status-pill status-${estado.replaceAll(" ", "-")}"><span class="status-dot"></span>${escapeHTML(estado)}</span>`;
}

function networkBadgeHTML(redId) {
  const red = redById(redId);
  if (!red) return "";
  return `<span class="network-badge"><span class="network-dot" style="background:${red.color}"><i data-lucide="${red.icono}"></i></span>${escapeHTML(red.nombre)}</span>`;
}

function clientTagHTML(clienteId) {
  const c = clienteById(clienteId);
  if (!c) return "";
  return `<span class="client-tag"><span class="client-dot" style="background:${c.color}">${escapeHTML(c.iniciales)}</span>${escapeHTML(c.nombre)}</span>`;
}

/* ---------------- Construcción de selects dinámicos ---------------- */

function fillSelect(select, options, { withAll = false, allLabel = "Todos" } = {}) {
  select.innerHTML = (withAll ? [`<option value="all">${allLabel}</option>`] : []).concat(options.map((o) => `<option value="${o.value}">${escapeHTML(o.label)}</option>`)).join("");
}

function initSelects() {
  fillSelect($("filter-red"), REDES.map((r) => ({ value: r.id, label: r.nombre })), { withAll: true, allLabel: "Todas las redes" });
  fillSelect($("filter-tipo"), TIPOS.map((t) => ({ value: t, label: t })), { withAll: true, allLabel: "Todos los tipos" });

  fillSelect($("content-cliente"), CLIENTES.map((c) => ({ value: c.id, label: c.nombre })));
  fillSelect($("content-tipo"), TIPOS.map((t) => ({ value: t, label: t })));
  fillSelect($("content-estado"), ESTADOS.map((e) => ({ value: e, label: e })));
  fillSelect($("content-red"), REDES.map((r) => ({ value: r.id, label: r.nombre })));
  fillSelect($("content-owner"), EQUIPO.map((p) => ({ value: p, label: p })));
}

function buildClientMenu() {
  const items = [
    `<button type="button" data-client="all">${state.clienteId === "all" ? "✓ " : ""}Todos los clientes</button>`,
    ...CLIENTES.map((c) => `<button type="button" data-client="${c.id}">${state.clienteId === c.id ? "✓ " : ""}${escapeHTML(c.nombre)}</button>`),
  ];
  $("client-menu").innerHTML = items.join("");
  $("client-menu").querySelectorAll("button").forEach((b) =>
    b.addEventListener("click", () => {
      state.clienteId = b.dataset.client;
      if (!CONTENIDOS.some((x) => x.id === state.seleccionadoId && itemMatchesClient(x))) {
        state.seleccionadoId = filtered()[0]?.id ?? null;
      }
      closePopups();
      updateClientButton();
      buildClientMenu();
      renderAll();
    })
  );
}

function updateClientButton() {
  if (state.clienteId === "all") {
    $("client-dot-current").className = "client-dot all";
    $("client-dot-current").textContent = "PF";
    $("client-name-current").textContent = "Todos los clientes";
    $("client-sub-current").textContent = `${CLIENTES.length} cuentas activas`;
  } else {
    const c = clienteById(state.clienteId);
    $("client-dot-current").className = "client-dot";
    $("client-dot-current").style.background = c.color;
    $("client-dot-current").textContent = c.iniciales;
    $("client-name-current").textContent = c.nombre;
    $("client-sub-current").textContent = c.sector;
  }
}

function itemMatchesClient(x) {
  return state.clienteId === "all" || x.clienteId === state.clienteId;
}

/* ---------------- Filtrado y orden ---------------- */

function filtered() {
  const q = $("global-search").value.trim().toLowerCase();
  return CONTENIDOS.filter((x) => {
    if (!itemMatchesClient(x)) return false;
    if (state.filtro !== "Todos" && x.estado !== state.filtro) return false;
    if (state.filtroRed !== "all" && x.red !== state.filtroRed) return false;
    if (state.filtroTipo !== "all" && x.tipo !== state.filtroTipo) return false;
    if (q) {
      const cliente = clienteById(x.clienteId)?.nombre ?? "";
      const haystack = [x.titulo, x.descripcion, x.tipo, cliente, x.propietario].join(" ").toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  }).sort((a, b) => {
    const sort = $("sort-select").value;
    if (sort === "titulo") return a.titulo.localeCompare(b.titulo);
    if (sort === "antiguo") return a.actualizado.localeCompare(b.actualizado);
    return b.actualizado.localeCompare(a.actualizado);
  });
}

/* ---------------- Render principal ---------------- */

function renderAll() {
  renderLibrary();
  renderOverview();
  renderClientsModule();
  lucide.createIcons();
}

function renderLibrary() {
  const list = filtered();
  $("result-count").textContent = `${list.length} ${list.length === 1 ? "elemento" : "elementos"}`;
  $("total-badge").textContent = CONTENIDOS.filter(itemMatchesClient).length;
  $("empty-state").hidden = list.length !== 0;
  $("table-view").hidden = state.vista !== "table";
  $("grid-view").hidden = state.vista !== "grid";
  $("calendar-view").hidden = state.vista !== "calendar";

  $("table-body").innerHTML = list
    .map(
      (x) => `<tr data-id="${x.id}" class="${x.id === state.seleccionadoId ? "selected" : ""}" tabindex="0" aria-selected="${x.id === state.seleccionadoId}">
        <td><input class="row-check" type="checkbox" aria-label="Seleccionar ${escapeHTML(x.titulo)}" ${checked.has(x.id) ? "checked" : ""}></td>
        <td><div style="display:flex;align-items:center;gap:12px"><span class="doc-icon"><i data-lucide="file-text"></i></span><span style="min-width:0"><span class="row-title">${escapeHTML(x.titulo)}</span><span class="row-sub">${escapeHTML(x.descripcion.slice(0, 48))}${x.descripcion.length > 48 ? "…" : ""}</span></span></div></td>
        <td>${clientTagHTML(x.clienteId)}</td>
        <td>${pillHTML(x.estado)}</td>
        <td>${escapeHTML(x.tipo)}</td>
        <td>${networkBadgeHTML(x.red)}</td>
        <td>${formatDate(x.actualizado)}</td>
        <td><span style="display:inline-flex;align-items:center;gap:8px"><span class="avatar" style="width:24px;height:24px;font-size:9px">${x.propietario.split(" ").map((p) => p[0]).join("")}</span>${escapeHTML(x.propietario)}</span></td>
        <td><div style="position:relative"><button type="button" class="row-menu-button icon-button" aria-label="Acciones para ${escapeHTML(x.titulo)}" aria-expanded="false"><i data-lucide="ellipsis"></i></button>
          <div class="row-menu popup hidden">
            <button type="button" data-action="preview">Vista previa</button>
            <button type="button" data-action="edit">Editar</button>
            <button type="button" data-action="delete">Eliminar</button>
            <button type="button" data-action="confirm" class="hidden danger-text">Confirmar eliminación</button>
            <button type="button" data-action="cancel" class="hidden">Cancelar</button>
          </div></div></td>
      </tr>`
    )
    .join("");

  $("grid-view").innerHTML = list
    .map(
      (x) => `<button type="button" data-id="${x.id}" class="grid-card ${x.id === state.seleccionadoId ? "selected" : ""}">
        <div class="grid-card-top">${clientTagHTML(x.clienteId)}${pillHTML(x.estado)}</div>
        <span class="grid-card-title">${escapeHTML(x.titulo)}</span>
        <span class="grid-card-desc">${escapeHTML(x.descripcion)}</span>
        <div class="grid-card-foot">${networkBadgeHTML(x.red)}<span>${formatDate(x.actualizado)}</span></div>
      </button>`
    )
    .join("");

  $("select-all").checked = list.length > 0 && list.every((x) => checked.has(x.id));
  $("select-all").indeterminate = list.some((x) => checked.has(x.id)) && !$("select-all").checked;
  $("selection-bar").hidden = checked.size === 0;
  $("selected-count").textContent = checked.size;

  renderCalendar(list);
  renderDetails();
}

function renderCalendar(list) {
  const y = state.calendarDate.getFullYear();
  const m = state.calendarDate.getMonth();
  const first = new Date(y, m, 1).getDay();
  const days = new Date(y, m + 1, 0).getDate();
  $("calendar-heading").textContent = state.calendarDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" });

  let html = "";
  for (let i = 0; i < first; i++) html += `<div class="calendar-cell empty"></div>`;
  for (let d = 1; d <= days; d++) {
    const key = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const dayItems = list.filter((x) => x.publicacion === key);
    html += `<div class="calendar-cell"><span class="calendar-day-num">${d}</span>${dayItems
      .map((x) => `<button type="button" data-id="${x.id}" class="calendar-item" title="${escapeHTML(x.titulo)}">${escapeHTML(x.titulo)}</button>`)
      .join("")}</div>`;
  }
  $("calendar-grid").innerHTML = html;
}

function renderDetails() {
  const x = CONTENIDOS.find((v) => v.id === state.seleccionadoId && itemMatchesClient(v));
  $("details-content").hidden = !x;
  $("details-empty").hidden = !!x;
  if (!x) return;
  $("detail-title").textContent = x.titulo;
  $("detail-description").textContent = x.descripcion;
  $("detail-status").innerHTML = pillHTML(x.estado);
  $("detail-cliente").innerHTML = clientTagHTML(x.clienteId);
  $("detail-red").innerHTML = networkBadgeHTML(x.red);
  $("detail-type").textContent = x.tipo;
  $("detail-owner").textContent = x.propietario;
  $("detail-updated").textContent = formatDate(x.actualizado);
  $("detail-publication").textContent = formatDate(x.publicacion);
  $("detail-tags").innerHTML = x.etiquetas.length ? x.etiquetas.map((t) => `<span class="tag-chip">${escapeHTML(t)}</span>`).join("") : '<span style="color:var(--faint)">Sin etiquetas</span>';
  $("activity-text").textContent = `${x.propietario} actualizó este contenido`;
  $("activity-date").textContent = formatDate(x.actualizado);
}

function renderOverview() {
  const list = CONTENIDOS.filter(itemMatchesClient);
  const porEstado = (estado) => list.filter((x) => x.estado === estado).length;
  const kpis = [
    { label: "Contenidos totales", value: list.length },
    { label: "Publicados", value: porEstado("Publicado") },
    { label: "Programados", value: porEstado("Programado") },
    { label: "En revisión", value: porEstado("En revisión") },
  ];
  $("overview-kpis").innerHTML = kpis
    .map((k) => `<div class="client-card"><span class="client-stat-num" style="font-size:24px">${k.value}</span><span class="client-stat-label">${escapeHTML(k.label)}</span></div>`)
    .join("");

  const porCliente = CLIENTES.map((c) => ({ c, n: CONTENIDOS.filter((x) => x.clienteId === c.id).length })).filter((r) => state.clienteId === "all" || r.c.id === state.clienteId);
  $("overview-clients").innerHTML = porCliente
    .map(
      (r) => `<div class="client-card">
        <div class="client-card-top"><span class="client-dot" style="background:${r.c.color}">${escapeHTML(r.c.iniciales)}</span><div><span class="client-card-name">${escapeHTML(r.c.nombre)}</span><span class="client-card-sector">${escapeHTML(r.c.sector)}</span></div></div>
        <div class="client-card-stats"><div><span class="client-stat-num">${r.n}</span><br><span class="client-stat-label">Contenidos</span></div></div>
      </div>`
    )
    .join("");
}

function renderClientsModule() {
  $("clients-grid").innerHTML = CLIENTES.map((c) => {
    const items = CONTENIDOS.filter((x) => x.clienteId === c.id);
    const publicados = items.filter((x) => x.estado === "Publicado").length;
    const programados = items.filter((x) => x.estado === "Programado").length;
    return `<button type="button" class="client-card" data-client="${c.id}" style="text-align:left;cursor:pointer">
      <div class="client-card-top"><span class="client-dot" style="background:${c.color}">${escapeHTML(c.iniciales)}</span><div><span class="client-card-name">${escapeHTML(c.nombre)}</span><span class="client-card-sector">${escapeHTML(c.sector)}</span></div></div>
      <div class="client-card-stats">
        <div><span class="client-stat-num">${items.length}</span><br><span class="client-stat-label">Contenidos</span></div>
        <div><span class="client-stat-num">${publicados}</span><br><span class="client-stat-label">Publicados</span></div>
        <div><span class="client-stat-num">${programados}</span><br><span class="client-stat-label">Programados</span></div>
      </div>
    </button>`;
  }).join("");
  $("clients-grid").querySelectorAll("[data-client]").forEach((btn) =>
    btn.addEventListener("click", () => {
      state.clienteId = btn.dataset.client;
      updateClientButton();
      changeModule("Biblioteca de contenido");
      renderAll();
    })
  );
}

/* ---------------- Selección y navegación ---------------- */

function selectItem(id) {
  state.seleccionadoId = id;
  renderAll();
  if (window.innerWidth <= 950) {
    $("details-panel").classList.remove("is-hidden");
    $("toggle-details").setAttribute("aria-expanded", "true");
  }
}

function setView(name) {
  state.vista = name;
  document.querySelectorAll(".view-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.view === name);
    b.setAttribute("aria-pressed", String(b.dataset.view === name));
  });
  renderAll();
}

function changeModule(name) {
  state.modulo = name;
  document.querySelectorAll(".nav-item").forEach((b) => b.classList.toggle("active", b.dataset.module === name));
  $("breadcrumb-current").textContent = name;

  $("library-module").hidden = name !== "Biblioteca de contenido";
  $("overview-module").hidden = name !== "Resumen";
  $("clients-module").hidden = name !== "Clientes";
  $("other-module").hidden = ["Biblioteca de contenido", "Resumen", "Clientes"].includes(name);

  const isLibrary = name === "Biblioteca de contenido";
  $("details-panel").classList.toggle("is-hidden", !isLibrary);
  $("toggle-details").disabled = !isLibrary;

  if ($("other-module").hidden === false) {
    const copy = {
      "Biblioteca multimedia": "Guarda y organiza imágenes, videos y archivos para todos tus clientes en un solo lugar.",
      Plantillas: "Crea plantillas reutilizables para acelerar la producción de contenido recurrente.",
      "Flujo de trabajo": "Define las etapas de aprobación de contenido para tu equipo y tus clientes.",
      "Miembros del equipo": "Administra quién tiene acceso a cada cliente y qué puede hacer.",
      Configuración: "Ajusta las preferencias generales del espacio de trabajo.",
    };
    $("other-title").textContent = name;
    $("other-description").textContent = copy[name] ?? "Este módulo está listo para tu equipo.";
  }
  $("sidebar").classList.remove("mobile-open");
  renderAll();
}

/* ---------------- Modal de edición ---------------- */

function openEditor(id = null) {
  state.editId = id;
  const x = CONTENIDOS.find((v) => v.id === id);
  $("editor-heading").textContent = x ? "Editar contenido" : "Nuevo contenido";
  $("save-content").textContent = x ? "Guardar cambios" : "Crear contenido";
  $("content-title").value = x?.titulo ?? "";
  $("content-description").value = x?.descripcion ?? "";
  $("content-cliente").value = x?.clienteId ?? (state.clienteId !== "all" ? state.clienteId : CLIENTES[0].id);
  $("content-tipo").value = x?.tipo ?? "Publicación";
  $("content-estado").value = x?.estado ?? "Borrador";
  $("content-red").value = x?.red ?? "instagram";
  $("content-owner").value = x?.propietario ?? EQUIPO[0];
  $("content-date").value = x?.publicacion ?? "";
  $("content-tags").value = x?.etiquetas.join(", ") ?? "";
  $("editor-modal").hidden = false;
  $("content-title").focus();
}

function openPreview(id) {
  const x = CONTENIDOS.find((v) => v.id === id);
  if (!x) return;
  $("preview-cliente").innerHTML = clientTagHTML(x.clienteId);
  $("preview-red").innerHTML = networkBadgeHTML(x.red);
  $("preview-type").textContent = x.tipo;
  $("preview-title").textContent = x.titulo;
  $("preview-description").textContent = x.descripcion || "Todavía no se agregó un resumen.";
  $("preview-modal").hidden = false;
}

function toast(message) {
  $("toast").textContent = message;
  $("toast").hidden = false;
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => ($("toast").hidden = true), 2800);
}

function closePopups() {
  document.querySelectorAll(".popup").forEach((p) => p.classList.add("hidden"));
  document.querySelectorAll('[aria-expanded="true"]').forEach((b) => {
    if (b.id !== "toggle-details") b.setAttribute("aria-expanded", "false");
  });
}

function togglePopup(button, popup) {
  const opening = popup.classList.contains("hidden");
  closePopups();
  popup.classList.toggle("hidden", !opening);
  button.setAttribute("aria-expanded", String(opening));
}

/* ---------------- Tema claro/oscuro ---------------- */

function applyTheme(theme) {
  if (theme) {
    document.documentElement.setAttribute("data-theme", theme);
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  try {
    if (theme) localStorage.setItem("publifya-theme", theme);
    else localStorage.removeItem("publifya-theme");
  } catch (e) {}
  const isDark = theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
  $("theme-toggle").innerHTML = `<i data-lucide="${isDark ? "sun" : "moon"}"></i>`;
  lucide.createIcons();
}

/* ---------------- Inicialización ---------------- */

function init() {
  initSelects();
  buildClientMenu();
  updateClientButton();

  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("publifya-theme");
  } catch (e) {}
  applyTheme(savedTheme);

  document.querySelectorAll(".nav-item").forEach((b) =>
    b.addEventListener("click", () => {
      if (b.dataset.module === "Calendario editorial") {
        changeModule("Biblioteca de contenido");
        setView("calendar");
        document.querySelectorAll(".nav-item").forEach((n) => n.classList.toggle("active", n.dataset.module === "Calendario editorial"));
        $("breadcrumb-current").textContent = "Calendario editorial";
      } else {
        changeModule(b.dataset.module);
      }
    })
  );

  document.querySelectorAll(".view-btn").forEach((b) => b.addEventListener("click", () => setView(b.dataset.view)));
  document.querySelectorAll(".tab").forEach((b) =>
    b.addEventListener("click", () => {
      state.filtro = b.dataset.filter;
      document.querySelectorAll(".tab").forEach((t) => {
        t.classList.toggle("active", t === b);
        t.setAttribute("aria-selected", String(t === b));
      });
      renderAll();
    })
  );

  $("global-search").addEventListener("input", renderAll);
  $("sort-select").addEventListener("change", renderAll);
  $("filter-red").addEventListener("change", (e) => {
    state.filtroRed = e.target.value;
    renderAll();
  });
  $("filter-tipo").addEventListener("change", (e) => {
    state.filtroTipo = e.target.value;
    renderAll();
  });
  $("header-filter").addEventListener("click", () => {
    document.querySelector(".tabs").scrollIntoView({ behavior: "smooth", block: "nearest" });
    document.querySelector(".tab").focus();
  });

  $("new-content").addEventListener("click", () => openEditor());
  $("return-library").addEventListener("click", () => changeModule("Biblioteca de contenido"));
  $("detail-edit").addEventListener("click", () => openEditor(state.seleccionadoId));
  $("detail-preview").addEventListener("click", () => openPreview(state.seleccionadoId));

  $("editor-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const titulo = $("content-title").value.trim();
    if (!titulo) {
      $("content-title").focus();
      return;
    }
    const values = {
      titulo,
      descripcion: $("content-description").value.trim(),
      clienteId: $("content-cliente").value,
      tipo: $("content-tipo").value,
      estado: $("content-estado").value,
      red: $("content-red").value,
      propietario: $("content-owner").value,
      publicacion: $("content-date").value,
      etiquetas: $("content-tags").value.split(",").map((t) => t.trim()).filter(Boolean),
      actualizado: new Date().toISOString().slice(0, 10),
    };
    if (state.editId) {
      Object.assign(CONTENIDOS.find((x) => x.id === state.editId), values);
      toast("Contenido actualizado");
    } else {
      const nextId = Math.max(0, ...CONTENIDOS.map((x) => x.id)) + 1;
      const item = { id: nextId, ...values };
      CONTENIDOS.unshift(item);
      state.seleccionadoId = item.id;
      toast("Contenido creado");
    }
    $("editor-modal").hidden = true;
    renderAll();
  });

  document.querySelectorAll(".close-modal").forEach((b) => b.addEventListener("click", () => (b.closest(".modal-backdrop").hidden = true)));
  document.querySelectorAll(".modal-backdrop").forEach((m) =>
    m.addEventListener("click", (e) => {
      if (e.target === m) m.hidden = true;
    })
  );

  $("table-body").addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    if (!row) return;
    const id = Number(row.dataset.id);
    if (e.target.closest(".row-check")) {
      e.target.checked ? checked.add(id) : checked.delete(id);
      renderAll();
      return;
    }
    const menuButton = e.target.closest(".row-menu-button");
    if (menuButton) {
      e.stopPropagation();
      togglePopup(menuButton, row.querySelector(".row-menu"));
      return;
    }
    const action = e.target.closest("[data-action]");
    if (action) {
      e.stopPropagation();
      const menu = row.querySelector(".row-menu");
      const kind = action.dataset.action;
      if (kind === "preview") {
        closePopups();
        openPreview(id);
      }
      if (kind === "edit") {
        closePopups();
        openEditor(id);
      }
      if (kind === "delete") {
        menu.querySelectorAll('[data-action="preview"],[data-action="edit"],[data-action="delete"]').forEach((b) => b.classList.add("hidden"));
        menu.querySelectorAll('[data-action="confirm"],[data-action="cancel"]').forEach((b) => b.classList.remove("hidden"));
      }
      if (kind === "cancel") {
        closePopups();
        renderAll();
      }
      if (kind === "confirm") {
        CONTENIDOS.splice(CONTENIDOS.findIndex((x) => x.id === id), 1);
        checked.delete(id);
        if (state.seleccionadoId === id) state.seleccionadoId = filtered()[0]?.id ?? null;
        toast("Contenido eliminado");
        renderAll();
      }
      return;
    }
    selectItem(id);
  });
  $("table-body").addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && e.target.tagName === "TR") {
      e.preventDefault();
      selectItem(Number(e.target.dataset.id));
    }
  });
  $("grid-view").addEventListener("click", (e) => {
    const card = e.target.closest("[data-id]");
    if (card) selectItem(Number(card.dataset.id));
  });
  $("calendar-grid").addEventListener("click", (e) => {
    const item = e.target.closest("[data-id]");
    if (item) selectItem(Number(item.dataset.id));
  });
  $("select-all").addEventListener("change", (e) => {
    filtered().forEach((x) => (e.target.checked ? checked.add(x.id) : checked.delete(x.id)));
    renderAll();
  });
  $("clear-selection").addEventListener("click", () => {
    checked.clear();
    renderAll();
  });
  $("previous-month").addEventListener("click", () => {
    state.calendarDate.setMonth(state.calendarDate.getMonth() - 1);
    renderAll();
  });
  $("next-month").addEventListener("click", () => {
    state.calendarDate.setMonth(state.calendarDate.getMonth() + 1);
    renderAll();
  });

  $("collapse-sidebar").addEventListener("click", () => {
    const closed = $("sidebar").classList.toggle("collapsed");
    $("collapse-sidebar").setAttribute("aria-label", closed ? "Expandir barra lateral" : "Contraer barra lateral");
  });
  $("open-mobile-sidebar").addEventListener("click", () => $("sidebar").classList.add("mobile-open"));
  $("close-mobile-sidebar").addEventListener("click", () => $("sidebar").classList.remove("mobile-open"));
  $("toggle-details").addEventListener("click", () => {
    const closed = $("details-panel").classList.toggle("is-hidden");
    $("toggle-details").setAttribute("aria-expanded", String(!closed));
  });
  $("close-details").addEventListener("click", () => $("toggle-details").click());

  $("notifications-toggle").addEventListener("click", () => togglePopup($("notifications-toggle"), $("notifications-menu")));
  $("client-toggle").addEventListener("click", () => togglePopup($("client-toggle"), $("client-menu")));
  $("user-toggle").addEventListener("click", () => togglePopup($("user-toggle"), $("user-menu")));
  $("header-avatar").addEventListener("click", () => togglePopup($("user-toggle"), $("user-menu")));
  $("user-settings").addEventListener("click", () => {
    closePopups();
    changeModule("Configuración");
  });
  $("theme-toggle").addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const isDark = current === "dark" || (!current && window.matchMedia("(prefers-color-scheme: dark)").matches);
    applyTheme(isDark ? "light" : "dark");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".popup") && !e.target.closest("#notifications-toggle") && !e.target.closest("#client-toggle") && !e.target.closest("#user-toggle") && !e.target.closest("#header-avatar") && !e.target.closest(".row-menu-button")) {
      closePopups();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-backdrop").forEach((m) => (m.hidden = true));
      closePopups();
      $("sidebar").classList.remove("mobile-open");
    }
  });

  renderAll();
}

document.addEventListener("DOMContentLoaded", init);
