'use client';

import React, { createContext, useContext, useState } from 'react';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';

interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary';
}

interface ConfirmModalContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmModalContext = createContext<ConfirmModalContextType | undefined>(undefined);

export const useConfirmModal = () => {
  const context = useContext(ConfirmModalContext);
  if (!context) {
    throw new Error('useConfirmModal must be used within ConfirmModalProvider');
  }
  return context;
};

export const ConfirmModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);

  const confirm = (opts: ConfirmOptions): Promise<boolean> => {
    setOptions(opts);
    setIsOpen(true);

    return new Promise((resolve) => {
      setResolver(() => resolve);
    });
  };

  const handleConfirm = () => {
    resolver?.(true);
    setIsOpen(false);
  };

  const handleCancel = () => {
    resolver?.(false);
    setIsOpen(false);
  };

  return (
    <ConfirmModalContext.Provider value={{ confirm }}>
      {children}
      {isOpen && options && (
        <Modal isOpen={isOpen} onClose={handleCancel}>
          <Modal.Header title={options.title} />
          <Modal.Body>
            <p className="text-gray-6 text-center min-h-[100px] flex items-center justify-center">{options.message}</p>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex gap-3">
              <Button onClick={handleCancel} variant="ghost" size="md" className="flex-1">
                {options.cancelText ?? '취소'}
              </Button>
              <Button
                onClick={handleConfirm}
                variant={options.variant === 'danger' ? 'primary' : 'primary'}
                size="md"
                className="flex-1"
              >
                {options.confirmText ?? '확인'}
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </ConfirmModalContext.Provider>
  );
};
