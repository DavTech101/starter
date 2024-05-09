import { getNews } from '@server/db/newsletters';
import NewsClient from '@components/newsletters/NewsClient';
import { TNewsColumn } from '@components/newsletters/NewsColumn';

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
const NewsletterPage: React.FC<PageProps> = async ({ params }) => {
  const news = await getNews(params.storeId);

  const formattedNews: TNewsColumn[] = news.map((news) => ({
    id: news.id,
    email: news.email,
    createdAt: news.createdAt.toDateString(),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <NewsClient data={formattedNews} />
      </div>
    </div>
  );
};

export default NewsletterPage;
