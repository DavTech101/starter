import { getReviews } from '@server/db/reviews';
import ReviewClient from '@components/reviews/ReviewClient';
import { TReviewColumn } from '@components/reviews/ReviewColumn';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type PageProps = {
  params: {
    storeId: string;
  };
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const Page: React.FC<PageProps> = async ({ params }) => {
  const reviews = await getReviews(params.storeId);

  const formattedReviews: TReviewColumn[] = reviews.map((review) => ({
    id: review.id,
    show: review.show,
    title: review.title ?? 'No title',
    image: review.imgURL ?? '/images/placeholder.png',
    content: review.content ?? 'No content',
    rating: review.rating,
    author: review.author ?? 'Anonymous',
    createdAt: review.createdAt.toDateString(),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ReviewClient data={formattedReviews} />
      </div>
    </div>
  );
};

export default Page;
