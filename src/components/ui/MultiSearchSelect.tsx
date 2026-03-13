'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Icon } from '../icons';
import { cn } from '../../utils';
import {
  PortalToFollowElem,
  PortalToFollowElemTrigger,
  PortalToFollowElemContent,
} from './portal-to-follow-elem';

type Option = {
  value: string;
  label: string;
};

type SelectSize = 'sm' | 'md';

type MultiSearchSelectProps = {
  values: string[];
  onChange: (values: string[]) => void;
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

export function MultiSearchSelect({
  values,
  onChange,
  options,
  className,
  disabled = false,
  placeholder = '선택...',
  searchPlaceholder = '검색...',
  size = 'sm',
  emptyMessage = '결과가 없습니다.',
}: MultiSearchSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const triggerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [triggerWidth, setTriggerWidth] = useState<number>(0);
  const lastClickedIndexRef = useRef<number | null>(null);

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setSearch('');
      lastClickedIndexRef.current = null;
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  }, [open]);

  const displayLabel = useMemo(() => {
    if (values.length === 0) return placeholder;
    const firstLabel = options.find((opt) => opt.value === values[0])?.label ?? values[0];
    if (values.length === 1) return firstLabel;
    return `${firstLabel} 외 ${values.length - 1}개 선택`;
  }, [values, options, placeholder]);

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    const q = search.toLowerCase();
    return options.filter((opt) => opt.label.toLowerCase().includes(q) || opt.value.toLowerCase().includes(q));
  }, [options, search]);

  const handleToggle = useCallback(
    (optionValue: string) => {
      if (values.includes(optionValue)) {
        onChange(values.filter((v) => v !== optionValue));
      } else {
        onChange([...values, optionValue]);
      }
    },
    [values, onChange],
  );

  const handleItemClick = useCallback(
    (index: number, e: React.MouseEvent) => {
      const option = filteredOptions[index];
      if (!option) return;

      if (e.shiftKey && lastClickedIndexRef.current !== null) {
        // Shift+Click: range selection
        const start = Math.min(lastClickedIndexRef.current, index);
        const end = Math.max(lastClickedIndexRef.current, index);
        const rangeValues = filteredOptions.slice(start, end + 1).map((opt) => opt.value);
        const merged = new Set([...values, ...rangeValues]);
        onChange(Array.from(merged));
      } else if (e.ctrlKey || e.metaKey) {
        // Ctrl/Cmd+Click: individual toggle
        handleToggle(option.value);
      } else {
        // Normal click: toggle single
        handleToggle(option.value);
      }
      lastClickedIndexRef.current = index;
    },
    [filteredOptions, values, onChange, handleToggle],
  );

  const handleToggleAll = useCallback(() => {
    const filteredValues = filteredOptions.map((opt) => opt.value);
    const allSelected = filteredValues.every((v) => values.includes(v));
    if (allSelected) {
      onChange(values.filter((v) => !filteredValues.includes(v)));
    } else {
      const merged = new Set([...values, ...filteredValues]);
      onChange(Array.from(merged));
    }
  }, [values, filteredOptions, onChange]);

  const allFilteredSelected = filteredOptions.length > 0 && filteredOptions.every((opt) => values.includes(opt.value));

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
          <span className={cn('truncate text-[14px]', values.length > 0 ? 'text-black' : 'text-gray-400')}>
            {displayLabel}
          </span>
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
          <div className="max-h-[280px] overflow-y-auto p-1">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-4 text-sm text-gray-400 text-center">{emptyMessage}</div>
            ) : (
              <>
                <label
                  className="flex items-center gap-2 cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 rounded-xl border-b border-gray-100 mb-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={allFilteredSelected}
                    onChange={handleToggleAll}
                    className="h-4 w-4 shrink-0 rounded border-gray-300 accent-black"
                  />
                  <span className="font-bold text-gray-700">전체</span>
                </label>
                {filteredOptions.map((option, index) => {
                  const isSelected = values.includes(option.value);
                  return (
                    <div
                      key={option.value}
                      className={cn(
                        'flex items-center gap-2 cursor-pointer px-3 py-2 text-sm rounded-xl',
                        isSelected ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-100',
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick(index, e);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggle(option.value)}
                        className="h-4 w-4 shrink-0 rounded border-gray-300 accent-blue-600"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className={cn(isSelected ? 'font-semibold text-blue-900' : 'text-gray-700')}>
                        {option.label}
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </PortalToFollowElemContent>
    </PortalToFollowElem>
  );
}
