'use client';

import SimpleBar from 'simplebar-react';
import { Checkbox } from './Checkbox';

export type CheckboxListItem = {
  id: string;
  name: string;
  description?: string;
};

type CheckboxListProps = {
  items: CheckboxListItem[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  columns?: 1 | 2 | 4 | 5;
  maxHeight?: string;
};

const COLUMN_CLASSES: Record<number, string> = {
  1: 'flex flex-col gap-[6px]',
  2: 'grid grid-cols-2 gap-[6px]',
  4: 'grid grid-cols-4 gap-[6px]',
  5: 'grid grid-cols-5 gap-[6px]',
};

export const CheckboxList = ({
  items,
  selectedIds,
  onToggle,
  columns = 1,
  maxHeight = '400px',
}: CheckboxListProps) => {
  return (
      <SimpleBar style={{ maxHeight: maxHeight }} autoHide>
        <div className={COLUMN_CLASSES[columns] || COLUMN_CLASSES[1]}>
          {items.map((item, index) => {
            const isSelected = selectedIds.includes(item.id);
            return (
              <div
                key={index}
                onClick={(e) => {
                  // label 내부 클릭 시 이벤트 중복 방지
                  if ((e.target as HTMLElement).closest('label')) return;
                  onToggle(item.id);
                }}
                className={`flex items-center gap-[10px] cursor-pointer rounded-[16px] border bg-white px-[16px] py-[12px] transition-all ${isSelected ? 'border-[#666] shadow-card' : 'border-C-Gray-D'}`}
              >
                <Checkbox checked={isSelected} onChange={() => onToggle(item.id)} />
                <div className="min-w-0">
                  <p className={`text-body-14-r text-black ${isSelected ? 'font-bold' : ''}`}>{item.name}</p>
                  {item.description && (
                    <p className="text-body-12-r text-C-Gray-8">{item.description}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </SimpleBar>
  );
};
