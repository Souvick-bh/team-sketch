import { GraphPaperBackground } from './GraphPaperBackground';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, Infinity as InfinityIcon, ArrowRight } from 'lucide-react';
import {ACCENT, TEXT, MUTED, BORDER, BG} from './themes';

export function CTA() {
  return (
    <section id="cta" className="relative py-24 lg:py-32 overflow-hidden">
      <GraphPaperBackground opacity={0.3} />
      <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
        <motion.h2
          className="text-4xl lg:text-6xl font-semibold tracking-tight mb-6"
          style={{ color: TEXT }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Ready to sketch your next big idea?
        </motion.h2>
        <motion.p
          className="text-lg leading-relaxed mb-10 max-w-md mx-auto"
          style={{ color: MUTED }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Start a room, invite your team, and draw together. No account needed.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-base text-white"
            style={{ backgroundColor: ACCENT, boxShadow: '0 8px 24px rgba(37,99,235,0.3)' }}
          >
            Start Drawing
            <ArrowRight size={18} />
          </motion.a>
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-base border bg-white"
            style={{ borderColor: BORDER, color: TEXT }}
          >
            <Github size={18} />
            Star on Github
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}