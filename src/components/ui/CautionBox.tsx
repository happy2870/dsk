import { Icon } from '../icons';
import { cn } from '../../utils';

type CautionBoxProps = {
  title?: string;
  children: React.ReactNode;
  color?: 'blue' | 'red';
  type?: 'fill' | 'line';
  className?: string;
};

const colorConfig = {
  blue: {
    fill: 'bg-point-blue-light',
    line: 'bg-white border border-C-Primary',
    icon: 'text-C-Primary',
    title: 'text-C-Primary',
  },
  red: {
    fill: 'bg-point-red-light',
    line: 'bg-white border border-C-Error',
    icon: 'text-C-Error',
    title: 'text-C-Error',
  },
};

export const CautionBox = ({
  title,
  children,
  color = 'blue',
  type = 'fill',
  className,
}: CautionBoxProps) => {
  const config = colorConfig[color];

  return (
    <div
      className={cn(
        'flex flex-col items-start rounded-[12px] p-4',
        type === 'fill' ? 'gap-2' : 'gap-1',
        config[type],
        className
      )}
    >
      {title && (
        <div className="flex items-center gap-1">
          <Icon.Notice22 className={cn('shrink-0', config.icon)} />
          <span className={cn('text-body-14-b', config.title)}>{title}</span>
        </div>
      )}
      <div className="text-body-12-r text-black">
        {children}
      </div>
    </div>
  );
};
