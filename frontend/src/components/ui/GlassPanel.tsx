import type { HTMLAttributes } from 'react';

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function GlassPanel({ className = '', children, ...props }: GlassPanelProps) {
  return (
    <div className={`glass-panel rounded-[2.5rem] relative overflow-hidden ${className}`} {...props}>
      <div className="absolute inset-0 border border-outline-variant/10 rounded-[2.5rem] pointer-events-none"></div>
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
