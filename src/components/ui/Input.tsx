import { InputHTMLAttributes } from 'react';
import { cn } from '../../utils';

type InputSize = 'sm' | 'md';

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  size?: InputSize;
  error?: boolean;
  errorMessage?: string;
};

const SIZE_STYLES: Record<InputSize, string> = {
  sm: 'h-[40px] px-[12px] text-[14px]',
  md: 'h-[50px] px-[12px] text-[14px]',
};

export const Input = ({
  size = 'md',
  error = false,
  errorMessage,
  className,
  disabled,
  ...rest
}: InputProps) => {
  return (
    <div className="w-full">
      <input
        disabled={disabled}
        className={cn(
          'w-full rounded-[8px] border bg-white',
          'placeholder:text-black/[0.24]',
          'focus:outline-none focus:ring-0',
          'transition-colors duration-200',
          'leading-[20px] text-black',
          error
            ? 'border-error focus:border-error'
            : 'border-gray-d focus:border-primary',
          disabled && 'cursor-not-allowed bg-gray-f7 border-gray-e text-black',
          SIZE_STYLES[size],
          className
        )}
        {...rest}
      />
      {error && errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};
