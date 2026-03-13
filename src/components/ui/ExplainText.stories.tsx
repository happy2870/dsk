import type { Meta, StoryObj } from '@storybook/react';
import { ExplainText } from './ExplainText';

const meta: Meta<typeof ExplainText> = {
  title: 'UI/ExplainText',
  component: ExplainText,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '표시할 텍스트 내용',
    },
    color: {
      control: 'select',
      options: ['black', 'gray', 'blue', 'red'],
      description: '텍스트 색상',
    },
    size: {
      control: 'select',
      options: ['12', '14', '16'],
      description: '텍스트 크기',
    },
    icon: {
      control: 'boolean',
      description: '아이콘 표시 여부 (기본: true)',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ExplainText>;

export const Default: Story = {
  args: {
    children: '안내 텍스트입니다.',
    color: 'black',
    size: '12',
    icon: true,
  },
};

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <ExplainText color="black">black: 기본 안내 텍스트</ExplainText>
      <ExplainText color="gray">gray: 보조 안내 텍스트</ExplainText>
      <ExplainText color="blue">blue: 강조 안내 텍스트</ExplainText>
      <ExplainText color="red">red: 경고 안내 텍스트</ExplainText>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <ExplainText size="12">size 12: 작은 텍스트</ExplainText>
      <ExplainText size="14">size 14: 중간 텍스트</ExplainText>
      <ExplainText size="16">size 16: 큰 텍스트</ExplainText>
    </div>
  ),
};

export const NoIcon: Story = {
  args: {
    children: '아이콘 없는 안내 텍스트입니다.',
    icon: false,
  },
};
