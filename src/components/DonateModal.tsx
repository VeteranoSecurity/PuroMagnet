import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Heart, ExternalLink, Coffee, QrCode } from 'lucide-react';
import { type Language, translations } from '../lib/i18n';
import pixImg from '../assets/Pix.png';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onToast?: (type: 'success' | 'info' | 'warning', title: string) => void;
}

const PIX_CODE =
  '00020101021126580014BR.GOV.BCB.PIX0136517d6a27-31aa-43a9-91d9-286ebef6a26d5204000053039865802BR5908Veterano6009SAO PAULO62080504daqr630496A0';

export const DonateModal: React.FC<DonateModalProps> = ({
  isOpen,
  onClose,
  lang,
  onToast,
}) => {
  const t = translations[lang];
  const [copiedPix, setCopiedPix] = useState(false);

  const handleCopyPix = () => {
    navigator.clipboard.writeText(PIX_CODE);
    setCopiedPix(true);
    if (onToast) {
      onToast('success', t.pixCopiedToast);
    }
    setTimeout(() => setCopiedPix(false), 2500);
  };

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
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-40"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 15 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Top Accent Gradient */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400" />

              {/* Top Bar */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <Heart className="w-5 h-5 fill-amber-400/20" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-sans">
                    {t.donateTitle}
                  </h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-center">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-md mx-auto">
                  {t.donateSub}
                </p>

                {/* PT-BR Specific PIX QR Code & Copia e Cola */}
                {lang === 'pt' && (
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      <QrCode className="w-4 h-4" />
                      <span>QRCode PIX (Qualquer Valor)</span>
                    </div>

                    {/* PIX Image */}
                    <div className="flex justify-center py-2">
                      <div className="p-2 bg-white rounded-2xl shadow-xl shadow-emerald-500/10 border border-emerald-500/30">
                        <img
                          src={pixImg}
                          alt="QR Code PIX Veterano"
                          className="w-44 h-44 sm:w-48 sm:h-48 object-contain rounded-xl"
                        />
                      </div>
                    </div>

                    {/* Copia e Cola Code */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1 font-mono">
                        {t.pixCopyLabel}
                      </label>
                      <div className="bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-[10px] font-mono text-slate-300 break-all select-all max-h-16 overflow-y-auto">
                        {PIX_CODE}
                      </div>
                    </div>

                    {/* Copy PIX Button */}
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={handleCopyPix}
                      className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-all duration-200 ${
                        copiedPix
                          ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                      }`}
                    >
                      {copiedPix ? (
                        <>
                          <Check className="w-4 h-4 stroke-[3]" />
                          <span>Código PIX Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>{t.pixCopyBtn}</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                )}

                {/* Buy Me a Coffee Option (Always visible or primary for EN/ES) */}
                <div className="pt-2">
                  {lang === 'pt' && (
                    <span className="text-[11px] text-slate-500 block mb-3 font-mono">
                      — {t.orBuyMeACoffee} —
                    </span>
                  )}
                  <a
                    href="https://buymeacoffee.com/trilharede"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/20 hover:from-amber-300 hover:to-yellow-400 transition-all duration-200 active:scale-95 group"
                  >
                    <Coffee className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Buy Me a Coffee (buymeacoffee.com/trilharede)</span>
                    <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
