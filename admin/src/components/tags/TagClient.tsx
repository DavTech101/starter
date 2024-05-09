'use client';

import { Plus } from 'lucide-react';
import Heading from '@components/ui/Heading';
import ApiList from '@components/ui/ApiList';
import { Button } from '@components/ui/Button';
import { DataTable } from '@components/ui/DataTable';
import { Separator } from '@components/ui/Separator';
import { useRouter, useParams } from 'next/navigation';
import TagColumn, { TTagColumn } from '@components/tags/TagColumn';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type ColorsClientProps = {
  data: TTagColumn[];
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const TagClient: React.FC<ColorsClientProps> = ({ data }) => {
  const router = useRouter();
  const { storeId } = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`tags (${data.length})`}
          description='Manage tags for your stores'
        />
        <Button onClick={() => router.push(`/${storeId}/tags/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add New Tag
        </Button>
      </div>
      <Separator />
      <DataTable columns={TagColumn} data={data} searchKey='name' />
      <Heading title='API' description='API calls for tags' />
      <Separator />
      <ApiList entityName='tags' entityIdName='tagId' />
    </>
  );
};

export default TagClient;
