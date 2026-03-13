import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'], description: '크기' },
    disabled: { control: 'boolean', description: '비활성화 여부' },
    placeholder: { control: 'text', description: '플레이스홀더' },
  },
};
export default meta;
type Story = StoryObj<typeof Select>;

const sampleOptions = [
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
  { value: 'option4', label: '옵션 4' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string | number>('option1');
    return (
      <div style={{ width: 240 }}>
        <Select value={value} onChange={setValue} options={sampleOptions} placeholder="선택하세요" />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <Select value="option1" onChange={() => {}} options={sampleOptions} disabled />
    </div>
  ),
};

export const MediumSize: Story = {
  render: () => {
    const [value, setValue] = useState<string | number>('');
    return (
      <div style={{ width: 280 }}>
        <Select value={value} onChange={setValue} options={sampleOptions} size="md" placeholder="선택하세요" />
      </div>
    );
  },
};
