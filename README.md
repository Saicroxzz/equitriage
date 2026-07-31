# 🐴 EQUITRIAGE — Sistema de Triaje Veterinario Equino

**EQUITRIAGE** es una aplicación web progresiva y ultraligera (Single Page Application - SPA) diseñada para la clasificación rápida y estandarizada de urgencias clínicas en pacientes equinos. Basada en una evaluación fisiológica y por sistemas, la aplicación calcula automáticamente el nivel de prioridad de atención médica, genera un informe técnico y permite descargar un reporte en formato PDF listo para adjuntar a la historia clínica.

> ⚠️ **Aviso de responsabilidad clínica:** EQUITRIAGE **no diagnostica enfermedades**. Su único propósito es determinar la prioridad temporal de atención médica veterinaria para apoyo del personal en campo o en clínica.

---

## 🛠️ Stack Tecnológico

La aplicación está desarrollada con una arquitectura **100% Client-Side**, lo que garantiza un consumo nulo de recursos de servidor, independencia de backend y costo $0 de infraestructura:

* **Framework UI:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) *(Mobile-First & UI adaptable)*
* **Iconografía:** [Lucide React](https://lucide.dev/)
* **Generación de PDF:** `jsPDF` + `html2canvas`
* **Persistencia:** Web Storage API (`LocalStorage` para auto-guardado de borradores e historial)
* **Testing Automatizado:** [Playwright](https://playwright.dev/)
* **Despliegue:** [Netlify](https://www.netlify.com/) (Páginas estáticas / CI-CD)

---

## 📋 Módulos y Flujo de Evaluación

La interfaz utiliza un formato guiado por pasos (Wizard Form) optimizado para dispositivos móviles:

1. **Pantalla 1 — Registro del Paciente (`Step1Patient.jsx`):** Captura de datos filiatorios (Nombre, Edad, Sexo, Peso, Raza, Propietario y Veterinario a cargo).
2. **Pantalla 2 — Evaluación Primaria (`Step2ABCDE.jsx`):** Evaluación rápida del estado general (ABCDE simplificado). Si se detectan **Banderas Rojas** (*Inconsciente*, *Sin respiración* o *Sin pulso*), el sistema activa inmediatamente la alerta de **TRIAJE ROJO**.
3. **Pantalla 3 — Signos Vitales (`Step3Vitals.jsx`):** Registro de Constantes Fisiológicas (Temperatura, FC, FR, TRC, Mucosas e Hidratación) con detección visual instantánea de valores normales vs. alterados.
4. **Pantalla 4 — Evaluación Clínica por Sistemas (`Step4Clinical.jsx`):** Cuestionario dirigido para los sistemas Digestivo (Cólico), Locomotor (Laminitis / Fracturas), Respiratorio y Neurológico.
5. **Pantalla 5 — Resultado & Reporte PDF (`Step5Result.jsx`):** Tarjeta de clasificación por colores, resumen de parámetros alterados, recomendación de acción inmediata, campo de observaciones del veterinario y botón para descargar el reporte en PDF.

---

## 🧮 Algoritmo de Clasificación

El sistema suma puntuaciones acumulativas y aplica reglas de emergencia críticas (`triageCalculator.js`):

### Escala de Triaje

| Puntaje | Nivel | Color | Acción Recomendada |
| :---: | :---: | :---: | :--- |
| **0 – 3 pts** | **VERDE** | 🟩 | Paciente Estable. Atención general y monitoreo de rutina. |
| **4 – 7 pts** | **AMARILLO** | 🟨 | Urgencia Moderada. Evaluación prioritaria y reevaluación periódica. |
| **8 – 12 pts** | **NARANJA** | 🟧 | Urgencia Alta. Atención médica rápida y preparación de estabilización. |
| **≥ 13 pts / Red Flag** | **ROJO** | 🟥 | **Emergencia Crítica.** Atención inmediata, acceso IV y preparación para estabilización. |

---

## 🚀 Inicio Rápido en Desarrollo Local

### Prerrequisitos
Tener instalado **Node.js** (versión 18 o superior) y **npm**.

### Pasos para ejecutar:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/TU_USUARIO/equitriage.git](https://github.com/TU_USUARIO/equitriage.git)
   cd equitriage
Instalar dependencias:Bashnpm install
Iniciar el servidor de desarrollo:Bashnpm run dev
Probar en tu navegador:Abre la dirección http://localhost:5173/ en tu navegador.Probar en tu teléfono móvil (Misma red WiFi):Bashnpm run dev -- --host
Escanea la IP local que muestra la terminal desde tu teléfono.🧪 Pruebas Automatizadas con PlaywrightEl proyecto cuenta con integración de Playwright para pruebas de interfaz y pruebas end-to-end (E2E):Instalar navegadores de Playwright:Bashnpx playwright install
Ejecutar las pruebas:Bashnpx playwright test
📦 Compilación para ProducciónPara validar la compilación antes del despliegue:Bash# Verificar errores de código
npm run lint

# Compilar para producción
npm run build
La carpeta generada ./dist contendrá la aplicación optimizada lista para producción.🌐 Despliegue Gratuito en NetlifySube tu proyecto a un repositorio en GitHub.Inicia sesión en Netlify.Haz clic en "Add new site" $\rightarrow$ "Import an existing project".Selecciona tu repositorio de GitHub equitriage.Netlify detectará la configuración automáticamente:Build Command: npm run buildPublish Directory: distHaz clic en "Deploy Site". En pocos segundos tu aplicación estará en vivo.📂 Estructura del Proyectoequitriage/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Step1Patient.jsx
│   │   ├── Step2ABCDE.jsx
│   │   ├── Step3Vitals.jsx
│   │   ├── Step4Clinical.jsx
│   │   ├── Step5Result.jsx
│   │   ├── HistoryModal.jsx
│   │   └── PDFReportTemplate.jsx
│   ├── utils/
│   │   ├── triageCalculator.js
│   │   └── pdfGenerator.js
│   └── hooks/
│       └── useLocalStorage.js
└── README.md
📄 LicenciaEste proyecto está bajo la Licencia MIT. Puedes utilizarlo, modificarlo y distribuirlo libremente para fines académicos, personales o profesionales.