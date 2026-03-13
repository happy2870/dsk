import type { Meta, StoryObj } from '@storybook/react';
import Toast from './index';
import { Button } from '../Button';

const meta: Meta = {
  title: 'UI/Toast',
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj;

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Button onClick={() => Toast.notify({ type: 'success', message: '성공적으로 저장되었습니다.' })}>Success</Button>
      <Button onClick={() => Toast.notify({ type: 'error', message: '오류가 발생했습니다.' })}>Error</Button>
      <Button onClick={() => Toast.notify({ type: 'warning', message: '주의가 필요합니다.' })}>Warning</Button>
      <Button onClick={() => Toast.notify({ type: 'info', message: '새로운 정보가 있습니다.' })}>Info</Button>
      <Button onClick={() => Toast.notify({ type: 'basic', message: '기본 알림입니다.' })}>Basic</Button>
    </div>
  ),
};

export const CustomDuration: Story = {
  render: () => (
    <Button onClick={() => Toast.notify({ type: 'info', message: '10초 후 사라집니다.', duration: 10000 })}>
      10초 토스트
    </Button>
  ),
};
