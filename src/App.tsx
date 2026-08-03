import React, { useState, useEffect, useCallback } from 'react';
import { Component as HyperspaceWarpDrive } from './components/ui/hyperspace-warp-drive';
import { Header } from './components/Header';
import { MagnetInput } from './components/MagnetInput';
import { ResultCard } from './components/ResultCard';
import { ErrorCard } from './components/ErrorCard';
import { EmptyState } from './components/EmptyState';
import { HistoryDrawer } from './components/HistoryDrawer';
import { HowItWorksModal } from './components/HowItWorksModal';
import { ToastContainer, type ToastMessage } from './components/Toast';
import { cleanMagnetUrl, type MagnetCleanResult } from './lib/magnet-cleaner';
import { type Language, translations } from './lib/i18n';
import { Shield } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'puromagnet_history_v2';
const LANG_STORAGE_KEY = 'puromagnet_lang';

export function App() {
  const [lang, setLang] = useState<Language>('pt');
  const [inputValue, setInputValue] = useState('');
  const [cleanResult, setCleanResult] = useState<MagnetCleanResult | null>(null);
  const [history, setHistory] = useState<MagnetCleanResult[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const t = translations[lang];

  // Toast Notification Helper
  const addToast = useCallback(
    (type: 'success' | 'info' | 'warning', title: string, message?: string) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, type, title, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    },
    []
  );

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Load language preference
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as Language;
      if (savedLang && ['pt', 'en', 'es'].includes(savedLang)) {
        setLang(savedLang);
      } else {
        const userNavLang = navigator.language.toLowerCase();
        if (userNavLang.startsWith('en')) setLang('en');
        else if (userNavLang.startsWith('es')) setLang('es');
      }
    } catch (e) {}
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, newLang);
    } catch (e) {}
  };

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load history', e);
    }
  }, []);

  // Save history to localStorage
  const saveToHistory = (item: MagnetCleanResult) => {
    if (!item.success || !item.cleanedMagnet) return;

    setHistory((prev) => {
      const filtered = prev.filter((h) => h.cleanedMagnet !== item.cleanedMagnet);
      const updated = [item, ...filtered].slice(0, 20);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save history', e);
      }
      return updated;
    });
  };

  // Handle Input Changes
  const handleInputChange = useCallback(
    (val: string, showToastOnAutoPaste = false) => {
      setInputValue(val);
      if (!val.trim()) {
        setCleanResult(null);
        return;
      }

      const res = cleanMagnetUrl(val);
      setCleanResult(res);

      if (res.success) {
        saveToHistory(res);
        if (showToastOnAutoPaste) {
          addToast('info', t.toastAutoPastedTitle, t.toastAutoPastedDesc);
        }
      }
    },
    [addToast, t]
  );

  const handleClear = () => {
    setInputValue('');
    setCleanResult(null);
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      addToast('warning', t.toastHistoryClearedTitle);
    } catch (e) {}
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalPaste = (e: ClipboardEvent) => {
      const activeEl = document.activeElement;
      if (activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
        return;
      }

      const pastedText = e.clipboardData?.getData('text');
      if (pastedText && pastedText.trim()) {
        e.preventDefault();
        handleInputChange(pastedText.trim(), true);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isHistoryOpen) setIsHistoryOpen(false);
        if (isHowItWorksOpen) setIsHowItWorksOpen(false);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        handleClear();
      }
    };

    window.addEventListener('paste', handleGlobalPaste);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('paste', handleGlobalPaste);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleInputChange, isHistoryOpen, isHowItWorksOpen]);

  return (
    <HyperspaceWarpDrive>
      <div className="w-full min-h-screen flex flex-col justify-between z-10 relative overflow-y-auto">
        {/* Header Navigation */}
        <Header
          onOpenHistory={() => setIsHistoryOpen(true)}
          onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
          historyCount={history.length}
          lang={lang}
          onLanguageChange={handleLanguageChange}
        />

        {/* Main Application Area */}
        <main className="flex-1 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-4 py-2 sm:py-4">
          {/* Centered Glowing Input */}
          <MagnetInput
            value={inputValue}
            onChange={handleInputChange}
            onClear={handleClear}
            lang={lang}
          />

          {/* Cleaned Result Card */}
          {cleanResult && cleanResult.success && (
            <ResultCard
              result={cleanResult}
              lang={lang}
              onToast={(type, title) => addToast(type, title)}
            />
          )}

          {/* Error Card for invalid links */}
          {cleanResult && !cleanResult.success && cleanResult.errorMessage && (
            <ErrorCard
              result={cleanResult}
              onClear={handleClear}
              onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
              lang={lang}
            />
          )}

          {/* Empty State when no input */}
          {!inputValue && <EmptyState lang={lang} />}
        </main>

        {/* Footer with generous padding to prevent collision */}
        <footer className="w-full max-w-5xl mx-auto px-4 py-6 text-center text-xs text-slate-500 z-20 flex-shrink-0 mt-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3 border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>{t.footerPhilosophy}</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <span>{t.footerBuiltWith}</span>
            </div>
          </div>
        </footer>

        {/* Modals & Drawers */}
        <HistoryDrawer
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          history={history}
          onSelect={(item) => {
            if (item.cleanedMagnet) {
              setInputValue(item.cleanedMagnet);
              setCleanResult(item);
            }
          }}
          onClearHistory={handleClearHistory}
          lang={lang}
        />

        <HowItWorksModal
          isOpen={isHowItWorksOpen}
          onClose={() => setIsHowItWorksOpen(false)}
          lang={lang}
        />

        {/* Toast Notifications System */}
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </div>
    </HyperspaceWarpDrive>
  );
}

export default App;
