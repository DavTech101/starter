'use client';

import { Plus } from 'lucide-react';
import Heading from '@components/ui/Heading';
import ApiList from '@components/ui/ApiList';
import { Button } from '@components/ui/Button';
import { DataTable } from '@components/ui/DataTable';
import { Separator } from '@components/ui/Separator';
import { useRouter, useParams } from 'next/navigation';
import NewsColumn, { TNewsColumn } from '@components/newsletters/NewsColumn';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type NewssClientProps = {
  data: TNewsColumn[];
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const NewsClient: React.FC<NewssClientProps> = ({ data }) => {
  const router = useRouter();
  const { storeId } = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Newsletters Signup (${data.length})`}
          description='Manage newsletters for your stores'
        />
        <Button onClick={() => router.push(`/${storeId}/newsletters/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add New News
        </Button>
      </div>
      <Separator />
      <DataTable columns={NewsColumn} data={data} searchKey='name' />
      <Heading title='API' description='API calls for newsletters' />
      <Separator />
      <ApiList entityName='newsletters' entityIdName='newsId' />
    </>
  );
};

export default NewsClient;
