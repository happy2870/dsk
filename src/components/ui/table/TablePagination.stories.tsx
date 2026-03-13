import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TablePagination } from './TablePagination';

const meta: Meta<typeof TablePagination> = {
  title: 'UI/Table/TablePagination',
  component: TablePagination,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof TablePagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <TablePagination currentPage={page} totalPages={10} onPageChange={setPage} />;
  },
};

export const FewPages: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <TablePagination currentPage={page} totalPages={3} onPageChange={setPage} />;
  },
};

export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(50);
    return <TablePagination currentPage={page} totalPages={100} onPageChange={setPage} />;
  },
};
