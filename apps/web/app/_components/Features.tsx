import React from 'react';
import { GraphPaperBackground } from './GraphPaperBackground';
import { motion } from 'framer-motion';
import { MousePointer2, Infinity as InfinityIcon, Share2, Users, Link2, StickyNote } from 'lucide-react';
import {ACCENT, TEXT, MUTED, BORDER } from './themes';

type CursorUser = {
  name: string;
  color: string;
  x: string;
  y: string;
  delay: number;
  duration: number;
};


function FeatureCollabIllustration() {
  return (
    <div className="relative w-full h-full min-h-70 rounded-xl overflow-hidden" style={{ backgroundColor: '#FAFAFA', border: `1px solid ${BORDER}` }}>
      <GraphPaperBackground opacity={0.5} />
      <svg className="absolute inset-0 w-full h-full">
        <motion.path
          d="M 60 80 Q 120 60, 180 90"
          stroke={ACCENT}
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />
        <motion.path
          d="M 200 120 Q 260 100, 320 130"
          stroke="#16A34A"
          strokeWidth="2"
          fill="none"
          strokeDasharray="4 4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </svg>
      <div className="absolute top-6 left-6 rounded-lg px-3 py-2 border bg-white text-xs font-semibold" style={{ borderColor: BORDER, color: TEXT }}>
        Sketch area
      </div>
      <div className="absolute bottom-8 right-8 rounded-lg px-3 py-2 border bg-white text-xs font-semibold" style={{ borderColor: BORDER, color: TEXT }}>
        Shared
      </div>
      {[
        { name: 'Alice', color: ACCENT, x: '15%', y: '35%' },
        { name: 'Bob', color: '#E11D48', x: '60%', y: '50%' },
        { name: 'Sarah', color: '#16A34A', x: '35%', y: '75%' },
      ].map((u, i) => (
        <motion.div
          key={u.name}
          className="absolute"
          style={{ left: u.x, top: u.y }}
          animate={{ x: [0, 15, -8, 0], y: [0, -10, 5, 0] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        >
          <MousePointer2 size={18} fill={u.color} color={u.color} />
          <div className="ml-3 -mt-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold text-white" style={{ backgroundColor: u.color }}>
            {u.name}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function FeatureCanvasIllustration() {
  return (
    <div className="relative w-full h-full min-h-70 rounded-xl overflow-hidden" style={{ backgroundColor: '#FAFAFA', border: `1px solid ${BORDER}` }}>
      <GraphPaperBackground opacity={0.5} />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ width: '70%', height: '60%' }}>
          <div className="absolute inset-0 rounded-lg border-2 border-dashed" style={{ borderColor: BORDER }}>
            <div className="absolute top-2 left-2 text-[10px] font-medium" style={{ color: MUTED }}>viewport</div>
          </div>
          <motion.div
            className="absolute rounded-lg border bg-white shadow-sm"
            style={{ left: '-15%', top: '-10%', width: '50%', height: '40%', borderColor: BORDER }}
            animate={{ x: [0, 10, 0], y: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="p-2 space-y-1">
              <div className="h-1.5 rounded-full bg-gray-200 w-3/4" />
              <div className="h-1.5 rounded-full bg-gray-200 w-1/2" />
            </div>
          </motion.div>
          <motion.div
            className="absolute rounded-lg border bg-white shadow-sm"
            style={{ right: '-20%', bottom: '-15%', width: '55%', height: '50%', borderColor: BORDER }}
            animate={{ x: [0, -10, 0], y: [0, 5, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="p-2 space-y-1">
              <div className="h-1.5 rounded-full w-2/3" style={{ backgroundColor: '#DBEAFE' }} />
              <div className="h-1.5 rounded-full bg-gray-200 w-full" />
              <div className="h-1.5 rounded-full bg-gray-200 w-3/5" />
            </div>
          </motion.div>
          <motion.div
            className="absolute rounded-lg border bg-white shadow-sm"
            style={{ left: '60%', top: '5%', width: '45%', height: '35%', borderColor: BORDER }}
            animate={{ x: [0, -8, 0], y: [0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="p-2">
              <div className="h-8 rounded-md flex items-center justify-center" style={{ backgroundColor: '#FEF3C7' }}>
                <StickyNote size={14} color={TEXT} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-md bg-white border text-[10px] font-medium" style={{ borderColor: BORDER, color: MUTED }}>
        <InfinityIcon size={12} /> Infinite
      </div>
    </div>
  );
}

function FeatureShareIllustration() {
  return (
    <div className="relative w-full h-full min-h-70 rounded-xl overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#FAFAFA', border: `1px solid ${BORDER}` }}>
      <GraphPaperBackground opacity={0.4} />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <motion.div
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-white shadow-sm"
          style={{ borderColor: BORDER }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <Link2 size={16} color={ACCENT} />
          <span className="text-sm font-mono font-medium" style={{ color: TEXT }}>
            canvas.app/r/sketch-42
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-8 w-px"
          style={{ backgroundColor: BORDER }}
        />
        <div className="flex -space-x-2">
          {['#2563EB', '#E11D48', '#16A34A', '#F59E0B'].map((c, i) => (
            <motion.div
              key={i}
              className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-semibold text-white"
              style={{ backgroundColor: c, borderColor: 'white' }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, type: 'spring' }}
            >
              {['A', 'B', 'S', 'K'][i]}
            </motion.div>
          ))}
        </div>
        <motion.div
          className="text-xs font-medium"
          style={{ color: MUTED }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
        >
          4 collaborators joined
        </motion.div>
      </div>
    </div>
  );
}

type Feature = {
  icon: typeof Users;
  title: string;
  description: string;
  illustration: () => React.JSX.Element;
  reverse?: boolean;
};

const FEATURES: Feature[] = [
  {
    icon: Users,
    title: 'Real-time Collaboration',
    description:
      'See your teammates move, draw, and think in real time. Every cursor, every stroke, every sticky note — synced instantly. No refresh, no waiting.',
    illustration: FeatureCollabIllustration,
  },
  {
    icon: InfinityIcon,
    title: 'Infinite Canvas',
    description:
      'Never run out of space. Pan and zoom across an endless canvas that grows with your ideas. From a single sketch to an entire system map.',
    illustration: FeatureCanvasIllustration,
    reverse: true,
  },
  {
    icon: Share2,
    title: 'Share Rooms',
    description:
      'Send a link, and you are in. No accounts required, no setup, no friction. Share a room and start drawing together in seconds.',
    illustration: FeatureShareIllustration,
  },
];

function FeatureBlock({ feature, index }: { feature: Feature; index: number }) {
  const Illustration = feature.illustration;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${feature.reverse ? 'lg:[direction:rtl]' : ''}`}
    >
      <div className="[direction:ltr]">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-5"
          style={{ backgroundColor: '#EFF6FF' }}
        >
          <feature.icon size={16} color={ACCENT} />
          <span className="text-xs font-semibold" style={{ color: ACCENT }}>
            0{index + 1}
          </span>
        </div>
        <h3
          className="text-3xl lg:text-4xl font-semibold tracking-tight mb-4"
          style={{ color: TEXT }}
        >
          {feature.title}
        </h3>
        <p className="text-base lg:text-lg leading-relaxed max-w-md" style={{ color: MUTED }}>
          {feature.description}
        </p>
      </div>
      <motion.div
        whileHover={{ y: -4 }}
        className="[direction:ltr]"
      >
        <Illustration />
      </motion.div>
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          className="max-w-2xl mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold mb-3" style={{ color: ACCENT }}>
            FEATURES
          </p>
          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight" style={{ color: TEXT }}>
            Everything you need to think visually, together.
          </h2>
        </motion.div>
        <div className="space-y-28">
          {FEATURES.map((f, i) => (
            <FeatureBlock key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}