import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ButtonTabs } from './ButtonTabs';

const meta: Meta<typeof ButtonTabs> = {
  title: 'UI/Tabs/ButtonTabs',
  component: ButtonTabs,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean', description: '비활성화' },
  },
};
export default meta;
type Story = StoryObj<typeof ButtonTabs>;

export const Default: Story = {
  render: () => {
    const [tab, setTab] = useState('overview');
    return (
      <div style={{ width: 400 }}>
        <ButtonTabs
          activeTab={tab}
          onTabChange={setTab}
          tabs={['overview', 'details', 'history']}
          tabLabels={{ overview: '개요', details: '상세', history: '이력' }}
        />
      </div>
    );
  },
};

export const WithFixedWidth: Story = {
  render: () => {
    const [tab, setTab] = useState('tab1');
    return (
      <ButtonTabs
        activeTab={tab}
        onTabChange={setTab}
        tabs={['tab1', 'tab2', 'tab3']}
        tabLabels={{ tab1: '탭 1', tab2: '탭 2', tab3: '탭 3' }}
        tabWidth="120px"
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <ButtonTabs
        activeTab="tab1"
        onTabChange={() => {}}
        tabs={['tab1', 'tab2', 'tab3']}
        tabLabels={{ tab1: '탭 1', tab2: '탭 2', tab3: '탭 3' }}
        disabled
      />
    </div>
  ),
};
