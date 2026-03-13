'use client';

import { InputHTMLAttributes, ReactNode } from 'react';
import { Icon } from '../icons';
import { cn } from '../../utils';

type CheckboxColor = 'primary' | 'black';

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> & {
  label?: string;
  children?: ReactNode;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  color?: CheckboxColor;
};

const CHECKED_COLOR_STYLES: Record<CheckboxColor, string> = {
  primary: 'border-primary bg-primary',
  black: 'border-black bg-black',
};

const DISABLED_CHECKED_COLOR_STYLES: Record<CheckboxColor, string> = {
  primary: 'bg-gray-a border-gray-a',
  black: 'bg-gray-a border-gray-a',
};

export const Checkbox = ({ label, children, checked = false, onChange, disabled = false, color = 'black', className, ...rest }: CheckboxProps) => {
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
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer sr-only"
          {...rest}
        />
        <span
          className={cn(
            'size-[15px] rounded-[4px] border transition-colors flex items-center justify-center',
            checked
              ? CHECKED_COLOR_STYLES[color]
              : 'border-gray-d bg-white',
            disabled && !checked && 'bg-gray-f7',
            disabled && checked && DISABLED_CHECKED_COLOR_STYLES[color],
          )}
        >
          {checked && <Icon.Check size={15} className="text-white" strokeWidth={2.5} />}
        </span>
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
