import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Table } from './Table';
import type { Column } from '../../../types/table';

type SampleRow = {
  id: string;
  name: string;
  status: string;
  score: number;
  region: string;
};

const sampleColumns: Column<SampleRow>[] = [
  { id: 'name', header: '이름', accessor: 'name', width: '200px' },
  { id: 'status', header: '상태', accessor: 'status', align: 'center' },
  { id: 'score', header: '점수', accessor: 'score', align: 'right' },
  { id: 'region', header: '리전', accessor: 'region' },
];

const sampleData: SampleRow[] = [
  { id: '1', name: 'Web Server 01', status: '정상', score: 95, region: 'ap-northeast-2' },
  { id: '2', name: 'DB Server 01', status: '경고', score: 72, region: 'ap-northeast-2' },
  { id: '3', name: 'API Gateway', status: '정상', score: 88, region: 'us-east-1' },
  { id: '4', name: 'Cache Server', status: '위험', score: 45, region: 'eu-west-1' },
  { id: '5', name: 'Auth Service', status: '정상', score: 91, region: 'ap-northeast-2' },
];

const meta: Meta = {
  title: 'UI/Table/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Table<SampleRow> columns={sampleColumns} data={sampleData} rowKey="id" showPagination={false} />
  ),
};

export const WithPagination: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Table<SampleRow>
        columns={sampleColumns}
        data={sampleData}
        rowKey="id"
        showPagination={true}
        pagination={{ currentPage: page, totalPages: 5, pageSize: 5, onPageChange: setPage, onPageSizeChange: () => {} }}
      />
    );
  },
};

export const WithCheckbox: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    const isAllSelected = selected.length === sampleData.length;
    return (
      <Table<SampleRow>
        columns={sampleColumns}
        data={sampleData}
        rowKey="id"
        showCheckbox
        selectable
        selectedRows={selected}
        onRowSelect={(id) => setSelected((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])}
        onSelectAll={() => setSelected(isAllSelected ? [] : sampleData.map((r) => r.id))}
        isAllSelected={isAllSelected}
        showPagination={false}
      />
    );
  },
};

export const Empty: Story = {
  render: () => (
    <Table<SampleRow> columns={sampleColumns} data={[]} rowKey="id" showPagination={false} />
  ),
};

export const VerticalBorder: Story = {
  render: () => (
    <Table<SampleRow> columns={sampleColumns} data={sampleData} rowKey="id" showPagination={false} verticalBorder />
  ),
};
