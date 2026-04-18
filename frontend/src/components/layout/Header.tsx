export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center h-24 px-6 md:px-12 bg-surface/30 backdrop-blur-md border-b border-white/5">
      <div className="text-2xl md:text-3xl font-black tracking-tighter text-primary italic font-headline drop-shadow-md">
        BookIt
      </div>
      <div className="flex items-center gap-6">
        <span className="hidden md:inline-block text-on-surface-variant font-medium text-[10px] md:text-sm font-label tracking-widest uppercase">
          Premium Estate Management
        </span>
      </div>
    </header>
  );
}
