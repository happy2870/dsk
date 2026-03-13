'use client';

import { cn } from '../../../utils';
import type { TablePaginationProps } from '../../../types/table';
import { Icon } from '../../icons';

export function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: TablePaginationProps) {
  // 페이지 번호 배열 계산
  const getPageNumbers = () => {
    const maxVisible = 5;
    const pages: number[] = [];

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= maxVisible; i++) {
        pages.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  const navBtnClass = cn(
    'h-[28px] w-[28px] flex items-center justify-center rounded-[6px] text-gray-a cursor-pointer',
    'hover:text-gray-6 disabled:opacity-30 disabled:cursor-not-allowed'
  );

  return (
    <div className="flex items-center justify-center py-6">
      <div className="inline-flex items-center gap-[16px]">
        {/* First / Previous */}
        <div className="flex items-center gap-[2px]">
          <button onClick={() => onPageChange(1)} disabled={currentPage === 1} className={navBtnClass}>
            <Icon.SkipBack size={16} />
          </button>
          <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className={navBtnClass}>
            <Icon.ArrowLeft size={16} />
          </button>
        </div>

        {/* Page Numbers */}
        <div className="flex items-center gap-[4px]">
          {pageNumbers.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={cn(
                'h-[32px] min-w-[32px] px-[10px] flex items-center justify-center rounded-[6px] text-[12px] font-bold cursor-pointer',
                currentPage === pageNum
                  ? 'bg-[#0069FF] text-white'
                  : 'text-black hover:bg-[#EEE]'
              )}
            >
              {pageNum}
            </button>
          ))}
        </div>

        {/* Next / Last */}
        <div className="flex items-center gap-[2px]">
          <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0} className={navBtnClass}>
            <Icon.ArrowRight size={16} />
          </button>
          <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages || totalPages === 0} className={navBtnClass}>
            <Icon.SkipForward size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
