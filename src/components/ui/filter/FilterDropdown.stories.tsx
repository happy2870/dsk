import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FilterDropdown } from './FilterDropdown';

const meta: Meta<typeof FilterDropdown> = {
  title: 'UI/Filter/FilterDropdown',
  component: FilterDropdown,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof FilterDropdown>;

const options = [
  { value: 'ec2', label: 'EC2 인스턴스' },
  { value: 's3', label: 'S3 버킷' },
  { value: 'rds', label: 'RDS 데이터베이스' },
  { value: 'lambda', label: 'Lambda 함수' },
  { value: 'vpc', label: 'VPC' },
  { value: 'iam', label: 'IAM 사용자' },
];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return <FilterDropdown options={options} selectedValues={selected} onSelectionChange={setSelected} placeholder="리소스 선택" />;
  },
};

export const WithSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['ec2', 's3']);
    return <FilterDropdown options={options} selectedValues={selected} onSelectionChange={setSelected} />;
  },
};
