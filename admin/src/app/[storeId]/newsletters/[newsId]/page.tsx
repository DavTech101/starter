import { getNewsById } from '@server/db/newsletters';
import NewsForm from '@components/newsletters/NewsForm';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type PageProps = {
  params: {
    newsId: string;
  };
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const NewsletterPage: React.FC<PageProps> = async ({ params }) => {
  const news = await getNewsById(params.newsId);

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <NewsForm initialData={news} />
      </div>
    </div>
  );
};

export default NewsletterPage;
