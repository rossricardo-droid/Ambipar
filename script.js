/*
  Interacciones de la propuesta ejecutiva
  --------------------------------------
  Objetivo: que la interacción aumente comprensión, no solo efecto visual.
  Secciones activas:
  1) Hero: nodos explorables (Ubicación / Uso / Movimiento / Atención)
  2) Propuesta: expansión de módulos del flujo
  3) Escalamiento: lectura consultiva del rollout
*/

document.addEventListener("DOMContentLoaded", () => {
  initSignalBoard();
  initFlowSteps();
  initRollout();
  initActiveNav();
});

function initSignalBoard() {
  const content = {
    ubicacion: {
      title: "Ubicación",
      copy: "Saber dónde está cada activo, incluso cuando cambia de posición, de zona o de contexto operacional."
    },
    uso: {
      title: "Uso",
      copy: "Entender comportamiento real por activo y por zona para ajustar frecuencia, capacidad instalada y criterio de servicio."
    },
    movimiento: {
      title: "Movimiento",
      copy: "Detectar desplazamientos relevantes, anomalías o cambios que afectan localización, disponibilidad y planificación."
    },
    atencion: {
      title: "Atención",
      copy: "Priorizar intervención con mayor criterio, focalizando limpieza y revisión donde el valor operacional es mayor."
    }
  };

  const nodes = document.querySelectorAll(".signal-node");
  const title = document.getElementById("signal-title");
  const copy = document.getElementById("signal-copy");

  if (!nodes.length || !title || !copy) return;

  const activate = (key) => {
    nodes.forEach((node) => {
      const isActive = node.dataset.signal === key;
      node.classList.toggle("is-active", isActive);
      node.setAttribute("aria-pressed", String(isActive));
    });

    title.textContent = content[key].title;
    copy.textContent = content[key].copy;
  };

  nodes.forEach((node) => {
    const key = node.dataset.signal;
    node.addEventListener("mouseenter", () => activate(key));
    node.addEventListener("focus", () => activate(key));
    node.addEventListener("click", () => activate(key));
  });
}

function initFlowSteps() {
  const steps = document.querySelectorAll(".flow-step");
  if (!steps.length) return;

  const setOpen = (current) => {
    steps.forEach((step) => step.classList.toggle("is-open", step === current));
  };

  steps.forEach((step) => {
    step.addEventListener("mouseenter", () => setOpen(step));
    step.addEventListener("focus", () => setOpen(step));
    step.addEventListener("click", () => setOpen(step));

    step.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setOpen(step);
      }
    });
  });
}

function initRollout() {
  const steps = document.querySelectorAll(".rollout-step");
  const title = document.getElementById("rollout-title");
  const copy = document.getElementById("rollout-copy");

  if (!steps.length || !title || !copy) return;

  const content = {
    1: {
      title: "Piloto inicial",
      copy: "Permite comprobar la lógica operativa sin sobredimensionar despliegue, costo ni complejidad de adopción."
    },
    2: {
      title: "Aprendizaje operativo",
      copy: "La señal se calibra en contexto real: se ajustan reglas, se corrigen falsos positivos y se afina criterio operacional."
    },
    3: {
      title: "Zona implementada",
      copy: "Una vez validada la lógica, la solución deja de ser experimento y se convierte en capacidad operativa tangible sobre una zona."
    },
    4: {
      title: "Escalamiento por zonas",
      copy: "Cada nueva zona se implementa con menos riesgo, más precisión y una base de aprendizaje ya acumulada."
    }
  };

  const activate = (stepNumber) => {
    steps.forEach((step) => {
      step.classList.toggle("is-active", step.dataset.step === stepNumber);
    });

    title.textContent = content[stepNumber].title;
    copy.textContent = content[stepNumber].copy;
  };

  steps.forEach((step) => {
    const key = step.dataset.step;
    step.addEventListener("mouseenter", () => activate(key));
    step.addEventListener("focus", () => activate(key));
    step.addEventListener("click", () => activate(key));

    step.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activate(key);
      }
    });
  });
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
          const isMatch = link.getAttribute("href") === `#${id}`;
          link.style.color = isMatch ? "var(--text)" : "var(--muted)";
        });
      });
    },
    {
      threshold: 0.45,
      rootMargin: "-10% 0px -45% 0px"
    }
  );

  sections.forEach((section) => observer.observe(section));
}
