import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  HardDrive,
  Hash,
  Activity,
  Code,
  AlertTriangle,
} from 'lucide-react';
import type { MagnetCleanResult } from '../lib/magnet-cleaner';
import { type Language, translations } from '../lib/i18n';
import { ExtractionDetailsModal } from './ExtractionDetailsModal';

interface ResultCardProps {
  result: MagnetCleanResult;
  lang: Language;
  onToast?: (type: 'success' | 'info' | 'warning', title: string) => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, lang, onToast }) => {
  const t = translations[lang];
  const [copiedMagnet, setCopiedMagnet] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCopyMagnet = () => {
    if (result.cleanedMagnet) {
      navigator.clipboard.writeText(result.cleanedMagnet);
      setCopiedMagnet(true);
      if (onToast) {
        onToast('success', t.toastMagnetCopiedTitle);
      }
      setTimeout(() => setCopiedMagnet(false), 2500);
    }
  };

  const handleCopyHash = () => {
    if (result.infoHash) {
      navigator.clipboard.writeText(result.infoHash);
      setCopiedHash(true);
      if (onToast) {
        onToast('success', t.toastHashCopiedTitle);
      }
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  if (!result.success || !result.cleanedMagnet) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-full max-w-3xl mx-auto px-4 my-2 sm:my-3 z-20"
      >
        <div className="relative overflow-hidden bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-2xl shadow-2xl">
          {/* Glow Header Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500" />

          {/* Top Status & Title Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" /> {t.cleanMagnetBadge}
                </span>
                {result.removedTrackersCount > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-950/80 text-amber-400 border border-amber-800/60">
                    <AlertTriangle className="w-3 h-3" /> {t.removedAdsBadge(result.removedTrackersCount)}
                  </span>
                )}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight break-words font-sans line-clamp-2">
                {result.displayName || t.untitledMagnet}
              </h3>
            </div>

            {/* Quick Metrics Badges */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {result.fileSize && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-mono">
                  <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{result.fileSize}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-mono">
                <Activity className="w-3.5 h-3.5 text-indigo-400" />
                <span>{result.trackers.length} Trackers</span>
              </div>
            </div>
          </div>

          {/* Clean Magnet Link Box */}
          <div className="mb-3">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
              {t.decodedUrlLabel}
            </label>
            <div className="relative flex items-center bg-slate-950 border border-slate-800 rounded-xl p-2 sm:p-2.5 group">
              <p className="w-full text-xs font-mono text-cyan-300 break-all pr-4 line-clamp-2 select-all">
                {result.cleanedMagnet}
              </p>
            </div>
          </div>

          {/* Action Buttons: Copy & Open Client */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
            {/* Framer Motion Interactive Copy Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleCopyMagnet}
              className={`relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-xl transition-all duration-300 ${
                copiedMagnet
                  ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-cyan-500/25'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {copiedMagnet ? (
                  <motion.span
                    key="copied"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>{t.magnetCopied}</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="flex items-center gap-1.5"
                  >
                    <Copy className="w-4 h-4" />
                    <span>{t.copyCleanMagnet}</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Direct Open in Client Link */}
            <a
              href={result.cleanedMagnet}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 hover:border-slate-600 shadow-lg transition-all duration-200 active:scale-95"
            >
              <ExternalLink className="w-4 h-4 text-cyan-400" />
              <span>{t.openInClient}</span>
            </a>
          </div>

          {/* InfoHash Row */}
          {result.infoHash && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 p-2 sm:px-3 sm:py-2 bg-slate-950/60 border border-slate-800/80 rounded-xl mb-2.5">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Hash className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                <span>InfoHash:</span>
                <span className="text-slate-200 font-bold tracking-wider select-all truncate max-w-[220px] sm:max-w-xs">
                  {result.infoHash}
                </span>
              </div>
              <button
                onClick={handleCopyHash}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-mono font-medium hover:underline self-start sm:self-auto"
              >
                {copiedHash ? t.hashCopied : t.copyHash}
              </button>
            </div>
          )}

          {/* Payload Inspector Button (Opens Modal as requested) */}
          <div className="border-t border-slate-800/80 pt-2.5">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-between w-full text-xs font-mono text-slate-400 hover:text-cyan-300 py-1 px-2 rounded-lg hover:bg-slate-800/50 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.extractionDetails}</span>
              </span>
              <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-cyan-400 font-sans font-bold">
                Ver Modal →
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Extraction Details Modal */}
      <ExtractionDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        result={result}
        lang={lang}
      />
    </>
  );
};
