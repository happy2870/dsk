'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
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

type SearchSelectProps = {
  value: string | number;
  onChange: (value: string | number) => void;
  options: Option[];
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  size?: SelectSize;
  emptyMessage?: string;
};

const SIZE_STYLES: Record<SelectSize, string> = {
  sm: 'h-[40px] px-[12px] gap-1',
  md: 'h-[50px] px-[16px] gap-1',
};

export function SearchSelect({
  value,
  onChange,
  options,
  className,
  disabled = false,
  placeholder,
  searchPlaceholder = '검색...',
  size = 'sm',
  emptyMessage = '결과가 없습니다.',
}: SearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const triggerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [triggerWidth, setTriggerWidth] = useState<number>(0);

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setSearch('');
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  }, [open]);

  const selectedLabel = options.find((opt) => opt.value === value)?.label ?? placeholder ?? '';

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    const q = search.toLowerCase();
    return options.filter((opt) => opt.label.toLowerCase().includes(q) || String(opt.value).toLowerCase().includes(q));
  }, [options, search]);

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
            'flex cursor-pointer items-center justify-between rounded-[8px] pl-4 pr-3 select-none border border-gray-300 bg-white',
            SIZE_STYLES[size],
            disabled && 'cursor-not-allowed opacity-50 bg-gray-100 text-gray-400',
            className,
          )}
        >
          <span className={cn('truncate text-[14px]', value ? 'text-black' : 'text-gray-400')}>{selectedLabel}</span>
          <Icon.ArrowDown
            className={cn('shrink-0 text-black transition-transform', open && 'rotate-180')}
          />
        </div>
      </PortalToFollowElemTrigger>
      <PortalToFollowElemContent>
        <div
          className="rounded-xl border border-gray-200 bg-white shadow-lg"
          style={{ minWidth: triggerWidth }}
        >
          <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100">
            <Icon.Search className="shrink-0 text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="flex-1 text-sm outline-none bg-transparent text-black placeholder:text-gray-400"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="max-h-[240px] overflow-y-auto p-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-4 text-sm text-gray-400 text-center">{emptyMessage}</div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    'cursor-pointer px-3 py-2 text-sm hover:bg-gray-200 rounded-xl',
                    option.value === value ? 'font-bold text-gray-900 bg-gray-50' : 'text-gray-700',
                  )}
                >
                  {option.label}
                </div>
              ))
            )}
          </div>
        </div>
      </PortalToFollowElemContent>
    </PortalToFollowElem>
  );
}
