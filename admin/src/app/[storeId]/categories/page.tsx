import { getCategories } from '@server/categories';
import CategoryClient from '@components/categories/CategoryClient';
import { TCategoryColumn } from '@components/categories/CategoryColumn';

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
const CategoriesPage: React.FC<PageProps> = async ({ params }) => {
  const categories = await getCategories(params.storeId);

  const formattedCategories: TCategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    tags: category.tags,
    slug: category.slug,
    metaTitle: category.metaTitle,
    isArchived: category.isArchived,
    description: category.description,
    metaKeywords: category.metaKeywords,
    imageUrl: category.images[0]?.url || '',
    metaDescription: category.metaDescription,
    createdAt: category.createdAt.toDateString(),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
