'use client';

import { cn } from '../../utils';

type ToggleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
};

export default function Toggle({ checked, onChange, disabled = false, size = 'sm' }: ToggleProps) {
  const sizeStyles = {
    sm: { track: 'w-9 h-5', thumb: 'w-3.5 h-3.5', translate: 'translate-x-[17px]' },
    md: { track: 'w-11 h-6', thumb: 'w-4.5 h-4.5', translate: 'translate-x-[21px]' },
  };

  const s = sizeStyles[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none',
        s.track,
        checked ? 'bg-[#0069FF]' : 'bg-gray-300',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
    >
      <span
        className={cn(
          'inline-block rounded-full bg-white shadow transform transition-transform duration-200',
          s.thumb,
          checked ? s.translate : 'translate-x-[3px]',
        )}
      />
    </button>
  );
}
