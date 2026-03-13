'use client';

import { cn } from '../../utils';
import { useState } from 'react';
import {
  PortalToFollowElem,
  PortalToFollowElemContent,
  PortalToFollowElemTrigger,
} from '../ui/portal-to-follow-elem';

export interface DropdownChild {
  name: string;
  description?: string;
  icon?: string | React.ReactNode;
  active?: boolean;
  disabled?: boolean;
}

interface HeaderDropdownProps {
  name: string;
  items: DropdownChild[];
  onSelect?: (item: DropdownChild) => void;
  activeLabel?: string;
}

export function HeaderDropdown({ name, items, onSelect, activeLabel }: HeaderDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activeItem = items.find((c) => c.active);
  const displayActiveLabel = activeLabel ?? activeItem?.name;

  return (
    <PortalToFollowElem
      placement="bottom-start"
      open={isOpen}
      onOpenChange={setIsOpen}
      offset={{
        crossAxis: -17,
        mainAxis: 17
      }}
    >
      <PortalToFollowElemTrigger>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex items-center gap-1 rounded-md text-[18px] font-normal transition-colors cursor-pointer',
            displayActiveLabel ? 'text-C-Primary font-bold' : 'text-C-Black'
          )}
        >
          {displayActiveLabel ? `${name}·${displayActiveLabel}` : name}
        </button>
      </PortalToFollowElemTrigger>

      <PortalToFollowElemContent>
        <div className="min-w-[350px] rounded-16 border border-C-Gray-C bg-white p-2 shadow-design-system">
          <div className="flex flex-col gap-1">
            {items.map((child) => (
              <button
                key={child.name}
                disabled={child.disabled}
                onClick={() => {
                  setIsOpen(false);
                  onSelect?.(child);
                }}
                className={cn(
                  'w-full h-[60px] px-4 rounded-lg transition-all group hover:bg-C-Gray-F7 text-left cursor-pointer',
                  child.disabled && 'cursor-not-allowed opacity-50',
                )}
              >
                <div className="flex items-center gap-1.5">
                  {child.icon && (
                    <div className={cn("flex h-[42px] items-start pt-px shrink-0", child.active ? 'text-C-Primary' : 'text-C-Black')}>
                      <span className="size-[22px]">{child.icon}</span>
                    </div>
                  )}
                  <div className="flex-1">
                    <div className={`text-body-14-b ${child.active ? 'text-C-Primary' : 'text-C-Black'}`}>
                      {child.name}
                    </div>
                    {child.description && (
                      <div className="text-body-12-r text-C-Gray-8">
                        {child.description}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </PortalToFollowElemContent>
    </PortalToFollowElem>
  );
}
