import { Dispatch, ReactNode, SetStateAction } from "react";

export type ToastWithId = IToastProps & { id: string };
declare global {
  interface Window {
    updateToasts?: Dispatch<SetStateAction<ToastWithId[]>>;
  }
}

export type IToastProps = {
  type?: 'success' | 'error' | 'warning' | 'info' | 'ok' | 'basic';
  size?: 'md' | 'sm';
  duration?: number;
  message: string;
  children?: ReactNode;
  onClose?: () => void;
  className?: string;
  customComponent?: ReactNode;
  id?: string;
};

export type IToastContext = {
  notify: (props: IToastProps) => void;
  close: () => void;
};