import type { Meta, StoryObj } from '@storybook/react';
import { CautionBox } from './CautionBox';

const meta: Meta<typeof CautionBox> = {
  title: 'UI/CautionBox',
  component: CautionBox,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '상단 제목 (선택)',
    },
    children: {
      control: 'text',
      description: '본문 내용',
    },
    color: {
      control: 'select',
      options: ['blue', 'red'],
      description: '색상 테마',
    },
    type: {
      control: 'select',
      options: ['fill', 'line'],
      description: '스타일 타입 (채움 / 테두리)',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CautionBox>;

export const BlueFill: Story = {
  args: {
    children: '이 항목은 변경 후 되돌릴 수 없습니다.',
    color: 'blue',
    type: 'fill',
  },
};

export const RedFill: Story = {
  args: {
    children: '삭제된 데이터는 복구할 수 없습니다.',
    color: 'red',
    type: 'fill',
  },
};

export const BlueLine: Story = {
  args: {
    children: '이 항목은 변경 후 되돌릴 수 없습니다.',
    color: 'blue',
    type: 'line',
  },
};

export const RedLine: Story = {
  args: {
    children: '삭제된 데이터는 복구할 수 없습니다.',
    color: 'red',
    type: 'line',
  },
};

export const WithTitle: Story = {
  args: {
    title: '주의사항',
    children: '설정을 변경하면 기존 데이터에 영향을 줄 수 있습니다. 신중하게 진행해 주세요.',
    color: 'blue',
    type: 'fill',
  },
};
