'use client';

import { Plus } from 'lucide-react';
import Heading from '@components/ui/Heading';
import ApiList from '@components/ui/ApiList';
import { Button } from '@components/ui/Button';
import { DataTable } from '@components/ui/DataTable';
import { Separator } from '@components/ui/Separator';
import { useRouter, useParams } from 'next/navigation';
import { BannerColumn, TBannerColumn } from '@components/banners/BannerColumn';

//##########################################################################################
// BANNER CLIENT TYPES
//##########################################################################################
type BannerClientProps = {
  data: TBannerColumn[];
};

//##########################################################################################
// BANNER CLIENT COMPONENT
//##########################################################################################
const BannerClient: React.FC<BannerClientProps> = ({ data }) => {
  const router = useRouter();
  const { storeId } = useParams();

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Banners (${data.length})`}
          description='Manage banners for your stores'
        />
        <Button onClick={() => router.push(`/${storeId}/banners/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add New Banner
        </Button>
      </div>
      <Separator />
      <DataTable columns={BannerColumn} data={data} searchKey='name' />
      <Heading title='API' description='API calls for banners' />
      <Separator />
      <ApiList entityName='banners' entityIdName='bannerId' />
    </>
  );
};

export default BannerClient;
