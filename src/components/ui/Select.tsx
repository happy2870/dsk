'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { Icon } from '../icons';
import { cn } from '../../utils';
import {
  PortalToFollowElem,
  PortalToFollowElemTrigger,
  PortalToFollowElemContent,
} from './portal-to-follow-elem';

type Option = {
  value: string | number;
  label: string;
};

type SelectSize = 'sm' | 'md';

type SelectProps = {
  value: string | number;
  onChange: (value: string | number) => void;
  options: Option[];
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  size?: SelectSize;
};

const SIZE_STYLES: Record<SelectSize, string> = {
  sm: 'h-[40px] px-[12px] gap-1',
  md: 'h-[50px] px-[16px] gap-1',
};

export function Select({ value, onChange, options, className, disabled = false, placeholder, size = 'sm' }: SelectProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [triggerWidth, setTriggerWidth] = useState<number>(0);

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [open]);

  const selectedLabel = options.find((opt) => opt.value === value)?.label ?? placeholder ?? '';

  const handleSelect = useCallback(
    (optionValue: string | number) => {
      onChange(optionValue);
      setOpen(false);
    },
    [onChange],
  );

  return (
    <PortalToFollowElem placement="bottom-start" open={open} onOpenChange={setOpen} offset={4}>
      <PortalToFollowElemTrigger>
        <div
          ref={triggerRef}
          onClick={() => !disabled && setOpen((v) => !v)}
          className={cn(
            'flex cursor-pointer items-center justify-between rounded-[8px] border border-C-Gray-D bg-white',
            SIZE_STYLES[size],
            disabled && 'cursor-not-allowed opacity-50 bg-gray-100 text-gray-400',
            className,
          )}
        >
          <span className="truncate text-[14px] text-black">{selectedLabel}</span>
          <Icon.ArrowDown
            className={cn('shrink-0 text-black transition-transform', open && 'rotate-180')}
          />
        </div>
      </PortalToFollowElemTrigger>
      <PortalToFollowElemContent>
        <div
          className="rounded-[16px] border border-C-Gray-D bg-white p-[8px] shadow-[2px_2px_8px_0_rgba(0,0,0,0.16)] w-fit"
          style={{ minWidth: triggerWidth }}
        >
          <SimpleBar style={{ maxHeight: '240px' }} autoHide>
            <div className="flex flex-col gap-[4px]">
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <div
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`flex items-center justify-between cursor-pointer rounded-[8px] px-[12px] py-[8px] text-[14px] leading-[20px] text-black ${
                      isSelected ? 'bg-[#f4f4f4] font-bold' : 'bg-white font-normal hover:bg-[#f4f4f4]'
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected && <Icon.Check size={16} className="shrink-0 text-black ml-[8px]" />}
                  </div>
                );
              })}
            </div>
          </SimpleBar>
        </div>
      </PortalToFollowElemContent>
    </PortalToFollowElem>
  );
}
