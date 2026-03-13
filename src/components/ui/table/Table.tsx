'use client';

import { Fragment, ReactNode, useState } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { cn } from '../../../utils';
import { TablePagination } from './TablePagination';
import { ChildTable } from './ChildTable';
import { Icon } from '../../icons';
import type { Column, GroupTableProps } from '../../../types/table';

function getCellValue<T>(row: T, accessor: Column<T>['accessor']): ReactNode {
  if (typeof accessor === 'function') {
    return accessor(row);
  }
  return row[accessor] as ReactNode;
}

export function Table<TParent, TChild = TParent>({
  columns,
  data,
  rowKey,
  groupIdKey,
  childColumns,
  childRowKey,
  defaultExpanded = false,
  onChildRowClick,
  showCheckbox = false,
  selectable = false,
  selectedRows = [],
  onRowSelect,
  onSelectAll,
  isAllSelected = false,
  showPagination = true,
  pagination,
  onRowClick,
  onRowDoubleClick,
  verticalBorder = false,
  stickyFirstColumn = false,
  className,
  emptyMessage = '데이터가 없습니다.',
}: GroupTableProps<TParent, TChild>) {
  // 그룹 테이블 상태 관리
  const [expandedRows, setExpandedRows] = useState<Set<string>>(
    defaultExpanded ? new Set(data.map(row => String(row[rowKey]))) : new Set()
  );

  // 행 펼침/접기 토글
  const toggleRow = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // 그룹 테이블인지 확인
  const isGroupTable = !!groupIdKey && !!childColumns && !!childRowKey;

  // showCheckbox가 true이거나 selectable이 true이면 체크박스 표시
  const displayCheckbox = showCheckbox;

  // 표시할 데이터 (페이지네이션 여부에 따라)
  const displayData = showPagination && pagination ? data : data;

  const handleRowClick = (
    row: TParent,
    e: React.MouseEvent<HTMLTableRowElement>
  ) => {
    const id = String(row[rowKey]);
    
    if(isGroupTable) {
      toggleRow(id);
    }

    if (selectable && onRowSelect) {
      onRowSelect(id, e.ctrlKey || e.metaKey, e.shiftKey);
    }

    onRowClick?.(row);
  };

  const handleRowDoubleClick = (row: TParent) => {
    onRowDoubleClick?.(row);
  };  
  

  return (
    <div className={cn('w-full', className)}>
      {/* Table */}
      <SimpleBar className="bg-white rounded-lg border border-[#DDDDDD]" autoHide>
        <table className="w-full">
          <thead>
            <tr className="bg-[#F4F4F4] border-b border-[#DDDDDD] min-h-[40px]">
              {displayCheckbox && (
                <th className="px-3 w-10">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={() => onSelectAll?.()}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                </th>
              )}
              {isGroupTable && (
                <th className="w-10"></th>
              )}
              {columns.map((column, colIdx) => (
                <th
                  key={column.id}
                  className={cn(
                    'px-5 py-[10px] text-[14px] font-bold text-black',
                    column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : 'text-left',
                    verticalBorder && colIdx < columns.length - 1 && 'border-r border-gray-200',
                    stickyFirstColumn && colIdx === 0 && 'sticky left-0 z-10 bg-[#F4F4F4] shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]',
                  )}
                  style={column.width ? { width: column.width } : undefined}
                >
                  <div>{column.header}</div>
                  {column.sub && <div className="text-[12px] font-normal text-C-Gray-8 leading-[18px]">{column.sub}</div>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (displayCheckbox ? 1 : 0) + (isGroupTable ? 1 : 0)}
                  className="px-5 py-8 text-center text-sm text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              displayData.map((row, index) => {
                const id = String(row[rowKey]);
                const isSelected = selectedRows.includes(id);
                const isLastRow = index === displayData.length - 1;
                const isExpanded = expandedRows.has(id);
                const childData = isGroupTable && groupIdKey && row[groupIdKey]
                  ? (Array.isArray(row[groupIdKey]) ? row[groupIdKey] as unknown as TChild[] : [])
                  : [];

                return (
                  <Fragment key={index}>
                    {/* 부모 행 */}
                    <tr
                      key={index}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={(e) => handleRowClick(row, e)}
                      onDoubleClick={() => handleRowDoubleClick(row)}
                      className={cn(
                        'cursor-pointer transition-colors select-none h-[54px]',
                        !isLastRow && !isExpanded && 'border-b border-[#E9E9E9]',
                        isSelected ? 'bg-[#F7F7F7]' : 'hover:bg-[#F7F7F7]'
                      )}
                    >
                      {displayCheckbox && (
                        <td className="px-3 py-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            onClick={(e) => e.stopPropagation()}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                        </td>
                      )}

                      {isGroupTable && (
                        <td className="px-3 py-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleRow(id);
                            }}
                            className="hover:bg-gray-100 rounded p-1 transition-colors cursor-pointer"
                          >
                            <Icon.ArrowDown
                              size={20}
                              className={cn(
                                "transition-transform duration-200 ease-in-out",
                                isExpanded && "rotate-180"
                              )}
                            />
                          </button>
                        </td>
                      )}

                      {columns.map((column, colIdx) => {
                        const value = getCellValue(row, column.accessor);
                        const renderedValue = column.render
                          ? column.render(value, row)
                          : value;

                        return (
                          <td
                            key={column.id}
                            className={cn(
                              'px-5 text-[14px] text-black font-normal',
                              column.align === 'center' ? 'text-center' : column.align === 'right' ? 'text-right' : '',
                              verticalBorder && colIdx < columns.length - 1 && 'border-r border-gray-200',
                              stickyFirstColumn && colIdx === 0 && 'sticky left-0 z-10 bg-white shadow-[2px_0_4px_-2px_rgba(0,0,0,0.1)]',
                            )}
                            style={column.width ? { width: column.width, maxWidth: column.width } : undefined}
                          >
                            {renderedValue}
                          </td>
                        );
                      })}
                    </tr>

                    {/* 자식 테이블 행 */}
                    {isGroupTable && childData.length > 0 && (
                      <tr
                        className={cn(
                          'transition-all duration-300 ease-in-out',
                          !isLastRow && 'border-b border-[#E9E9E9]',
                          !isExpanded && 'max-h-0 opacity-0'
                        )}
                        style={{
                          maxHeight: isExpanded ? '2000px' : '0',
                          opacity: isExpanded ? 1 : 0,
                        }}
                      >
                        <td
                          colSpan={columns.length + (displayCheckbox ? 1 : 0) + 1}
                          className="p-0 overflow-hidden"
                        >
                          <div
                            className={cn(
                              'transition-all duration-300 ease-in-out',
                              isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                            )}
                          >
                            <ChildTable
                              columns={childColumns!}
                              data={childData}
                              rowKey={childRowKey!}
                              onRowClick={onChildRowClick}
                            />
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </SimpleBar>

      {/* Footer: Pagination (centered) */}
      {showPagination && pagination && (
        <TablePagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
        />
      )}
    </div>
  );
}
