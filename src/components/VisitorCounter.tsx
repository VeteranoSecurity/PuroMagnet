import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Activity } from 'lucide-react';
import { type Language, translations } from '../lib/i18n';

interface VisitorCounterProps {
  lang: Language;
}

const VISITS_STORAGE_KEY = 'puromagnet_visitor_count';
const BASELINE_COUNT = 1480; // Baseline initial count

export const VisitorCounter: React.FC<VisitorCounterProps> = ({ lang }) => {
  const t = translations[lang];
  const [count, setCount] = useState<number>(BASELINE_COUNT);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchVisits() {
      try {
        // Calculate local session visit count
        let localCount = Number(localStorage.getItem(VISITS_STORAGE_KEY) || BASELINE_COUNT);
        
        // Increment for this visit if session not yet logged in this tab
        if (!sessionStorage.getItem('puromagnet_session_logged')) {
          localCount += 1;
          localStorage.setItem(VISITS_STORAGE_KEY, String(localCount));
          sessionStorage.setItem('puromagnet_session_logged', 'true');
        }

        // Try hitting free counter API for global count
        const res = await fetch('https://api.counterapi.dev/v1/puromagnet/visits/up');
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.count === 'number' && isMounted) {
            // Set global count + baseline offset
            setCount(BASELINE_COUNT + data.count);
            setIsLoading(false);
            return;
          }
        }
      } catch (e) {
        // Fallback to local stored count if offline/network error
      }

      if (isMounted) {
        const fallback = Number(localStorage.getItem(VISITS_STORAGE_KEY) || BASELINE_COUNT);
        setCount(fallback);
        setIsLoading(false);
      }
    }

    fetchVisits();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="fixed bottom-4 left-4 z-30 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800/80 backdrop-blur-xl shadow-xl font-mono text-xs text-slate-300"
    >
      {/* Live Pulsing Dot */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>

      <Eye className="w-3.5 h-3.5 text-cyan-400" />

      {isLoading ? (
        <span className="text-slate-500 animate-pulse text-[11px]">Carregando...</span>
      ) : (
        <span className="font-bold text-slate-200 font-sans tracking-wide">
          {t.visitorCountLabel(count)}
        </span>
      )}
    </motion.div>
  );
};
