import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X, Zap } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full px-4 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`pointer-events-auto relative flex items-start gap-3 p-3.5 rounded-2xl border backdrop-blur-xl shadow-2xl overflow-hidden ${
              toast.type === 'success'
                ? 'bg-slate-900/95 border-emerald-500/40 text-slate-100 shadow-emerald-500/10'
                : toast.type === 'warning'
                ? 'bg-slate-900/95 border-amber-500/40 text-slate-100 shadow-amber-500/10'
                : 'bg-slate-900/95 border-cyan-500/40 text-slate-100 shadow-cyan-500/10'
            }`}
          >
            {/* Icon */}
            <div className="mt-0.5 flex-shrink-0">
              {toast.type === 'success' && (
                <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
              {toast.type === 'warning' && (
                <div className="p-1 rounded-lg bg-amber-500/20 text-amber-400">
                  <AlertCircle className="w-4 h-4" />
                </div>
              )}
              {toast.type === 'info' && (
                <div className="p-1 rounded-lg bg-cyan-500/20 text-cyan-400">
                  <Zap className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pr-2">
              <h5 className="text-xs font-bold text-slate-100 font-sans">
                {toast.title}
              </h5>
              {toast.message && (
                <p className="text-[11px] text-slate-400 mt-0.5 leading-tight font-sans">
                  {toast.message}
                </p>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Animated Bottom Bar */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 3, ease: 'linear' }}
              className={`absolute bottom-0 left-0 right-0 h-0.5 origin-left ${
                toast.type === 'success'
                  ? 'bg-emerald-500'
                  : toast.type === 'warning'
                  ? 'bg-amber-500'
                  : 'bg-cyan-500'
              }`}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
