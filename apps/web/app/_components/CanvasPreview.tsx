
import { motion } from 'framer-motion';
import { Pencil, MousePointer2, Infinity as InfinityIcon, MessageSquare, Database, Code2, StickyNote, Circle, Square, Minus } from 'lucide-react';

import { BORDER, TEXT, ACCENT, MUTED } from './themes';
import { GraphPaperBackground } from './GraphPaperBackground';


type CursorUser = {
  name: string;
  color: string;
  x: string;
  y: string;
  delay: number;
  duration: number;
};

const CURSOR_USERS: CursorUser[] = [
  { name: 'Alice', color: '#2563EB', x: '8%', y: '12%', delay: 0, duration: 7 },
  { name: 'Bob', color: '#E11D48', x: '72%', y: '28%', delay: 0.5, duration: 8 },
  { name: 'Sarah', color: '#16A34A', x: '40%', y: '65%', delay: 1, duration: 9 },
  { name: 'Kevin', color: '#F59E0B', x: '85%', y: '70%', delay: 1.5, duration: 6.5 },
];

function BoxEl({
  x,
  y,
  w,
  label,
  sublabel,
  color = TEXT,
  bg = 'white',
  delay = 0,
  icon: Icon,
}: {
  x: string;
  y: string;
  w: string;
  label: string;
  sublabel?: string;
  color?: string;
  bg?: string;
  delay?: number;
  icon?: typeof Database;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y, width: w }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div
        className="rounded-lg px-3 py-2.5 border flex items-center gap-2"
        style={{ borderColor: BORDER, backgroundColor: bg }}
      >
        {Icon && <Icon size={16} color={color} />}
        <div>
          <div className="text-xs font-semibold" style={{ color: TEXT }}>
            {label}
          </div>
          {sublabel && (
            <div className="text-[10px]" style={{ color: MUTED }}>
              {sublabel}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function StickyNoteEl({
  x,
  y,
  color,
  text,
  delay = 0,
}: {
  x: string;
  y: string;
  color: string;
  text: string;
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
      animate={{ opacity: 1, scale: 1, rotate: -2 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, rotate: 1, zIndex: 20 }}
    >
      <div
        className="px-3 py-2.5 rounded-sm shadow-md text-xs font-medium leading-snug"
        style={{
          backgroundColor: color,
          color: TEXT,
          width: '120px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}
      >
        {text}
      </div>
    </motion.div>
  );
}

function HandDrawnArrow({
  d,
  delay = 0,
  color = MUTED,
}: {
  d: string;
  delay?: number;
  color?: string;
}) {
  return (
    <motion.path
      d={d}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      strokeDasharray="4 4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ delay, duration: 1, ease: 'easeInOut' }}
    />
  );
}

function CursorWithLabel({ user }: { user: CursorUser }) {
  return (
    <motion.div
      className="absolute z-30"
      style={{ left: user.x, top: user.y }}
      animate={{
        x: [0, 20, -10, 15, 0],
        y: [0, -15, 10, -5, 0],
      }}
      transition={{
        duration: user.duration,
        delay: user.delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <MousePointer2 size={18} fill={user.color} color={user.color} />
      <div
        className="ml-3 -mt-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold text-white whitespace-nowrap"
        style={{ backgroundColor: user.color }}
      >
        {user.name}
      </div>
    </motion.div>
  );
}

export function CanvasPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, rotate: -1 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
      whileHover={{ rotate: 1 }}
      className="relative w-full aspect-4/3 rounded-2xl border overflow-hidden"
      style={{
        borderColor: BORDER,
        backgroundColor: 'white',
        boxShadow: '0 20px 60px -15px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.04)',
      }}
    >
      <GraphPaperBackground opacity={0.5} />

      {/* Toolbar */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 px-2 py-1.5 rounded-xl border bg-white/90 backdrop-blur-sm" style={{ borderColor: BORDER }}>
        <button className="p-1.5 rounded-md hover:bg-gray-100" style={{ color: TEXT }}><Pencil size={14} /></button>
        <button className="p-1.5 rounded-md hover:bg-gray-100" style={{ color: MUTED }}><Square size={14} /></button>
        <button className="p-1.5 rounded-md hover:bg-gray-100" style={{ color: MUTED }}><Circle size={14} /></button>
        <button className="p-1.5 rounded-md hover:bg-gray-100" style={{ color: MUTED }}><Minus size={14} /></button>
        <div className="w-px h-5 mx-0.5" style={{ backgroundColor: BORDER }} />
        <button className="p-1.5 rounded-md hover:bg-gray-100" style={{ color: MUTED }}><StickyNote size={14} /></button>
        <button className="p-1.5 rounded-md hover:bg-gray-100" style={{ color: MUTED }}><MessageSquare size={14} /></button>
      </div>

      {/* Sticky notes */}
      <StickyNoteEl x="5%" y="18%" color="#FEF3C7" text="Brainstorm ideas" delay={0.4} />
      <StickyNoteEl x="60%" y="55%" color="#DBEAFE" text="User flow v2" delay={0.6} />
      <StickyNoteEl x="78%" y="15%" color="#FCE7F3" text="Design review" delay={0.8} />

      {/* Flowchart boxes */}
      <BoxEl x="8%" y="40%" w="100px" label="Login" sublabel="POST /auth" color={ACCENT} delay={0.5} icon={Code2} />
      <BoxEl x="28%" y="40%" w="100px" label="Dashboard" sublabel="GET /home" delay={0.7} />
      <BoxEl x="48%" y="40%" w="110px" label="Database" sublabel="PostgreSQL" color={ACCENT} delay={0.9} icon={Database} />

      {/* API box */}
      <BoxEl x="68%" y="42%" w="90px" label="API" sublabel="REST / v2" color={ACCENT} bg="#EFF6FF" delay={1.1} />

      {/* Wireframe */}
      <motion.div
        className="absolute"
        style={{ left: '10%', top: '68%', width: '130px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
      >
        <div className="rounded-lg border p-2.5" style={{ borderColor: BORDER, backgroundColor: '#FAFAFA' }}>
          <div className="space-y-1.5">
            <div className="h-1.5 rounded-full bg-gray-200 w-3/4" />
            <div className="h-1.5 rounded-full bg-gray-200 w-full" />
            <div className="h-1.5 rounded-full bg-gray-200 w-2/3" />
            <div className="h-6 rounded-md mt-1.5 flex items-center justify-center" style={{ backgroundColor: '#DBEAFE' }}>
              <div className="h-1.5 rounded-full bg-blue-300 w-1/2" />
            </div>
          </div>
        </div>
        <div className="text-[9px] mt-1 text-center" style={{ color: MUTED }}>Wireframe</div>
      </motion.div>

      {/* Freehand SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <HandDrawnArrow d="M 120 100 Q 160 90, 200 100" delay={1.0} color={ACCENT} />
        <HandDrawnArrow d="M 300 100 Q 340 95, 380 100" delay={1.2} />
        <HandDrawnArrow d="M 460 100 Q 500 90, 540 100" delay={1.4} color={ACCENT} />
        <motion.path
          d="M 50 280 Q 80 260, 120 270 T 200 265"
          stroke="#F59E0B"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.5, duration: 1.5, ease: 'easeInOut' }}
        />
        <motion.path
          d="M 350 220 C 370 200, 400 240, 420 210 S 460 200, 480 220"
          stroke="#E11D48"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.7, duration: 1.2 }}
        />
      </svg>

      {/* Comment bubble */}
      <motion.div
        className="absolute z-20"
        style={{ left: '52%', top: '20%' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.6, duration: 0.4 }}
      >
        <div className="rounded-lg px-2.5 py-1.5 text-[10px] font-medium shadow-md" style={{ backgroundColor: ACCENT, color: 'white' }}>
          Nice work! 👍
        </div>
      </motion.div>

      {/* Text label */}
      <motion.div
        className="absolute z-10 text-[11px] font-semibold"
        style={{ left: '30%', top: '72%', color: MUTED }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        ← user journey
      </motion.div>

      {/* Cursors */}
      {CURSOR_USERS.map((u) => (
        <CursorWithLabel key={u.name} user={u} />
      ))}

      {/* Pencil animation */}
      <motion.div
        className="absolute z-30"
        style={{ left: '15%', top: '55%' }}
        animate={{
          x: [0, 30, 50, 30, 0],
          y: [0, -5, 10, 5, 0],
          rotate: [0, -10, 5, -5, 0],
        }}
        transition={{
          duration: 5,
          delay: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'easeInOut',
        }}
      >
        <Pencil size={20} color={TEXT} />
      </motion.div>
    </motion.div>
  );
}