'use client';

import { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils';

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
  label?: string;
  children?: ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

export const Radio = ({ label, children, checked = false, onChange, disabled = false, className, ...rest }: RadioProps) => {
  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer select-none',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      <span className="relative flex items-center justify-center size-5">
        <input
          type="radio"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer sr-only"
          {...rest}
        />
        <span
          className={cn(
            'size-[15px] rounded-full border transition-colors',
            checked
              ? 'border-primary bg-white'
              : 'border-gray-d bg-white',
            disabled && 'bg-gray-f7',
          )}
        />
        {checked && (
          <span
            className={cn(
              'absolute size-[9px] rounded-full bg-primary',
              disabled && 'bg-gray-a',
            )}
          />
        )}
      </span>
      {(label || children) && (
        children || (
          <span className={cn('text-[14px] leading-[20px] text-black', disabled && 'text-gray-a')}>
            {label}
          </span>
        )
      )}
    </label>
  );
};
