'use client';

import { useState, useMemo } from 'react';
import { Icon } from '../../icons';
import { CheckboxList, type CheckboxListItem } from '../CheckboxList';

type CheckListItem = CheckboxListItem;

type CheckListSectionProps = {
  searchPlaceholder?: string;
  items: CheckListItem[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  columns?: 1 | 2 | 4;
  maxHeight?: string;
  className?: string;
};

export const CheckListSection = ({
  searchPlaceholder = '검색어를 입력하세요.',
  items,
  selectedIds,
  onSelectionChange,
  columns = 1,
  maxHeight = '400px',
  className,
}: CheckListSectionProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;
    const q = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q)
    );
  }, [items, searchQuery]);

  const handleSelectAll = () => {
    const allIds = filteredItems.map((item) => item.id);
    const merged = [...new Set([...selectedIds, ...allIds])];
    onSelectionChange(merged);
  };

  const handleDeselectAll = () => {
    const currentIds = new Set(items.map((item) => item.id));
    onSelectionChange(selectedIds.filter((id) => !currentIds.has(id)));
  };

  const handleToggle = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((i) => i !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const displaySelectedCount = items.filter((item) => selectedIds.includes(item.id)).length;

  return (<>
    {
        items.length > 0 ? (
          <div className={`border border-C-Gray-D rounded-[16px] bg-white overflow-clip ${className}`}>
            {/* Search */}
            <div className="flex items-center gap-[8px] h-[58px] px-[24px] py-[4px]">
              <Icon.Search22 className="shrink-0 text-black" size={22}/>
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-body-14-r text-black placeholder:text-black/[0.24] focus:outline-none"
              />
            </div>

            {/* Divider */}
            <div className="h-px bg-C-Gray-D" />

            <div className="bg-[#F7F7F7] p-[16px] flex flex-col gap-[10px]">
              {/* Toolbar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[4px]">
                  <button
                    onClick={handleSelectAll}
                    className="cursor-pointer flex items-center gap-[4px] h-[40px] px-[12px] rounded-[16px] border border-C-Gray-D bg-white shadow-card text-body-14-b text-black hover:bg-[#F7F7F7] transition-colors"
                  >
                    <Icon.CheckCircle22 className="text-black" size={22}/>
                    전체 선택
                  </button>
                  <button
                    onClick={handleDeselectAll}
                    className="cursor-pointer flex items-center gap-[4px] h-[40px] px-[12px] rounded-[16px] border border-C-Gray-D bg-white shadow-card text-body-14-b text-black hover:bg-[#F7F7F7] transition-colors"
                  >
                    <Icon.DeCheck22 className="text-black" size={22}/>
                    전체 해제
                  </button>
                </div>
                <span className="text-body-14-r text-black">
                  <span className="text-body-14-b">{displaySelectedCount}</span> / {items.length}
                </span>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#eee]" />

              {/* Item List */}
              <CheckboxList
                items={filteredItems}
                selectedIds={selectedIds}
                onToggle={handleToggle}
                columns={columns}
                maxHeight={maxHeight}
              />
            </div>
          </div>
        ) : <></>
    }
  </>
  );
};
