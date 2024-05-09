import isUUID from '@utils/isUUID';
import prisma from '@utils/prisma';
import TagForm from '@components/tags/TagForm';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type PageProps = {
  params: {
    tagId: string;
  };
};

//##########################################################################################
// FUNCTIONS
//##########################################################################################
const getTagById = async (tagId: string) => {
  try {
    if (!isUUID(tagId)) return null;

    const tag = await prisma.tag.findUnique({
      where: {
        id: tagId,
      },
    });

    return tag;
  } catch (error) {
    console.error(error);
    return null;
  }
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const ColorPage: React.FC<PageProps> = async ({ params }) => {
  const tag = await getTagById(params.tagId);

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <TagForm initialData={tag} />
      </div>
    </div>
  );
};

export default ColorPage;
