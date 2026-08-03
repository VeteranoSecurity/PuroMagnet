import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Lock, Filter } from 'lucide-react';
import { type Language, translations } from '../lib/i18n';

interface EmptyStateProps {
  lang: Language;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ lang }) => {
  const t = translations[lang];

  const features = [
    {
      icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />,
      title: t.feat1Title,
      desc: t.feat1Desc,
    },
    {
      icon: <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />,
      title: t.feat2Title,
      desc: t.feat2Desc,
    },
    {
      icon: <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />,
      title: t.feat3Title,
      desc: t.feat3Desc,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full max-w-3xl mx-auto px-4 my-4 sm:my-6 z-20"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="p-4 sm:p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md hover:border-slate-700 hover:bg-slate-900/80 transition-all duration-300 group"
          >
            <div className="p-2 sm:p-2.5 rounded-xl bg-slate-950 w-fit mb-2 sm:mb-3 border border-slate-800 group-hover:scale-110 transition-transform duration-300">
              {feat.icon}
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-200 mb-1 font-sans">
              {feat.title}
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
              {feat.desc}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
