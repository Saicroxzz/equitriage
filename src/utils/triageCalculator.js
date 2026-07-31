/**
 * EQUITRIAGE - Algoritmo de Puntuación y Clasificación de Triaje Equino
 * Basado en los rangos normativos fisiológicos y clínicos equinos.
 */

export const NORMAL_RANGES = {
  temp: { min: 37.2, max: 38.3, unit: '°C', label: '37.2 - 38.3 °C' },
  fc: { min: 28, max: 44, unit: 'lpm', label: '28 - 44 lpm' },
  fr: { min: 8, max: 16, unit: 'rpm', label: '8 - 16 rpm' },
  trc: { max: 2, unit: 'seg', label: '< 2 seg' },
};

/**
 * Calcula la puntuación total de triaje y genera el dictamen clínico.
 * @param {Object} data - Datos completos del formulario del paciente.
 * @returns {Object} Resultado del triaje con score, nivel, color, alterados y recomendaciones.
 */
export function calculateTriage(data) {
  let score = 0;
  const alteredParameters = [];
  let isRedFlag = false;
  const redFlagReasons = [];

  // --- MÓDULO 2: BANDERAS ROJAS (ABCDE) ---
  if (data.consciousness === 'Inconsciente') {
    isRedFlag = true;
    redFlagReasons.push('Paciente Inconsciente');
  }
  if (data.breathingPattern === 'No respira') {
    isRedFlag = true;
    redFlagReasons.push('Ausencia de Respiración');
  }
  if (data.pulse === 'Ausente') {
    isRedFlag = true;
    redFlagReasons.push('Ausencia de Pulso');
  }
  if (data.canStand === 'No' && data.canGetUp === 'No') {
    score += 4;
    alteredParameters.push({
      name: 'Postración Severa',
      value: 'No puede ponerse en pie',
      severity: 'high',
    });
  }

  // --- MÓDULO 3: SIGNOS VITALES ---
  // 1. Temperatura
  const temp = parseFloat(data.temperature);
  if (!isNaN(temp)) {
    if (temp >= 37.2 && temp <= 38.3) {
      // Normal 0 pts
    } else if (temp > 38.3 && temp <= 39.0) {
      score += 1;
      alteredParameters.push({ name: 'Temperatura Elevated', value: `${temp} °C`, severity: 'low' });
    } else if (temp > 39.0 && temp <= 39.5) {
      score += 2;
      alteredParameters.push({ name: 'Fiebre Moderada', value: `${temp} °C`, severity: 'medium' });
    } else if (temp > 39.5) {
      score += 3;
      alteredParameters.push({ name: 'Fiebre Severa / Hipertermia', value: `${temp} °C`, severity: 'high' });
    } else if (temp < 37.2) {
      score += 2;
      alteredParameters.push({ name: 'Hipotermia', value: `${temp} °C`, severity: 'medium' });
    }
  }

  // 2. Frecuencia Cardíaca (FC)
  const fc = parseFloat(data.heartRate);
  if (!isNaN(fc)) {
    if (fc >= 28 && fc <= 44) {
      // Normal 0 pts
    } else if (fc >= 45 && fc <= 60) {
      score += 1;
      alteredParameters.push({ name: 'Taquicardia Leve (FC)', value: `${fc} lpm`, severity: 'low' });
    } else if (fc >= 61 && fc <= 80) {
      score += 2;
      alteredParameters.push({ name: 'Taquicardia Moderada (FC)', value: `${fc} lpm`, severity: 'medium' });
    } else if (fc > 80) {
      score += 3;
      alteredParameters.push({ name: 'Taquicardia Severa (FC)', value: `${fc} lpm`, severity: 'high' });
    } else if (fc < 28) {
      score += 2;
      alteredParameters.push({ name: 'Bradicardia (FC)', value: `${fc} lpm`, severity: 'medium' });
    }
  }

  // 3. Frecuencia Respiratoria (FR)
  const fr = parseFloat(data.respRate);
  if (!isNaN(fr)) {
    if (fr >= 8 && fr <= 16) {
      // Normal 0 pts
    } else if (fr >= 17 && fr <= 24) {
      score += 1;
      alteredParameters.push({ name: 'Taquipnea Leve (FR)', value: `${fr} rpm`, severity: 'low' });
    } else if (fr >= 25 && fr <= 40) {
      score += 2;
      alteredParameters.push({ name: 'Taquipnea Moderada (FR)', value: `${fr} rpm`, severity: 'medium' });
    } else if (fr > 40) {
      score += 3;
      alteredParameters.push({ name: 'Taquipnea Severa (FR)', value: `${fr} rpm`, severity: 'high' });
    } else if (fr < 8) {
      score += 2;
      alteredParameters.push({ name: 'Bradipnea (FR)', value: `${fr} rpm`, severity: 'medium' });
    }
  }

  // 4. TRC (Tiempo Llenado Capilar)
  const trc = parseFloat(data.trc);
  if (!isNaN(trc)) {
    if (trc < 2) {
      // Normal 0 pts
    } else if (trc >= 2 && trc <= 3) {
      score += 1;
      alteredParameters.push({ name: 'TRC Prolongado (2-3s)', value: `${trc} seg`, severity: 'low' });
    } else if (trc > 3) {
      score += 2;
      alteredParameters.push({ name: 'TRC Muy Prolongado (>3s)', value: `${trc} seg`, severity: 'high' });
    }
  }

  // Mucosas y Hidratación
  if (data.mucousMembranes && data.mucousMembranes !== 'Rosadas (Normal)') {
    alteredParameters.push({ name: 'Mucosas Alteradas', value: data.mucousMembranes, severity: 'medium' });
  }
  if (data.hydration && data.hydration !== 'Normal') {
    alteredParameters.push({ name: 'Deshidratación', value: data.hydration, severity: 'medium' });
  }

  // --- MÓDULO 4: HALLAZGOS CLÍNICOS Y SISTEMAS ---
  // Dolor / Cólico
  if (data.colicPain === 'Leve') {
    score += 1;
    alteredParameters.push({ name: 'Dolor Abdominal / Cólico', value: 'Leve', severity: 'low' });
  } else if (data.colicPain === 'Moderado') {
    score += 2;
    alteredParameters.push({ name: 'Dolor Abdominal / Cólico', value: 'Moderado', severity: 'medium' });
  } else if (data.colicPain === 'Severo') {
    score += 3;
    alteredParameters.push({ name: 'Dolor Abdominal / Cólico', value: 'Severo', severity: 'high' });
  }

  // Hemorragia
  if (data.activeHemorrhage === 'Sí') {
    score += 3;
    alteredParameters.push({ name: 'Hemorragia Activa', value: 'Presente', severity: 'high' });
  }

  // Convulsiones
  if (data.seizures === 'Sí') {
    score += 5;
    alteredParameters.push({ name: 'Convulsiones / Cuadro Neurológico', value: 'Presente', severity: 'high' });
  }

  // Fracturas
  if (data.fracture === 'Abierta') {
    score += 5;
    alteredParameters.push({ name: 'Fractura Abierta', value: 'Emergencia traumatológica', severity: 'high' });
  } else if (data.fracture === 'Cerrada') {
    score += 2;
    alteredParameters.push({ name: 'Fractura Cerrada', value: 'Sospecha / Confirmada', severity: 'medium' });
  }

  // Laminitis
  if (data.laminitis === 'Sí') {
    score += 2;
    alteredParameters.push({ name: 'Laminitis', value: 'Signos de dolor podal', severity: 'medium' });
  }

  // Respiratorio
  if (data.dyspnea === 'Sí') {
    score += 2;
    alteredParameters.push({ name: 'Disnea (Dificultad respiratoria)', value: 'Presente', severity: 'high' });
  }
  if (data.cyanosis === 'Sí') {
    score += 2;
    alteredParameters.push({ name: 'Cianosis (Hipoxia)', value: 'Presente', severity: 'high' });
  }

  // Ataxia
  if (data.ataxia === 'Sí') {
    score += 2;
    alteredParameters.push({ name: 'Ataxia / Incoordinación', value: 'Presente', severity: 'medium' });
  }

  // --- DETERMINACIÓN DE NIVEL Y CATEGORÍA DE TRIAJE ---
  let level = 'Verde';
  let badgeColor = 'bg-emerald-500 text-white';
  let borderClass = 'border-emerald-500';
  let textClass = 'text-emerald-700 dark:text-emerald-400';
  let bgLight = 'bg-emerald-50 dark:bg-emerald-950/40';
  let title = 'Prioridad Baja (Paciente Estable)';
  let recommendation = 'Monitoreo de rutina y atención veterinaria estándar.';

  if (isRedFlag || score >= 13) {
    level = 'Rojo';
    badgeColor = 'bg-red-600 text-white animate-pulse';
    borderClass = 'border-red-600';
    textClass = 'text-red-700 dark:text-red-400';
    bgLight = 'bg-red-50 dark:bg-red-950/40';
    title = 'EMERGENCIA CRÍTICA (Acción Inmediata)';
    recommendation = 'ATENCIÓN INMEDIATA: Acceso IV inmediato, oxigenoterapia, estabilización hemodinámica y preparación de quirófano/cuidados intensivos.';
  } else if (score >= 8) {
    level = 'Naranja';
    badgeColor = 'bg-orange-500 text-white';
    borderClass = 'border-orange-500';
    textClass = 'text-orange-700 dark:text-orange-400';
    bgLight = 'bg-orange-50 dark:bg-orange-950/40';
    title = 'Urgencia Alta (Prioridad Elevada)';
    recommendation = 'Atención médica rápida prioritaria. Preparar fluidoterapia y medicación analgésica/estabilizadora en < 15-30 min.';
  } else if (score >= 4) {
    level = 'Amarillo';
    badgeColor = 'bg-amber-500 text-white';
    borderClass = 'border-amber-500';
    textClass = 'text-amber-700 dark:text-amber-400';
    bgLight = 'bg-amber-50 dark:bg-amber-950/40';
    title = 'Urgencia Leve (Prioridad Moderada)';
    recommendation = 'Atención prioritaria. Mantener monitoreo frecuente de signos vitales e iniciar evaluación diagnóstica.';
  }

  return {
    score,
    level,
    badgeColor,
    borderClass,
    textClass,
    bgLight,
    title,
    recommendation,
    alteredParameters,
    isRedFlag,
    redFlagReasons,
  };
}
