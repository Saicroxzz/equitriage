import { Stethoscope, Activity, ChevronRight, ChevronLeft, Zap, Compass, Wind } from 'lucide-react';

export default function Step4Clinical({ formData, updateFormData, onNext, onPrev }) {

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900/40 to-slate-900/60 p-4 rounded-2xl border border-teal-500/20 mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-teal-500/20 text-teal-400 rounded-xl">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">Módulo 4: Evaluación Clínica por Sistemas</h2>
            <p className="text-xs text-slate-400">Identificación específica de patologías digestivas, locomotoras, respiratorias y neurológicas.</p>
          </div>
        </div>
      </div>

      {/* Sistema Digestivo (Cólico) */}
      <div className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2 text-amber-400 font-semibold text-sm border-b border-slate-800 pb-2">
          <Activity className="w-4 h-4" />
          <span>Sistema Digestivo (Dolor / Cólico Equino)</span>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Intensidad de Dolor por Cólico
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { val: 'No', label: 'Sin Dolor', color: 'bg-emerald-600' },
              { val: 'Leve', label: 'Dolor Leve', color: 'bg-amber-600' },
              { val: 'Moderado', label: 'Dolor Moderado', color: 'bg-orange-600' },
              { val: 'Severo', label: 'Dolor Severo', color: 'bg-red-600 ring-2 ring-red-500' },
            ].map((opt) => (
              <button
                type="button"
                key={opt.val}
                onClick={() => updateFormData({ colicPain: opt.val })}
                className={`h-12 rounded-xl text-xs font-bold transition-all border ${
                  formData.colicPain === opt.val
                    ? `${opt.color} text-white border-transparent shadow-md`
                    : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              ¿Se revuelca o se tira violentamente al suelo?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['No', 'Sí'].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => updateFormData({ rolling: opt })}
                  className={`h-12 rounded-xl text-xs font-bold transition-all border ${
                    formData.rolling === opt
                      ? opt === 'Sí'
                        ? 'bg-red-600 text-white border-red-500'
                        : 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-slate-950 border-slate-700 text-slate-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              ¿Patea frecuentemente el abdomen o se mira los flancos?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['No', 'Sí'].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => updateFormData({ kickingAbdomen: opt })}
                  className={`h-12 rounded-xl text-xs font-bold transition-all border ${
                    formData.kickingAbdomen === opt
                      ? opt === 'Sí'
                        ? 'bg-amber-600 text-white border-amber-500'
                        : 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-slate-950 border-slate-700 text-slate-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sistema Locomotor */}
      <div className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-sm border-b border-slate-800 pb-2">
          <Compass className="w-4 h-4" />
          <span>Sistema Locomotor y Aparato Podal</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Caminar */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              ¿Puede caminar?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Sí', 'No'].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => updateFormData({ canWalk: opt })}
                  className={`h-12 rounded-xl text-xs font-bold transition-all border ${
                    formData.canWalk === opt
                      ? opt === 'No'
                        ? 'bg-red-600 text-white border-red-500'
                        : 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-slate-950 border-slate-700 text-slate-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Fractura */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Presencia de Fractura
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { val: 'No', color: 'bg-emerald-600' },
                { val: 'Cerrada', color: 'bg-orange-600' },
                { val: 'Abierta', color: 'bg-red-600 ring-2 ring-red-500' },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.val}
                  onClick={() => updateFormData({ fracture: opt.val })}
                  className={`h-12 rounded-xl text-xs font-bold transition-all border ${
                    formData.fracture === opt.val
                      ? `${opt.color} text-white border-transparent shadow-md`
                      : 'bg-slate-950 border-slate-700 text-slate-300'
                  }`}
                >
                  {opt.val}
                </button>
              ))}
            </div>
          </div>

          {/* Laminitis */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              ¿Presenta signos de Laminitis?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['No', 'Sí'].map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => updateFormData({ laminitis: opt })}
                  className={`h-12 rounded-xl text-xs font-bold transition-all border ${
                    formData.laminitis === opt
                      ? opt === 'Sí'
                        ? 'bg-orange-600 text-white border-orange-500'
                        : 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-slate-950 border-slate-700 text-slate-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Sistema Respiratorio y Neurológico */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Sistema Respiratorio */}
        <div className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-cyan-400 font-semibold text-sm border-b border-slate-800 pb-2">
            <Wind className="w-4 h-4" />
            <span>Sistema Respiratorio</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">Disnea</span>
              <div className="flex gap-1">
                {['No', 'Sí'].map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => updateFormData({ dyspnea: opt })}
                    className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                      formData.dyspnea === opt
                        ? opt === 'Sí'
                          ? 'bg-red-600 text-white'
                          : 'bg-emerald-600 text-white'
                        : 'bg-slate-950 border-slate-700 text-slate-400'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">Cianosis</span>
              <div className="flex gap-1">
                {['No', 'Sí'].map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => updateFormData({ cyanosis: opt })}
                    className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                      formData.cyanosis === opt
                        ? opt === 'Sí'
                          ? 'bg-red-600 text-white'
                          : 'bg-emerald-600 text-white'
                        : 'bg-slate-950 border-slate-700 text-slate-400'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">Secreción Nasal</span>
              <div className="flex gap-1">
                {['No', 'Sí'].map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => updateFormData({ nasalDischarge: opt })}
                    className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                      formData.nasalDischarge === opt
                        ? opt === 'Sí'
                          ? 'bg-amber-600 text-white'
                          : 'bg-emerald-600 text-white'
                        : 'bg-slate-950 border-slate-700 text-slate-400'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sistema Neurológico */}
        <div className="bg-slate-900/70 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center space-x-2 text-purple-400 font-semibold text-sm border-b border-slate-800 pb-2">
            <Zap className="w-4 h-4" />
            <span>Sistema Neurológico</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">Convulsiones</span>
              <div className="flex gap-1">
                {['No', 'Sí'].map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => updateFormData({ seizures: opt })}
                    className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                      formData.seizures === opt
                        ? opt === 'Sí'
                          ? 'bg-red-600 text-white font-extrabold ring-2 ring-red-500'
                          : 'bg-emerald-600 text-white'
                        : 'bg-slate-950 border-slate-700 text-slate-400'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">Ataxia / Incoordinación</span>
              <div className="flex gap-1">
                {['No', 'Sí'].map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => updateFormData({ ataxia: opt })}
                    className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                      formData.ataxia === opt
                        ? opt === 'Sí'
                          ? 'bg-amber-600 text-white'
                          : 'bg-emerald-600 text-white'
                        : 'bg-slate-950 border-slate-700 text-slate-400'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-300">No responde a estímulos</span>
              <div className="flex gap-1">
                {['No', 'Sí'].map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => updateFormData({ unresponsive: opt })}
                    className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all ${
                      formData.unresponsive === opt
                        ? opt === 'Sí'
                          ? 'bg-red-600 text-white'
                          : 'bg-emerald-600 text-white'
                        : 'bg-slate-950 border-slate-700 text-slate-400'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
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
          <span>Finalizar y Ver Resultado</span>
          <ChevronRight className="w-5 h-5 stroke-[3]" />
        </button>
      </div>

    </div>
  );
}
