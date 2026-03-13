import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { ConfigCard } from './ConfigCard';

const meta: Meta<typeof ConfigCard> = {
  title: 'UI/Card/ConfigCard',
  component: ConfigCard,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof ConfigCard>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <ConfigCard id={1}>
        <ConfigCard.Body>
          <ConfigCard.Header badge={{ variant: 'green', label: '활성' }} onEdit={fn()} onDelete={fn()}>
            AWS 보안 설정
          </ConfigCard.Header>
          <ConfigCard.Divider />
          <ConfigCard.Info>
            <ConfigCard.InfoRow label="계정 ID">123456789012</ConfigCard.InfoRow>
            <ConfigCard.InfoRow label="리전">ap-northeast-2</ConfigCard.InfoRow>
            <ConfigCard.InfoRow label="마지막 점검">2024-03-01</ConfigCard.InfoRow>
          </ConfigCard.Info>
        </ConfigCard.Body>
      </ConfigCard>
    </div>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <ConfigCard id={2}>
        <ConfigCard.Body>
          <ConfigCard.Header badge={{ variant: 'blue', label: '진행 중' }}>
            점검 프로파일
          </ConfigCard.Header>
          <ConfigCard.Divider />
          <ConfigCard.Info>
            <ConfigCard.InfoRow label="유형">취약점 점검</ConfigCard.InfoRow>
            <ConfigCard.InfoRow label="대상">전체 자산</ConfigCard.InfoRow>
          </ConfigCard.Info>
        </ConfigCard.Body>
        <ConfigCard.Footer>
          <ConfigCard.FooterAction icon={<span>📋</span>} onClick={fn()}>상세보기</ConfigCard.FooterAction>
          <ConfigCard.FooterDivider />
          <ConfigCard.FooterAction icon={<span>▶</span>} onClick={fn()}>실행</ConfigCard.FooterAction>
        </ConfigCard.Footer>
      </ConfigCard>
    </div>
  ),
};
