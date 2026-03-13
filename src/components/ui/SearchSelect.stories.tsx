import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchSelect } from './SearchSelect';

const meta: Meta<typeof SearchSelect> = {
  title: 'UI/SearchSelect',
  component: SearchSelect,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'], description: '크기' },
    disabled: { control: 'boolean', description: '비활성화 여부' },
    placeholder: { control: 'text', description: '플레이스홀더' },
    searchPlaceholder: { control: 'text', description: '검색 플레이스홀더' },
  },
};
export default meta;
type Story = StoryObj<typeof SearchSelect>;

const options = [
  { value: 'aws', label: 'Amazon Web Services' },
  { value: 'gcp', label: 'Google Cloud Platform' },
  { value: 'azure', label: 'Microsoft Azure' },
  { value: 'ncp', label: 'Naver Cloud Platform' },
  { value: 'kt', label: 'KT Cloud' },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string | number>('');
    return (
      <div style={{ width: 280 }}>
        <SearchSelect value={value} onChange={setValue} options={options} placeholder="클라우드 선택" />
      </div>
    );
  },
};

export const WithSelection: Story = {
  render: () => {
    const [value, setValue] = useState<string | number>('aws');
    return (
      <div style={{ width: 280 }}>
        <SearchSelect value={value} onChange={setValue} options={options} />
      </div>
    );
  },
};
