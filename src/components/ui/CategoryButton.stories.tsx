import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { CategoryButton } from './CategoryButton';

const meta: Meta<typeof CategoryButton> = {
  title: 'UI/CategoryButton',
  component: CategoryButton,
  tags: ['autodocs'],
  args: { onClick: fn() },
  argTypes: {
    active: { control: 'boolean', description: '활성 상태' },
    children: { control: 'text', description: '버튼 텍스트' },
  },
};
export default meta;
type Story = StoryObj<typeof CategoryButton>;

export const Default: Story = {
  args: { children: '카테고리', active: false },
};

export const Active: Story = {
  args: { children: '카테고리', active: true },
};

export const Group: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <CategoryButton active>전체</CategoryButton>
      <CategoryButton>보안</CategoryButton>
      <CategoryButton>네트워크</CategoryButton>
      <CategoryButton>서버</CategoryButton>
    </div>
  ),
};
