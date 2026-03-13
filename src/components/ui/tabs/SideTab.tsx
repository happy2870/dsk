'use client';

import { cn } from '../../../utils';
import { Icon } from '../../icons';

export type SideTabItem = {
  id: string;
  name: string;
  disabled?: boolean;
};

type SideTabProps = {
  items: SideTabItem[];
  activeId: string;
  onSelect: (id: string) => void;
};

export const SideTab = ({ items, activeId, onSelect }: SideTabProps) => {
  return (
    <div className='pt-14 inline-flex flex-col justify-start items-start gap-4'>
      <nav className="w-[260px] shrink-0 self-start flex flex-col">
        <div className='bg-white flex flex-col p-2 gap-[8px] border border-[#CCCCCC] rounded-[16px]'>
          {items.map((item) => {
            const isActive = activeId === item.id;
            const isDisabled = item.disabled === true;
            return (
              <button
                key={item.id}
                onClick={() => !isDisabled && onSelect(item.id)}
                disabled={isDisabled}
                className={cn(
                  'flex items-center justify-between h-[40px] px-3 text-sm rounded-[8px] transition-colors text-left',
                  isDisabled
                    ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                    : isActive
                    ? 'cursor-pointer bg-[#0069FF] text-white font-bold'
                    : 'cursor-pointer text-black hover:bg-[#0069FF]/10'
                )}
              >
                {item.name}
                <Icon.ArrowRight className={cn(isActive ? 'text-white' : 'text-[#CCCCCC]')} />
              </button>
            );
          })}
        </div>

      </nav>

    </div>
    
  );
};
