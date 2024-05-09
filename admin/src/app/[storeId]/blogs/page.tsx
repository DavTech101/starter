import { getBlogs } from '@server/db/blogs';
import BlogClient from '@components/blogs/BlogClient';
import { TBlogColumn } from '@components/blogs/BlogColumn';

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
const BlogsPage: React.FC<PageProps> = async ({ params }) => {
  const blogs = await getBlogs(params.storeId);

  const formattedBlogs: TBlogColumn[] = blogs.map((blog) => ({
    id: blog.id,
    tags: blog.tags,
    slug: blog.slug,
    title: blog.title,
    author: blog.author,
    isFeatured: blog.isFeatured,
    isArchived: blog.isArchived,
    images: blog.images[0]?.url || '',
    createdAt: blog.createdAt.toDateString(),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BlogClient data={formattedBlogs} />
      </div>
    </div>
  );
};

export default BlogsPage;
