import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CheckListSection } from './CheckListSection';

const meta: Meta<typeof CheckListSection> = {
  title: 'UI/CheckListSection',
  component: CheckListSection,
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'select', options: [1, 2, 4], description: '컬럼 수' },
  },
};
export default meta;
type Story = StoryObj<typeof CheckListSection>;

const items = [
  { id: '1', name: 'AWS EC2', description: '가상 서버 인스턴스' },
  { id: '2', name: 'AWS S3', description: '오브젝트 스토리지' },
  { id: '3', name: 'AWS RDS', description: '관계형 데이터베이스' },
  { id: '4', name: 'AWS Lambda', description: '서버리스 컴퓨팅' },
  { id: '5', name: 'AWS CloudFront', description: 'CDN 서비스' },
  { id: '6', name: 'AWS VPC', description: '가상 네트워크' },
  { id: '7', name: 'AWS IAM', description: '접근 관리' },
  { id: '8', name: 'AWS EKS', description: 'Kubernetes 서비스' },
];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['1', '3']);
    return (
      <div style={{ width: 500 }}>
        <CheckListSection items={items} selectedIds={selected} onSelectionChange={setSelected} />
      </div>
    );
  },
};

export const TwoColumns: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div style={{ width: 700 }}>
        <CheckListSection items={items} selectedIds={selected} onSelectionChange={setSelected} columns={2} />
      </div>
    );
  },
};
