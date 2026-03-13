import { InputHTMLAttributes } from 'react';
import { Icon } from '../icons';
import { cn } from '../../utils';

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> & {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  size?: InputSize;
};

type InputSize = 'sm' | 'md';

const SIZE_STYLES: Record<InputSize, string> = {
  sm: 'h-[40px] px-[12px]',
  md: 'h-[50px] px-[16px]',
};


export const SearchInput = ({
  value,
  onChange,
  placeholder = '검색어를 입력하세요.',
  disabled = false,
  size = 'md',
  className,
  ...rest
}: SearchInputProps) => {
  return (
    <div className={cn('relative', className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Icon.Search size={16} className="text-black" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          SIZE_STYLES[size],
          'w-full rounded-[8px] border border-C-Gray-D bg-white pl-[34px] pr-4 text-sm text-black placeholder:text-black/[0.24]',
          'focus:border-C-Gray-D focus:outline-none focus:ring-1 focus:ring-C-Gray-D',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-100',
        )}
        {...rest}
      />
    </div>
  );
};
