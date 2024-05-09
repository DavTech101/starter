'use client';

import { Plus } from 'lucide-react';
import Heading from '@components/ui/Heading';
import ApiList from '@components/ui/ApiList';
import { Button } from '@components/ui/Button';
import { DataTable } from '@components/ui/DataTable';
import { Separator } from '@components/ui/Separator';
import { useRouter, useParams } from 'next/navigation';
import BlogColumn, { TBlogColumn } from '@components/blogs/BlogColumn';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type BlogClientProps = {
  data: TBlogColumn[];
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const BlogClient: React.FC<BlogClientProps> = ({ data }) => {
  const router = useRouter();
  const { storeId } = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Blogs (${data.length})`}
          description='Manage blog for your stores'
        />
        <Button onClick={() => router.push(`/${storeId}/blogs/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add New Blog
        </Button>
      </div>
      <Separator />
      <DataTable columns={BlogColumn} data={data} searchKey='name' />
      <Heading title='API' description='API calls for blogs' />
      <Separator />
      <ApiList entityName='blogs' entityIdName='blogId' />
    </>
  );
};

export default BlogClient;
