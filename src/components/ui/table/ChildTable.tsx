'use client';

import { ReactNode } from 'react';
import { cn } from '../../../utils';
import type { Column } from '../../../types/table';

interface ChildTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: keyof T;
  onRowClick?: (row: T) => void;
}

function getCellValue<T>(row: T, accessor: Column<T>['accessor']): ReactNode {
  if (typeof accessor === 'function') {
    return accessor(row);
  }
  return row[accessor] as ReactNode;
}

export function ChildTable<T>({
  columns,
  data,
  rowKey,
  onRowClick,
}: ChildTableProps<T>) {
  return (
    <div className="bg-gray-50 border-l-4 border-gray-200 p-3">
      <div className="overflow-x-auto bg-white rounded-lg border border-[#DDDDDD]">
        <table className="w-full border-0 rounded-2xl">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300 h-[36px]">
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={cn(
                    'px-4 text-[13px] font-semibold text-gray-700',
                    column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left'
                  )}
                  style={column.width ? { width: column.width } : undefined}
                >
                  {column.header}
                  {column.sub && <div className="text-body-10-r text-gray-500">{column.sub}</div>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  자식 데이터가 없습니다.
                </td>
              </tr>
            ) : (
              data.map((row, index) => {
                const isLastRow = index === data.length - 1;

                return (
                  <tr
                    key={String(row[rowKey])}
                    onClick={() => onRowClick?.(row)}
                    className={cn(
                      'cursor-pointer transition-colors h-[48px]',
                      !isLastRow && 'border-b border-gray-200',
                      'hover:bg-gray-100'
                    )}
                  >
                    {columns.map((column) => {
                      const value = getCellValue(row, column.accessor);
                      const renderedValue = column.render
                        ? column.render(value, row)
                        : value;

                      return (
                        <td
                          key={column.id}
                          className={cn(
                            'px-4 py-3 text-[13px] text-gray-700',
                            column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : ''
                          )}
                        >
                          {renderedValue}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

      </div>
      
    </div>
  );
}