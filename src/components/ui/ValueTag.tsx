import { Icon } from '../icons';
import { cn } from '../../utils';
import { TruncatedCell } from './TruncatedCell';

type ValueTagVariant = 'primary' | 'secondary' | 'error';
type ValueTagType = 'button' | 'text';

type ValueTagProps = {
  text: string;
  num?: string;
  variant?: ValueTagVariant;
  tagType?: ValueTagType;
  onRemove?: () => void;
  className?: string;
};

const BTN_VARIANT_STYLES: Record<ValueTagVariant, string> = {
  primary: 'bg-[#0069FF] text-white',
  secondary: 'bg-[#666666] text-white',
  error: 'bg-[#FF3B30] text-white',
};

const TEXT_VARIANT_STYLES: Record<ValueTagVariant, string> = {
  primary: 'bg-[#0069FF] text-white',
  secondary: 'text-[#AAA]',
  error: 'bg-[#FF3B30] text-white',
};

export const ValueTag = ({
  text,
  num,
  variant = 'primary',
  tagType = 'button',
  onRemove,
  className,
}: ValueTagProps) => {
  const isButton = tagType === 'button';
  const variantStyles = isButton ? BTN_VARIANT_STYLES[variant] : TEXT_VARIANT_STYLES[variant];

  return (
    <div
      className={cn(
        'inline-flex items-center text-[14px] leading-[20px]',
        isButton
          ? 'h-[40px] px-[12px] gap-[12px] rounded-[16px]'
          : 'h-[28px] px-[10px] gap-[4px] rounded-[10px]',
        variantStyles,
        className
      )}
    >
      <span className="flex items-center gap-[4px] min-w-0">
        <span className="font-normal truncate">{text}</span>
        {num && <span className="font-bold shrink-0">{num}</span>}
      </span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="flex items-center justify-center shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
        >
          <Icon.InputDelete22 size={18} className="text-current" />
        </button>
      )}
    </div>
  );
};
