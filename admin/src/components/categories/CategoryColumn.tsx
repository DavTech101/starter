'use client';

import { CategoryTag, Tag } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import CategoryCellAction from '@components/categories/CategoryCellAction';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
export type TTag = CategoryTag & {
  tag: Tag;
};

export type TCategoryColumn = {
  id: string;
  name: string;
  tags: TTag[];
  slug: string;
  imageUrl: string;
  createdAt: string;
  isArchived: boolean;
  description: string | null;
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const CategoryColumn: ColumnDef<TCategoryColumn>[] = [
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => (
      <div className='flex items-center'>
        {row.original.imageUrl === '' ? (
          <div className='w-10 h-10 bg-gray-200' />
        ) : (
          <img
            alt='category image'
            src={row.original.imageUrl}
            className='w-10 h-10 object-cover'
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
    accessorKey: 'slug',
    header: 'Slug',
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    cell: ({ row }) => (
      <div className='flex items-center'>
        {row.original.tags?.map((tag) => (
          <span
            key={tag.tag.id}
            className='px-2 py-1 mr-1 text-xs font-semibold rounded-full 
            bg-gray-200 text-gray-800'
          >
            {tag.tag.name}
          </span>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Created',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CategoryCellAction data={row.original} />,
  },
];

export default CategoryColumn;
