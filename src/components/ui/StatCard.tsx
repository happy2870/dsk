'use client';

import type { ComponentType, ReactNode } from 'react';
import CountUp from 'react-countup';

export interface StatCardItem {
  title: string;
  count: number;
  unit?: string;
  description?: string;
  color: string;
  icon?: ComponentType<{ className?: string }>;
}

type StatCardSize = 'default' | 'compact';

interface StatCardProps {
  item: StatCardItem;
  size?: StatCardSize;
  refreshKey?: number;
}

export function StatCard({ item, size = 'default', refreshKey = 0 }: StatCardProps) {
  const Icon = item.icon;

  if (size === 'compact') {
    return (
      <div className="relative flex items-center gap-3 rounded-[12px] bg-white px-4 overflow-hidden h-[80px] shadow-[0_1.25px_5px_0_rgba(0,0,0,0.08)]">
        <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-[12px] ${item.color}`} />
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-[12px] text-gray-500 font-medium truncate">{item.title}</span>
          <span className="text-[22px] font-bold text-black leading-tight">
            <CountUp key={`${item.title}-${refreshKey}`} end={item.count} duration={1.5} separator="," />
          </span>
        </div>
        {Icon && <Icon className="shrink-0 h-6 w-6 text-gray-300" />}
      </div>
    );
  }

  return (
    <div className="relative flex flex-col justify-between rounded-[8px] bg-white pl-[24px] pr-[20px] py-[16px] overflow-hidden h-[140px] shadow-[0_1.25px_5px_0_rgba(0,0,0,0.08)]">
      <div className={`absolute left-0 top-0 bottom-0 w-[12px] ${item.color}`} />
      <div className="flex items-start justify-between w-full">
        <span className="text-body-16-b text-black">{item.title}</span>
        {Icon && <Icon className="shrink-0 size-[28px] text-C-Gray-C" />}
      </div>
      <div className="flex flex-col gap-[2px]">
        <div className="flex items-end gap-[2px]">
          <span className="text-num-24-b font-gmarket text-black">
            <CountUp key={`${item.title}-${refreshKey}`} end={item.count} duration={1.5} separator="," />
          </span>
          {item.unit && <span className="text-title-18-r text-black">{item.unit}</span>}
        </div>
        {item.description && <span className="text-body-12-r text-C-Gray-8 opacity-80">{item.description}</span>}
      </div>
    </div>
  );
}

interface StatCardGridProps {
  items: StatCardItem[];
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  size?: StatCardSize;
  refreshKey?: number;
}

const GRID_COL_CLASS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
};

export function StatCardGrid({ items, columns, size, refreshKey }: StatCardGridProps) {
  const colClass = GRID_COL_CLASS[columns ?? 4];
  return (
    <div className={`grid ${colClass} gap-4`}>
      {items.map((item, i) => (
        <StatCard key={i} item={item} size={size} refreshKey={refreshKey} />
      ))}
    </div>
  );
}
