'use client';

import { useState, useMemo } from 'react';
import { Icon } from '../../icons';
import {
  PortalToFollowElem,
  PortalToFollowElemTrigger,
  PortalToFollowElemContent,
} from '../portal-to-follow-elem';

type FilterOption = {
  value: string;
  label: string;
};

type FilterDropdownProps = {
  options: FilterOption[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  className?: string;
};

export const FilterDropdown = ({
  options,
  selectedValues,
  onSelectionChange,
  placeholder = '선택',
  searchPlaceholder = '검색...',
  className = '',
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  const handleToggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onSelectionChange(selectedValues.filter((v) => v !== value));
    } else {
      onSelectionChange([...selectedValues, value]);
    }
  };

  const displayText = useMemo(() => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) {
      const selected = options.find((o) => o.value === selectedValues[0]);
      return selected?.label || placeholder;
    }
    return `${selectedValues.length}개 선택됨`;
  }, [selectedValues, options, placeholder]);

  return (
    <PortalToFollowElem
      open={isOpen}
      onOpenChange={setIsOpen}
      placement="bottom-start"
      offset={4}
    >
      <PortalToFollowElemTrigger>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-between gap-2 px-3 py-2 text-sm bg-white hover:bg-gray-50 min-w-[180px] ${className}`}
        >
          <span className="text-gray-700 truncate">{displayText}</span>
          <Icon.ArrowDown
            className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </PortalToFollowElemTrigger>

      <PortalToFollowElemContent>
        <div className="bg-white border border-[#CCC] rounded-lg shadow-lg min-w-[360px] overflow-hidden">
          {/* Search */}
          <div className="px-6 py-4">
            <div className="relative">
              <Icon.Search className="absolute left-0 top-1/2 -translate-y-1/2 text-black" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full pl-7 pr-3 py-1 text-sm bg-transparent border-none focus:outline-none placeholder:text-black/25"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#DDD]" />

          {/* Options List */}
          <div className="bg-[#F7F7F7] max-h-[360px] overflow-y-auto scrollbar-thin scrollbar-thumb-black/10 scrollbar-track-transparent">
            {filteredOptions.length === 0 ? (
              <div className="px-6 py-4 text-sm text-gray-500 text-center">
                검색 결과가 없습니다
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = selectedValues.includes(option.value);
                return (
                  <button
                    key={option.value}
                    onClick={() => handleToggleOption(option.value)}
                    className="flex items-center gap-3 w-full px-6 py-3 text-sm text-black hover:bg-black/5 transition-colors"
                  >
                    <div
                      className={`w-[15px] h-[15px] rounded-sm flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-black'
                          : 'bg-white border border-[#DDD]'
                      }`}
                    >
                      {isSelected && (
                        <Icon.Check size={12} className="text-white" />
                      )}
                    </div>
                    <span className="truncate">{option.label}</span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </PortalToFollowElemContent>
    </PortalToFollowElem>
  );
};
