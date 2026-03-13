import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MultiSearchSelect } from './MultiSearchSelect';

const meta: Meta<typeof MultiSearchSelect> = {
  title: 'UI/MultiSearchSelect',
  component: MultiSearchSelect,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md'], description: '크기' },
    disabled: { control: 'boolean', description: '비활성화 여부' },
    placeholder: { control: 'text', description: '플레이스홀더' },
  },
};
export default meta;
type Story = StoryObj<typeof MultiSearchSelect>;

const options = [
  { value: 'seoul', label: '서울' },
  { value: 'busan', label: '부산' },
  { value: 'daegu', label: '대구' },
  { value: 'incheon', label: '인천' },
  { value: 'gwangju', label: '광주' },
  { value: 'daejeon', label: '대전' },
  { value: 'ulsan', label: '울산' },
];

export const Default: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    return (
      <div style={{ width: 280 }}>
        <MultiSearchSelect values={values} onChange={setValues} options={options} placeholder="지역 선택" />
      </div>
    );
  },
};

export const WithSelection: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>(['seoul', 'busan']);
    return (
      <div style={{ width: 280 }}>
        <MultiSearchSelect values={values} onChange={setValues} options={options} />
      </div>
    );
  },
};
