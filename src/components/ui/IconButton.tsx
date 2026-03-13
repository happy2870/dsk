import { ReactNode } from 'react';
import { cn } from '../../utils';

type IconButtonSize = 'sm' | 'md' | 'lg';
type IconButtonVariant = 'primary' | 'secondary' | 'error' | 'black' | 'ghost';

type IconButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: IconButtonSize;
  variant?: IconButtonVariant;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onClick' | 'disabled' | 'className'>;

const SIZE_STYLES: Record<IconButtonSize, string> = {
  sm: 'w-[28px] h-[28px] [&_svg]:w-[16px] [&_svg]:h-[16px]',
  md: 'w-[40px] h-[40px] [&_svg]:w-[22px] [&_svg]:h-[22px]',
  lg: 'w-[50px] h-[50px] [&_svg]:w-[22px] [&_svg]:h-[22px]',
};

const VARIANT_STYLES: Record<IconButtonVariant, string> = {
  primary: 'bg-[#0069FF] text-white border-transparent hover:bg-[#005DE1] hover:shadow-md active:scale-95 disabled:bg-gray-f7 disabled:text-black/15 disabled:shadow-none',
  secondary: 'bg-white border border-C-Gray-D text-black shadow-design-system hover:bg-C-Gray-F4 hover:border-C-Gray-C active:scale-95 disabled:bg-C-Gray-F7 disabled:border-C-Gray-E9 disabled:text-black/15 disabled:shadow-none',
  error: 'bg-error text-white border-transparent hover:bg-[#E00000] hover:shadow-md active:scale-95 disabled:bg-gray-f7 disabled:text-black/15 disabled:shadow-none',
  black: 'bg-black text-white border-transparent hover:bg-gray-2 hover:shadow-md active:scale-95 disabled:bg-gray-f7 disabled:text-black/15 disabled:shadow-none',
  ghost: 'bg-transparent text-gray-6 border-transparent hover:bg-gray-f4 active:scale-95 disabled:text-black/15',
};

export const IconButton = ({
  children,
  onClick,
  className,
  disabled = false,
  type = 'button',
  size = 'md',
  variant = 'secondary',
  ...rest
}: IconButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...rest}
      className={cn(
        'flex items-center justify-center rounded-[16px] transition-all duration-150 cursor-pointer disabled:cursor-not-allowed',
        SIZE_STYLES[size],
        VARIANT_STYLES[variant],
        className
      )}
    >
      {children}
    </button>
  );
};
