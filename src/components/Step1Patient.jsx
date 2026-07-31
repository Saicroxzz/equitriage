import { useState } from 'react';
import { User, ChevronRight, AlertCircle } from 'lucide-react';

export default function Step1Patient({ formData, updateFormData, onNext }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = 'El nombre del paciente es obligatorio';
    if (!formData.age) newErrors.age = 'La edad es obligatoria';
    if (!formData.sex) newErrors.sex = 'Seleccione el sexo';
    if (!formData.weight || parseFloat(formData.weight) <= 0) newErrors.weight = 'Ingrese un peso válido';
    if (!formData.breed?.trim()) newErrors.breed = 'La raza es obligatoria';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Module Title Header */}
      <div className="bg-gradient-to-r from-teal-900/40 to-slate-900/60 p-4 rounded-2xl border border-teal-500/20 mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-teal-500/20 text-teal-400 rounded-xl">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">Módulo 1: Registro del Paciente</h2>
            <p className="text-xs text-slate-400">Ingrese los datos filiatorios de la especie equina a evaluar.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Nombre del Paciente */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Nombre del Paciente <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Ej. Tornado, Rayo, Furia..."
            value={formData.name || ''}
            onChange={(e) => updateFormData({ name: e.target.value })}
            className={`w-full h-12 px-4 rounded-xl bg-slate-900/80 border text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.name ? 'border-red-500 focus:ring-red-500/30' : 'border-slate-700 focus:border-teal-500 focus:ring-teal-500/20'
            }`}
          />
          {errors.name && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.name}</p>}
        </div>

        {/* Propietario */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Propietario / Hacienda <span className="text-slate-500 font-normal">(Opcional)</span>
          </label>
          <input
            type="text"
            placeholder="Ej. Juan Pérez / Criadero San José"
            value={formData.owner || ''}
            onChange={(e) => updateFormData({ owner: e.target.value })}
            className="w-full h-12 px-4 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 transition-all"
          />
        </div>

        {/* Edad */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Edad <span className="text-red-400">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              step="0.5"
              placeholder="Ej. 6"
              value={formData.age || ''}
              onChange={(e) => updateFormData({ age: e.target.value })}
              className={`w-2/3 h-12 px-4 rounded-xl bg-slate-900/80 border text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.age ? 'border-red-500 focus:ring-red-500/30' : 'border-slate-700 focus:border-teal-500 focus:ring-teal-500/20'
              }`}
            />
            <select
              value={formData.ageUnit || 'Años'}
              onChange={(e) => updateFormData({ ageUnit: e.target.value })}
              className="w-1/3 h-12 px-3 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-teal-500 transition-all"
            >
              <option value="Años">Años</option>
              <option value="Meses">Meses</option>
            </select>
          </div>
          {errors.age && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.age}</p>}
        </div>

        {/* Sexo */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Sexo <span className="text-red-400">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Macho', 'Hembra', 'Castrado'].map((option) => (
              <button
                type="button"
                key={option}
                onClick={() => updateFormData({ sex: option })}
                className={`h-12 rounded-xl text-xs font-bold transition-all border flex items-center justify-center ${
                  formData.sex === option
                    ? 'bg-teal-600 text-white border-teal-500 shadow-md shadow-teal-600/30 ring-2 ring-teal-500/40'
                    : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {errors.sex && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.sex}</p>}
        </div>

        {/* Peso (kg) */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Peso Estimado (kg) <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <input
              type="number"
              min="1"
              placeholder="Ej. 450"
              value={formData.weight || ''}
              onChange={(e) => updateFormData({ weight: e.target.value })}
              className={`w-full h-12 px-4 pr-12 rounded-xl bg-slate-900/80 border text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all ${
                errors.weight ? 'border-red-500 focus:ring-red-500/30' : 'border-slate-700 focus:border-teal-500 focus:ring-teal-500/20'
              }`}
            />
            <span className="absolute right-4 top-3.5 text-xs font-bold text-slate-400">kg</span>
          </div>
          {errors.weight && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.weight}</p>}
        </div>

        {/* Raza */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Raza <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Ej. Pura Sangre Inglés, Cuarto de Milla, Criollo..."
            value={formData.breed || ''}
            onChange={(e) => updateFormData({ breed: e.target.value })}
            className={`w-full h-12 px-4 rounded-xl bg-slate-900/80 border text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 transition-all ${
              errors.breed ? 'border-red-500 focus:ring-red-500/30' : 'border-slate-700 focus:border-teal-500 focus:ring-teal-500/20'
            }`}
          />
          {errors.breed && <p className="mt-1 text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{errors.breed}</p>}
        </div>

        {/* Fecha y Hora */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Fecha y Hora de Evaluación
          </label>
          <input
            type="datetime-local"
            value={formData.dateTime || new Date().toISOString().slice(0, 16)}
            onChange={(e) => updateFormData({ dateTime: e.target.value })}
            className="w-full h-12 px-4 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 text-sm focus:outline-none focus:border-teal-500 transition-all"
          />
        </div>

        {/* Médico Veterinario */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Médico Veterinario Evaluador <span className="text-slate-500 font-normal">(Opcional)</span>
          </label>
          <input
            type="text"
            placeholder="Ej. Dr. Carlos Mendoza - MP 4582"
            value={formData.veterinarian || ''}
            onChange={(e) => updateFormData({ veterinarian: e.target.value })}
            className="w-full h-12 px-4 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-teal-500 transition-all"
          />
        </div>

      </div>

      {/* Button Action */}
      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          className="w-full sm:w-auto h-14 px-8 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-base shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 transition-all active:scale-[0.98] min-h-[52px] touch-manipulation cursor-pointer"
        >
          <span>Siguiente: Evaluación Primaria ABCDE</span>
          <ChevronRight className="w-5 h-5 stroke-[3]" />
        </button>
      </div>

    </form>
  );
}
