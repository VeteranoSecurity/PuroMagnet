import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import { type Language, translations } from '../lib/i18n';

interface VisitorCounterProps {
  lang: Language;
}

const LOCAL_STORAGE_VISITS = 'puromagnet_real_visit_count';
const COUNTER_API_URL = 'https://api.counterapi.dev/v1/puromagnet_v2_real/visits/up';

export const VisitorCounter: React.FC<VisitorCounterProps> = ({ lang }) => {
  const t = translations[lang];
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchRealVisits() {
      try {
        // Fetch real global visit counter increment
        const res = await fetch(COUNTER_API_URL);
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.count === 'number' && isMounted) {
            setCount(data.count);
            localStorage.setItem(LOCAL_STORAGE_VISITS, String(data.count));
            return;
          }
        }
      } catch (e) {
        console.warn('Network counter fetch failed, using local count', e);
      }

      // Fallback: real local counter starting from 1
      if (isMounted) {
        let localVisits = Number(localStorage.getItem(LOCAL_STORAGE_VISITS) || 0);
        if (!sessionStorage.getItem('puromagnet_visited_session')) {
          localVisits += 1;
          localStorage.setItem(LOCAL_STORAGE_VISITS, String(localVisits));
          sessionStorage.setItem('puromagnet_visited_session', 'true');
        }
        setCount(localVisits || 1);
      }
    }

    fetchRealVisits();

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
      {/* Live Pulsing Green Dot */}
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>

      <Eye className="w-3.5 h-3.5 text-cyan-400" />

      {count === null ? (
        <span className="text-slate-500 animate-pulse text-[11px]">...</span>
      ) : (
        <span className="font-bold text-slate-200 font-sans tracking-wide">
          {t.visitorCountLabel(count)}
        </span>
      )}
    </motion.div>
  );
};
