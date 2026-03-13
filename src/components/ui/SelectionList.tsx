'use client';

import { Icon } from '../icons';
import { cn } from '../../utils';

export type SelectionListItem = {
  id: string;
  name: string;
  description?: string;
};

type SelectionListProps = {
  items: SelectionListItem[];
  selectedIds: Set<string> | string[];
  onToggle: (id: string) => void;
  maxHeight?: string;
  className?: string;
};

export const SelectionList = ({
  items,
  selectedIds,
  onToggle,
  maxHeight = '360px',
  className,
}: SelectionListProps) => {
  const selectedSet = selectedIds instanceof Set ? selectedIds : new Set(selectedIds);

  return (
    <div
      className={cn(
        'flex flex-col bg-white border border-[#CCCCCC] rounded-[16px] shadow-[2px_2px_8px_0px_rgba(0,0,0,0.16)] overflow-hidden',
        className
      )}
    >
      <div className="flex flex-col gap-2 px-4 pt-4 pb-6 overflow-y-auto" style={{ maxHeight }}>
        {items.map((item, index) => {
          const isSelected = selectedSet.has(item.id);
          return (
            <div key={item.id}>
              <label
                className="flex items-center gap-[10px] px-2 py-1 rounded-[16px] cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <span
                  className={cn(
                    'flex items-center justify-center shrink-0 w-[15px] h-[15px] rounded-[4px] transition-colors',
                    isSelected
                      ? 'bg-black'
                      : 'bg-white border border-[#DDDDDD]'
                  )}
                >
                  {isSelected && <Icon.Check size={11} className="text-white" />}
                </span>
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggle(item.id)}
                  className="sr-only"
                />
                <div className="flex flex-col gap-[2px]">
                  <span className={cn(
                    'text-[14px] leading-[20px] text-black',
                    isSelected ? 'font-bold' : 'font-normal'
                  )}>
                    {item.name}
                  </span>
                  {item.description && (
                    <span className="text-[14px] leading-[20px] text-[#888888] font-normal">
                      {item.description}
                    </span>
                  )}
                </div>
              </label>
              {index < items.length - 1 && (
                <div className="h-px bg-[#EEEEEE] mt-2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
