import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SelectionList } from './SelectionList';
import type { SelectionListItem } from './SelectionList';

const meta: Meta<typeof SelectionList> = {
  title: 'UI/SelectionList',
  component: SelectionList,
  tags: ['autodocs'],
  argTypes: {
    maxHeight: { control: 'text', description: '최대 높이' },
  },
};
export default meta;
type Story = StoryObj<typeof SelectionList>;

const sampleItems: SelectionListItem[] = [
  { id: '1', name: '보안 그룹 점검', description: '인바운드/아웃바운드 규칙 확인' },
  { id: '2', name: 'IAM 정책 점검', description: '최소 권한 원칙 확인' },
  { id: '3', name: '암호화 설정 점검', description: '저장 데이터 암호화 확인' },
  { id: '4', name: '로깅 활성화 점검', description: 'CloudTrail, VPC Flow Logs' },
  { id: '5', name: '네트워크 ACL 점검' },
];

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<Set<string>>(new Set(['1', '3']));
    return (
      <div style={{ width: 400 }}>
        <SelectionList items={sampleItems} selectedIds={selected} onToggle={(id) => setSelected((prev) => { const next = new Set(prev); if (next.has(id)) next.delete(id); else next.add(id); return next; })} />
      </div>
    );
  },
};
