import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Pencil, Infinity as InfinityIcon, Users, Plus } from 'lucide-react';
import {ACCENT, TEXT, MUTED, BORDER, BG} from './themes';


const TIMELINE_STEPS = [
  {
    icon: Plus,
    title: 'Create Room',
    description: 'Start a new canvas in one click. No signup, no setup.',
  },
  {
    icon: Users,
    title: 'Invite Friends',
    description: 'Share a link with your team. They join instantly.',
  },
  {
    icon: Pencil,
    title: 'Draw Together',
    description: 'Sketch, diagram, and build ideas in real time.',
  },
];


export function Timeline() {
  return (
    <section id="how" className="relative py-24 lg:py-32" style={{ backgroundColor: 'white' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold mb-3" style={{ color: ACCENT }}>
            HOW IT WORKS
          </p>
          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight" style={{ color: TEXT }}>
            From idea to canvas in three steps.
          </h2>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-8 md:gap-4">
          {/* Animated connecting line */}
          <svg className="absolute top-8 left-0 w-full h-2 hidden md:block" preserveAspectRatio="none">
            <motion.line
              x1="16%" y1="1" x2="84%" y2="1"
              stroke={BORDER}
              strokeWidth="2"
              strokeDasharray="6 6"
            />
            <motion.line
              x1="16%" y1="1" x2="84%" y2="1"
              stroke={ACCENT}
              strokeWidth="2"
              strokeDasharray="6 6"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.3 }}
            />
          </svg>

          {TIMELINE_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              className="relative flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <motion.div
                className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border-4"
                style={{ backgroundColor: BG, borderColor: 'white', color: ACCENT }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <step.icon size={24} />
                <div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ backgroundColor: TEXT }}
                >
                  {i + 1}
                </div>
              </motion.div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: TEXT }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed max-w-xs" style={{ color: MUTED }}>
                {step.description}
              </p>
              {i < TIMELINE_STEPS.length - 1 && (
                <div className="md:hidden mt-6 mb-2 text-2xl" style={{ color: BORDER }}>
                  ↓
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}