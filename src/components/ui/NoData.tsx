import { Icon } from '../icons';
import { cn } from '../../utils';
import { type ReactNode } from 'react';

type NoDataSize = 'md' | 'lg';

type NoDataProps = {
  title?: string;
  message?: string;
  size?: NoDataSize;
  className?: string;
  actions?: ReactNode;
};

const SIZE_STYLES: Record<NoDataSize, { icon: number; title: string; message: string }> = {
  md: { icon: 40, title: 'text-title-16-b', message: 'text-body-14-r' },
  lg: { icon: 60, title: 'text-title-20-b', message: 'text-body-16-r' },
};

export const NoData = ({
  title,
  message = '데이터가 없습니다.',
  size = 'md',
  className,
  actions,
}: NoDataProps) => {
  const styles = SIZE_STYLES[size];

  return (
    <div className={cn('flex flex-col items-center justify-center gap-6', className)}>
      <div className="flex flex-col items-center justify-center gap-2">
        <Icon.NoData size={styles.icon} className="text-C-Gray-D" />
        <div className="flex flex-col items-center gap-0.5">
          {title && (
            <p className={cn('text-C-Black', styles.title)}>{title}</p>
          )}
          <p className={cn('text-C-Gray-A', styles.message)}>{message}</p>
        </div>
      </div>
      {actions}
    </div>
  );
};
