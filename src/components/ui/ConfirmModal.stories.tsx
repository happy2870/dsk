import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { useState } from 'react';
import { ConfirmModal } from './ConfirmModal';
import { Button } from './Button';

const meta: Meta<typeof ConfirmModal> = {
  title: 'UI/ConfirmModal',
  component: ConfirmModal,
  tags: ['autodocs'],
  args: { onClose: fn(), onConfirm: fn() },
  argTypes: {
    variant: { control: 'select', options: ['danger', 'warning', 'info'], description: '변형 스타일' },
    title: { control: 'text', description: '제목' },
    message: { control: 'text', description: '메시지' },
  },
};
export default meta;
type Story = StoryObj<typeof ConfirmModal>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>확인 모달 열기</Button>
        <ConfirmModal isOpen={isOpen} onClose={() => setIsOpen(false)} onConfirm={() => setIsOpen(false)} />
      </>
    );
  },
};

export const Danger: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="error" onClick={() => setIsOpen(true)}>삭제 확인</Button>
        <ConfirmModal isOpen={isOpen} onClose={() => setIsOpen(false)} onConfirm={() => setIsOpen(false)} variant="danger" title="삭제 확인" message="정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다." confirmText="삭제" />
      </>
    );
  },
};

export const Warning: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>경고 모달</Button>
        <ConfirmModal isOpen={isOpen} onClose={() => setIsOpen(false)} onConfirm={() => setIsOpen(false)} variant="warning" title="주의" message="변경사항이 저장되지 않습니다." />
      </>
    );
  },
};
