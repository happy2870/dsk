import type { Meta, StoryObj } from '@storybook/react';
import { SubTitle } from './SubTitle';

const meta: Meta<typeof SubTitle> = {
  title: 'UI/SubTitle',
  component: SubTitle,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '제목 텍스트',
    },
    description: {
      control: 'text',
      description: '부가 설명 텍스트 (선택)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SubTitle>;

export const Default: Story = {
  args: {
    title: '섹션 제목',
  },
};

export const WithDescription: Story = {
  args: {
    title: '섹션 제목',
    description: '이 섹션에 대한 부가 설명입니다.',
  },
};
