'use client';

import { ColumnDef } from '@tanstack/react-table';
import CellAction from '@components/banners/BannerCellAction';

//##########################################################################################
// BANNER COLUMN TYPES
//##########################################################################################
export type TBannerColumn = {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
};

//##########################################################################################
// BANNER COLUMN COMPONENT
//##########################################################################################
export const BannerColumn: ColumnDef<TBannerColumn>[] = [
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => (
      <div className='flex items-center'>
        {row.original.imageUrl === '' ? (
          <div className='size-24 bg-gray-200' />
        ) : (
          <img
            alt='category image'
            src={row.original.imageUrl}
            className='size-24 object-cover'
          />
        )}
      </div>
    ),
  },
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
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];

export default BannerColumn;
