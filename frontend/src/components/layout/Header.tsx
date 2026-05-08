import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  
  const navItems = [
    { label: 'How it works', path: '/how-it-works' },
    { label: 'Features', path: '/features' },
    { label: 'Pricing', path: '/pricing' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center h-20 px-6 md:px-8 lg:px-16 bg-background/50 backdrop-blur-md border-b border-white/5">
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-background">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0, 'wght' 600" }}>domain</span>
        </div>
        <div className="text-[1.75rem] font-black tracking-tight font-headline">
          <span className="text-on-surface">Book</span><span className="text-primary">It</span>
        </div>
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {navItems.map(({ label, path }) => {
          const isActive = location.pathname === path;
          
          if (path.startsWith('/#')) {
            return (
              <a
                key={label}
                href={path}
                className="text-xs font-label uppercase tracking-widest text-on-surface-variant opacity-80 hover:opacity-100 hover:text-primary transition-all"
              >
                {label}
              </a>
            );
          }

          return (
            <Link
              key={label}
              to={path}
              className={`text-xs font-label uppercase tracking-widest transition-all ${
                isActive 
                  ? 'text-primary opacity-100 font-bold' 
                  : 'text-on-surface-variant opacity-80 hover:opacity-100 hover:text-primary'
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <Link to="/signup">
        <button className="bg-primary text-background text-xs font-label font-bold uppercase tracking-widest px-5 py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(115,255,227,0.25)] active:scale-[0.98] transition-all cursor-pointer">
          Get started
        </button>
      </Link>
    </header>
  );
}