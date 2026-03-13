'use client';

import { ReactNode, createContext, useContext, useEffect } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { Icon } from '../icons';

type ModalSizePreset = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
type ModalSize = ModalSizePreset | number;
type ModalStyle = 'form' | 'info';

const sizeClasses: Record<ModalSizePreset, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
  full: 'max-w-full',
};

const styleConfig: Record<ModalStyle, {
  headerHeight: string;
  headerPadding: string;
  contentPadding: string;
  titleSize: string;
  titleLineHeight: string;
}> = {
  form: {
    headerHeight: 'h-[60px]',
    headerPadding: 'px-5',
    contentPadding: 'p-4',
    titleSize: 'text-[18px]',
    titleLineHeight: 'leading-[26px]',
  },
  info: {
    headerHeight: '',
    headerPadding: '',
    contentPadding: '',
    titleSize: 'text-[20px]',
    titleLineHeight: 'leading-[28px]',
  },
};

// Context
type ModalContextValue = {
  modalStyle: ModalStyle;
  onClose: () => void;
  maxHeight?: number;
};

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('Modal 하위 컴포넌트는 Modal 안에서 사용해야 합니다.');
  return ctx;
}

// Modal.Header
interface ModalHeaderProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  hideDivider?: boolean;
  children?: ReactNode;
}

function ModalHeader({ title, subtitle, actions, hideDivider = false, children }: ModalHeaderProps) {
  const { modalStyle, onClose } = useModalContext();
  const styles = styleConfig[modalStyle];

  return (
    <>
      <div className={`shrink-0 flex items-center justify-between ${styles.headerHeight} ${styles.headerPadding}`}>
        {children || (
          <div>
            <h2 className={`${styles.titleSize} font-bold ${styles.titleLineHeight} text-black`}>{title}</h2>
            {subtitle && (
              <p className={modalStyle === 'info' ? 'text-body-12-r text-C-Gray-8' : 'text-sm text-gray-6 mt-1'}>{subtitle}</p>
            )}
          </div>
        )}
        <div className={`flex items-center ${modalStyle === 'info' ? 'gap-[10px]' : 'gap-2'}`}>
          {actions && (
            <div className="flex items-center gap-[4px]">{actions}</div>
          )}
          {actions && modalStyle === 'info' && (
            <div className="w-px h-[16px] bg-[#eee]" />
          )}
          {modalStyle === 'form' ? (
            <button
              onClick={onClose}
              className="flex items-center justify-center hover:opacity-70 transition-opacity cursor-pointer"
            >
              <Icon.Close size={20} className="text-black" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center justify-center w-10 h-10 rounded-[16px] bg-white border border-gray-e shadow-design-system hover:bg-gray-f7 transition-colors cursor-pointer"
            >
              <Icon.Close size={20} className="text-black" />
            </button>
          )}
        </div>
      </div>
      {!hideDivider && <div className="h-px w-full bg-gray-d" />}
    </>
  );
}

// Modal.Body
interface ModalBodyProps {
  children: ReactNode;
  className?: string;
  maxHeight?: number;
}

function ModalBody({ children, className, maxHeight: maxHeightProp }: ModalBodyProps) {
  const { modalStyle, maxHeight: maxHeightCtx } = useModalContext();
  const styles = styleConfig[modalStyle];
  const cls = className !== undefined ? className : styles.contentPadding;
  const useSimpleBar = maxHeightProp ?? maxHeightCtx;

  if (useSimpleBar) {
    return (
      <SimpleBar className={cls} style={{ flex: 1, minHeight: 0 }} autoHide>
        {children}
      </SimpleBar>
    );
  }

  return (
    <div className={`flex-1 overflow-y-auto ${cls}`}>
      {children}
    </div>
  );
}

// Modal.Footer
interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div className={className ?? 'shrink-0 px-4 pb-4'}>
      {children}
    </div>
  );
}

// Modal (root)
interface ModalRootProps {
  isOpen: boolean;
  onClose: () => void;
  size?: ModalSize;
  maxHeight?: number;
  modalStyle?: ModalStyle;
  children: ReactNode;
}

function ModalRoot({
  isOpen,
  onClose,
  size = 'lg',
  maxHeight,
  modalStyle = 'form',
  children,
}: ModalRootProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <ModalContext.Provider value={{ modalStyle, onClose, maxHeight }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="fixed inset-0 bg-black/[0.5] animate-[fadeIn_200ms_ease-out]"
          onClick={onClose}
        />
        <div
          className={`relative z-10 w-full ${typeof size === 'number' ? '' : sizeClasses[size]} max-h-[90vh] flex flex-col overflow-hidden rounded-[20px] bg-white border border-gray-e shadow-lg animate-[modalIn_200ms_ease-out] ${modalStyle === 'info' ? 'pt-[24px] px-[24px] pb-[32px] gap-[16px]' : ''}`}
          style={{
            ...(typeof size === 'number' ? { maxWidth: `${size}px` } : {}),
            ...(maxHeight ? { maxHeight: `${maxHeight}px` } : {}),
          }}
        >
          {children}
        </div>
      </div>
    </ModalContext.Provider>
  );
}

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
