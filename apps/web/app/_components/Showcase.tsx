import { GraphPaperBackground } from './GraphPaperBackground';
import { motion } from 'framer-motion';
import { Pencil, MousePointer2, Infinity as InfinityIcon, MessageSquare, Database, StickyNote, Circle, Square, Minus, Plus, Download } from 'lucide-react';
import {ACCENT, TEXT, MUTED, BORDER, BG} from './themes';


type CursorUser = {
  name: string;
  color: string;
  x: string;
  y: string;
  delay: number;
  duration: number;
};

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

function ShowcaseWhiteboard() {
  return (
    <div
      className="relative w-full rounded-2xl border overflow-hidden"
      style={{
        borderColor: BORDER,
        backgroundColor: 'white',
        boxShadow: '0 20px 60px -15px rgba(0,0,0,0.15)',
      }}
    >
      <GraphPaperBackground opacity={0.5} />

      {/* Toolbar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 px-2 py-1.5 rounded-xl border bg-white/90 backdrop-blur-sm" style={{ borderColor: BORDER }}>
        <button className="p-1.5 rounded-md hover:bg-gray-100" style={{ color: ACCENT }}><Pencil size={14} /></button>
        <button className="p-1.5 rounded-md hover:bg-gray-100" style={{ color: MUTED }}><Square size={14} /></button>
        <button className="p-1.5 rounded-md hover:bg-gray-100" style={{ color: MUTED }}><Circle size={14} /></button>
        <button className="p-1.5 rounded-md hover:bg-gray-100" style={{ color: MUTED }}><Minus size={14} /></button>
        <div className="w-px h-5 mx-0.5" style={{ backgroundColor: BORDER }} />
        <button className="p-1.5 rounded-md hover:bg-gray-100" style={{ color: MUTED }}><StickyNote size={14} /></button>
        <button className="p-1.5 rounded-md hover:bg-gray-100" style={{ color: MUTED }}><MessageSquare size={14} /></button>
        <div className="w-px h-5 mx-0.5" style={{ backgroundColor: BORDER }} />
        <button className="p-1.5 rounded-md hover:bg-gray-100" style={{ color: MUTED }}><Download size={14} /></button>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 z-30 flex items-center gap-1 px-2 py-1 rounded-lg border bg-white" style={{ borderColor: BORDER }}>
        <button className="p-1 rounded hover:bg-gray-100" style={{ color: MUTED }}><Minus size={12} /></button>
        <span className="text-[10px] font-medium px-1" style={{ color: MUTED }}>100%</span>
        <button className="p-1 rounded hover:bg-gray-100" style={{ color: MUTED }}><Plus size={12} /></button>
      </div>

      {/* Collaborator avatars */}
      <div className="absolute top-4 right-4 z-30 flex -space-x-2">
        {['#2563EB', '#E11D48', '#16A34A', '#F59E0B'].map((c, i) => (
          <div
            key={i}
            className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-semibold text-white"
            style={{ backgroundColor: c, borderColor: 'white' }}
          >
            {['A', 'B', 'S', 'K'][i]}
          </div>
        ))}
        <div className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-semibold bg-gray-100" style={{ borderColor: 'white', color: MUTED }}>
          +3
        </div>
      </div>

      <div className="relative p-8 pt-20 pb-20 min-h-150">
        {/* Mind map */}
        <motion.div
          className="absolute"
          style={{ left: '4%', top: '18%' }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-xl px-4 py-3 text-center" style={{ backgroundColor: ACCENT, color: 'white' }}>
            <div className="text-sm font-semibold">Product Launch</div>
          </div>
        </motion.div>
        {[
          { label: 'Research', x: '2%', y: '38%', color: '#FEF3C7' },
          { label: 'Design', x: '14%', y: '8%', color: '#DBEAFE' },
          { label: 'Dev', x: '20%', y: '45%', color: '#FCE7F3' },
        ].map((node, i) => (
          <motion.div
            key={node.label}
            className="absolute"
            style={{ left: node.x, top: node.y }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
          >
            <div className="rounded-lg px-3 py-2 text-xs font-semibold border bg-white" style={{ borderColor: BORDER, color: TEXT }}>
              {node.label}
            </div>
          </motion.div>
        ))}

        {/* Database schema */}
        <motion.div
          className="absolute"
          style={{ left: '38%', top: '12%' }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="rounded-lg border bg-white overflow-hidden" style={{ borderColor: BORDER, width: '180px' }}>
            <div className="px-3 py-2 border-b flex items-center gap-2" style={{ borderColor: BORDER, backgroundColor: '#EFF6FF' }}>
              <Database size={14} color={ACCENT} />
              <span className="text-xs font-semibold" style={{ color: TEXT }}>users</span>
            </div>
            <div className="px-3 py-1.5 text-[10px] flex justify-between" style={{ color: MUTED }}>
              <span>id</span><span style={{ color: ACCENT }}>uuid</span>
            </div>
            <div className="px-3 py-1.5 text-[10px] flex justify-between border-t" style={{ color: MUTED, borderColor: BORDER }}>
              <span>email</span><span>text</span>
            </div>
            <div className="px-3 py-1.5 text-[10px] flex justify-between border-t" style={{ color: MUTED, borderColor: BORDER }}>
              <span>created_at</span><span>timestamp</span>
            </div>
          </div>
        </motion.div>

        {/* Code snippet */}
        <motion.div
          className="absolute"
          style={{ left: '62%', top: '10%' }}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="rounded-lg border overflow-hidden font-mono" style={{ borderColor: BORDER, width: '200px' }}>
            <div className="px-3 py-1.5 border-b flex items-center gap-1.5" style={{ borderColor: BORDER, backgroundColor: '#FAFAFA' }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FF5F57' }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#FEBC2E' }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#28C840' }} />
              <span className="text-[9px] ml-1" style={{ color: MUTED }}>sync.ts</span>
            </div>
            <div className="px-3 py-2.5 text-[9px] leading-relaxed" style={{ color: TEXT, backgroundColor: '#FAFAFA' }}>
              <div><span style={{ color: MUTED }}>const</span> <span style={{ color: ACCENT }}>sync</span> = <span style={{ color: '#16A34A' }}>useSync</span>()</div>
              <div className="mt-1"><span style={{ color: MUTED }}>await</span> sync.<span style={{ color: ACCENT }}>join</span>(roomId)</div>
              <div className="mt-1"><span style={{ color: '#6B7280' }}>// live cursors</span></div>
              <div>sync.<span style={{ color: ACCENT }}>on</span>(<span style={{ color: '#16A34A' }}>'cursor'</span>, cb)</div>
            </div>
          </div>
        </motion.div>

        {/* Flowchart */}
        {[
          { label: 'Start', x: '40%', y: '45%', color: '#DBEAFE' },
          { label: 'Auth', x: '55%', y: '45%', color: '#FEF3C7' },
          { label: 'Dashboard', x: '70%', y: '45%', color: '#FCE7F3' },
        ].map((box, i) => (
          <motion.div
            key={box.label}
            className="absolute"
            style={{ left: box.x, top: box.y }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
          >
            <div className="rounded-lg px-3 py-2 text-xs font-semibold border" style={{ borderColor: BORDER, backgroundColor: box.color, color: TEXT }}>
              {box.label}
            </div>
          </motion.div>
        ))}

        {/* Sticky notes */}
        <StickyNoteEl x="5%" y="62%" color="#FEF3C7" text="Ship MVP by Friday" delay={0.8} />
        <StickyNoteEl x="30%" y="68%" color="#DBEAFE" text="Need design review" delay={0.9} />
        <StickyNoteEl x="80%" y="65%" color="#FCE7F3" text="Ask Kevin about API" delay={1.0} />

        {/* Wireframe */}
        <motion.div
          className="absolute"
          style={{ left: '45%', top: '68%', width: '150px' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <div className="rounded-lg border p-3" style={{ borderColor: BORDER, backgroundColor: '#FAFAFA' }}>
            <div className="space-y-2">
              <div className="h-2 rounded-full bg-gray-200 w-3/4" />
              <div className="h-2 rounded-full bg-gray-200 w-full" />
              <div className="h-2 rounded-full bg-gray-200 w-2/3" />
              <div className="h-8 rounded-md mt-2 flex items-center justify-center" style={{ backgroundColor: '#DBEAFE' }}>
                <div className="h-2 rounded-full bg-blue-300 w-1/2" />
              </div>
              <div className="flex gap-1.5 mt-2">
                <div className="h-5 rounded-md bg-gray-200 flex-1" />
                <div className="h-5 rounded-md bg-gray-200 flex-1" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Hand drawn sketches */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <HandDrawnArrow d="M 80 80 Q 120 70, 160 85" delay={0.6} color={ACCENT} />
          <HandDrawnArrow d="M 250 80 Q 290 75, 330 85" delay={0.7} />
          <motion.path
            d="M 60 200 C 80 180, 110 220, 140 200 S 180 190, 200 210"
            stroke="#F59E0B"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />
          <motion.path
            d="M 400 200 Q 450 180, 500 200 T 600 195"
            stroke="#E11D48"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.9 }}
          />
          <motion.path
            d="M 350 350 C 370 330, 400 370, 420 340 S 460 330, 480 350"
            stroke="#16A34A"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 1.0 }}
          />
        </svg>

        {/* Comments */}
        <motion.div
          className="absolute z-20"
          style={{ left: '72%', top: '38%' }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 }}
        >
          <div className="rounded-lg px-2.5 py-1.5 text-[10px] font-medium shadow-md flex items-center gap-1.5" style={{ backgroundColor: ACCENT, color: 'white' }}>
            <MessageSquare size={11} />
            Should we add auth here?
          </div>
        </motion.div>
        <motion.div
          className="absolute z-20"
          style={{ left: '20%', top: '55%' }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.3 }}
        >
          <div className="rounded-lg px-2.5 py-1.5 text-[10px] font-medium shadow-md" style={{ backgroundColor: '#16A34A', color: 'white' }}>
            Love this flow
          </div>
        </motion.div>

        {/* Text labels */}
        <motion.div
          className="absolute text-[11px] font-semibold"
          style={{ left: '28%', top: '40%', color: MUTED }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.4 }}
        >
          user journey →
        </motion.div>

        {/* Cursors */}
        {[
          { name: 'Alice', color: ACCENT, x: '35%', y: '30%', delay: 0, duration: 7 },
          { name: 'Bob', color: '#E11D48', x: '75%', y: '55%', delay: 0.5, duration: 8 },
          { name: 'Sarah', color: '#16A34A', x: '50%', y: '75%', delay: 1, duration: 9 },
          { name: 'Kevin', color: '#F59E0B', x: '15%', y: '50%', delay: 1.5, duration: 6.5 },
        ].map((u) => (
          <CursorWithLabel key={u.name} user={u} />
        ))}

        {/* Pencil animation */}
        <motion.div
          className="absolute z-30"
          style={{ left: '60%', top: '35%' }}
          animate={{
            x: [0, 25, 45, 25, 0],
            y: [0, -5, 10, 5, 0],
            rotate: [0, -10, 5, -5, 0],
          }}
          transition={{
            duration: 5,
            delay: 2,
            repeat: Infinity,
            repeatDelay: 4,
            ease: 'easeInOut',
          }}
        >
          <Pencil size={20} color={TEXT} />
        </motion.div>
      </div>
    </div>
  );
}

export function Showcase() {
  return (
    <section id="showcase" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          className="text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold mb-3" style={{ color: ACCENT }}>
            SHOWCASE
          </p>
          <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight mb-4" style={{ color: TEXT }}>
            One canvas. Infinite possibilities.
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: MUTED }}>
            Mind maps, wireframes, database schemas, flowcharts, and sketches — all living together on a single board.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          whileHover={{ rotate: 0.5 }}
        >
          <ShowcaseWhiteboard />
        </motion.div>
      </div>
    </section>
  );
}