'use client';

import { ColumnDef } from '@tanstack/react-table';
import TagCellAction from '@components/tags/TagCellAction';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
export type TTagColumn = {
  id: string;
  name: string;
  createdAt: string;
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const TagColumn: ColumnDef<TTagColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Created',
  },
  {
    id: 'actions',
    cell: ({ row }) => <TagCellAction data={row.original} />,
  },
];

export default TagColumn;
