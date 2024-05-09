'use client';

import { BlogTag, Tag } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import BlogCellAction from '@components/blogs/BlogCellAction';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
export type TTag = BlogTag & {
  tag: Tag;
};

export type TBlogColumn = {
  id: string;
  tags: TTag[];
  slug: string;
  title: string;
  author: string;
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
  images: string;
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const BlogColumn: ColumnDef<TBlogColumn>[] = [
  {
    accessorKey: 'image',
    header: 'Display Image',
    cell: ({ row }) => (
      <div className='flex items-center'>
        {row.original.images === '' ? (
          <div className='w-10 h-10 bg-gray-200' />
        ) : (
          <img
            alt='blog image'
            src={row.original.images}
            className='w-10 h-10 object-cover'
          />
        )}
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
    accessorKey: 'isFeatured',
    header: 'Featured',
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
    cell: ({ row }) => <BlogCellAction data={row.original} />,
  },
];

export default BlogColumn;
