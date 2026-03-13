import { createContext, useContext, type ReactNode } from 'react';
import { cn } from '../../../utils';
import { SubTitle } from '../SubTitle';

// ─── Context ───────────────────────────────────────────────
type DashboardCardType = 'type1' | 'type2';

type DashboardCardContextValue = {
  type: DashboardCardType;
};

const DashboardCardContext = createContext<DashboardCardContextValue | null>(null);

const useDashboardCardContext = () => {
  const ctx = useContext(DashboardCardContext);
  if (!ctx) throw new Error('DashboardCard sub-components must be used within <DashboardCard>');
  return ctx;
};

// ─── Root ──────────────────────────────────────────────────
type DashboardCardRootProps = {
  type?: DashboardCardType;
  className?: string;
  children: ReactNode;
};

const DashboardCardRoot = ({ type = 'type1', className, children }: DashboardCardRootProps) => {
  const cardStyle =
    type === 'type2'
      ? 'flex flex-col gap-[16px] rounded-[16px] border border-C-White-Border p-[20px] bg-white'
      : 'flex flex-col min-w-0 rounded-[16px] border border-C-White-Border bg-white shadow-design-system';

  return (
    <DashboardCardContext.Provider value={{ type }}>
      <div className={`${cardStyle} ${className || ''}`}>
        {children}
      </div>
    </DashboardCardContext.Provider>
  );
};

// ─── Header ────────────────────────────────────────────────
type DashboardCardHeaderProps = {
  description?: string;
  action?: ReactNode;
  titleLine?: boolean;
  children: ReactNode;
};

const DashboardCardHeader = ({
  description,
  action,
  titleLine = true,
  children,
}: DashboardCardHeaderProps) => {
  const { type } = useDashboardCardContext();
  const title = typeof children === 'string' ? children : '';

  if (type === 'type2') {
    return (
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[4px] justify-center">
          <h3 className="text-[18px] font-bold text-black leading-[26px]">{children}</h3>
          {description && (
            <div className="flex items-start gap-[6px]">
              <span className="text-[12px] text-C-Gray-A leading-[18px]">·</span>
              <p className="text-[12px] font-normal text-C-Gray-A leading-[18px]">{description}</p>
            </div>
          )}
        </div>
        {action}
      </div>
    );
  }

  return (
    <div className={cn('h-[60px] px-4 flex items-center justify-between', titleLine && 'border-b border-C-Gray-E')}>
      <SubTitle title={title} description={description} />
      {action}
    </div>
  );
};

// ─── Content ───────────────────────────────────────────────
type DashboardCardContentProps = {
  children: ReactNode;
  className?: string;
};

const DashboardCardContent = ({ children, className }: DashboardCardContentProps) => {
  return (
    <div className={cn('flex flex-col flex-1', className)}>
      {children}
    </div>
  );
};

// ─── Compound export ───────────────────────────────────────
export const DashboardCard = Object.assign(DashboardCardRoot, {
  Header: DashboardCardHeader,
  Content: DashboardCardContent,
});
