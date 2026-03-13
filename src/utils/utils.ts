import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseSteps(text: string): string[] {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  return lines;
}

export function debounce<T extends (...args: any[]) => any>(func: T, wait: number) {
  let timeout: number;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      func(...args);
    }, wait);
  };
}