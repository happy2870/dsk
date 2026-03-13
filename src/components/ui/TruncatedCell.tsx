'use client';

import { AppTooltip } from './AppTooltip';
import { useId } from 'react';

type TruncatedCellProps = {
  value?: string;
  children?: React.ReactNode;
  maxWidth?: string;
  className?: string;
  tooltipPlace?: 'top' | 'bottom' | 'left' | 'right';
};

export const TruncatedCell = ({ value, children, maxWidth = 'max-w-100', className, tooltipPlace = 'bottom' }: TruncatedCellProps) => {
  const tooltipId = useId();
  const content = children ?? value;
  const tooltipText = value ?? (typeof children === 'string' ? children : '');

  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    const el = e.currentTarget;
    if (el.scrollWidth <= el.clientWidth) {
      el.removeAttribute('data-tooltip-content');
    } else {
      el.setAttribute('data-tooltip-content', el.textContent ?? '');
    }
  };

  return (
    <>
      <span
        className={`block truncate ${maxWidth} ${className ?? ''}`}
        data-tooltip-id={tooltipId}
        data-tooltip-content={tooltipText}
        onMouseEnter={handleMouseEnter}
      >
        {content}
      </span>
      <AppTooltip id={tooltipId} place={tooltipPlace} />
    </>
  );
};
