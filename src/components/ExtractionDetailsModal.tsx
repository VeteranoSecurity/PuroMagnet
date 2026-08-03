import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code, ShieldCheck, AlertTriangle, Copy, Check, Terminal } from 'lucide-react';
import type { MagnetCleanResult } from '../lib/magnet-cleaner';
import { type Language, translations } from '../lib/i18n';

interface ExtractionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: MagnetCleanResult;
  lang: Language;
}

export const ExtractionDetailsModal: React.FC<ExtractionDetailsModalProps> = ({
  isOpen,
  onClose,
  result,
  lang,
}) => {
  const t = translations[lang];
  const [copiedB64, setCopiedB64] = React.useState(false);
  const [copiedRaw, setCopiedRaw] = React.useState(false);

  const handleCopyB64 = () => {
    if (result.extractedBase64) {
      navigator.clipboard.writeText(result.extractedBase64);
      setCopiedB64(true);
      setTimeout(() => setCopiedB64(false), 2000);
    }
  };

  const handleCopyRaw = () => {
    if (result.decodedRaw) {
      navigator.clipboard.writeText(result.decodedRaw);
      setCopiedRaw(true);
      setTimeout(() => setCopiedRaw(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-40"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden max-h-[85vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 flex-shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white font-sans">
                      {t.extractionDetails}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      {result.displayName || t.untitledMagnet}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4 font-mono text-xs pr-1">
                {/* Extracted Base64 Payload */}
                {result.extractedBase64 && (
                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400 font-semibold">{t.base64Found}</span>
                      <button
                        onClick={handleCopyB64}
                        className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        {copiedB64 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedB64 ? t.hashCopied : 'Copiar'}</span>
                      </button>
                    </div>
                    <p className="text-amber-300/90 break-all select-all leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                      {result.extractedBase64}
                    </p>
                  </div>
                )}

                {/* Raw Decoded Output */}
                {result.decodedRaw && (
                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400 font-semibold">{t.rawDecoded}</span>
                      <button
                        onClick={handleCopyRaw}
                        className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        {copiedRaw ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedRaw ? t.hashCopied : 'Copiar'}</span>
                      </button>
                    </div>
                    <p className="text-emerald-300/90 break-all select-all leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                      {result.decodedRaw}
                    </p>
                  </div>
                )}

                {/* Trackers List */}
                {result.trackers.length > 0 && (
                  <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-slate-400 font-semibold">{t.trackersAnalyzed}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold">
                        {result.trackers.length} total
                      </span>
                    </div>
                    <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                      {result.trackers.map((tr, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded-xl bg-slate-900/80 border border-slate-800/60"
                        >
                          <span
                            className={`break-all text-[11px] ${
                              tr.isAdTracker ? 'text-red-400/90 line-through' : 'text-slate-300'
                            }`}
                          >
                            {tr.url}
                          </span>
                          {tr.isAdTracker ? (
                            <span className="inline-flex items-center gap-1 text-[10px] bg-red-950 text-red-400 px-2 py-0.5 rounded-md border border-red-800/60 ml-2 flex-shrink-0 font-sans font-semibold">
                              <AlertTriangle className="w-3 h-3" /> {t.adTrackerRemoved}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-800/60 ml-2 flex-shrink-0 font-sans font-semibold">
                              <ShieldCheck className="w-3 h-3" /> Tracker Limpo
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-slate-800 flex justify-end flex-shrink-0">
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors"
                >
                  {t.modalCloseBtn}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
