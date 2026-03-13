'use client';

import { Icon } from '../../icons';
import { cn } from '../../../utils';
import { useState } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { Checkbox } from '../Checkbox';
import { Select } from '../Select';
import { ValueTag } from '../ValueTag';

type FilterMode = 'include' | 'exclude' | 'none';

type FilterAccordionProps = {
  id: string;
  label: string;
  values: string[];
  selectedValues: string[];
  mode: FilterMode;
  onToggleValue: (value: string) => void;
  onModeChange: (mode: FilterMode) => void;
  searchPlaceholder?: string;
  modeOptions?: { value: FilterMode; label: string }[];
  maxHeight?: string;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
};

const defaultModeOptions: { value: FilterMode; label: string }[] = [
  { value: 'include', label: '다음만 포함' },
  { value: 'exclude', label: '다음만 제외' },
  { value: 'none', label: '모두 지우기' },
];

export const FilterAccordion = ({
  id,
  label,
  values,
  selectedValues,
  mode,
  onToggleValue,
  onModeChange,
  searchPlaceholder = '필터를 검색할 수 있어요',
  modeOptions = defaultModeOptions,
  maxHeight = 'max-h-[240px]',
  isExpanded: controlledExpanded,
  onToggleExpand,
}: FilterAccordionProps) => {
  const [internalExpanded, setInternalExpanded] = useState(false);
  const [searchText, setSearchText] = useState('');

  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;
  const handleToggle = onToggleExpand || (() => setInternalExpanded(!internalExpanded));

  const filteredValues = searchText
    ? values.filter((v) => v.toLowerCase().includes(searchText.toLowerCase()))
    : values;

  const getSummaryParts = () => {
    if (selectedValues.length === 0) return null;

    const firstValue = selectedValues[0];
    const remainCount = selectedValues.length - 1;
    const modeText = mode === 'include' ? '포함' : '제외';
    const suffix = remainCount > 0 ? `외 +${remainCount} ${modeText}` : modeText;

    return { firstValue, suffix };
  };

  const summaryParts = getSummaryParts();

  return (
    <div>
      {/* Header */}
      <button
        onClick={handleToggle}
        className="flex w-full items-center justify-between h-[50px] px-[16px]"
      >
        <span className="text-body-14-b text-black shrink-0">{label}</span>
        <div className="flex items-center gap-[8px] min-w-0 max-w-[60%]">
          {summaryParts && (
            <span className={`flex items-center min-w-0 text-body-12-r ${mode === 'exclude' ? 'text-error' : 'text-C-Primary'}`}>
              <span className="truncate">{summaryParts.firstValue}</span>
              <span className="shrink-0">{summaryParts.suffix}</span>
            </span>
          )}
          <Icon.ArrowDown
            size={22}
            className={cn(
              'text-black transition-transform shrink-0',
              isExpanded && 'rotate-180'
            )}
          />
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="bg-[#F7F7F7] p-[16px]">
          <div className="border border-C-Gray-D rounded-[16px] overflow-hidden bg-white shadow-[0_1.25px_5px_0_rgba(0,0,0,0.04)]">
            {/* Search Row */}
            <div className="bg-[#F7F7F7] px-[24px] py-[2px]">
              <div className="flex items-center gap-[8px] h-[50px]">
                <Icon.Search size={22} className="shrink-0 text-black" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full text-body-14-r bg-transparent focus:outline-none placeholder:text-black/[0.24]"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-C-Gray-D" />

            {/* Content */}
            <div className="p-[16px] flex flex-col gap-[12px]">
              {/* Selected Tags & Mode Select */}
              <div className="flex items-center justify-between gap-[8px]">
                <div className="flex flex-wrap gap-[4px] flex-1 min-w-0">
                  {selectedValues.length > 0 && (
                    <ValueTag
                      text={selectedValues[0]}
                      num={selectedValues.length > 1 ? `외 +${selectedValues.length - 1}` : undefined}
                      variant={mode === 'exclude' ? 'error' : 'primary'}
                      onRemove={() => onModeChange('none')}
                      className="max-w-full"
                    />
                  )}
                </div>
                <Select
                  value={mode}
                  onChange={(val) => onModeChange(val as FilterMode)}
                  options={modeOptions}
                  size="sm"
                  className="w-[120px]"
                />
              </div>

              {/* Divider */}
              <div className="h-px bg-[#eee]" />

              {/* Checkbox List */}
              <div className="flex flex-col gap-[8px]">
                <SimpleBar style={{ maxHeight: '240px' }} autoHide>
                  {filteredValues.map((value) => {
                    const isChecked = selectedValues.includes(value);
                    return (
                      <div
                        key={value}
                        onClick={() => onToggleValue(value)}
                        className="flex items-center gap-[10px] h-[40px] px-[8px] py-[4px] cursor-pointer hover:bg-[#F7F7F7] rounded"
                      >
                        <Checkbox checked={isChecked} />
                        <span className="text-body-14-r text-black">{value}</span>
                      </div>
                    );
                  })}
                </SimpleBar>

                {/* Count Summary */}
                <div className="bg-[#F7F7F7] rounded-[12px] py-[12px] text-center">
                  <span className="text-body-14-r text-black">
                    {values.length}개 중 {filteredValues.length}개의 결과를 표시하는 중
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
