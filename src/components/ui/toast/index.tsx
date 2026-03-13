'use client';
import type { ReactNode } from 'react';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Icon } from '../../icons';
import { Z_INDEX } from '../../../constants';
import { IToastContext, IToastProps, ToastWithId } from '../../../types/toast';

// Window 타입 확장

export const ToastContext = createContext<IToastContext>({} as IToastContext);
export const useToastContext = () => useContext(ToastContext);

// 전역 토스트 관리를 위한 변수들
let toastContainer: HTMLDivElement | null = null;
let containerRoot: Root | null = null;
// 객체 참조로 감싸서 재할당 없이 내부 배열만 변경
const toastQueueRef = { current: [] as ToastWithId[] };

// 타입별 스타일 설정
const toastStyles = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: Icon.Check,
    iconColor: 'text-green-500',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: Icon.ErrorTriangle,
    iconColor: 'text-red-500',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    icon: Icon.ErrorTriangle,
    iconColor: 'text-amber-500',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: Icon.Notice,
    iconColor: 'text-blue-500',
  },
  ok: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: Icon.Check,
    iconColor: 'text-green-500',
  },
  basic: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    text: 'text-gray-800',
    icon: Icon.Notice,
    iconColor: 'text-gray-500',
  },
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastWithId[]>([]);

  useEffect(() => {
    // 전역에서 토스트 상태를 업데이트할 수 있도록 함수 등록
    window.updateToasts = setToasts;

    return () => {
      delete window.updateToasts;
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    // eslint-disable-next-line react-hooks/immutability -- 이벤트 핸들러 내 수정, 렌더링 중 아님
    toastQueueRef.current = toastQueueRef.current.filter((toast) => toast.id !== id);
  };

  return (
    <div
      className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 flex-col-reverse gap-3"
      style={{ zIndex: Z_INDEX }}
    >
      {toasts.map((toast) => (
        <ToastContext.Provider
          key={toast.id}
          value={{
            notify: () => {},
            close: () => removeToast(toast.id),
          }}
        >
          <Toast {...toast} />
        </ToastContext.Provider>
      ))}
    </div>
  );
};

const Toast = ({ type = 'info', message, duration }: IToastProps) => {
  const { close } = useToastContext();
  const [isClosing, setIsClosing] = useState(false);
  const closeRef = useRef(close);
  const isClosingRef = useRef(false);
  const defaultDuration = type === 'warning' || type === 'error' ? 15000 : 3000;

  // 항상 최신 close 함수 참조 유지
  useEffect(() => {
    closeRef.current = close;
  }, [close]);

  const handleClose = () => {
    // 이미 닫히는 중이면 무시
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    setIsClosing(true);
    // 애니메이션 완료 후 실제 제거 (0.2초)
    setTimeout(() => {
      closeRef.current();
    }, 200);
  };

  // 자동 제거 타이머
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration || defaultDuration);

    return () => clearTimeout(timer);
  }, [duration, defaultDuration]);

  // sometimes message is react node array. Not handle it.
  if (typeof message !== 'string') return null;

  const style = toastStyles[type];
  const ToastIcon = style.icon;

  return (
    <div
      className={`
        flex min-w-80 max-w-md items-center gap-3 rounded-xl border px-4 py-3 shadow-lg
        ${isClosing ? 'animate-toast-out' : 'animate-toast-in'}
        ${style.bg} ${style.border}
      `}
    >
      <ToastIcon size={20} className={`shrink-0 ${style.iconColor}`} />
      <p className={`text-sm font-medium ${style.text}`}>{message}</p>
      <button
        onClick={handleClose}
        className={`ml-auto shrink-0 rounded-full p-1 transition-colors hover:bg-black/5 ${style.text}`}
      >
        <Icon.Close />
      </button>
    </div>
  );
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const placeholder: IToastProps = {
    type: 'info',
    message: 'Toast message',
    duration: 15000,
  };
  const [params, setParams] = React.useState<IToastProps>(placeholder);
  const defaultDuring = params.type === 'warning' || params.type === 'error' ? 15000 : 3000;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) {
      setTimeout(() => {
        setMounted(false);
      }, params.duration || defaultDuring);
    }
  }, [defaultDuring, mounted, params.duration]);

  return (
    <ToastContext.Provider
      value={{
        notify: (props) => {
          setMounted(true);
          setParams(props);
        },
        close: () => setMounted(false),
      }}
    >
      {mounted && <Toast {...params} />}
      {children}
    </ToastContext.Provider>
  );
};

Toast.notify = ({
  type,
  size = 'md',
  message,
  duration,
  className,
  customComponent,
}: {
  type?: IToastProps['type'];
  size?: IToastProps['size'];
  message: string;
  duration?: number;
  className?: string;
  customComponent?: ReactNode;
}) => {
  if (typeof window === 'object') {
    // 토스트 컨테이너가 없으면 생성
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container-root';
      document.body.appendChild(toastContainer);
      containerRoot = createRoot(toastContainer);
      containerRoot.render(<ToastContainer />);
    }

    // 새로운 토스트 생성
    const toastId = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastWithId = {
      id: toastId,
      type,
      size,
      message,
      duration,
      className,
      customComponent,
    };

    // 토스트 큐에 추가
    toastQueueRef.current.push(newToast);

    // updateToasts 함수가 준비될 때까지 기다린 후 실행
    const updateToastState = () => {
      if (window.updateToasts) {
        window.updateToasts([...toastQueueRef.current]);
      } else {
        // updateToasts가 아직 준비되지 않았으면 잠시 후 다시 시도
        setTimeout(updateToastState, 10);
      }
    };
    updateToastState();

    // 자동 제거는 Toast 컴포넌트 내부 useEffect에서 처리
  }
};

export default Toast;
