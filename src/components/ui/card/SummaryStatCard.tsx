import CountUpModule from 'react-countup';
const CountUp = ('default' in CountUpModule ? (CountUpModule as any).default : CountUpModule) as typeof CountUpModule;
import { Icon } from '../../icons';

type StatItem = {
  label: string;
  value: number | string;
  suffix?: string;
  animated?: boolean;
};

type SummaryStatCardProps = {
  title: string;
  mainValue: number;
  mainSuffix: string;
  backgroundColor: string;
  changeIndicator?: {
    value: number;
  };
  items: StatItem[];
  refreshKey: string | number;
  decimals?: number;
  isExpanded: boolean;
};

export function SummaryStatCard({
  title,
  mainValue,
  mainSuffix,
  backgroundColor,
  changeIndicator,
  items,
  refreshKey,
  decimals = 0,
  isExpanded,
}: SummaryStatCardProps) {
  return (
    <div
      className={`${isExpanded ? 'h-[215px]' : 'h-[110px]'} rounded-16 text-white p-5 flex flex-col flex-1 gap-4 transition-all duration-500 ease-in-out overflow-hidden`}
      style={{ backgroundColor }}
    >
      {/* Title + Main Value */}
      <div className="flex flex-col gap-2">
        <div className="text-body-16-b">{title}</div>
        <div className="flex items-end justify-between">
          <div className="flex items-end gap-0.5">
            <span className="text-num-30-b font-gmarket">
              <CountUp
                key={`${title}-main-${refreshKey}`}
                end={mainValue}
                duration={1.5}
                decimals={decimals}
                separator=","
              />
            </span>
            <span className="text-title-18-r">{mainSuffix}</span>
          </div>
          {changeIndicator && (
            <div
              className={`font-gmarket flex items-center gap-1.5 text-num-14-b ${changeIndicator.value === 0 ? 'text-white' : changeIndicator.value > 0 ? 'text-[#00E9D6]' : 'text-C-Gray-8'}`}
            >
              {changeIndicator.value === 0 ? <Icon.Equal className="w-3 h-3" /> : changeIndicator.value > 0 ? <Icon.Up className="w-3 h-3 text-[#00E9D6]" /> : <Icon.Down className="w-3 h-3" />}
              <span>{changeIndicator.value}</span>
            </div>
          )}
        </div>
      </div>

      {/* Items List */}
      {isExpanded && (
        <div className="flex flex-col gap-0 pt-4 border-t border-white/[0.24] animate-slide-down">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center h-6">
              <span className="text-body-14-r text-white/80">{item.label}</span>
              <span className="text-num-12-b font-gmarket">
                {item.value}
                {item.suffix && <span className="ml-0.5 font-pretendard font-regular text-body-12-r">{item.suffix}</span>}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}