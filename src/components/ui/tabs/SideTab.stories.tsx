import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SideTab } from './SideTab';
import type { SideTabItem } from './SideTab';

const meta: Meta<typeof SideTab> = {
  title: 'UI/Tabs/SideTab',
  component: SideTab,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SideTab>;

const items: SideTabItem[] = [
  { id: 'dashboard', name: '대시보드' },
  { id: 'assets', name: '자산 관리' },
  { id: 'security', name: '보안 점검' },
  { id: 'reports', name: '리포트' },
  { id: 'settings', name: '설정', disabled: true },
];

export const Default: Story = {
  render: () => {
    const [activeId, setActiveId] = useState('dashboard');
    return <SideTab items={items} activeId={activeId} onSelect={setActiveId} />;
  },
};
