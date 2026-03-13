import { Fragment } from 'react';
import { cn } from '../../../utils';

export type SegmentedTabsItem = {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

type SegmentedTabsSize = 'sm' | 'md' | 'lg';

type SegmentedTabsProps = {
  items: SegmentedTabsItem[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
  size?: SegmentedTabsSize;
  disabled?: boolean;
};

const CONTAINER_SIZE_STYLES: Record<SegmentedTabsSize, string> = {
  sm: 'h-[50px]',
  md: 'h-[66px]',
  lg: 'h-[80px]',
};

const TEXT_SIZE_STYLES: Record<SegmentedTabsSize, string> = {
  sm: 'text-base',
  md: 'text-[16px]',
  lg: 'text-xl',
};

export const SegmentedTabs = ({ items, activeId, onSelect, className, size = 'sm', disabled = false }: SegmentedTabsProps) => {
  return (
    <div className={cn('flex gap-4 rounded-12 bg-C-Gray-E9', CONTAINER_SIZE_STYLES[size], className)}>
      {items.map((item, index) => (
        <Fragment key={item.id}>
          {index > 0 && (
            <div className="flex items-center">
              <div className="h-6 w-px bg-C-Gray-C" />
            </div>
          )}
          <button
            onClick={() => !disabled && !item.disabled && onSelect(item.id)}
            disabled={disabled || item.disabled}
            className={cn(
              'flex-1 flex flex-col items-center justify-center rounded-12 font-bold transition-colors',
              TEXT_SIZE_STYLES[size],
              disabled || item.disabled
                ? 'cursor-not-allowed opacity-60'
                : 'cursor-pointer',
              activeId === item.id
                ? 'bg-white text-C-Black border border-C-Gray-D shadow-design-system'
                : disabled || item.disabled
                  ? 'text-C-Gray-A'
                  : 'text-C-Gray-8 hover:text-C-Gray-6'
            )}
          >
            <span>{item.label}</span>
            {item.description && (
              <p className="text-body-12-r text-C-Gray-A font-normal">{item.description}</p>
            )}
          </button>
        </Fragment>
      ))}
    </div>
  );
};
