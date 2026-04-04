/*
  Interacciones ajustadas para agregar comprensión real.
  - Hero: cambia foco conceptual bajo los chips y activa un punto principal.
  - Propuesta: detalle único con conceptos/beneficios extra.
  - Capacidades: un panel resume consecuencia operativa y beneficio principal.
  - Escalamiento: actualiza la etapa activa y la gráfica incremental.
*/

document.addEventListener("DOMContentLoaded", () => {
  initHeroSignals();
  initFlow();
  initCapabilities();
  initRollout();
  initActiveNav();
});

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

  const pills = document.querySelectorAll(".hero-pill");
  const points = document.querySelectorAll(".signal-point[data-signal]");
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

  [...pills, ...points].forEach((item) => {
    const key = item.dataset.signal;
    item.addEventListener("mouseenter", () => activate(key));
    item.addEventListener("focus", () => activate(key));
    item.addEventListener("click", () => activate(key));
  });
}

function initFlow() {
  const content = {
    capture: {
      title: "Captura en terreno",
      copy: "El activo emite ubicación, movimiento y eventos físicos que permiten empezar a leer su estado.",
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

  const steps = document.querySelectorAll(".flow-step");
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

  steps.forEach((step) => {
    const key = step.dataset.flow;
    step.addEventListener("mouseenter", () => activate(key));
    step.addEventListener("focus", () => activate(key));
    step.addEventListener("click", () => activate(key));
  });

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

  const cards = document.querySelectorAll(".cap-card");
  const title = document.getElementById("cap-title");
  const copy = document.getElementById("cap-copy");
  const impact1 = document.getElementById("cap-impact-1");
  const impact2 = document.getElementById("cap-impact-2");
  const impact3 = document.getElementById("cap-impact-3");
  if (!cards.length || !title || !copy || !impact1 || !impact2 || !impact3) return;

  const activate = (key) => {
    cards.forEach((card) => card.classList.toggle("is-active", card.dataset.cap === key));
    title.textContent = content[key].title;
    copy.textContent = content[key].copy;
    [impact1.textContent, impact2.textContent, impact3.textContent] = content[key].impacts;
  };

  cards.forEach((card) => {
    const key = card.dataset.cap;
    card.addEventListener("mouseenter", () => activate(key));
    card.addEventListener("focus", () => activate(key));
    card.addEventListener("click", () => activate(key));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate(key);
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

  const steps = document.querySelectorAll(".rollout-step");
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

  steps.forEach((step) => {
    const key = step.dataset.step;
    step.addEventListener("mouseenter", () => activate(key));
    step.addEventListener("focus", () => activate(key));
    step.addEventListener("click", () => activate(key));
  });

  activate("2");
}

function initActiveNav() {
  const links = document.querySelectorAll(".topnav a");
  const sections = document.querySelectorAll("main section[id]");
  if (!links.length || !sections.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach((link) => {
          const match = link.getAttribute("href") === `#${id}`;
          link.style.color = match ? "var(--text)" : "var(--muted)";
        });
      });
    },
    { threshold: 0.45, rootMargin: "-10% 0px -45% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}
