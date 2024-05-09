'use client';

import { Plus } from 'lucide-react';
import Heading from '@components/ui/Heading';
import ApiList from '@components/ui/ApiList';
import { Button } from '@components/ui/Button';
import useIsMounted from '@hooks/useIsMounted';
import { DataTable } from '@components/ui/DataTable';
import { Separator } from '@components/ui/Separator';
import { useRouter, useParams } from 'next/navigation';
import ReviewColumn, { TReviewColumn } from '@components/reviews/ReviewColumn';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type ReviewsClientProps = {
  data: TReviewColumn[];
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const ReviewClient: React.FC<ReviewsClientProps> = ({ data }) => {
  const router = useRouter();
  const { storeId } = useParams();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Reviews (${data.length})`}
          description='Manage reviews for your stores'
        />
        <Button onClick={() => router.push(`/${storeId}/reviews/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add New Review
        </Button>
      </div>
      <Separator />
      <DataTable columns={ReviewColumn} data={data} searchKey='title' />
      <Heading title='API' description='API calls for reviews' />
      <Separator />
      <ApiList entityName='reviews' entityIdName='reviewId' />
    </>
  );
};

export default ReviewClient;
