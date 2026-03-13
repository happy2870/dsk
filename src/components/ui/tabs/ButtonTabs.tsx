import { cn } from "@nextjs-turborepo-starter/common/utils";

type ButtonTabsProps<T extends string = string> = {
  activeTab: T;
  onTabChange: (tab: T) => void;
  tabs: T[];
  tabLabels?: Record<string, string>;
  className?: string;
  tabWidth?: string;
  disabled?: boolean;
};

export const ButtonTabs = <T extends string = string>({
  activeTab,
  onTabChange,
  tabs,
  tabLabels,
  className,
  tabWidth,
  disabled = false,
}: ButtonTabsProps<T>) => {
  return (
    <div className={cn("flex items-center rounded-[12px] bg-C-Gray-E9 px-[4px] h-[40px]", className)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => !disabled && onTabChange(tab)}
          disabled={disabled}
          style={tabWidth ? { width: tabWidth } : undefined}
          className={`rounded-[8px] h-[32px] text-body-14-r transition-all whitespace-nowrap ${!tabWidth ? 'flex-1' : ''} ${
            disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
          } ${
            activeTab === tab
              ? 'bg-white text-C-Black shadow-[0px_1.25px_5px_0px_rgba(0,0,0,0.08)] font-bold'
              : disabled
                ? 'bg-C-Gray-E9 font-normal text-C-Gray-A'
                : 'bg-C-Gray-E9 font-normal text-C-Black'
          }`}
        >
          {tabLabels?.[tab] ?? tab}
        </button>
      ))}
    </div>
  );
};
