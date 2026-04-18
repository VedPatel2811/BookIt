import { InputHTMLAttributes } from 'react';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full bg-surface-container-highest text-on-surface p-4 rounded-md outline-none transition-all focus:border-b-2 focus:border-primary focus:shadow-[0_4px_12px_rgba(115,255,227,0.1)] border-b-2 border-transparent ${props.className || ''}`}
    />
  );
}
