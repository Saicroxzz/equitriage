# ESPECIFICACIONES TÉCNICAS Y DE DESARROLLO: EQUITRIAGE

**Sistema de Triaje Veterinario Equino (SPA Web App)**

---

## 1. RESUMEN DEL PROYECTO

**EQUITRIAGE** es una aplicación web responsiva de página única (SPA), diseñada para realizar evaluaciones de triaje rápidas en equinos directamente en campo o en clínica. El sistema permite registrar los datos del paciente, evaluar el estado general (ABCDE simplificado), capturar signos vitales y signos clínicos por sistemas, calcular automáticamente el nivel de urgencia mediante un algoritmo de puntuación estandarizado y generar un reporte final descargable en formato PDF.

> **Importante:** La aplicación no diagnostica enfermedades. Únicamente clasifica la prioridad de atención del paciente equino para apoyo del personal veterinario.

---

## 2. ARQUITECTURA Y STACK TECNOLÓGICO

El proyecto está diseñado para funcionar **100% Client-Side** (sin backend ni base de datos externa), lo que permite un despliegue gratuito, instantáneo y con costo de infraestructura cero en **Netlify**.

### 2.1 Stack Seleccionado

| Capa / Herramienta | Tecnología | Descripción / Propósito |
| :--- | :--- | :--- |
| **Framework UI** | React 18+ (con Vite) | SPA ultraligera, desarrollo rápido y gestión de componentes por pantalla. |
| **Lenguaje** | JavaScript (ES6+) / TypeScript | Lógica de la aplicación y cálculo del algoritmo. |
| **Estilos CSS** | Tailwind CSS v3+ | Diseño *Mobile-First*, responsivo y código de colores oficial de triaje. |
| **Iconografía** | Lucide React | Iconos vectoriales limpios y ligeros para interfaz clínica. |
| **Generación PDF** | `jsPDF` + `html2canvas` | Generación del reporte profesional cliente-side sin servidores. |
| **Persistencia Local** | `LocalStorage` (Web Storage API) | Auto-guardado de borrador y almacenamiento de historial local en el dispositivo. |
| **Hosting / CI-CD** | Netlify (Free Tier) | Despliegue continuo desde repositorio GitHub/GitLab. |

---

## 3. REQUISITOS DE DISEÑO Y UX/UI (MOBILE-FIRST)

1. **Diseño Adaptativo (Mobile-First):** La interfaz debe estar optimizada para smartphones (uso con una sola mano en campo), tabletas y computadoras de escritorio.
2. **Navegación por Pasos (Wizard Form):** Control visual con barra de progreso superior que indica la pantalla actual.
3. **Alto Contraste y Botones Táctiles Amplios:** Botones táctiles de mínimo `48px` de altura para facilitar su uso con guantes veterinarios.
4. **Resaltado de Triaje Inmediato:** Codificación de colores universal:
   - 🟩 **Verde:** Prioridad Baja (Puntaje 0 - 3)
   - 🟨 **Amarillo:** Prioridad Moderada (Puntaje 4 - 7)
   - 🟧 **Naranja:** Prioridad Alta (Puntaje 8 - 12)
   - 🟥 **Rojo:** Emergencia Crítica (Puntaje ≥ 13 o banderas rojas inmediatas)

---

## 4. ESTRUCTURA DE MÓDULOS DE LA APLICACIÓN

### Módulo 1: Registro del Paciente (Pantalla 1)
- **Campos de Entrada:**
  - `Nombre del paciente` (Obligatorio - Texto)
  - `Propietario` (Opcional - Texto)
  - `Edad` (Obligatorio - Número/Años o Meses)
  - `Sexo` (Obligatorio - Selector: Macho, Hembra, Castrado)
  - `Peso` (Obligatorio - Número / kg)
  - `Raza` (Obligatorio - Texto)
  - `Fecha y Hora` (Automático / Modificable)
  - `Médico Veterinario` (Opcional - Texto)
- **Acciones:**
  - Botón: "Comenzar Evaluación" (Valida campos requeridos y avanza al Módulo 2).

### Módulo 2: Evaluación Primaria ABCDE Simplificada (Pantalla 2)
- **A. Estado General:**
  - ¿Está de pie? `[Sí / No]`
  - En caso de No: ¿Puede levantarse? `[Sí / No]`
  - Estado de conciencia: `[Alerta / Deprimido / Inconsciente]`
- **B. Respiración:**
  - Frecuencia y patrón: `[Normal / Aumentada / Muy dificultosa / No respira]`
- **C. Circulación:**
  - ¿Hay hemorragia activa? `[Sí / No]`
  - Pulso: `[Normal / Débil / Ausente]`
- **Regla de Emergencia Inmediata (Banderas Rojas):**
  - Si el caballo: **No respira** OR **No tiene pulso** OR está **Inconsciente**:
    - Se marca inmediatamente la evaluación como **TRIAJE ROJO**.
    - La app muestra una alerta en pantalla pero permite continuar llenando el formulario completo para registro técnico.

### Módulo 3: Signos Vitales (Pantalla 3)
Formulario con cálculo directo de rangos normativos equinos:

| Parámetro | Valor Normal | Evaluación Automática en Pantalla |
| :--- | :--- | :--- |
| **Temperatura (°C)** | 37.2 - 38.3 °C | Normal / Alterado / Muy alterado |
| **Frecuencia Cardíaca (FC)** | 28 - 44 lpm | Normal / Alterado / Muy alterado |
| **Frecuencia Respiratoria (FR)** | 8 - 16 rpm | Normal / Alterado / Muy alterado |
| **Tiempo de Llenado Capilar (TRC)** | < 2 segundos | Normal / Prolongado |
| **Color de Mucosas** | Rosadas | Normal (Rosadas) / Alterado (Pálidas, Congestivas, Cianóticas, Ictéricas) |
| **Hidratación** | Normal | Normal / Deshidratación Leve / Moderada / Severa |

### Módulo 4: Evaluación Clínica por Sistemas (Pantalla 4)
- **Sistema Digestivo:**
  - Presencia de Cólico: `[No / Leve / Moderado / Severo]`
  - ¿Se revuelca?: `[Sí / No]`
  - ¿Patea el abdomen?: `[Sí / No]`
- **Sistema Locomotor:**
  - ¿Puede caminar?: `[Sí / No]`
  - Fractura: `[No / Cerrada / Abierta]`
  - ¿Presenta laminitis?: `[Sí / No]`
- **Sistema Respiratorio:**
  - Disnea: `[Sí / No]`
  - Cianosis: `[Sí / No]`
  - Secreción nasal: `[Sí / No]`
- **Sistema Neurológico:**
  - Convulsiones: `[Sí / No]`
  - Ataxia: `[Sí / No]`
  - No responde: `[Sí / No]`

---

## 5. ALGORITMO DE PUNTUACIÓN Y CLASIFICACIÓN

El algoritmo suma los puntos asignados según las siguientes variables:

### 5.1 Tabla de Puntuación

```
1. Temperatura (°C):
   - 37.2 - 38.3 °C  ->  0 pts
   - 38.4 - 39.0 °C  ->  1 pt
   - 39.1 - 39.5 °C  ->  2 pts
   - > 39.5 °C       ->  3 pts

2. Frecuencia Cardíaca (FC):
   - 28 - 44 lpm     ->  0 pts
   - 45 - 60 lpm     ->  1 pt
   - 61 - 80 lpm     ->  2 pts
   - > 80 lpm        ->  3 pts

3. Frecuencia Respiratoria (FR):
   - 8 - 16 rpm      ->  0 pts
   - 17 - 24 rpm     ->  1 pt
   - 25 - 40 rpm     ->  2 pts
   - > 40 rpm        ->  3 pts

4. Tiempo de Llenado Capilar (TRC):
   - < 2 seg         ->  0 pts
   - 2 - 3 seg       ->  1 pt
   - > 3 seg         ->  2 pts

5. Evaluaciones Específicas:
   - Dolor (Cólico / General): Sin dolor (0 pts) | Leve (1 pt) | Moderado (2 pts) | Severo (3 pts)
   - Hemorragia Activa: No (0 pts) | Sí (3 pts)
   - Convulsiones: No (0 pts) | Sí (5 pts)
   - No puede levantarse: No (0 pts) | Sí (4 pts)
   - Fractura abierta: No (0 pts) | Sí (5 pts)
```

### 5.2 Escala de Clasificación Final

| Puntaje Total | Nivel de Triaje | Indicador Visual | Acción Recomendada |
| :---: | :---: | :---: | :--- |
| **0 - 3 pts** | **Verde** | 🟩 Paciente Estable | Atención general / Monitoreo de rutina. |
| **4 - 7 pts** | **Amarillo** | 🟨 Urgencia Leve | Atención prioritaria. Monitoreo constante. |
| **8 - 12 pts** | **Naranja** | 🟧 Urgencia Alta | Atención médica rápida. Preparar estabilización. |
| **≥ 13 pts** | **Rojo** | 🟥 Emergencia Crítica | **Atención inmediata.** Acceso IV, oxigenoterapia y estabilización urgente. |

---

## 6. MÓDULO DE RESULTADO Y REPORTE PDF

### 6.1 Tarjeta de Resultado en Pantalla
Muestra de forma prominente:
- Nivel de Triaje y Color correspondiente.
- Puntaje total calculated.
- Resumen automático de **Parámetros Alterados**.
- **Recomendación clínica inmediata** según el nivel.
- Botón: **"Generar Reporte PDF"**.
- Botón: **"Nueva Evaluación"** (Reinicia el borrador).

### 6.2 Especificaciones del Reporte PDF
El documento generado debe contar con la siguiente estructura limpia:
- **Encabezado:** Título "REPORTE DE TRIAJE EQUINO", Fecha y Hora de emisión.
- **Bloque 1:** Datos del Paciente (Nombre, Propietario, Edad, Peso, Sexo, Raza, Veterinario).
- **Bloque 2:** Tabla de Signos Vitales y comparación con valores normales.
- **Bloque 3:** Hallazgos de Evaluación Clínica por Sistemas.
- **Bloque 4:** Nivel de Triaje Final, Puntaje Obtenido y Lista de Parámetros Alterados.
- **Bloque 5:** Recomendaciones de Atención.
- **Bloque 6:** Sección editable / campo para "Observaciones y Comentarios del Veterinario".

---

## 7. ESTRUCTURA DE ARCHIVOS DEL PROYECTO

```
equitriage/
├── index.html
├── package.json
├── tailwind.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── ProgressBar.jsx
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
```
