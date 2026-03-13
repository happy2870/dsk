import type { Meta, StoryObj } from '@storybook/react';
import { LoadingOverlay } from './LoadingOverlay';

const meta: Meta<typeof LoadingOverlay> = {
  title: 'UI/LoadingOverlay',
  component: LoadingOverlay,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    isLoading: {
      control: 'boolean',
      description: '로딩 상태 여부',
    },
    children: {
      description: '오버레이 대상 콘텐츠',
    },
    text: {
      control: 'text',
      description: '로딩 텍스트 (선택)',
    },
    mode: {
      control: 'select',
      options: ['inline', 'content', 'fullScreen'],
      description: '오버레이 모드 (기본: inline)',
    },
    spinnerSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: '스피너 크기 (기본: mode에 따라 자동)',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingOverlay>;

const SampleContent = () => (
  <div className="border border-gray-300 rounded-lg p-6 bg-white">
    <h3 className="text-lg font-bold mb-2">콘텐츠 영역</h3>
    <p className="text-sm text-gray-600">이 영역 위에 로딩 오버레이가 표시됩니다.</p>
    <div className="mt-4 flex gap-2">
      <div className="h-8 w-24 bg-gray-200 rounded" />
      <div className="h-8 w-32 bg-gray-200 rounded" />
    </div>
  </div>
);

export const Inline: Story = {
  args: {
    isLoading: true,
    mode: 'inline',
    children: <SampleContent />,
  },
};

export const ContentMode: Story = {
  args: {
    isLoading: true,
    mode: 'content',
    children: <SampleContent />,
  },
};

export const WithText: Story = {
  args: {
    isLoading: true,
    mode: 'inline',
    text: '데이터를 불러오는 중...',
    children: <SampleContent />,
  },
};
