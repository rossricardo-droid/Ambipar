/*
  One Mind x Ambipar
  ------------------
  Interacciones principales del front.

  Filosofía:
  - poca interacción, pero útil
  - que ayude a comprender
  - que no agregue ruido visual
*/

document.addEventListener("DOMContentLoaded", () => {
  initHeroSignals();
  initFlowCards();
  initProductViews();
  initCaseStudies();
  initCapabilityCards();
  initRollout();
  initActiveNav();
});

/* =========================================================
   HERO
   Relación entre:
   - chip activo
   - punto activo
   - panel de detalle
   ========================================================= */

function initHeroSignals() {
  const pills = document.querySelectorAll(".hero-pill");
  const points = document.querySelectorAll(".asset-point");
  const title = document.querySelector(".hero-detail-title");
  const copy = document.querySelector(".hero-detail-copy");

  if (!pills.length || !points.length || !title || !copy) return;

  const signalContent = {
    ubicacion: {
      title: "Ubicación",
      copy: "Saber dónde está cada activo y recuperar control sobre la base instalada."
    },
    uso: {
      title: "Uso",
      copy: "Leer nivel de uso por activo y por zona para decidir frecuencia, atención y ajuste de capacidad."
    },
    movimiento: {
      title: "Movimiento",
      copy: "Detectar cambios de posición, desplazamientos relevantes o comportamiento fuera de patrón."
    },
    atencion: {
      title: "Atención",
      copy: "Priorizar limpieza, revisión o acción correctiva antes de que el problema escale."
    }
  };

  const activateSignal = (key) => {
    pills.forEach((pill) => {
      const active = pill.dataset.signal === key;
      pill.classList.toggle("is-active", active);
      pill.setAttribute("aria-pressed", String(active));
    });

    points.forEach((point) => {
      point.classList.toggle("is-active", point.dataset.signal === key);
    });

    if (signalContent[key]) {
      title.textContent = signalContent[key].title;
      copy.textContent = signalContent[key].copy;
    }
  };

  pills.forEach((pill) => {
    const key = pill.dataset.signal;

    pill.addEventListener("mouseenter", () => activateSignal(key));
    pill.addEventListener("focus", () => activateSignal(key));
    pill.addEventListener("click", () => activateSignal(key));
  });
}

/* =========================================================
   PROPUESTA
   Cards con detalle expandible
   ========================================================= */

function initFlowCards() {
  const steps = document.querySelectorAll(".flow-step");
  if (!steps.length) return;

  const setActive = (current) => {
    steps.forEach((step) => {
      step.classList.toggle("is-open", step === current);
      step.setAttribute("aria-expanded", String(step === current));
    });
  };

  steps.forEach((step) => {
    step.addEventListener("mouseenter", () => setActive(step));
    step.addEventListener("focus", () => setActive(step));
    step.addEventListener("click", () => setActive(step));
    step.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setActive(step);
      }
    });
  });
}

/* =========================================================
   PRODUCTO VISIBLE
   Tabs para alternar vistas del sistema
   ========================================================= */

function initProductViews() {
  const tabs = document.querySelectorAll(".product-tab");
  const views = document.querySelectorAll(".product-view");

  if (!tabs.length || !views.length) return;

  const activateView = (key) => {
    tabs.forEach((tab) => {
      const active = tab.dataset.productView === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });

    views.forEach((view) => {
      view.classList.toggle("is-active", view.dataset.productView === key);
    });
  };

  tabs.forEach((tab) => {
    const key = tab.dataset.productView;
    tab.addEventListener("click", () => activateView(key));
    tab.addEventListener("mouseenter", () => activateView(key));
  });
}

/* =========================================================
   CASOS PRÁCTICOS
   ========================================================= */

function initCaseStudies() {
  const tabs = document.querySelectorAll(".case-tab");
  const title = document.querySelector(".case-panel-title");
  const copy = document.querySelector(".case-panel-copy");
  const impacts = document.querySelector(".case-panel-impact");

  if (!tabs.length || !title || !copy || !impacts) return;

  const cases = {
    desplazado: {
      title: "Activo desplazado dentro de la obra",
      copy: "El sistema detecta cambio de ubicación y evita perder tiempo buscando un baño que el cliente movió sin aviso.",
      impacts: ["↓ tiempo perdido", "↑ control operativo", "↓ falsas salidas"]
    },
    limpieza: {
      title: "La ruta de limpieza cambia antes de salir",
      copy: "Una alerta por alto uso reordena la atención del día y mueve al frente los activos que sí necesitan intervención.",
      impacts: ["↑ priorización real", "↓ fricción operativa", "↑ servicio oportuno"]
    },
    capacidad: {
      title: "Una zona sugiere más o menos activos",
      copy: "El uso real muestra sobrecapacidad o saturación y permite ajustar la base instalada con más evidencia frente al cliente.",
      impacts: ["↑ ajuste de capacidad", "↑ credibilidad comercial", "↓ costo improductivo"]
    },
    revision: {
      title: "Un activo entra a revisión por comportamiento fuera de patrón",
      copy: "Si un activo deja de usarse o se comporta distinto a su zona, aparece como candidato de revisión o mantenimiento.",
      impacts: ["↑ vida útil del activo", "↑ criterio de mantenimiento", "↓ deterioro no detectado"]
    }
  };

  const renderCase = (key) => {
    const current = cases[key];
    if (!current) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.case === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });

    title.textContent = current.title;
    copy.textContent = current.copy;

    impacts.innerHTML = "";
    current.impacts.forEach((item) => {
      const pill = document.createElement("span");
      pill.className = "impact-pill";
      pill.textContent = item;
      impacts.appendChild(pill);
    });
  };

  tabs.forEach((tab) => {
    const key = tab.dataset.case;
    tab.addEventListener("click", () => renderCase(key));
    tab.addEventListener("mouseenter", () => renderCase(key));
  });
}

/* =========================================================
   CAPACIDADES
   Un panel único para mantener limpieza visual
   ========================================================= */

function initCapabilityCards() {
  const cards = document.querySelectorAll(".capability-card");
  const panelTitle = document.querySelector(".capability-panel-title");
  const panelCopy = document.querySelector(".capability-panel-copy");
  const panelImpacts = document.querySelector(".capability-impacts");

  if (!cards.length || !panelTitle || !panelCopy || !panelImpacts) return;

  const capabilityData = {
    trazabilidad: {
      title: "Trazabilidad activa",
      copy: "Controlar ubicación, cambios de posición y disponibilidad de la base instalada reduce pérdidas de tiempo, mejora la respuesta operativa y hace visible lo que hoy se mueve sin trazabilidad.",
      impacts: ["↓ tiempo perdido", "↑ control operativo", "↓ falsas salidas"]
    },
    planificacion: {
      title: "Planificación de activos",
      copy: "Usar evidencia de uso y comportamiento para decidir revisión, rotación, mantenimiento y despliegue mejora la disponibilidad y evita administrar activos solo por calendario o supuesto.",
      impacts: ["↑ vida útil del activo", "↑ ajuste de capacidad", "↓ mantenimiento ciego"]
    },
    lectura: {
      title: "Lectura de uso",
      copy: "Entender frecuencia e intensidad de uso por activo y por zona permite ajustar criterio de atención, justificar capacidad y abrir una conversación comercial más creíble.",
      impacts: ["↑ credibilidad comercial", "↑ criterio de servicio", "↓ sobreatención"]
    },
    limpieza: {
      title: "Limpieza proactiva",
      copy: "La prioridad de atención deja de ser fija y pasa a responder al uso real, la criticidad y la señal operativa antes de que el problema escale.",
      impacts: ["↓ fricción operativa", "↑ servicio oportuno", "↑ foco diario"]
    }
  };

  const activateCapability = (key) => {
    const content = capabilityData[key];
    if (!content) return;

    cards.forEach((card) => {
      const active = card.dataset.capability === key;
      card.classList.toggle("is-active", active);
      card.setAttribute("aria-pressed", String(active));
    });

    panelTitle.textContent = content.title;
    panelCopy.textContent = content.copy;

    panelImpacts.innerHTML = "";
    content.impacts.forEach((impact) => {
      const item = document.createElement("span");
      item.className = "capability-impact";
      item.textContent = impact;
      panelImpacts.appendChild(item);
    });
  };

  cards.forEach((card) => {
    const key = card.dataset.capability;
    card.addEventListener("mouseenter", () => activateCapability(key));
    card.addEventListener("focus", () => activateCapability(key));
    card.addEventListener("click", () => activateCapability(key));
  });
}

/* =========================================================
   ESCALAMIENTO
   ========================================================= */

function initRollout() {
  const steps = document.querySelectorAll(".rollout-step");
  const title = document.querySelector(".rollout-panel-title");
  const copy = document.querySelector(".rollout-panel-copy");
  const bars = document.querySelectorAll(".scale-bar");

  if (!steps.length || !title || !copy) return;

  const rolloutContent = {
    "1": {
      title: "Piloto inicial",
      copy: "Partir acotado permite validar señal, adopción y operación con riesgo controlado y sin sobredimensionar el despliegue."
    },
    "2": {
      title: "Aprendizaje operativo",
      copy: "La etapa clave: aquí se calibran reglas, se entienden patrones reales y la señal se convierte en criterio útil."
    },
    "3": {
      title: "Zona implementada",
      copy: "La lógica ya validada se vuelve capacidad visible sobre una zona: activos priorizados, alertas útiles y decisiones mejores."
    },
    "4": {
      title: "Escalamiento por zonas",
      copy: "Cada nueva zona se implementa con menos riesgo y mayor precisión, porque ya existe aprendizaje acumulado."
    }
  };

  const activateStep = (stepNumber) => {
    steps.forEach((step) => {
      const active = step.dataset.step === stepNumber;
      step.classList.toggle("is-active", active);
      step.setAttribute("aria-pressed", String(active));
    });

    if (rolloutContent[stepNumber]) {
      title.textContent = rolloutContent[stepNumber].title;
      copy.textContent = rolloutContent[stepNumber].copy;
    }

    bars.forEach((bar, index) => {
      bar.classList.toggle("is-live", index < Number(stepNumber));
    });
  };

  steps.forEach((step) => {
    const stepNumber = step.dataset.step;
    step.addEventListener("mouseenter", () => activateStep(stepNumber));
    step.addEventListener("focus", () => activateStep(stepNumber));
    step.addEventListener("click", () => activateStep(stepNumber));
  });
}

/* =========================================================
   NAV ACTIVA
   Resalta la sección visible
   ========================================================= */

function initActiveNav() {
  const links = document.querySelectorAll(".topnav a[href^='#']");
  const sections = document.querySelectorAll("main section[id]");

  if (!links.length || !sections.length || !("IntersectionObserver" in window)) return;

  const byId = new Map();
  links.forEach((link) => {
    byId.set(link.getAttribute("href").replace("#", ""), link);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const currentId = entry.target.id;
        links.forEach((link) => link.classList.remove("is-active"));
        const currentLink = byId.get(currentId);
        if (currentLink) currentLink.classList.add("is-active");
      });
    },
    {
      rootMargin: "-20% 0px -55% 0px",
      threshold: 0.15
    }
  );

  sections.forEach((section) => observer.observe(section));
}
