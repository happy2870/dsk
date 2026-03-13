import type { Meta, StoryObj } from '@storybook/react';
import { TruncatedCell } from './TruncatedCell';

const meta: Meta<typeof TruncatedCell> = {
  title: 'UI/TruncatedCell',
  component: TruncatedCell,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text', description: '표시 및 툴팁 텍스트' },
    maxWidth: { control: 'text', description: '최대 너비 클래스' },
    tooltipPlace: { control: 'select', options: ['top', 'bottom', 'left', 'right'], description: '툴팁 위치' },
  },
};
export default meta;
type Story = StoryObj<typeof TruncatedCell>;

export const Default: Story = {
  args: {
    value: '이것은 매우 긴 텍스트입니다. 셀 너비를 초과하면 말줄임표가 표시되고 마우스를 올리면 툴팁이 나타납니다.',
    maxWidth: 'max-w-[200px]',
  },
};

export const Short: Story = {
  args: {
    value: '짧은 텍스트',
    maxWidth: 'max-w-[200px]',
  },
};
