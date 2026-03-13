import type { Meta, StoryObj } from '@storybook/react';
import { ValueTag } from './ValueTag';

const meta: Meta<typeof ValueTag> = {
  title: 'UI/ValueTag',
  component: ValueTag,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: '태그에 표시할 텍스트',
    },
    num: {
      control: 'text',
      description: '텍스트 옆에 표시할 숫자 (선택)',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'error'],
      description: '색상 변형',
    },
    tagType: {
      control: 'select',
      options: ['button', 'text'],
      description: '태그 타입 (button: 큰 사이즈, text: 작은 사이즈)',
    },
    onRemove: {
      action: 'onRemove',
      description: '삭제 버튼 클릭 콜백 (설정 시 삭제 버튼 표시)',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ValueTag>;

export const Default: Story = {
  args: {
    text: '태그',
    variant: 'primary',
    tagType: 'button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <ValueTag text="Primary" variant="primary" />
      <ValueTag text="Secondary" variant="secondary" />
      <ValueTag text="Error" variant="error" />
    </div>
  ),
};

export const TextType: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <ValueTag text="Primary" variant="primary" tagType="text" />
      <ValueTag text="Secondary" variant="secondary" tagType="text" />
      <ValueTag text="Error" variant="error" tagType="text" />
    </div>
  ),
};

export const WithRemove: Story = {
  args: {
    text: '삭제 가능한 태그',
    variant: 'primary',
    tagType: 'button',
    onRemove: () => {},
  },
};

export const WithNum: Story = {
  args: {
    text: '항목',
    num: '12',
    variant: 'primary',
    tagType: 'button',
  },
};
