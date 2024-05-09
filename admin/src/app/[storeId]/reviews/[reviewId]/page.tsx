import { getReviewById } from '@server/db/reviews';
import ReviewForm from '@components/reviews/ReviewForm';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type PageProps = {
  params: {
    reviewId: string;
  };
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const Page: React.FC<PageProps> = async ({ params }) => {
  const review = (await getReviewById(params.reviewId)) as any;

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ReviewForm initialData={review} />
      </div>
    </div>
  );
};

export default Page;
