import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달 열림 상태',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'full'],
      description: '모달 크기 프리셋 또는 숫자(px)',
    },
    maxHeight: {
      control: 'number',
      description: '최대 높이(px)',
    },
    modalStyle: {
      control: 'select',
      options: ['form', 'info'],
      description: '모달 스타일 (form: 기본 폼, info: 정보 표시)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const FormStyle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-[#0069FF] text-white rounded-lg">
          모달 열기
        </button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg" modalStyle="form">
          <Modal.Header title="설정" subtitle="기본 설정을 변경합니다." />
          <Modal.Body>
            <div className="p-4">
              <p>모달 내용이 여기에 들어갑니다.</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 border border-gray-d rounded-lg">취소</button>
              <button className="px-4 py-2 bg-[#0069FF] text-white rounded-lg">저장</button>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};

export const InfoStyle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
      <>
        <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-[#0069FF] text-white rounded-lg">
          정보 모달 열기
        </button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md" modalStyle="info">
          <Modal.Header title="안내" subtitle="이 작업에 대한 상세 정보입니다." />
          <Modal.Body>
            <div className="p-4">
              <p className="text-sm text-gray-600">이 항목은 관리자만 수정할 수 있습니다.</p>
              <p className="text-sm text-gray-600 mt-2">변경이 필요한 경우 관리자에게 문의하세요.</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex justify-end">
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-[#0069FF] text-white rounded-lg">확인</button>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
};
