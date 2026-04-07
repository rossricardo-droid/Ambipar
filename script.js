/*
  Interacciones de bajo ruido:
  - Hero: cambia foco conceptual y punto principal.
  - Propuesta: actualiza un único panel de detalle.
  - Capacidades: resume consecuencia operativa e impacto.
  - Escalamiento: activa etapa y gráfica incremental.
  - Navegación: resalta la sección visible.
*/

document.addEventListener("DOMContentLoaded", () => {
  initHeroSignals();
  initFlow();
  initProductViews();
  initScenarios();
  initCapabilities();
  initRollout();
  initActiveNav();
});

function bindAdaptiveInteractions(elements, handler) {
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  elements.forEach((element) => {
    if (finePointer) {
      element.addEventListener("mouseenter", () => handler(element));
    }
    element.addEventListener("focus", () => handler(element));
    element.addEventListener("click", () => handler(element));
  });
}

function initHeroSignals() {
  const content = {
    ubicacion: {
      eyebrow: "Base instalada",
      title: "Ubicación",
      copy: "Saber dónde está cada activo y recuperar control sobre la base instalada."
    },
    uso: {
      eyebrow: "Uso del activo",
      title: "Uso",
      copy: "Leer intensidad de uso para ajustar frecuencia, capacidad y criterio de servicio."
    },
    movimiento: {
      eyebrow: "Cambio relevante",
      title: "Movimiento",
      copy: "Detectar desplazamientos que afectan disponibilidad, localización y planificación de activos."
    },
    atencion: {
      eyebrow: "Prioridad operacional",
      title: "Atención",
      copy: "Priorizar qué activo o zona intervenir primero según uso, contexto y criticidad."
    }
  };

  const pills = [...document.querySelectorAll(".hero-pill")];
  const points = [...document.querySelectorAll(".signal-point[data-signal]")];
  const eyebrow = document.getElementById("signal-eyebrow");
  const title = document.getElementById("signal-title");
  const copy = document.getElementById("signal-copy");
  if (!pills.length || !points.length || !eyebrow || !title || !copy) return;

  const activate = (key) => {
    pills.forEach((pill) => {
      const active = pill.dataset.signal === key;
      pill.classList.toggle("is-active", active);
      pill.setAttribute("aria-selected", String(active));
    });

    points.forEach((point) => {
      point.classList.toggle("is-active", point.dataset.signal === key);
    });

    eyebrow.textContent = content[key].eyebrow;
    title.textContent = content[key].title;
    copy.textContent = content[key].copy;
  };

  bindAdaptiveInteractions([...pills, ...points], (element) => activate(element.dataset.signal));
  activate("ubicacion");
}

function initFlow() {
  const content = {
    capture: {
      title: "Captura en terreno",
      copy: "Ubicación, movimiento y eventos físicos del activo para empezar a leer su estado.",
      tags: ["Ubicación", "Movimiento", "Eventos físicos"]
    },
    backend: {
      title: "Backend con IA",
      copy: "La señal se interpreta y se transforma en una lectura útil para decidir sobre activos y operación.",
      tags: ["Patrones", "Clasificación", "Lectura útil"]
    },
    operations: {
      title: "Gestión operacional",
      copy: "La operación gana prioridad y planificación a partir de trazabilidad activa y lectura de uso.",
      tags: ["Priorización", "Planificación", "Servicio"]
    }
  };

  const steps = [...document.querySelectorAll(".flow-step")];
  const title = document.getElementById("flow-title");
  const copy = document.getElementById("flow-copy");
  const tags = document.getElementById("flow-tags");
  if (!steps.length || !title || !copy || !tags) return;

  const activate = (key) => {
    steps.forEach((step) => {
      const active = step.dataset.flow === key;
      step.classList.toggle("is-open", active);
      step.setAttribute("aria-expanded", String(active));
    });

    title.textContent = content[key].title;
    copy.textContent = content[key].copy;
    tags.innerHTML = content[key].tags.map((tag) => `<span>${tag}</span>`).join("");
  };

  bindAdaptiveInteractions(steps, (step) => activate(step.dataset.flow));
  activate("capture");
}

function initCapabilities() {
  const content = {
    traceability: {
      title: "Trazabilidad activa",
      copy: "Recupera control sobre la base instalada, reduce tiempo perdido en localización y mejora la respuesta frente a movimientos no previstos.",
      impacts: ["− Costos", "+ Clientes", "+ Foco"]
    },
    planning: {
      title: "Planificación de activos",
      copy: "Mejora disponibilidad, revisión, rotación y mantenimiento usando evidencia de uso real en vez de frecuencia fija o supuestos.",
      impacts: ["− Fricción", "+ Vida útil", "+ Criterio"]
    },
    usage: {
      title: "Lectura de uso",
      copy: "Permite ajustar capacidad instalada, frecuencia y atención según comportamiento real por activo y por zona.",
      impacts: ["+ Ingresos", "+ Servicio", "+ Planificación"]
    },
    cleaning: {
      title: "Limpieza proactiva",
      copy: "Focaliza intervención donde más importa y evita que un activo degradado escale antes de ser atendido.",
      impacts: ["− Costos", "+ Experiencia", "+ Prioridad"]
    }
  };

  const cards = [...document.querySelectorAll(".cap-card")];
  const title = document.getElementById("cap-title");
  const copy = document.getElementById("cap-copy");
  const impacts = [
    document.getElementById("cap-impact-1"),
    document.getElementById("cap-impact-2"),
    document.getElementById("cap-impact-3")
  ];
  if (!cards.length || !title || !copy || impacts.some((item) => !item)) return;

  const activate = (key) => {
    cards.forEach((card) => card.classList.toggle("is-active", card.dataset.cap === key));
    title.textContent = content[key].title;
    copy.textContent = content[key].copy;
    impacts.forEach((item, index) => {
      item.textContent = content[key].impacts[index];
    });
  };

  bindAdaptiveInteractions(cards, (card) => activate(card.dataset.cap));
  cards.forEach((card) => {
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate(card.dataset.cap);
      }
    });
  });

  activate("planning");
}

function initRollout() {
  const content = {
    1: {
      title: "Piloto inicial",
      copy: "Validar trazabilidad, lectura de uso y reglas de atención en una zona controlada antes de ampliar despliegue."
    },
    2: {
      title: "Aprendizaje operativo",
      copy: "Calibrar señales y entender cómo se comportan los activos antes de pasar a una expansión mayor."
    },
    3: {
      title: "Zona implementada",
      copy: "Convertir la lógica validada en capacidad operacional visible y utilizable sobre una zona concreta."
    },
    4: {
      title: "Escalamiento por zonas",
      copy: "Replicar con menor riesgo, mayor adopción y mejor planificación de activos en cada nueva etapa."
    }
  };

  const steps = [...document.querySelectorAll(".rollout-step")];
  const panel = document.getElementById("rollout-panel");
  const title = document.getElementById("rollout-title");
  const copy = document.getElementById("rollout-copy");
  if (!steps.length || !panel || !title || !copy) return;

  const activate = (key) => {
    steps.forEach((step) => {
      const active = step.dataset.step === key;
      step.classList.toggle("is-active", active);
      step.setAttribute("aria-selected", String(active));
    });

    title.textContent = content[key].title;
    copy.textContent = content[key].copy;
    panel.dataset.stage = key;
  };

  bindAdaptiveInteractions(steps, (step) => activate(step.dataset.step));
  activate("1");
}

function initActiveNav() {
  const links = [...document.querySelectorAll(".topnav a")];
  const sections = [...document.querySelectorAll("main section[id]")];
  if (!links.length || !sections.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      links.forEach((link) => {
        link.style.color = link.getAttribute("href") === `#${id}` ? "var(--text)" : "var(--muted)";
      });
    });
  }, { threshold: 0.42, rootMargin: "-10% 0px -45% 0px" });

  sections.forEach((section) => observer.observe(section));
}


function initProductViews() {
  const views = {
    executive: {
      label: 'Supervisor / visión general',
      title: 'Prioridad operativa sobre base instalada',
      status: 'Zona norte · 124 activos visibles',
      kpis: ['124', '18', '7'],
      sideTitle: 'Ranking diario de prioridad',
      list: [
        ['Activo 14 · Zona norte', 'Uso alto + desviación'],
        ['Activo 27 · Acceso obra', 'Movimiento no previsto'],
        ['Activo 08 · Patio B', 'Bajo uso sostenido']
      ],
      copy: 'No solo muestra ubicación. Lee señales del activo, las convierte en criterio operativo y recomienda dónde actuar primero.',
      chips: ['Alertas proactivas', 'Criticidad por zona', 'Recomendación operativa']
    },
    zone: {
      label: 'Supervisor / lectura territorial',
      title: 'Qué zonas requieren atención antes',
      status: 'Zona sur · criticidad comparada',
      kpis: ['3', '11', '2'],
      sideTitle: 'Alertas que cambian la ruta',
      list: [
        ['Zona sur · Frente 3', 'Sube al inicio de ruta'],
        ['Zona norte · Patio A', 'Mantiene frecuencia'],
        ['Zona centro · Faena móvil', 'Revisar desplazamiento']
      ],
      copy: 'Permite leer criticidad por zona, comparar comportamiento y priorizar recursos donde el uso y el contexto lo exigen.',
      chips: ['Vista territorial', 'Orden de atención', 'Foco por criticidad']
    },
    planning: {
      label: 'Jefatura / planificación de activos',
      title: 'Disponibilidad, revisión y ajuste de capacidad',
      status: 'Base instalada · recomendación semanal',
      kpis: ['9', '5', '12'],
      sideTitle: 'Sugerencias de planificación',
      list: [
        ['Activo 05 · Bajo uso', 'Evaluar reubicación'],
        ['Activo 31 · Uso extremo', 'Entrar a revisión'],
        ['Zona norte · Demanda alta', 'Agregar 2 activos']
      ],
      copy: 'La planificación deja de depender de supuestos fijos: el sistema sugiere rotación, revisión y ajuste de capacidad con evidencia.',
      chips: ['Rotación sugerida', 'Vida útil', 'Ajuste de capacidad']
    }
  };

  const tabs = [...document.querySelectorAll('.product-tab')];
  if (!tabs.length) return;
  const stage = document.getElementById('product-stage');
  const ids = {
    label: document.getElementById('product-label'),
    title: document.getElementById('product-view-title'),
    status: document.getElementById('product-status'),
    k1: document.getElementById('kpi-1'),
    k2: document.getElementById('kpi-2'),
    k3: document.getElementById('kpi-3'),
    sideTitle: document.getElementById('product-side-title'),
    list: document.getElementById('product-list'),
    copy: document.getElementById('product-copy'),
    chips: document.getElementById('product-chips')
  };

  const activate = (key) => {
    const v = views[key];
    tabs.forEach((tab) => {
      const active = tab.dataset.view === key;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    stage.dataset.view = key;
    ids.label.textContent = v.label;
    ids.title.textContent = v.title;
    ids.status.textContent = v.status;
    ids.k1.textContent = v.kpis[0];
    ids.k2.textContent = v.kpis[1];
    ids.k3.textContent = v.kpis[2];
    ids.sideTitle.textContent = v.sideTitle;
    ids.list.innerHTML = v.list.map(item => `<li><span>${item[0]}</span><strong>${item[1]}</strong></li>`).join('');
    ids.copy.textContent = v.copy;
    ids.chips.innerHTML = v.chips.map(chip => `<span>${chip}</span>`).join('');
  };

  bindAdaptiveInteractions(tabs, (tab) => activate(tab.dataset.view));
  activate('executive');
}

function initScenarios() {
  const content = {
    displaced: {
      kicker: 'Caso real',
      title: 'Un activo fue movido dentro de la obra',
      copy: 'El sistema detecta cambio de posición, actualiza la localización y evita tiempo perdido buscando el activo en terreno.',
      impacts: ['↓ tiempo perdido', '↑ control operativo', '↑ trazabilidad']
    },
    priority: {
      kicker: 'Caso real',
      title: 'Una alerta cambia el orden de limpieza del día',
      copy: 'Un activo sube en criticidad por uso alto y pasa adelante en la ruta, aunque no estaba primero en la frecuencia original.',
      impacts: ['↑ foco operativo', '↓ fricción operativa', '↑ servicio oportuno']
    },
    capacity: {
      kicker: 'Caso real',
      title: 'La zona sugiere más o menos activos',
      copy: 'El uso real por zona permite recomendar aumento, reducción o reubicación de activos según demanda observada.',
      impacts: ['↑ ajuste de capacidad', '↑ credibilidad comercial', '↓ intervenciones vacías']
    },
    revision: {
      kicker: 'Caso real',
      title: 'Un activo entra a revisión por comportamiento fuera de patrón',
      copy: 'Bajo uso sostenido o señales atípicas sugieren mala ubicación, deterioro o necesidad de mantenimiento.',
      impacts: ['↑ vida útil del activo', '↑ disponibilidad', '↓ deterioro no detectado']
    }
  };
  const tabs = [...document.querySelectorAll('.scenario-tab')];
  if (!tabs.length) return;
  const kicker = document.getElementById('scenario-kicker');
  const title = document.getElementById('scenario-title');
  const copy = document.getElementById('scenario-copy');
  const impact = document.getElementById('scenario-impact');

  const activate = (key) => {
    const c = content[key];
    tabs.forEach((tab) => {
      const active = tab.dataset.case === key;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    kicker.textContent = c.kicker;
    title.textContent = c.title;
    copy.textContent = c.copy;
    impact.innerHTML = c.impacts.map(item => `<span>${item}</span>`).join('');
  };
  bindAdaptiveInteractions(tabs, (tab) => activate(tab.dataset.case));
  activate('displaced');
}
