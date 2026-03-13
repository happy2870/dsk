import type { Meta, StoryObj } from '@storybook/react';
import { NoData } from './NoData';

const meta: Meta<typeof NoData> = {
  title: 'UI/NoData',
  component: NoData,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '제목 텍스트 (선택)',
    },
    message: {
      control: 'text',
      description: '안내 메시지 (기본: 데이터가 없습니다.)',
    },
    size: {
      control: 'select',
      options: ['md', 'lg'],
      description: '크기',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof NoData>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const WithTitle: Story = {
  args: {
    title: '검색 결과 없음',
    message: '조건에 맞는 데이터가 없습니다.',
    size: 'md',
  },
};

export const WithActions: Story = {
  args: {
    title: '등록된 항목 없음',
    message: '새로운 항목을 추가해 보세요.',
    size: 'md',
    actions: (
      <button className="px-4 py-2 bg-[#0069FF] text-white text-sm rounded-lg">
        항목 추가
      </button>
    ),
  },
};
