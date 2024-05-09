import { TCategory } from '@server/db/tags';
import { getCategoryById } from '@server/categories';
import { getTags, addTagsToCategory } from '@server/db/tags';
import CategoryForm from '@components/categories/CategoryForm';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type PageProps = {
  params: {
    storeId: string;
    categoryId: string;
  };
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const CategoryPage: React.FC<PageProps> = async ({ params }) => {
  const tags = await getTags(params.storeId);
  const category = await getCategoryById(params.categoryId);
  const formattedCategory = addTagsToCategory(category) as any; // @TODO: Fix ME

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoryForm initialData={formattedCategory} tags={tags} />
      </div>
    </div>
  );
};

export default CategoryPage;
