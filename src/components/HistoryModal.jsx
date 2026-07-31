import { X, History, Trash2, Calendar, FileText } from 'lucide-react';
import { generatePDF } from '../utils/pdfGenerator';

export default function HistoryModal({ isOpen, onClose, history, onClearHistory, onLoadDraft, pdfRef, setPdfState }) {
  if (!isOpen) return null;

  const handleDownloadHistoricalPDF = async (item) => {
    // Set active pdf state temporarily to render template for historical record
    setPdfState(item);
    setTimeout(async () => {
      if (pdfRef.current) {
        await generatePDF(pdfRef.current, item.name);
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-teal-500/20 text-teal-400 rounded-xl">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Historial de Evaluaciones Guardadas</h3>
              <p className="text-xs text-slate-400">Registros locales de triajes realizados en este dispositivo</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {history.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <History className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-400">No hay triajes guardados aún.</p>
              <p className="text-xs text-slate-500">Al finalizar una evaluación, haz clic en "Guardar en Historial".</p>
            </div>
          ) : (
            history.map((item) => {
              const res = item.triageResult || {};
              const badgeClass =
                res.level === 'Rojo'
                  ? 'bg-red-600 text-white'
                  : res.level === 'Naranja'
                  ? 'bg-orange-500 text-white'
                  : res.level === 'Amarillo'
                  ? 'bg-amber-500 text-white'
                  : 'bg-emerald-600 text-white';

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${badgeClass}`}>
                        {res.level || 'Triaje'} ({res.score || 0} pts)
                      </span>
                      <h4 className="text-sm font-bold text-slate-100">{item.name || 'Sin nombre'}</h4>
                    </div>

                    <div className="text-xs text-slate-400 flex items-center gap-3">
                      <span>Raza: {item.breed || '---'}</span>
                      <span>•</span>
                      <span>Peso: {item.weight} kg</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {new Date(item.savedAt).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      onClick={() => onLoadDraft(item)}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-teal-300 border border-slate-700 transition-all min-h-[40px]"
                    >
                      Cargar
                    </button>
                    <button
                      onClick={() => handleDownloadHistoricalPDF(item)}
                      className="px-3 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-xs font-bold text-slate-950 flex items-center space-x-1 transition-all min-h-[40px]"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex justify-between items-center">
            <button
              onClick={onClearHistory}
              className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1 transition-all"
            >
              <Trash2 className="w-4 h-4" />
              <span>Vaciar Historial</span>
            </button>
            <span className="text-xs text-slate-500">{history.length} registros en memoria local</span>
          </div>
        )}

      </div>
    </div>
  );
}
