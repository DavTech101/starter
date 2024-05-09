import prisma from '@utils/prisma';
import TagClient from '@components/tags/TagClient';
import { TTagColumn } from '@components/tags/TagColumn';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type PageProps = {
  params: {
    storeId: string;
  };
};

//##########################################################################################
// FUNCTIONS
//##########################################################################################
const getTags = async (storeId: string) => {
  try {
    const tags = await prisma.tag.findMany({
      where: {
        storeId: storeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return tags;
  } catch (error) {
    console.error(error);
    return [];
  }
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const TagsPage: React.FC<PageProps> = async ({ params }) => {
  const tags = await getTags(params.storeId);

  const formattedTags: TTagColumn[] = tags.map((color) => ({
    id: color.id,
    name: color.name,
    createdAt: color.createdAt.toDateString(),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <TagClient data={formattedTags} />
      </div>
    </div>
  );
};

export default TagsPage;
