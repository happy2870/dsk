import type { Meta, StoryObj } from '@storybook/react';
import { InfoRow, InfoCard, HighlightCard } from './Info';

const meta: Meta = {
  title: 'UI/Info',
  tags: ['autodocs'],
};

export default meta;

type InfoRowStory = StoryObj<typeof InfoRow>;
type InfoCardStory = StoryObj<typeof InfoCard>;
type HighlightCardStory = StoryObj<typeof HighlightCard>;

export const InfoRowDefault: InfoRowStory = {
  render: () => (
    <div className="flex flex-col">
      <InfoRow label="이름" value="홍길동" />
      <InfoRow label="이메일" value="hong@example.com" />
      <InfoRow label="부서" value="개발팀" />
    </div>
  ),
};

export const InfoCardDefault: InfoCardStory = {
  render: () => (
    <div className="w-[400px]">
      <InfoCard title="기본 정보">
        <InfoRow label="이름" value="홍길동" />
        <InfoRow label="이메일" value="hong@example.com" />
        <InfoRow label="부서" value="개발팀" />
        <InfoRow label="직급" value="선임" />
      </InfoCard>
    </div>
  ),
};

export const HighlightCardDefault: HighlightCardStory = {
  render: () => (
    <div className="w-[500px]">
      <HighlightCard title="중요 안내" description="이 카드는 강조 표시된 정보를 보여줍니다.">
        <InfoRow label="상태" value="활성" />
        <InfoRow label="만료일" value="2026-12-31" />
      </HighlightCard>
    </div>
  ),
};
