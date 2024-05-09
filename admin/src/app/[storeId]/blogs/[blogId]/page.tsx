import { getBlogById } from '@server/db/blogs';
import { getTags, addTagsToBlog } from '@server/db/tags';
import BlogForm from '@components/blogs/BlogForm';

//##########################################################################################
// BLOG PAGE TYPES
//##########################################################################################
type PageProps = {
  params: {
    storeId: string;
    blogId: string;
  };
};

//##########################################################################################
// BLOG PAGE COMPONENT
//##########################################################################################
const BlogPage: React.FC<PageProps> = async ({ params }) => {
  const tags = await getTags(params.storeId);
  const blog = (await getBlogById(params.blogId)) as any; // @TODO: Fix ME
  const formattedBlog = addTagsToBlog(blog) as any; // @TODO: Fix ME

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BlogForm initialData={formattedBlog} tags={tags} />
      </div>
    </div>
  );
};

export default BlogPage;
