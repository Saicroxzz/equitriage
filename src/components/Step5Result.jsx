import { useState } from 'react';
import { Award, FileText, Save, RotateCcw, AlertTriangle, CheckCircle2, ShieldAlert, ChevronLeft, Edit3, Sparkles } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';
import PDFReportTemplate from './PDFReportTemplate';

export default function Step5Result({
  formData,
  updateFormData,
  triageResult,
  onReset,
  onSaveToHistory,
  onPrev,
  pdfRef,
}) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { score, level, badgeColor, borderClass, textClass, bgLight, title, recommendation, alteredParameters, isRedFlag, redFlagReasons } = triageResult;

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await generatePDF(pdfRef.current, formData.name);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleSave = () => {
    onSaveToHistory({
      ...formData,
      triageResult,
      savedAt: new Date().toISOString(),
      id: Date.now().toString(),
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Hidden PDF Template for Capture */}
      <PDFReportTemplate formData={formData} triageResult={triageResult} pdfRef={pdfRef} />

      {/* Main Result Card */}
      <div className={`p-6 sm:p-8 rounded-3xl border-2 shadow-2xl transition-all ${bgLight} ${borderClass}`}>
        
        {/* Top Badge & Score */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/20 pb-6">
          <div>
            <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest ${badgeColor}`}>
              <Award className="w-4 h-4" />
              TRIAGE {level}
            </span>
            <h2 className={`text-2xl sm:text-3xl font-black mt-2 tracking-tight ${textClass}`}>
              {title}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Evaluación realizada: {formData.name || 'Paciente Equino'} (Sexo: {formData.sex || 'N/E'}, Castrado: {formData.isCastrated || 'No'}, {formData.age} {formData.ageUnit})
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 self-start sm:self-auto">
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Puntaje Total</span>
              <span className="text-3xl font-black text-slate-100">{score} <span className="text-xs font-semibold text-slate-400">pts</span></span>
            </div>
          </div>
        </div>

        {/* Red Flag Warning notice if triggered */}
        {isRedFlag && (
          <div className="mt-6 p-4 rounded-2xl bg-red-600/20 border border-red-500 text-red-200 flex items-start space-x-3">
            <ShieldAlert className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-red-300 uppercase tracking-wider">Criterio de Emergencia Inmediata (Banderas Rojas)</h4>
              <p className="text-xs mt-0.5 text-red-200">
                Se detectaron hallazgos críticos de riesgo vital: <strong>{redFlagReasons.join(', ')}</strong>.
              </p>
            </div>
          </div>
        )}

        {/* Altered Parameters Summary */}
        <div className="mt-6">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Parámetros Alterados Identificados ({alteredParameters.length})</span>
          </h3>

          {alteredParameters.length === 0 ? (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Todos los signos vitales y hallazgos clínicos se encuentran dentro de rangos normales fisiológicos equinos.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {alteredParameters.map((param, index) => (
                <div
                  key={index}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-slate-200">{param.name}</span>
                  <span className={`px-2.5 py-1 rounded-lg font-bold ${
                    param.severity === 'high'
                      ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                      : param.severity === 'medium'
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {param.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Immediate Clinical Recommendation */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
          <h3 className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>Recomendación Clínica Inmediata</span>
          </h3>
          <p className="text-sm text-slate-100 font-medium leading-relaxed">
            {recommendation}
          </p>
        </div>

        {/* Veterinarian Editable Notes */}
        <div className="mt-6 space-y-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Edit3 className="w-4 h-4 text-slate-400" />
            <span>Observaciones y Comentarios del Médico Veterinario</span>
          </label>
          <textarea
            rows="3"
            placeholder="Ingrese tratamientos administrados, observaciones de diagnóstico presuntivo o notas de seguimiento..."
            value={formData.notes || ''}
            onChange={(e) => updateFormData({ notes: e.target.value })}
            className="w-full p-4 rounded-2xl bg-slate-900/90 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500 transition-all"
          ></textarea>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        
        {/* Previous Button */}
        <button
          type="button"
          onClick={onPrev}
          className="h-14 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center space-x-2 transition-all min-h-[52px] touch-manipulation cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Modificar Datos</span>
        </button>

        {/* Save to History */}
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaved}
          className={`h-14 px-6 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all min-h-[52px] touch-manipulation cursor-pointer ${
            isSaved
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30'
          }`}
        >
          <Save className="w-5 h-5" />
          <span>{isSaved ? '¡Guardado en Historial!' : 'Guardar en Historial'}</span>
        </button>

        {/* Download PDF Report */}
        <button
          type="button"
          onClick={handleDownloadPDF}
          disabled={isGeneratingPDF}
          className="flex-1 h-14 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 transition-all active:scale-[0.98] min-h-[52px] touch-manipulation cursor-pointer"
        >
          <FileText className="w-5 h-5" />
          <span>{isGeneratingPDF ? 'Generando PDF...' : 'Generar Reporte PDF'}</span>
        </button>

        {/* New Evaluation */}
        <button
          type="button"
          onClick={onReset}
          className="h-14 px-6 rounded-xl bg-slate-800 hover:bg-red-900/30 hover:text-red-300 text-slate-300 font-bold text-sm flex items-center justify-center space-x-2 transition-all border border-slate-700 min-h-[52px] touch-manipulation cursor-pointer"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Nueva Evaluación</span>
        </button>

      </div>

    </div>
  );
}
