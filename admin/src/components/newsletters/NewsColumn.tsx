'use client';

import { ColumnDef } from '@tanstack/react-table';
import NewsCellAction from '@components/newsletters/NewsCellAction';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
export type TNewsColumn = {
  id: string;
  email: string;
  createdAt: string;
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const NewsColumn: ColumnDef<TNewsColumn>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },

  {
    accessorKey: 'createdAt',
    header: 'Date Created',
  },
  {
    id: 'actions',
    cell: ({ row }) => <NewsCellAction data={row.original} />,
  },
];

export default NewsColumn;
