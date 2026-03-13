'use client';

import { Icon } from '../icons';
import { TruncatedCell } from './TruncatedCell';

export function InfoRow({ label, value }: { label: string; value?: React.ReactNode }) {
  if (value === null || value === undefined) return null;
  return (
    <div className="flex items-center gap-[24px] h-[40px]">
      <span className="w-[100px] shrink-0 text-[14px] font-bold text-black leading-[20px]">{label}</span>
      <span className="flex-1 min-w-0 text-[14px] text-black leading-[20px] break-all">{value}</span>
    </div>
  );
}

export function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[16px] border border-C-Gray-D bg-white shadow-card">
      <div className="p-[16px]">
        <h4 className="text-[16px] font-bold text-black leading-[24px]">{title}</h4>
      </div>
      <div className="h-px bg-C-Gray-E" />
      <div className="p-[16px]">
        {children}
      </div>
    </div>
  );
}

export function HighlightCard({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[16px] border border-[#0069FF] bg-white pt-[8px] pb-[16px] px-[16px]">
      <div className="flex items-start gap-[8px] min-h-[40px] py-[8px]">
        <div className="flex items-center gap-[4px] shrink-0">
          <Icon.Notice size={24} className="text-[#0069FF]" />
          <span className="text-[16px] font-bold text-[#0069FF] leading-[24px]">{title}</span>
        </div>
        {description && (
          <TruncatedCell value={description} maxWidth="max-w-full cursor-pointer" className="flex-1 min-w-0 text-[14px] text-C-Gray-8 leading-[20px]" />
        )}
      </div>
      <div className="h-px bg-[#EEE] my-[4px]" />
      {children}
    </div>
  );
}