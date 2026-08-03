import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap } from 'lucide-react';
import { type Language, translations } from '../lib/i18n';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const t = translations[lang];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-40"
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden"
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 mb-5">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-white font-sans">
                    {t.howItWorksTitle}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Steps List */}
              <div className="space-y-3 mb-5">
                <div className="flex gap-3.5 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-200 mb-0.5">
                      {t.step1Title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                      {t.step1Desc}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <div className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-200 mb-0.5">
                      {t.step2Title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                      {t.step2Desc}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800">
                  <div className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-200 mb-0.5">
                      {t.step3Title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                      {t.step3Desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Close Action */}
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-indigo-500 transition-all duration-200"
              >
                {t.modalCloseBtn}
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
