import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-background py-12 px-6 md:px-8 lg:px-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">

        <div className="flex flex-col items-center md:items-start gap-1.5">
          <span className="text-2xl font-black italic text-primary tracking-tighter">BookIt</span>
          <span className="text-[10px] text-on-surface-variant font-label uppercase tracking-[0.2em] opacity-50">
            © {new Date().getFullYear()} BookIt · Society made simple
          </span>
        </div>

        <div className="flex gap-8">
          {[
            { label: 'Privacy', path: '/privacy' },
            { label: 'Terms', path: '/terms' },
            { label: 'Support', path: '/support' }
          ].map(({ label, path }) => (
            <Link
              key={label}
              to={path}
              className="text-[10px] font-label uppercase tracking-widest text-on-surface-variant opacity-60 hover:opacity-100 hover:text-primary transition-all"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex gap-3">
          {[
            { icon: 'language', label: 'Website' },
            { icon: 'mail', label: 'Email' },
          ].map(({ icon, label }) => (
            <button
              key={icon}
              aria-label={label}
              className="w-9 h-9 rounded-full border border-outline-variant flex items-center justify-center opacity-60 hover:opacity-100 hover:border-primary/50 hover:text-primary transition-all group"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>{icon}</span>
            </button>
          ))}
        </div>

      </div>
    </footer>
  );
}