import { AlertTriangle, ChevronRight, ChevronLeft, ShieldAlert, HeartPulse, Activity, Wind } from 'lucide-react';

export default function Step2ABCDE({ formData, updateFormData, onNext, onPrev }) {

  // Chequeo de banderas rojas instantáneas
  const isRedFlag =
    formData.consciousness === 'Inconsciente' ||
    formData.breathingPattern === 'No respira' ||
    formData.pulse === 'Ausente';

  return (
    <div className="space-y-6">
      
      {/* Module Header */}
      <div className="bg-gradient-to-r from-amber-900/40 to-slate-900/60 p-4 rounded-2xl border border-amber-500/20 mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">Módulo 2: Evaluación Primaria ABCDE Simplificada</h2>
            <p className="text-xs text-slate-400">Detección inmediata de riesgo vital y banderas rojas de emergencia.</p>
          </div>
        </div>
      </div>

      {/* Red Flag Warning Banner */}
      {isRedFlag && (
        <div className="p-4 rounded-2xl bg-red-600/20 border-2 border-red-500 text-red-200 animate-pulse flex items-start space-x-3 shadow-lg shadow-red-900/40">
          <ShieldAlert className="w-7 h-7 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-red-400">
              🚨 BANDERA ROJA - EMERGENCIA CRÍTICA DETECTADA
            </h3>
            <p className="text-xs mt-1 text-red-200">
              El paciente presenta criterios inmediatos de <strong>TRIAJE ROJO</strong> (Inconsciencia, ausencia de pulso o paro respiratorio). Prepare equipo de soporte vital de inmediato. Puede completar el resto del registro técnico a continuación.
            </p>
          </div>
        </div>
      )}

      {/* Section A: Estado General */}
      <div className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2 text-teal-400 font-semibold text-sm border-b border-slate-800 pb-2">
          <Activity className="w-4 h-4" />
          <span>A. Estado General y Postura</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* ¿Está de pie? */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              ¿Está de pie en la evaluación?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Sí', 'No'].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => {
                    updateFormData({
                      isStanding: opt,
                      canStand: opt,
                      ...(opt === 'Sí' ? { canGetUp: 'Sí' } : {}),
                    });
                  }}
                  className={`h-12 rounded-xl text-xs font-bold transition-all border ${
                    formData.isStanding === opt
                      ? opt === 'No'
                        ? 'bg-red-600 text-white border-red-500'
                        : 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-slate-950/80 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* En caso de No: ¿Puede levantarse? */}
          {formData.isStanding === 'No' && (
            <div className="animate-fadeIn">
              <label className="block text-xs font-semibold text-amber-300 uppercase tracking-wider mb-2">
                ¿Puede levantarse por sí mismo?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Sí', 'No'].map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => updateFormData({ canGetUp: opt, canStand: opt === 'Sí' ? 'Sí' : 'No' })}
                    className={`h-12 rounded-xl text-xs font-bold transition-all border ${
                      formData.canGetUp === opt
                        ? opt === 'No'
                          ? 'bg-red-700 text-white border-red-500 ring-2 ring-red-500/40'
                          : 'bg-amber-600 text-white border-amber-500'
                        : 'bg-slate-950/80 border-slate-700 text-slate-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Estado de Conciencia */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Estado de Conciencia
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { val: 'Alerta', color: 'bg-emerald-600' },
              { val: 'Deprimido', color: 'bg-amber-600' },
              { val: 'Inconsciente', color: 'bg-red-600 ring-2 ring-red-500' },
            ].map((opt) => (
              <button
                type="button"
                key={opt.val}
                onClick={() => updateFormData({ consciousness: opt.val })}
                className={`h-12 rounded-xl text-xs font-bold transition-all border ${
                  formData.consciousness === opt.val
                    ? `${opt.color} text-white border-transparent shadow-md`
                    : 'bg-slate-950/80 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                {opt.val}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Section B: Respiración */}
      <div className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-sm border-b border-slate-800 pb-2">
          <Wind className="w-4 h-4" />
          <span>B. Respiración (Vía Aérea y Patrón)</span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Frecuencia y Patrón Respiratorio
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { val: 'Normal', color: 'bg-emerald-600' },
              { val: 'Aumentada', color: 'bg-amber-600' },
              { val: 'Muy dificultosa', color: 'bg-orange-600' },
              { val: 'No respira', color: 'bg-red-700 text-white font-extrabold ring-2 ring-red-500' },
            ].map((opt) => (
              <button
                type="button"
                key={opt.val}
                onClick={() => updateFormData({ breathingPattern: opt.val })}
                className={`h-12 rounded-xl text-xs font-bold transition-all border px-2 ${
                  formData.breathingPattern === opt.val
                    ? `${opt.color} text-white border-transparent shadow-md`
                    : 'bg-slate-950/80 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                {opt.val}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section C: Circulación */}
      <div className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2 text-rose-400 font-semibold text-sm border-b border-slate-800 pb-2">
          <HeartPulse className="w-4 h-4" />
          <span>C. Circulación y Hemorragia</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Hemorragia activa */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              ¿Hay hemorragia activa visible?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['No', 'Sí'].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => updateFormData({ activeHemorrhage: opt })}
                  className={`h-12 rounded-xl text-xs font-bold transition-all border ${
                    formData.activeHemorrhage === opt
                      ? opt === 'Sí'
                        ? 'bg-red-600 text-white border-red-500'
                        : 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-slate-950/80 border-slate-700 text-slate-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Pulso */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Evaluación del Pulso (Facial / Metacarpiano)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { val: 'Normal', color: 'bg-emerald-600' },
                { val: 'Débil', color: 'bg-amber-600' },
                { val: 'Ausente', color: 'bg-red-700 ring-2 ring-red-500' },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.val}
                  onClick={() => updateFormData({ pulse: opt.val })}
                  className={`h-12 rounded-xl text-xs font-bold transition-all border ${
                    formData.pulse === opt.val
                      ? `${opt.color} text-white border-transparent shadow-md`
                      : 'bg-slate-950/80 border-slate-700 text-slate-300'
                  }`}
                >
                  {opt.val}
                </button>
              ))}
            </div>
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
          <span>Siguiente: Signos Vitales</span>
          <ChevronRight className="w-5 h-5 stroke-[3]" />
        </button>
      </div>

    </div>
  );
}
