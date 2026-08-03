import React, { useState } from 'react';
import { Magnet, History, HelpCircle, Globe, ChevronDown, Heart, Coffee } from 'lucide-react';
import { type Language, translations } from '../lib/i18n';

interface HeaderProps {
  onOpenHistory: () => void;
  onOpenHowItWorks: () => void;
  onOpenDonate: () => void;
  historyCount: number;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'pt', label: 'PT', flag: '🇧🇷' },
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'es', label: 'ES', flag: '🇪🇸' },
];

export const Header: React.FC<HeaderProps> = ({
  onOpenHistory,
  onOpenHowItWorks,
  onOpenDonate,
  historyCount,
  lang,
  onLanguageChange,
}) => {
  const t = translations[lang];
  const [isLangOpen, setIsLangOpen] = useState(false);
  const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  const handleSupportClick = () => {
    if (lang === 'pt') {
      onOpenDonate();
    } else {
      window.open('https://buymeacoffee.com/trilharede', '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <header className="w-full max-w-5xl mx-auto px-4 py-3 sm:py-5 flex items-center justify-between z-30">
      {/* Brand / Logo */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
          <div className="w-full h-full bg-slate-950 rounded-[15px] flex items-center justify-center">
            <Magnet className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg sm:text-xl font-bold tracking-tight text-white font-mono">
            Puro<span className="text-cyan-400">Magnet</span>
          </span>
        </div>
      </div>

      {/* Right Controls: Donate + Language Selector + Help + History */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Support / Donate Button (PIX for PT, Buy Me a Coffee for EN/ES) */}
        <button
          onClick={handleSupportClick}
          className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold rounded-xl shadow-lg transition-all duration-200 active:scale-95 ${
            lang === 'pt'
              ? 'bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-500/40 shadow-emerald-500/10'
              : 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 shadow-amber-500/20'
          }`}
          title={t.supportBtn}
        >
          {lang === 'pt' ? (
            <>
              <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" />
              <span>Apoiar (PIX)</span>
            </>
          ) : (
            <>
              <Coffee className="w-3.5 h-3.5 text-slate-950" />
              <span>Buy Me a Coffee</span>
            </>
          )}
        </button>

        {/* Language Dropdown Selector */}
        <div className="relative">
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 rounded-xl backdrop-blur-md transition-all duration-200"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-mono">{currentLang.flag} {currentLang.label}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {isLangOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsLangOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-32 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1 z-50">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onLanguageChange(l.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                      lang === l.code
                        ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{l.flag} {l.label}</span>
                    {lang === l.code && <span className="text-cyan-400">✓</span>}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* How it Works Button */}
        <button
          onClick={onOpenHowItWorks}
          className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-xl backdrop-blur-md transition-all duration-200"
          title={t.howItWorks}
        >
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <span className="hidden sm:inline">{t.howItWorks}</span>
        </button>

        {/* History Button */}
        <button
          onClick={onOpenHistory}
          className="relative flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 rounded-xl backdrop-blur-md transition-all duration-200"
          title={t.history}
        >
          <History className="w-4 h-4 text-indigo-400" />
          <span className="hidden xs:inline">{t.history}</span>
          {historyCount > 0 && (
            <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-cyan-500 text-slate-950 font-mono">
              {historyCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
