import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'UI/FormField',
  component: FormField,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: '라벨 텍스트 크기',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: (args) => (
    <FormField {...args}>
      <FormField.Label>라벨</FormField.Label>
      <FormField.Content>
        <div className="h-[50px] rounded-[8px] border border-gray-d px-3 flex items-center text-sm text-gray-a">
          입력하세요
        </div>
      </FormField.Content>
    </FormField>
  ),
  args: {
    size: 'md',
  },
};

export const Required: Story = {
  render: (args) => (
    <FormField {...args}>
      <FormField.Label required>필수 항목</FormField.Label>
      <FormField.Content>
        <div className="h-[50px] rounded-[8px] border border-gray-d px-3 flex items-center text-sm text-gray-a">
          입력하세요
        </div>
      </FormField.Content>
    </FormField>
  ),
  args: {
    size: 'md',
  },
};

export const WithValue: Story = {
  render: (args) => (
    <FormField {...args}>
      <FormField.Label>API Key</FormField.Label>
      <FormField.Value copyable>sk-1234-5678-abcd</FormField.Value>
    </FormField>
  ),
  args: {
    size: 'md',
  },
};

export const WithCard: Story = {
  render: (args) => (
    <FormField {...args}>
      <FormField.Label>엔드포인트</FormField.Label>
      <FormField.Card copyable>https://api.example.com/v1</FormField.Card>
    </FormField>
  ),
  args: {
    size: 'md',
  },
};

export const WithDescription: Story = {
  render: (args) => (
    <FormField {...args}>
      <FormField.Label>이름</FormField.Label>
      <FormField.Description>영문, 숫자만 입력 가능합니다.</FormField.Description>
      <FormField.Content>
        <div className="h-[50px] rounded-[8px] border border-gray-d px-3 flex items-center text-sm text-gray-a">
          입력하세요
        </div>
      </FormField.Content>
    </FormField>
  ),
  args: {
    size: 'md',
  },
};

export const FullExample: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[400px]">
      <FormField>
        <FormField.Label required>이름</FormField.Label>
        <FormField.Content>
          <div className="h-[50px] rounded-[8px] border border-gray-d px-3 flex items-center text-sm text-black">홍길동</div>
        </FormField.Content>
      </FormField>
      <FormField>
        <FormField.Label>설명</FormField.Label>
        <FormField.Description>선택 항목입니다.</FormField.Description>
        <FormField.Content>
          <div className="h-[50px] rounded-[8px] border border-gray-d px-3 flex items-center text-sm text-gray-a">입력하세요</div>
        </FormField.Content>
      </FormField>
      <FormField>
        <FormField.Label>API Key</FormField.Label>
        <FormField.Value copyable>sk-1234-5678-abcd</FormField.Value>
      </FormField>
    </div>
  ),
};
