'use client';

import { Plus } from 'lucide-react';
import Heading from '@components/ui/Heading';
import ApiList from '@components/ui/ApiList';
import { Button } from '@components/ui/Button';
import { DataTable } from '@components/ui/DataTable';
import { Separator } from '@components/ui/Separator';
import { useRouter, useParams } from 'next/navigation';
import reorderCategories from '@utils/reorderCategories';
import CategoryColumn, {
  TCategoryColumn,
} from '@components/categories/CategoryColumn';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type CategoryClientProps = {
  data: TCategoryColumn[];
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const router = useRouter();
  const { storeId } = useParams();
  data = reorderCategories(data);

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Categories (${data.length})`}
          description='Manage category for your stores'
        />
        <Button onClick={() => router.push(`/${storeId}/categories/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add New Category
        </Button>
      </div>
      <Separator />
      <DataTable columns={CategoryColumn} data={data} searchKey='name' />
      <Heading title='API' description='API calls for categories' />
      <Separator />
      <ApiList entityName='categories' entityIdName='categoryId' />
    </>
  );
};

export default CategoryClient;
