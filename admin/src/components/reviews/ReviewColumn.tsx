'use client';

import { ColumnDef } from '@tanstack/react-table';
import ReviewCellAction from '@components/reviews/ReviewCellAction';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
export type TReviewColumn = {
  id: string;
  title: string;
  image: string;
  show: boolean;
  author: string;
  rating: number;
  content: string;
  createdAt: string;
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const ReviewColumn: ColumnDef<TReviewColumn>[] = [
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => (
      <div className='relative'>
        <img
          src={row.original.image || '/images/placeholder.png'}
          alt={row.original.title || 'Review Image'}
          className='w-10 h-10 rounded-full'
        />
      </div>
    ),
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'author',
    header: 'Author',
  },
  {
    accessorKey: 'content',
    header: 'Content',
  },
  {
    accessorKey: 'rating',
    header: 'Rating',
  },
  {
    accessorKey: 'show',
    header: 'Show',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date Created',
  },
  {
    id: 'actions',
    cell: ({ row }) => <ReviewCellAction data={row.original} />,
  },
];

export default ReviewColumn;
