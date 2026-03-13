import { Icon } from '../icons';
import { cn } from '../../utils';

type ExplainTextColor = 'black' | 'gray' | 'blue' | 'red';
type ExplainTextSize = '12' | '14' | '16';

type ExplainTextProps = {
  children: React.ReactNode;
  color?: ExplainTextColor;
  size?: ExplainTextSize;
  icon?: boolean;
  className?: string;
};

const colorMap: Record<ExplainTextColor, string> = {
  black: 'text-C-Gray-4',
  gray: 'text-C-Gray-A',
  blue: 'text-C-Primary',
  red: 'text-C-Error',
};

const sizeMap: Record<ExplainTextSize, string> = {
  '12': 'text-body-12-r',
  '14': 'text-body-14-r',
  '16': 'text-body-16-r',
};

const iconAlignMap: Record<ExplainTextSize, string> = {
  '12': 'h-[18px] items-center pt-px size-4',
  '14': 'h-[20px] items-start pt-0.5 size-[18px]',
  '16': 'h-[24px] items-start pt-1 size-5',
};

export const ExplainText = ({
  children,
  color = 'black',
  size = '12',
  icon = true,
  className,
}: ExplainTextProps) => {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {icon && (
        <div className={`shrink-0 flex ${iconAlignMap[size]}`}>
          <Icon.Notice className={`size-full ${colorMap[color]}`} />
        </div>
      )}
      <span className={`${sizeMap[size]} ${colorMap[color]}`}>
        {children}
      </span>
    </div>
  );
};
