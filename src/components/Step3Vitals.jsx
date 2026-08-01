import { Activity, Thermometer, Heart, Wind, Clock, Eye, Droplets, ChevronRight, ChevronLeft } from 'lucide-react';
import { NORMAL_RANGES } from '../utils/triageCalculator';

export default function Step3Vitals({ formData, updateFormData, onNext, onPrev }) {

  // Visual status helpers
  const getTempStatus = (val) => {
    const v = parseFloat(val);
    if (isNaN(v)) return null;
    if (v >= 37.2 && v <= 38.3) return { text: 'Normal (37.2-38.3 °C)', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
    if (v > 38.3 && v <= 39.0) return { text: 'Elevada (38.4-39.0 °C)', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
    if (v > 39.0 && v <= 39.5) return { text: 'Fiebre Moderada (39.1-39.5 °C)', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' };
    if (v > 39.5) return { text: 'Fiebre Severa / Hipertermia (>39.5 °C)', color: 'bg-red-500/20 text-red-300 border-red-500/30' };
    return { text: 'Hipotermia (<37.2 °C)', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' };
  };

  const getFcStatus = (val) => {
    const v = parseFloat(val);
    if (isNaN(v)) return null;
    if (v >= 28 && v <= 44) return { text: 'Normal (28-44 lpm)', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
    if (v >= 45 && v <= 60) return { text: 'Taquicardia Leve (45-60 lpm)', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
    if (v >= 61 && v <= 80) return { text: 'Taquicardia Moderada (61-80 lpm)', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' };
    if (v > 80) return { text: 'Taquicardia Severa (>80 lpm)', color: 'bg-red-500/20 text-red-300 border-red-500/30' };
    return { text: 'Bradicardia (<28 lpm)', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' };
  };

  const getFrStatus = (val) => {
    const v = parseFloat(val);
    if (isNaN(v)) return null;
    if (v >= 8 && v <= 16) return { text: 'Normal (8-16 rpm)', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
    if (v >= 17 && v <= 24) return { text: 'Taquipnea Leve (17-24 rpm)', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
    if (v >= 25 && v <= 40) return { text: 'Taquipnea Moderada (25-40 rpm)', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' };
    if (v > 40) return { text: 'Taquipnea Severa (>40 rpm)', color: 'bg-red-500/20 text-red-300 border-red-500/30' };
    return { text: 'Bradipnea (<8 rpm)', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' };
  };

  const getTrcStatus = (val) => {
    const v = parseFloat(val);
    if (isNaN(v)) return null;
    if (v < 2) return { text: 'Normal (< 2s)', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
    if (v >= 2 && v <= 3) return { text: 'Prolongado (2-3s)', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
    return { text: 'Muy Prolongado (> 3s)', color: 'bg-red-500/20 text-red-300 border-red-500/30' };
  };

  const tempStatus = getTempStatus(formData.temperature);
  const fcStatus = getFcStatus(formData.heartRate);
  const frStatus = getFrStatus(formData.respRate);
  const trcStatus = getTrcStatus(formData.trc);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900/40 to-slate-900/60 p-4 rounded-2xl border border-teal-500/20 mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-teal-500/20 text-teal-400 rounded-xl">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">Módulo 3: Signos Vitales Equinos</h2>
            <p className="text-xs text-slate-400">Medición fisiológica directa y comparación automática con constantes normativas.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Temperatura */}
        <div className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-rose-400" />
              <span>Temperatura Rectal (°C)</span>
            </label>
            <span className="text-[10px] text-slate-400">Normal: {NORMAL_RANGES.temp.label}</span>
          </div>

          <div className="relative">
            <input
              type="number"
              step="0.1"
              min="30"
              max="45"
              placeholder="Ej. 37.8"
              value={formData.temperature || ''}
              onChange={(e) => updateFormData({ temperature: e.target.value })}
              className="w-full h-12 px-4 pr-12 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-teal-500 transition-all font-semibold"
            />
            <span className="absolute right-4 top-3.5 text-xs font-bold text-slate-400">°C</span>
          </div>

          {tempStatus && (
            <div className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center justify-between ${tempStatus.color}`}>
              <span>Estado:</span>
              <span>{tempStatus.text}</span>
            </div>
          )}
        </div>

        {/* Frecuencia Cardíaca (FC) */}
        <div className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-red-400" />
              <span>Frecuencia Cardíaca (FC)</span>
            </label>
            <span className="text-[10px] text-slate-400">Normal: {NORMAL_RANGES.fc.label}</span>
          </div>

          <div className="relative">
            <input
              type="number"
              min="10"
              max="150"
              placeholder="Ej. 36"
              value={formData.heartRate || ''}
              onChange={(e) => updateFormData({ heartRate: e.target.value })}
              className="w-full h-12 px-4 pr-12 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-teal-500 transition-all font-semibold"
            />
            <span className="absolute right-4 top-3.5 text-xs font-bold text-slate-400">lpm</span>
          </div>

          {fcStatus && (
            <div className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center justify-between ${fcStatus.color}`}>
              <span>Estado:</span>
              <span>{fcStatus.text}</span>
            </div>
          )}
        </div>

        {/* Frecuencia Respiratoria (FR) */}
        <div className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Wind className="w-4 h-4 text-cyan-400" />
              <span>Frecuencia Respiratoria (FR)</span>
            </label>
            <span className="text-[10px] text-slate-400">Normal: {NORMAL_RANGES.fr.label}</span>
          </div>

          <div className="relative">
            <input
              type="number"
              min="4"
              max="100"
              placeholder="Ej. 12"
              value={formData.respRate || ''}
              onChange={(e) => updateFormData({ respRate: e.target.value })}
              className="w-full h-12 px-4 pr-12 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-teal-500 transition-all font-semibold"
            />
            <span className="absolute right-4 top-3.5 text-xs font-bold text-slate-400">rpm</span>
          </div>

          {frStatus && (
            <div className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center justify-between ${frStatus.color}`}>
              <span>Estado:</span>
              <span>{frStatus.text}</span>
            </div>
          )}
        </div>

        {/* Tiempo de Llenado Capilar (TRC) */}
        <div className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Tiempo Llenado Capilar (TRC)</span>
            </label>
            <span className="text-[10px] text-slate-400">Normal: {NORMAL_RANGES.trc.label}</span>
          </div>

          <div className="relative">
            <input
              type="number"
              step="0.5"
              min="0.5"
              max="10"
              placeholder="Ej. 1.5"
              value={formData.trc || ''}
              onChange={(e) => updateFormData({ trc: e.target.value })}
              className="w-full h-12 px-4 pr-12 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-teal-500 transition-all font-semibold"
            />
            <span className="absolute right-4 top-3.5 text-xs font-bold text-slate-400">seg</span>
          </div>

          {trcStatus && (
            <div className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center justify-between ${trcStatus.color}`}>
              <span>Estado:</span>
              <span>{trcStatus.text}</span>
            </div>
          )}
        </div>

      </div>

      {/* Color de Mucosas e Hidratación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Color de Mucosas */}
        <div className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 space-y-3">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Eye className="w-4 h-4 text-pink-400" />
            <span>Color de Mucosas Gingivales</span>
          </label>

          <div className="grid grid-cols-2 gap-2">
            {[
              { val: 'Rosadas', class: 'bg-emerald-600' },
              { val: 'Pálidas', class: 'bg-slate-600' },
              { val: 'Congestivas', class: 'bg-rose-700' },
              { val: 'Cianóticas', class: 'bg-indigo-700' },
              { val: 'Ictéricas', class: 'bg-amber-600' },
            ].map((opt) => (
              <button
                type="button"
                key={opt.val}
                onClick={() => updateFormData({ mucousMembranes: opt.val })}
                className={`h-12 px-2 rounded-xl text-xs font-bold transition-all border text-left flex items-center justify-center ${
                  (formData.mucousMembranes === opt.val || (opt.val === 'Rosadas' && formData.mucousMembranes === 'Rosadas (Normal)'))
                    ? `${opt.class} text-white border-transparent shadow-md`
                    : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                {opt.val}
              </button>
            ))}
          </div>
        </div>

        {/* Grado de Hidratación */}
        <div className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 space-y-3">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Droplets className="w-4 h-4 text-blue-400" />
            <span>Grado de Hidratación</span>
          </label>

          <div className="grid grid-cols-2 gap-2">
            {[
              { val: 'Normal', class: 'bg-emerald-600' },
              { val: 'Deshidratación Leve', class: 'bg-amber-600' },
              { val: 'Deshidratación Moderada', class: 'bg-orange-600' },
              { val: 'Deshidratación Severa', class: 'bg-red-700' },
            ].map((opt) => (
              <button
                type="button"
                key={opt.val}
                onClick={() => updateFormData({ hydration: opt.val })}
                className={`h-12 px-2 rounded-xl text-xs font-bold transition-all border text-left flex items-center justify-center ${
                  formData.hydration === opt.val
                    ? `${opt.class} text-white border-transparent shadow-md`
                    : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                {opt.val}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 flex justify-between items-center gap-4">
        <button
          type="button"
          onClick={onPrev}
          className="h-14 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center space-x-2 transition-all min-h-[52px] touch-manipulation cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Anterior</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="h-14 px-8 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-base shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 transition-all active:scale-[0.98] min-h-[52px] touch-manipulation cursor-pointer"
        >
          <span>Siguiente: Evaluación por Sistemas</span>
          <ChevronRight className="w-5 h-5 stroke-[3]" />
        </button>
      </div>

    </div>
  );
}
