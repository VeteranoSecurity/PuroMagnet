import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw, HelpCircle } from 'lucide-react';
import type { MagnetCleanResult } from '../lib/magnet-cleaner';
import { type Language, translations } from '../lib/i18n';

interface ErrorCardProps {
  result: MagnetCleanResult;
  onClear: () => void;
  onOpenHowItWorks: () => void;
  lang: Language;
}

export const ErrorCard: React.FC<ErrorCardProps> = ({
  result,
  onClear,
  onOpenHowItWorks,
  lang,
}) => {
  const t = translations[lang];
  if (result.success || !result.errorMessage) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="w-full max-w-2xl mx-auto px-4 my-4 z-20"
    >
      <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-4 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center gap-3 shadow-xl">
        <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-400 flex-shrink-0">
          <AlertCircle className="w-5 h-5" />
        </div>

        <div className="flex-1">
          <h4 className="text-xs sm:text-sm font-bold text-amber-200 mb-0.5">
            {t.noMagnetFoundTitle}
          </h4>
          <p className="text-[11px] sm:text-xs text-amber-300/80 leading-relaxed font-sans">
            {result.errorMessage}
          </p>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={onOpenHowItWorks}
            className="p-2 text-xs font-medium text-amber-300 hover:text-white bg-amber-900/40 hover:bg-amber-800/60 rounded-lg border border-amber-700/50 transition-colors flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.helpBtn}</span>
          </button>
          <button
            onClick={onClear}
            className="p-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors flex items-center gap-1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{t.tryAgainBtn}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
