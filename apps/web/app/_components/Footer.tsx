
import { Logo } from './NavBar';

import { Infinity as InfinityIcon, ChevronRight } from 'lucide-react';
import { TEXT, MUTED, BORDER, BG} from './themes';


const FOOTER_LINKS = [
  { label: 'Github', href: 'https://github.com' },
  { label: 'Documentation', href: '#' },
  { label: 'Privacy', href: '#' },
];

const TECH_STACK = ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'WebSockets'];

export function Footer() {
  return (
    <footer className="relative border-t" style={{ borderColor: BORDER, backgroundColor: 'white' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-sm max-w-xs" style={{ color: MUTED }}>
              An open-source collaborative whiteboard for teams who think visually.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium transition-colors hover:opacity-70"
                style={{ color: TEXT }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-10 pt-8 border-t flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{ borderColor: BORDER }}>
          <div className="flex items-center gap-1.5 text-sm" style={{ color: MUTED }}>
            <span>Made with</span>
            <ChevronRight size={12} className="rotate-90" />
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {TECH_STACK.map((tech) => (
                <span key={tech} className="font-medium" style={{ color: TEXT }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <p className="text-xs" style={{ color: MUTED }}>
            © 2026 Canvas. Open source under MIT.
          </p>
        </div>
      </div>
    </footer>
  );
}