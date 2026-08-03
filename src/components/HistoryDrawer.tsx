import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Copy, Check, Clock, Magnet } from 'lucide-react';
import type { MagnetCleanResult } from '../lib/magnet-cleaner';
import { type Language, translations } from '../lib/i18n';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: MagnetCleanResult[];
  onSelect: (item: MagnetCleanResult) => void;
  onClearHistory: () => void;
  lang: Language;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelect,
  onClearHistory,
  lang,
}) => {
  const t = translations[lang];
  const [copiedIdx, setCopiedIdx] = React.useState<number | null>(null);

  const handleCopy = (magnet: string, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(magnet);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl z-50 flex flex-col p-5 sm:p-6 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base sm:text-lg font-bold text-white font-sans">
                  {t.historyTitle}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List Body */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {history.length === 0 ? (
                <div className="text-center py-16 text-slate-500">
                  <Magnet className="w-12 h-12 mx-auto mb-3 opacity-30 text-cyan-400" />
                  <p className="text-sm font-medium">{t.emptyHistory}</p>
                  <p className="text-xs text-slate-600 mt-1">
                    {t.emptyHistorySub}
                  </p>
                </div>
              ) : (
                history.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      onSelect(item);
                      onClose();
                    }}
                    className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-950 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-1">
                        {item.displayName || t.untitledHistory}
                      </h4>
                      <button
                        onClick={(e) => handleCopy(item.cleanedMagnet || '', idx, e)}
                        className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
                        title="Copiar Magnet"
                      >
                        {copiedIdx === idx ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <p className="text-[11px] font-mono text-slate-400 truncate mb-2">
                      {item.cleanedMagnet}
                    </p>

                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>{item.fileSize || 'Size N/A'}</span>
                      <span className="text-cyan-400/80 group-hover:underline">
                        {t.clickToLoad}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer with Clear All */}
            {history.length > 0 && (
              <div className="pt-4 border-t border-slate-800">
                <button
                  onClick={onClearHistory}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-900/50 text-red-300 text-xs font-semibold transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{t.clearAllHistory}</span>
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
