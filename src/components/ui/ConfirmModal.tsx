'use client';

import { Modal } from './Modal';
import { Button } from './Button';

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
};

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = '확인',
  message = '이 작업을 진행하시겠습니까?',
  confirmText = '확인',
  cancelText = '취소',
  variant = 'info',
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const variantStyles = {
    danger: 'bg-red-500 hover:bg-red-600 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
    info: 'bg-blue-500 hover:bg-blue-600 text-white',
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <Modal.Header title={title} />
      <Modal.Body>
        <div className="py-4">
          <p className="text-sm text-gray-700">{message}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex gap-3">
          <Button
            onClick={onClose}
            variant="ghost"
            size="md"
            className="flex-1"
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            size="md"
            className={`flex-1 ${variantStyles[variant]}`}
          >
            {confirmText}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
