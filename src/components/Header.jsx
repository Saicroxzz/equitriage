import { Activity, History, RotateCcw, Sun, Moon } from 'lucide-react';

export default function Header({ onReset, onOpenHistory, darkMode, setDarkMode }) {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Brand & Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/20">
            <Activity className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">
                EQUITRIAGE
              </h1>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                VET CLINICAL
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Sistema de Triaje y Clasificación Fisiológica Equina
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* History Button */}
          <button
            onClick={onOpenHistory}
            className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-200 text-xs font-semibold transition-all border border-slate-700/80 shadow-sm min-h-[44px] touch-manipulation"
            title="Historial de Triajes"
          >
            <History className="w-4 h-4 text-teal-400" />
            <span className="hidden sm:inline">Historial</span>
          </button>

          {/* Reset Draft Button */}
          <button
            onClick={onReset}
            className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-red-900/30 hover:text-red-300 active:bg-red-900/50 text-slate-300 text-xs font-semibold transition-all border border-slate-700/80 shadow-sm min-h-[44px] touch-manipulation"
            title="Reiniciar Evaluación"
          >
            <RotateCcw className="w-4 h-4 text-slate-400 group-hover:text-red-400" />
            <span className="hidden sm:inline">Nuevo</span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all border border-slate-700/80 min-h-[44px] min-w-[44px] flex items-center justify-center"
            title={darkMode ? 'Modo Claro' : 'Modo Oscuro'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>
        </div>

      </div>
    </header>
  );
}
