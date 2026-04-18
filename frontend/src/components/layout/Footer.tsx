export function Footer() {
  return (
    <footer className="bg-surface-container-lowest py-8 md:py-12 px-6 md:px-12 border-t border-outline-variant/10 w-full relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-2xl font-black italic text-primary tracking-tighter">BookIt</span>
          <span className="text-[10px] text-on-surface-variant font-label uppercase tracking-[0.2em] text-center md:text-left">
            © 2026 Luxury Systems International
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          <a className="text-[10px] md:text-xs font-label uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy</a>
          <a className="text-[10px] md:text-xs font-label uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">Compliance</a>
          <a className="text-[10px] md:text-xs font-label uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors" href="#">Support</a>
        </div>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all cursor-pointer">
            <span className="material-symbols-outlined text-sm">public</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all cursor-pointer">
            <span className="material-symbols-outlined text-sm">alternate_email</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
