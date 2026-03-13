import { ReactNode } from 'react';
import { cn } from '../../utils';

type ButtonSize = 'sm' | 'md' | 'lg';
type RoundedSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'primary' | 'secondary' | 'error' | 'black' | 'ghost';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: ButtonSize;
  variant?: ButtonVariant;
  roundedSize?: RoundedSize;
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'h-[28px] px-[10px] gap-[2px] text-[12px] [&_svg]:w-[14px] [&_svg]:h-[14px]',
  md: 'h-[40px] px-[12px] gap-[4px] text-[14px] [&_svg]:w-[22px] [&_svg]:h-[22px]',
  lg: 'h-[50px] px-[16px] gap-[4px] text-[14px] [&_svg]:w-[22px] [&_svg]:h-[22px]',
};

const ROUNDED_STYLES: Record<RoundedSize, string> = {
  sm: 'rounded-[8px]',
  md: 'rounded-[16px]',
  lg: 'rounded-full',
};

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: 'bg-[#0069FF] text-white border-transparent hover:bg-[#005DE1] hover:shadow-md active:scale-95 disabled:bg-gray-f7 disabled:text-black/15 disabled:shadow-none',
  secondary: 'bg-white border border-gray-d text-black hover:bg-gray-e hover:border-gray-d disabled:bg-gray-f7 disabled:border-gray-e9 disabled:text-black/15 disabled:shadow-none',
  error: 'bg-error text-white border-transparent hover:bg-[#E00000] hover:shadow-md active:scale-95 disabled:bg-gray-f7 disabled:text-black/15 disabled:shadow-none',
  black: 'bg-black text-white border-transparent hover:bg-gray-2 hover:shadow-md active:scale-95 disabled:bg-gray-f7 disabled:text-black/15 disabled:shadow-none',
  ghost: 'bg-gray-e9 text-black border-transparent hover:bg-gray-d active:scale-95 disabled:bg-gray-f7 disabled:text-black/15',
};

export const Button = ({
  children,
  onClick,
  className,
  disabled = false,
  type = 'button',
  size = 'md',
  variant = 'primary',
  roundedSize = 'md',
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center justify-center text-sm font-bold transition-all duration-150 cursor-pointer disabled:cursor-not-allowed',
        SIZE_STYLES[size],
        VARIANT_STYLES[variant],
        roundedSize && ROUNDED_STYLES[roundedSize],
        className
      )}
    >
      {children}
    </button>
  );
};
