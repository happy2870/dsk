import type { ReactNode } from 'react';
import { cn } from '../../utils';
import { Spinner } from './Spinner';

type SpinnerSize = 'sm' | 'md' | 'lg';

type Mode =
  /** 기본: 부모 영역 위에 absolute 오버레이 */
  | 'inline'
  /** 콘텐츠 영역(children) 위에 sticky 오버레이 — 사이드바/헤더는 유지 */
  | 'content'
  /** 전체 화면 fixed 오버레이 */
  | 'fullScreen';

type Props = {
  isLoading: boolean;
  children?: ReactNode;
  /** 로딩 텍스트 (선택) */
  text?: string;
  className?: string;
  /** 오버레이 모드 (기본: inline) */
  mode?: Mode;
  /** 스피너 사이즈 (기본: mode에 따라 자동) */
  spinnerSize?: SpinnerSize;
  /** @deprecated fullScreen prop 대신 mode="fullScreen" 사용 */
  fullScreen?: boolean;
};

const MODE_SPINNER: Record<Mode, SpinnerSize> = {
  inline: 'sm',
  content: 'md',
  fullScreen: 'md',
};

export function LoadingOverlay({ isLoading, children, text, className, mode: modeProp, spinnerSize, fullScreen }: Props) {
  const mode: Mode = modeProp ?? (fullScreen ? 'fullScreen' : 'inline');
  const size = spinnerSize ?? MODE_SPINNER[mode];

  // fullScreen / content: children과 오버레이를 분리
  if (mode === 'fullScreen' || mode === 'content') {
    const positionClass = mode === 'fullScreen' ? 'fixed inset-0 z-50' : 'absolute inset-0 z-30';

    return (
      <div className={cn(mode === 'content' && 'relative min-h-[200px]', className)}>
        {children}
        {isLoading && (
          <div className={cn(positionClass, 'flex flex-col items-center justify-center gap-3 bg-white/70')}>
            <Spinner size={size} />
            {text && <span className="text-body-14-r text-C-Gray-8">{text}</span>}
          </div>
        )}
      </div>
    );
  }

  // inline (기본)
  return (
    <div className={cn('relative', className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-[inherit] bg-white/60">
          <Spinner size={size} />
          {text && <span className="text-body-12-r text-C-Gray-8">{text}</span>}
        </div>
      )}
    </div>
  );
}
