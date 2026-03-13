type SpinnerSize = 'sm' | 'md' | 'lg';

const SIZE_CLASS: Record<SpinnerSize, string> = {
  sm: 'h-5 w-5 border-2',
  md: 'h-8 w-8 border-[3px]',
  lg: 'h-12 w-12 border-4',
};

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

export const Spinner = ({ size = 'md', className = '' }: SpinnerProps) => (
  <div
    className={`animate-spin rounded-full border-gray-200 border-t-gray-500 ${SIZE_CLASS[size]} ${className}`}
  />
);
