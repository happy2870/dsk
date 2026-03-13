import type { BadgeVariant } from '../../constants';
export type { BadgeVariant } from '../../constants';

interface BadgeProps {
  variant?: BadgeVariant;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const BADGE_STYLES: Record<BadgeVariant, { bg: string; text: string; border?: string }> = {
  green: {
    bg: 'bg-point-green-bg',
    text: 'text-point-green',
  },
  blue: {
    bg: 'bg-point-blue-light',
    text: 'text-C-Primary',
  },
  gray: {
    bg: 'bg-gray-f4',
    text: 'text-black',
  },
  yellow: {
    bg: 'bg-point-orange-bg',
    text: 'text-point-orange',
  },
  orange: {
    bg: 'bg-point-orange-deep-bg',
    text: 'text-point-orange-deep',
  },
  red: {
    bg: 'bg-point-red-light',
    text: 'text-error',
  },
  brown: {
    bg: 'bg-point-brown-bg',
    text: 'text-point-brown',
  },
  white: {
    bg: 'bg-white',
    text: 'text-C-Secondary',
    border: 'border border-C-White-Border',
  },
  'w-line': {
    bg: 'bg-transparent',
    text: 'text-white',
    border: 'border-2 border-white',
  },
};

export function Badge({ variant = 'green', icon, children, className }: BadgeProps) {
  const styles = BADGE_STYLES[variant];

  return (
    <div
      className={`
        inline-flex items-center justify-center h-[28px] px-[10px] gap-[2px]
        rounded-[16px] ${styles.bg} ${styles.text} ${styles.border || ''}
        ${className || ''}
      `.trim()}
    >
      {icon && (
        <span className="shrink-0 w-4 h-4 flex items-center justify-center">
          {icon}
        </span>
      )}
      <span className="text-body-12-b">
        {children}
      </span>
    </div>
  );
}

