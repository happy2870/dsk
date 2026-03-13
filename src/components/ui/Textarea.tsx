import { TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils';

type TextareaSize = 'sm' | 'md' | 'lg';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  size?: TextareaSize;
  error?: boolean;
  errorMessage?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
};

const SIZE_STYLES: Record<TextareaSize, string> = {
  sm: 'min-h-[80px] px-3 py-2 text-sm',
  md: 'min-h-[120px] px-4 py-3 text-sm',
  lg: 'min-h-[160px] px-5 py-4 text-base',
};

const RESIZE_STYLES: Record<NonNullable<TextareaProps['resize']>, string> = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
};

export const Textarea = ({
  size = 'md',
  error = false,
  errorMessage,
  resize = 'vertical',
  className,
  disabled,
  ...rest
}: TextareaProps) => {
  return (
    <div className="w-full">
      <textarea
        disabled={disabled}
        className={cn(
          'w-full rounded-xl border bg-white',
          'focus:outline-none focus:ring-1',
          'transition-colors duration-200',
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-[#DDDDDD] focus:border-[#DDDDDD] focus:ring-[#DDDDDD]',
          disabled && 'cursor-not-allowed opacity-100 bg-[#F5F5F5]',
          SIZE_STYLES[size],
          RESIZE_STYLES[resize],
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

export default Textarea;