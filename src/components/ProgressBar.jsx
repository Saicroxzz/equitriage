import { User, AlertTriangle, Activity, Stethoscope, Award, Check } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Paciente', icon: User },
  { id: 2, label: 'ABCDE', icon: AlertTriangle },
  { id: 3, label: 'Vitales', icon: Activity },
  { id: 4, label: 'Sistemas', icon: Stethoscope },
  { id: 5, label: 'Resultado', icon: Award },
];

export default function ProgressBar({ currentStep, setStep, maxStepReached }) {
  const percentage = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="w-full bg-slate-900/40 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 py-3.5 px-4 mb-6 sticky top-[65px] z-20">
      <div className="max-w-4xl mx-auto">
        
        {/* Progress line */}
        <div className="relative mb-3">
          <div className="overflow-hidden h-2 text-xs flex rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              style={{ width: `${percentage}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-teal-500 to-emerald-400 transition-all duration-500 ease-out"
            ></div>
          </div>
        </div>

        {/* Step Icons & Labels Grid */}
        <div className="grid grid-cols-5 gap-1 text-center">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            const isClickable = step.id <= maxStepReached;

            return (
              <button
                key={step.id}
                disabled={!isClickable}
                onClick={() => isClickable && setStep(step.id)}
                className={`flex flex-col items-center group focus:outline-none transition-all ${
                  isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                }`}
              >
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm transition-all shadow-sm ${
                    isActive
                      ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/20 scale-110'
                      : isCompleted
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5 stroke-[3]" /> : <Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
                </div>

                <span
                  className={`mt-1.5 text-[10px] sm:text-xs font-medium tracking-tight truncate max-w-full ${
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                      : isCompleted
                      ? 'text-slate-700 dark:text-slate-300'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  <span className="hidden xs:inline">{step.id}. </span>
                  {step.label}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
