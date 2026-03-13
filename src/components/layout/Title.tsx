import { cn } from '../../utils/utils';
import { IconButton } from '../ui/IconButton';
import { IcQuestion } from '../icons/DsIcons';

type TitleProps = {
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
};

function TitleRoot({ children, actions, className }: TitleProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="w-full flex justify-between items-end">
        <div className="flex items-center gap-2 text-C-Black text-2xl font-bold font-['Pretendard'] leading-8">
          {children}
        </div>
        <div className="flex justify-end items-end gap-2">{actions && <div>{actions}</div>}</div>
      </div>
    </div>
  );
}

type GuideProps = {
  onClick: () => void;
  title?: string;
};

function Guide({ onClick, title = '사용 가이드' }: GuideProps) {
  return (
    <IconButton variant="secondary" size="sm" onClick={onClick} title={title}>
      <IcQuestion />
    </IconButton>
  );
}

export const Title = Object.assign(TitleRoot, {
  Guide,
});
