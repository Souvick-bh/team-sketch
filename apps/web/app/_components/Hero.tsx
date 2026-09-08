import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Infinity as InfinityIcon, ArrowRight, Check,} from 'lucide-react';
import { BORDER, TEXT, ACCENT, MUTED } from './themes';
import { CanvasPreview } from './CanvasPreview';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  return (
    <section ref={containerRef} className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-8"
            style={{ borderColor: BORDER, backgroundColor: 'white' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: ACCENT }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: ACCENT }} />
            </span>
            <span className="text-xs font-medium" style={{ color: MUTED }}>
              Open source · v2.0
            </span>
          </motion.div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]"
            style={{ color: TEXT }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Collaborate.
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Draw.
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Think Together.
            </motion.span>
          </h1>

          <motion.p
            className="mt-8 text-lg leading-relaxed max-w-md"
            style={{ color: MUTED }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            One infinite canvas where teams sketch ideas, design systems, diagrams and workflows together in real time.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.a
              href="#cta"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-shadow"
              style={{ backgroundColor: ACCENT, boxShadow: '0 4px 14px rgba(37,99,235,0.25)' }}
            >
              Start Drawing
              <ArrowRight size={16} />
            </motion.a>
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border transition-colors hover:bg-gray-50"
              style={{ borderColor: BORDER, color: TEXT, backgroundColor: 'white' }}
            >
              <Github size={16} />
              Github
            </motion.a>
          </motion.div>

          <motion.div
            className="mt-8 flex flex-wrap gap-x-5 gap-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {['Multiplayer', 'Infinite Canvas', 'Room Sharing', 'Open Source'].map((badge) => (
              <div key={badge} className="flex items-center gap-1.5">
                <Check size={14} color={ACCENT} />
                <span className="text-xs font-medium" style={{ color: MUTED }}>
                  {badge}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div style={{ y: canvasY, opacity: canvasOpacity }} className="relative">
          <CanvasPreview />
        </motion.div>
      </div>
    </section>
  );
}