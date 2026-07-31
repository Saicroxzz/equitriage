import { NORMAL_RANGES } from '../utils/triageCalculator';

export default function PDFReportTemplate({ formData, triageResult, pdfRef }) {
  const { score, level, title, recommendation, alteredParameters } = triageResult;

  const getLevelColorStyle = (lvl) => {
    switch (lvl) {
      case 'Verde':
        return { bg: '#d1fae5', text: '#065f46', border: '#10b981' };
      case 'Amarillo':
        return { bg: '#fef3c7', text: '#92400e', border: '#f59e0b' };
      case 'Naranja':
        return { bg: '#ffedd5', text: '#9a3412', border: '#f97316' };
      case 'Rojo':
        return { bg: '#fee2e2', text: '#991b1b', border: '#ef4444' };
      default:
        return { bg: '#e2e8f0', text: '#1e293b', border: '#64748b' };
    }
  };

  const levelStyle = getLevelColorStyle(level);

  return (
    <div style={{ position: 'fixed', left: '-9999px', top: '-9999px', opacity: 0, pointerEvents: 'none' }} aria-hidden="true">
      <div
        ref={pdfRef}
        style={{
          width: '800px',
          padding: '35px 40px',
          backgroundColor: '#ffffff',
          color: '#0f172a',
          fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
          fontSize: '12px',
          lineHeight: '1.5',
          boxSizing: 'border-box',
        }}
      >
        {/* Header Header */}
        <div style={{ borderBottom: '3px solid #0f766e', paddingBottom: '12px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: '0', fontSize: '24px', fontWeight: 'bold', color: '#0f766e', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              REPORTE DE TRIAJE EQUINO
            </h1>
            <p style={{ margin: '3px 0 0 0', fontSize: '11px', color: '#64748b' }}>
              Sistema de Clasificación Fisiológica y Priorización Veterinaria - EQUITRIAGE
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#475569', textTransform: 'uppercase' }}>
              Fecha/Hora Emisión:
            </div>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#0f172a' }}>
              {formData.dateTime ? new Date(formData.dateTime).toLocaleString('es-ES') : new Date().toLocaleString('es-ES')}
            </div>
          </div>
        </div>

        {/* Bloque 1: Datos del Paciente */}
        <div style={{ marginBottom: '20px', backgroundColor: '#f8fafc', padding: '14px 16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#0f766e', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
            Bloque 1: Información Filiatoria del Paciente
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <tbody>
              <tr>
                <td style={{ padding: '4px 8px', fontWeight: 'bold', color: '#475569', width: '18%' }}>Nombre:</td>
                <td style={{ padding: '4px 8px', width: '32%', fontWeight: 'bold', color: '#0f172a' }}>{formData.name || '---'}</td>
                <td style={{ padding: '4px 8px', fontWeight: 'bold', color: '#475569', width: '18%' }}>Propietario:</td>
                <td style={{ padding: '4px 8px', width: '32%', color: '#0f172a' }}>{formData.owner || 'N/A'}</td>
              </tr>
              <tr>
                <td style={{ padding: '4px 8px', fontWeight: 'bold', color: '#475569' }}>Edad:</td>
                <td style={{ padding: '4px 8px', color: '#0f172a' }}>{formData.age ? `${formData.age} ${formData.ageUnit || 'Años'}` : '---'}</td>
                <td style={{ padding: '4px 8px', fontWeight: 'bold', color: '#475569' }}>Sexo:</td>
                <td style={{ padding: '4px 8px', color: '#0f172a' }}>{formData.sex || '---'}</td>
              </tr>
              <tr>
                <td style={{ padding: '4px 8px', fontWeight: 'bold', color: '#475569' }}>Peso Estimado:</td>
                <td style={{ padding: '4px 8px', color: '#0f172a' }}>{formData.weight ? `${formData.weight} kg` : '---'}</td>
                <td style={{ padding: '4px 8px', fontWeight: 'bold', color: '#475569' }}>Raza:</td>
                <td style={{ padding: '4px 8px', color: '#0f172a' }}>{formData.breed || '---'}</td>
              </tr>
              <tr>
                <td style={{ padding: '4px 8px', fontWeight: 'bold', color: '#475569' }}>Veterinario:</td>
                <td colSpan="3" style={{ padding: '4px 8px', color: '#0f172a', fontWeight: 'bold' }}>{formData.veterinarian || 'Sin especificar'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bloque 2: Tabla de Signos Vitales */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#0f766e', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
            Bloque 2: Signos Vitales y Constantes Fisiológicas
          </h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', border: '1px solid #cbd5e1' }}>
            <thead>
              <tr style={{ backgroundColor: '#f1f5f9', color: '#334155', textTransform: 'uppercase', fontSize: '11px' }}>
                <th style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'left', width: '40%' }}>Parámetro</th>
                <th style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'left', width: '30%' }}>Valor Evaluado</th>
                <th style={{ padding: '8px', border: '1px solid #cbd5e1', textAlign: 'left', width: '30%' }}>Rango Normal Equino</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', fontWeight: 'bold' }}>Temperatura Rectal</td>
                <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', fontWeight: 'bold' }}>{formData.temperature ? `${formData.temperature} °C` : 'N/E'}</td>
                <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', color: '#64748b' }}>{NORMAL_RANGES.temp.label}</td>
              </tr>
              <tr style={{ backgroundColor: '#fafafa' }}>
                <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', fontWeight: 'bold' }}>Frecuencia Cardíaca (FC)</td>
                <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', fontWeight: 'bold' }}>{formData.heartRate ? `${formData.heartRate} lpm` : 'N/E'}</td>
                <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', color: '#64748b' }}>{NORMAL_RANGES.fc.label}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', fontWeight: 'bold' }}>Frecuencia Respiratoria (FR)</td>
                <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', fontWeight: 'bold' }}>{formData.respRate ? `${formData.respRate} rpm` : 'N/E'}</td>
                <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', color: '#64748b' }}>{NORMAL_RANGES.fr.label}</td>
              </tr>
              <tr style={{ backgroundColor: '#fafafa' }}>
                <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', fontWeight: 'bold' }}>Tiempo Llenado Capilar (TRC)</td>
                <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', fontWeight: 'bold' }}>{formData.trc ? `${formData.trc} seg` : 'N/E'}</td>
                <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', color: '#64748b' }}>{NORMAL_RANGES.trc.label}</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', fontWeight: 'bold' }}>Color de Mucosas</td>
                <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', fontWeight: 'bold' }}>{formData.mucousMembranes || 'N/E'}</td>
                <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', color: '#64748b' }}>Rosadas (Normal)</td>
              </tr>
              <tr style={{ backgroundColor: '#fafafa' }}>
                <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', fontWeight: 'bold' }}>Grado de Hidratación</td>
                <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', fontWeight: 'bold' }}>{formData.hydration || 'N/E'}</td>
                <td style={{ padding: '6px 8px', border: '1px solid #cbd5e1', color: '#64748b' }}>Normal</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bloque 3: Evaluación Clínica por Sistemas */}
        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#0f766e', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
            Bloque 3: Hallazgos de Evaluación Clínica por Sistemas
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px', backgroundColor: '#ffffff' }}>
              <div style={{ fontWeight: 'bold', color: '#0f766e', marginBottom: '6px' }}>Digestivo / Cólico:</div>
              <div>Dolor Cólico: <strong>{formData.colicPain || 'Sin dolor'}</strong></div>
              <div>¿Se revuelca?: <strong>{formData.rolling || 'No'}</strong></div>
              <div>¿Patea abdomen?: <strong>{formData.kickingAbdomen || 'No'}</strong></div>
            </div>

            <div style={{ border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px', backgroundColor: '#ffffff' }}>
              <div style={{ fontWeight: 'bold', color: '#0f766e', marginBottom: '6px' }}>Locomotor / Podal:</div>
              <div>Caminar: <strong>{formData.canWalk || 'Sí'}</strong></div>
              <div>Fractura: <strong>{formData.fracture || 'No'}</strong></div>
              <div>Laminitis: <strong>{formData.laminitis || 'No'}</strong></div>
            </div>

            <div style={{ border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px', backgroundColor: '#ffffff' }}>
              <div style={{ fontWeight: 'bold', color: '#0f766e', marginBottom: '6px' }}>Respiratorio:</div>
              <div>Disnea: <strong>{formData.dyspnea || 'No'}</strong></div>
              <div>Cianosis: <strong>{formData.cyanosis || 'No'}</strong></div>
              <div>Secreción Nasal: <strong>{formData.nasalDischarge || 'No'}</strong></div>
            </div>

            <div style={{ border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px', backgroundColor: '#ffffff' }}>
              <div style={{ fontWeight: 'bold', color: '#0f766e', marginBottom: '6px' }}>Neurológico y ABCDE:</div>
              <div>Conciencia: <strong>{formData.consciousness || 'Alerta'}</strong></div>
              <div>Convulsiones: <strong>{formData.seizures || 'No'}</strong></div>
              <div>Ataxia: <strong>{formData.ataxia || 'No'}</strong></div>
            </div>
          </div>
        </div>

        {/* Bloque 4: Nivel de Triaje Final y Puntaje */}
        <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: levelStyle.bg, border: `2px solid ${levelStyle.border}`, borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', fontWeight: 'bold', color: levelStyle.text, letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>
                NIVEL DE TRIAJE ASIGNADO
              </span>
              <h3 style={{ margin: '0', fontSize: '20px', fontWeight: 'bold', color: levelStyle.text }}>
                {level.toUpperCase()} - {title}
              </h3>
            </div>
            <div style={{ backgroundColor: '#ffffff', padding: '8px 18px', borderRadius: '8px', border: `1px solid ${levelStyle.border}`, textAlign: 'center', minWidth: '80px' }}>
              <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', fontWeight: 'bold' }}>Puntaje Total</div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: levelStyle.text, lineHeight: '1.2' }}>{score} Pts</div>
            </div>
          </div>

          {alteredParameters && alteredParameters.length > 0 && (
            <div style={{ marginTop: '12px', borderTop: `1px solid ${levelStyle.border}`, paddingTop: '10px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '12px', color: levelStyle.text, marginBottom: '6px' }}>
                Resumen de Parámetros Alterados ({alteredParameters.length}):
              </div>
              <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '12px', color: levelStyle.text, lineHeight: '1.6' }}>
                {alteredParameters.map((param, idx) => (
                  <li key={idx}>
                    <strong>{param.name}:</strong> {param.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bloque 5: Recomendaciones de Atención */}
        <div style={{ marginBottom: '20px', backgroundColor: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#0f766e', borderBottom: '1px solid #cbd5e1', paddingBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
            Bloque 5: Recomendación Médica Inmediata
          </h2>
          <p style={{ margin: '0', fontSize: '12px', fontWeight: 'bold', color: '#1e293b', lineHeight: '1.5' }}>
            {recommendation}
          </p>
        </div>

        {/* Bloque 6: Observaciones y Comentarios del Veterinario */}
        <div style={{ marginBottom: '20px', border: '1px solid #cbd5e1', padding: '14px', borderRadius: '8px', minHeight: '70px', backgroundColor: '#ffffff' }}>
          <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#475569', marginBottom: '6px', textTransform: 'uppercase' }}>
            Bloque 6: Observaciones y Comentarios del Veterinario Evaluador:
          </div>
          <div style={{ fontSize: '12px', color: '#0f172a', whiteSpace: 'pre-wrap' }}>
            {formData.notes || 'Sin observaciones adicionales registradas.'}
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div style={{ marginTop: '24px', paddingTop: '10px', borderTop: '1px solid #e2e8f0', textAlign: 'center', fontSize: '10px', color: '#94a3b8' }}>
          EQUITRIAGE - Herramienta de priorización clínica equina. Este reporte es un instrumento de apoyo y no reemplaza el criterio médico veterinario profesional.
        </div>

      </div>
    </div>
  );
}
