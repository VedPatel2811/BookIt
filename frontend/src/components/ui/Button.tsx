import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass';
  className?: string;
}

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const baseStyles = "relative flex items-center justify-center font-headline font-bold text-lg transition-all active:scale-95 group";
  const variants = {
    primary: "primary-gradient text-on-primary py-5 px-8 rounded-[1.5rem] shadow-xl hover:scale-[1.02] hover:neon-glow",
    secondary: "bg-surface-container-highest/50 text-on-surface py-5 px-8 rounded-[1.5rem] hover:bg-surface-container-highest",
    glass: "glass-panel bg-white/5 py-5 px-8 rounded-[1.5rem] text-on-surface border border-white/10 hover:bg-white/10"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
