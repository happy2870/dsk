'use client';

import { Tooltip } from 'react-tooltip';
import { ReactNode } from 'react';

type AppTooltipProps = {
  id: string;
  place?: 'top' | 'bottom' | 'left' | 'right';
  isArrow?: boolean;
  render?: (props: { content: string | null; activeAnchor: HTMLElement | null }) => ReactNode;
};

export function AppTooltip({ id, place = 'bottom', isArrow = true, render }: AppTooltipProps) {
  return (
    <Tooltip
      id={id}
      place={place}
      positionStrategy="fixed"
      style={{
        zIndex: 9999,
        borderRadius: '16px',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: '7px 12px',
        fontSize: '12px',
        lineHeight: '18px',
        fontWeight: 700,
        color: 'white',
        maxWidth: 300,
        whiteSpace: 'normal' as const,
        overflowWrap: 'break-word' as const,
        wordBreak: 'break-word' as const,
      }}
      arrowColor='rgba(0, 0, 0, 0.6)'
      arrowSize={isArrow ? 4.5 : 0}
      render={render}
    />
  );
}
