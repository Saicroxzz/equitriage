import { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import Step1Patient from './components/Step1Patient';
import Step2ABCDE from './components/Step2ABCDE';
import Step3Vitals from './components/Step3Vitals';
import Step4Clinical from './components/Step4Clinical';
import Step5Result from './components/Step5Result';
import HistoryModal from './components/HistoryModal';
import PDFReportTemplate from './components/PDFReportTemplate';
import { useLocalStorage } from './hooks/useLocalStorage';
import { calculateTriage } from './utils/triageCalculator';

const INITIAL_FORM_DATA = {
  name: '',
  owner: '',
  age: '',
  ageUnit: 'Años',
  sex: 'Macho',
  weight: '',
  breed: '',
  dateTime: new Date().toISOString().slice(0, 16),
  veterinarian: '',

  // ABCDE
  isStanding: 'Sí',
  canStand: 'Sí',
  canGetUp: 'Sí',
  consciousness: 'Alerta',
  breathingPattern: 'Normal',
  activeHemorrhage: 'No',
  pulse: 'Normal',

  // Signos Vitales
  temperature: '',
  heartRate: '',
  respRate: '',
  trc: '',
  mucousMembranes: 'Rosadas (Normal)',
  hydration: 'Normal',

  // Evaluación por Sistemas
  colicPain: 'No',
  rolling: 'No',
  kickingAbdomen: 'No',
  canWalk: 'Sí',
  fracture: 'No',
  laminitis: 'No',
  dyspnea: 'No',
  cyanosis: 'No',
  nasalDischarge: 'No',
  seizures: 'No',
  ataxia: 'No',
  unresponsive: 'No',

  // Observaciones
  notes: '',
};

export default function App() {
  const [formData, setFormData] = useLocalStorage('equitriage_draft', INITIAL_FORM_DATA);
  const [history, setHistory] = useLocalStorage('equitriage_history', []);
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [pdfHistoricalItem, setPdfHistoricalItem] = useState(null);

  const pdfRef = useRef(null);
  const historicalPdfRef = useRef(null);

  // Sync dark mode root class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const updateFormData = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleNextStep = () => {
    const next = Math.min(currentStep + 1, 5);
    setCurrentStep(next);
    setMaxStepReached((prev) => Math.max(prev, next));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    if (window.confirm('¿Desea reiniciar la evaluación y limpiar los campos del formulario?')) {
      setFormData({
        ...INITIAL_FORM_DATA,
        dateTime: new Date().toISOString().slice(0, 16),
      });
      setCurrentStep(1);
      setMaxStepReached(1);
    }
  };

  const handleSaveToHistory = (record) => {
    setHistory((prev) => [record, ...prev]);
  };

  const handleClearHistory = () => {
    if (window.confirm('¿Está seguro de eliminar todo el historial local de triajes?')) {
      setHistory([]);
    }
  };

  const handleLoadDraftFromHistory = (item) => {
    const cleanForm = { ...item };
    delete cleanForm.triageResult;
    delete cleanForm.savedAt;
    delete cleanForm.id;
    setFormData(cleanForm);
    setCurrentStep(5);
    setMaxStepReached(5);
    setIsHistoryOpen(false);
  };

  const triageResult = calculateTriage(formData);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-slate-950 flex flex-col transition-colors duration-300">
      
      {/* App Header */}
      <Header
        onReset={handleReset}
        onOpenHistory={() => setIsHistoryOpen(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Progress Bar Navigation */}
      <ProgressBar
        currentStep={currentStep}
        setStep={setCurrentStep}
        maxStepReached={maxStepReached}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 pb-16">
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
          
          {currentStep === 1 && (
            <Step1Patient
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNextStep}
            />
          )}

          {currentStep === 2 && (
            <Step2ABCDE
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNextStep}
              onPrev={handlePrevStep}
            />
          )}

          {currentStep === 3 && (
            <Step3Vitals
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNextStep}
              onPrev={handlePrevStep}
            />
          )}

          {currentStep === 4 && (
            <Step4Clinical
              formData={formData}
              updateFormData={updateFormData}
              onNext={handleNextStep}
              onPrev={handlePrevStep}
            />
          )}

          {currentStep === 5 && (
            <Step5Result
              formData={formData}
              updateFormData={updateFormData}
              triageResult={triageResult}
              onReset={handleReset}
              onSaveToHistory={handleSaveToHistory}
              onPrev={handlePrevStep}
              pdfRef={pdfRef}
            />
          )}

        </div>
      </main>

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClearHistory={handleClearHistory}
        onLoadDraft={handleLoadDraftFromHistory}
        pdfRef={historicalPdfRef}
        setPdfState={setPdfHistoricalItem}
      />

      {/* Hidden Historical PDF Template */}
      {pdfHistoricalItem && (
        <PDFReportTemplate
          formData={pdfHistoricalItem}
          triageResult={pdfHistoricalItem.triageResult}
          pdfRef={historicalPdfRef}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>EQUITRIAGE © 2026 - Sistema de Triaje Veterinario Equino</span>
          <span className="text-slate-600">Herramienta de asistencia clínica 100% Client-Side</span>
        </div>
      </footer>

    </div>
  );
}
