import { cn } from '../../utils';

type CategoryButtonProps = {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

export const CategoryButton = ({
  children,
  active = false,
  onClick,
  className,
}: CategoryButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center px-3 py-2 rounded-[25px] text-[14px] font-bold transition-all duration-150 cursor-pointer',
        active
          ? 'bg-black text-white'
          : 'bg-white text-black border border-[#CCCCCC] hover:bg-gray-50',
        className
      )}
    >
      {children}
    </button>
  );
};
