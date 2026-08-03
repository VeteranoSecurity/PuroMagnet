import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clipboard,
  Trash2,
  Sparkles,
  Link2,
  ShieldCheck,
  Command,
} from 'lucide-react';
import { type Language, translations } from '../lib/i18n';

interface MagnetInputProps {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
  lang: Language;
}

export const MagnetInput: React.FC<MagnetInputProps> = ({
  value,
  onChange,
  onClear,
  lang,
}) => {
  const t = translations[lang];
  const [isFocused, setIsFocused] = useState(false);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        onChange(text);
      }
    } catch (err) {
      console.error('Failed to read clipboard', err);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 my-4 sm:my-6 z-20">
      {/* Title Header */}
      <div className="text-center mb-4 sm:mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-mono font-medium mb-3 shadow-inner"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>{t.badgeText}</span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-2 sm:mb-3"
        >
          {t.heroTitle} <span className="text-gradient">{t.heroTitleHighlight}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed"
        >
          {t.heroDesc}
        </motion.p>
      </div>

      {/* Main Input Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="relative group"
      >
        {/* Animated Glow Border */}
        <div
          className={`absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 opacity-30 group-hover:opacity-60 transition-all duration-500 blur-lg ${
            isFocused ? 'opacity-80 blur-xl scale-[1.01]' : ''
          }`}
        />

        {/* Input Wrapper Container */}
        <div className="relative flex flex-col sm:flex-row items-center bg-slate-900/90 border border-slate-700/80 rounded-2xl p-2 sm:p-2.5 backdrop-blur-xl shadow-2xl transition-all duration-300">
          <div className="flex items-center w-full px-3 py-2 sm:py-0">
            <Link2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mr-3 animate-pulse" />
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={t.inputPlaceholder}
              className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-xs sm:text-base focus:outline-none font-mono selection:bg-cyan-500/40"
            />
          </div>

          {/* Action Buttons inside Input */}
          <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800 flex-shrink-0">
            {value ? (
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={onClear}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-950/80 hover:bg-red-900/90 border border-red-800/80 text-red-200 hover:text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-md active:scale-95"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                  <span>{t.clearInput}</span>
                </button>
                <div className="flex items-center justify-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20">
                  <ShieldCheck className="w-4 h-4 mr-1.5" />
                  <span>{t.cleanedStatus}</span>
                </div>
              </div>
            ) : (
              <button
                onClick={handlePaste}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs sm:text-sm transition-all duration-200 border border-cyan-500/20 hover:border-cyan-500/40 active:scale-95 shadow-md"
              >
                <Clipboard className="w-4 h-4 text-cyan-400" />
                <span>{t.pasteLink}</span>
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Keyboard Shortcut Indicator Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-mono"
      >
        <Command className="w-3 h-3 text-cyan-400" />
        <span>{t.kbdShortcutHint}</span>
        <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-bold text-[10px]">
          Ctrl + V
        </kbd>
      </motion.div>
    </div>
  );
};
