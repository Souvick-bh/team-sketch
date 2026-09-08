import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {  Github,  Infinity as InfinityIcon,  ArrowRight,  Minus,  Plus,} from 'lucide-react';
import { BORDER, TEXT, ACCENT, BG } from './themes';


function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);
  return scrolled;
}


export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <motion.path
          d="M4 20 C 8 24, 14 22, 18 16 S 24 6, 24 4"
          stroke={TEXT}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="24"
          cy="4"
          r="2.5"
          fill={ACCENT}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
        />
      </svg>
      <span
        className="text-lg font-semibold tracking-tight"
        style={{ color: TEXT }}
      >
        Canvas
      </span>
    </div>
  );
}


export function Navbar() {
  const scrolled = useScrolled(20);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div
        className="transition-all duration-300"
        style={{
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          backgroundColor: scrolled ? 'rgba(250, 250, 247, 0.8)' : 'transparent',
          borderBottom: scrolled ? `1px solid ${BORDER}` : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: TEXT }}
            >
              Features
            </a>
            <a
              href="#showcase"
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: TEXT }}
            >
              Showcase
            </a>
            <a
              href="#how"
              className="text-sm font-medium transition-colors hover:opacity-70"
              style={{ color: TEXT }}
            >
              How it works
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium transition-colors hover:opacity-70 flex items-center gap-1.5"
              style={{ color: TEXT }}
            >
              <Github size={16} />
              Github
            </a>
          </div>
          <div className="flex items-center gap-3">
            <motion.a
              href="http://localhost:3000/login"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
              style={{ color: TEXT }}
            >
              Start Drawing
              <ArrowRight size={15} />
            </motion.a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2"
              style={{ color: TEXT }}
              aria-label="Menu"
            >
              {mobileOpen ? <Minus size={20} /> : <Plus size={20} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t"
              style={{ borderColor: BORDER, backgroundColor: BG }}
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                <a href="#features" onClick={() => setMobileOpen(false)} className="text-sm font-medium" style={{ color: TEXT }}>Features</a>
                <a href="#showcase" onClick={() => setMobileOpen(false)} className="text-sm font-medium" style={{ color: TEXT }}>Showcase</a>
                <a href="#how" onClick={() => setMobileOpen(false)} className="text-sm font-medium" style={{ color: TEXT }}>How it works</a>
                <a href="https://github.com" className="text-sm font-medium flex items-center gap-1.5" style={{ color: TEXT }}>
                  <Github size={16} /> Github
                </a>
                <a href="#cta" onClick={() => setMobileOpen(false)} className="text-sm font-semibold inline-flex items-center gap-1.5" style={{ color: ACCENT }}>
                  Start Drawing <ArrowRight size={15} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}