// Datos: Semestres y requisitos (puedes añadir más relaciones si lo deseas)
const malla = {
  "1º semestre": [
    "Socioantropología Educacional",
    "Construcción de la Identidad Profesional Docente",
    "Fundamentos e Historia de la Educación Parvularia",
    "Epistemología del juego y de la Infancia",
    "Desarrollo Personal y Psicodinámica de las RRHH",
    "Desarrollo de Habilidades de Pensamiento"
  ],
  "2º semestre": [
    "Filosofía Educacional",
    "Bases Psicológicas del Aprendizaje",
    "Pedagogía Comunitaria, Familias y Comunidades",
    "Contextos Educativos en Educación Parvularia",
    "Expresión de la Corporeidad",
    "Comunicación Oral y Escrita"
  ],
  "3º semestre": [
    "Enfoques Curriculares",
    "Procesos Psicológicos del Desarrollo Humano",
    "Fundamentos de la Mediación Pedagógica",
    "Bases Biológicas y Ecológicas del Desarrollo Humano I",
    "Corporeidad y Motricidad",
    "Desarrollo de la Comprensión Lectora en inglés"
  ],
  "4º semestre": [
    "Inclusión y Contextos Educativos en Educación Parvularia",
    "Interpretación de la Conducta Infantil",
    "Desarrollo de Funciones Emocionales y Cognitivas del Párvulo",
    "Bases Biológicas y Ecológicas del Desarrollo Humano I",
    "Pedagogía de la Identidad de Género",
    "Teorías de la Educación"
  ],
  "5º semestre": [
    "Teoría Evaluativa",
    "Apreciación y Expresión Musical del/la Educador/a de Párvulos",
    "Curriculum de la Educación Parvularia",
    "Diseño Curricular de la Educación Parvularia I",
    "Didáctica del Pensamiento Matemático en Educación Parvularia",
    "Epistemología y Paradigmas de la Investigación Educativa"
  ],
  "6º semestre": [
    "Diseño de Procesos Evaluativos en Educación Parvularia I",
    "Diseño de Procesos de Enseñanza y Aprendizaje en Educación Parvularia",
    "Didáctica de la Expresión Musical y Teatral en el Párvulo",
    "Didáctica de las Ciencias Sociales, Naturales y Pensamiento Matemático en Educación Parvularia",
    "Práctica Pedagógica Sala Cuna y Nivel Medio",
    "Análisis de Proyectos de Investigación Educativa"
  ],
  "7º semestre": [
    "Liderazgo Pedagógico",
    "Diseño Curricular de la Educación Parvularia II",
    "Diseño de Procesos Evaluativos en Educación Parvularia II",
    "Didáctica del Lenguaje Verbal I",
    "Práctica Pedagógica Nivel de Transición",
    "Metodología de la Investigación Educacional"
  ],
  "8º semestre": [
    "Taller de Gestión e Innovación en Educación Parvularia",
    "Convivencia Democrática en Contextos Educativos",
    "Recursos Digitales para el Aprendizaje del/la Educador/a de Párvulos",
    "Lenguaje Plástico Visual del Párvulo",
    "Didáctica del Lenguaje Verbal II y Literatura Infantil",
    "Seminario de Licenciatura en Educación"
  ],
  "9º semestre": [
    "Controversias Éticas en la Identidad Profesional del/la Educador/a de Párvulos",
    "Profesional del/la Educadora de Párvulos Lenguajes Artísticos Integrados",
    "Trabajo de Integración Disciplinar Didáctico en Educación Parvularia",
    "Pensamiento Crítico y Resolución de Problemas"
  ],
  "10º semestre": [
    "Práctica Profesional",
    "Educación y Formación Ciudadana"
  ]
};

// Requisitos de ejemplo: puedes personalizar más
const requisitos = {
  "Bases Biológicas y Ecológicas del Desarrollo Humano I": ["Procesos Psicológicos del Desarrollo Humano"],
  "Diseño Curricular de la Educación Parvularia II": ["Diseño Curricular de la Educación Parvularia I"],
  "Diseño de Procesos Evaluativos en Educación Parvularia II": ["Diseño de Procesos Evaluativos en Educación Parvularia I"],
  "Práctica Profesional": ["Práctica Pedagógica Nivel de Transición", "Trabajo de Integración Disciplinar Didáctico en Educación Parvularia"]
};

const mallaContainer = document.getElementById("malla");
const mensaje = document.getElementById("mensaje");

const aprobados = new Set(JSON.parse(localStorage.getItem("aprobados")) || []);

function guardarEstado() {
  localStorage.setItem("aprobados", JSON.stringify([...aprobados]));
}

function mostrarMensaje(texto) {
  mensaje.textContent = texto;
  mensaje.classList.add("visible");
  setTimeout(() => mensaje.classList.remove("visible"), 3500);
}

function renderMalla() {
  mallaContainer.innerHTML = "";
  for (const [semestre, ramos] of Object.entries(malla)) {
    const columna = document.createElement("div");
    columna.className = "semestre";
    const titulo = document.createElement("h2");
    titulo.textContent = semestre;
    columna.appendChild(titulo);

    ramos.forEach(ramo => {
      const boton = document.createElement("button");
      boton.textContent = ramo;
      boton.className = "ramo";

      const faltantes = requisitos[ramo]?.filter(req => !aprobados.has(req)) || [];

      if (aprobados.has(ramo)) {
        boton.classList.add("aprobado");
      } else if (faltantes.length > 0) {
        boton.classList.add("bloqueado");
      }

      boton.addEventListener("click", () => {
        if (aprobados.has(ramo)) {
          aprobados.delete(ramo);
        } else if (faltantes.length > 0) {
          mostrarMensaje(`Faltan: ${faltantes.join(", ")}`);
          return;
        } else {
          aprobados.add(ramo);
        }
        guardarEstado();
        renderMalla();
      });

      columna.appendChild(boton);
    });

    mallaContainer.appendChild(columna);
  }
}

renderMalla();

