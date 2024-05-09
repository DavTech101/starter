'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import Heading from '@components/ui/Heading';
import { Input } from '@components/ui/Input';
import { Blog, Tag } from '@prisma/client';
import { Button } from '@components/ui/Button';
import useIsMounted from '@hooks/useIsMounted';
import TextInput from '@components/ui/TextInput';
import { Checkbox } from '@components/ui/Checkbox';
import NumberInput from '@components/ui/NumberInput';
import ImageUpload from '@components/ui/ImageUpload';
import { Separator } from '@components/ui/Separator';
import { zodResolver } from '@hookform/resolvers/zod';
import AlertModal from '@components/modals/AlertModal';
import { useParams, useRouter } from 'next/navigation';
import CustomSelect from '@components/ui/CustomSelect';
import IntroSection from '@components/blogs/BlogIntro';
import BlogContent from '@components/blogs/BlogContent';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from '@components/ui/Form';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type BlogFormProps = {
  tags: Tag[];
  initialData:
    | (Blog & {
        tags: {
          name: string;
          value: number | string;
        }[];
      })
    | null;
};

const BlogFormSchema = z.object({
  title: z.string().min(3).max(50),
  slug: z.string().min(3).max(50),
  intro: z.any(), // @TODO: FIX ME
  ingredients: z.any(), // @TODO: FIX ME
  content: z.any(), // @TODO: FIX ME
  readTime: z.number().min(1).max(1000),
  author: z.string().max(50).nullable(),
  images: z.object({ url: z.string() }).array(),
  metaTitle: z.string().max(500).nullable(),
  metaKeywords: z.string().max(500).nullable(),
  metaDescription: z.string().max(500).nullable(),
  isArchived: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  tags: z
    .array(
      z.object({
        name: z.string(),
        value: z.union([z.string(), z.number()]),
      })
    )
    .optional(),
});

type BlogFormValues = z.infer<typeof BlogFormSchema>;

//##########################################################################################
// COMPONENT
//##########################################################################################
const BlogForm: React.FC<BlogFormProps> = ({ initialData, tags }) => {
  const router = useRouter();
  const isMounted = useIsMounted();
  const [open, setOpen] = useState(false);
  const { storeId, blogId } = useParams();
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit Blog' : 'Create Blog';
  const action = initialData ? 'Save changes' : 'Create Blog';
  const description = initialData ? 'Edit a Blog' : 'Add a new Blog';
  const toastMessage = initialData ? 'Blog updated.' : 'Blog created.';

  //###### INFO FORM CREATION
  const form = useForm<BlogFormValues>({
    defaultValues: initialData || {
      tags: [],
      slug: '',
      title: '',
      author: '',
      images: [],
      readTime: 0,
      metaTitle: '',
      metaKeywords: '',
      metaDescription: '',
      intro: '[{"title":"", "content":""}]',
      ingredients: '[ {"name":"", "quantity":"", "note":""} ]',
      content: '[ {"step":1, "image":"", "content":""} ]',
      isArchived: false,
      isFeatured: false,
    },
    resolver: zodResolver(BlogFormSchema),
  });

  //###### HANDLE FORM SUBMIT
  const onSubmit = async (values: BlogFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${storeId}/blogs/${blogId}`, values);
      } else {
        await axios.post(`/api/${storeId}/blogs`, values);
      }

      router.push(`/${storeId}/blogs`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error(error.request.response);
    } finally {
      setLoading(false);
    }
  };

  //###### HANDLE DELETE
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${storeId}/blogs/${blogId}`);
      router.push(`/${storeId}/blogs`);
      router.refresh();
      toast.success('Blog deleted.');
    } catch (error: any) {
      toast.error("Couldn't delete the blog. Please remove all tags.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  if (!isMounted) return null;

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={loading}
        onConfirm={async () => onDelete()}
      />
      <div className='flex items-center justify-between'>
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant='destructive'
            size='icon'
            onClick={() => setOpen(true)}
          >
            <Trash className='w-4 aspect-square' />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          className='space-y-8 w-full'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            name='images'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    disabled={loading}
                    onRemove={(url) =>
                      field.onChange(
                        field.value.filter((image) => image.url !== url)
                      )
                    }
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    value={field.value.map((image) => image.url)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name='tags'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag</FormLabel>
                <CustomSelect
                  multiple
                  value={field.value ?? []}
                  onChange={field.onChange}
                  options={tags.map((tag) => ({
                    name: tag.name,
                    value: tag.id,
                  }))}
                />

                <FormMessage />
              </FormItem>
            )}
          />
          {/* META TAGS  */}
          <div className='grid gap-8'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
              <FormField
                name='metaTitle'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title</FormLabel>
                    <FormControl>
                      <Input
                        ref={field.ref}
                        name='metaTitle'
                        disabled={loading}
                        onBlur={field.onBlur}
                        placeholder='Meta Title'
                        onChange={field.onChange}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='metaDescription'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                      <TextInput
                        ref={field.ref}
                        disabled={loading}
                        onBlur={field.onBlur}
                        name='metaDescription'
                        onChange={field.onChange}
                        value={field.value ?? ''}
                        placeholder='Meta Description'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='metaKeywords'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Keywords</FormLabel>
                    <FormControl>
                      <TextInput
                        ref={field.ref}
                        disabled={loading}
                        name='metaKeywords'
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        value={field.value ?? ''}
                        placeholder='Meta Keywords (comma separated)'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* TITLES AND DESCRIPTIONS */}
              <FormField
                name='title'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Blog title'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='author'
                control={form.control}
                render={({ field }: any) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Blog author'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='slug'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Blog slug'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* TIMINGS */}
              <div className='grid grid-cols-1 sm:grid-cols-3 col-span-full gap-8'>
                <FormField
                  name='readTime'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Read Time</FormLabel>
                      <FormControl>
                        <NumberInput
                          initialValue={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* EXPLANATIONS */}
              <div className='col-span-full'>
                <Separator className='my-5 py-1 bg-black' />
                <FormField
                  name='intro'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <IntroSection
                          disabled={loading}
                          onChange={field.onChange}
                          initialValue={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='col-span-full'>
                <Separator className='my-5 py-1 bg-black' />
                <FormField
                  name='content'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <BlogContent
                          disabled={loading}
                          onChange={field.onChange}
                          initialValue={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* ARCHIVED & FEATURED */}
              <div className='col-span-full'>
                <Separator className='my-5 py-1 bg-black' />
              </div>
              <FormField
                name='isArchived'
                control={form.control}
                render={({ field }) => (
                  <FormItem className='flex items-start p-4 space-x-3 space-y-0 rounded-md border'>
                    <FormControl>
                      <Checkbox
                        disabled={loading}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none '>
                      <FormLabel>Archived</FormLabel>
                      <FormDescription>
                        Archived Blogs are not shown on the store.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                name='isFeatured'
                control={form.control}
                render={({ field }) => (
                  <FormItem className='flex items-start p-4 space-x-3 space-y-0 rounded-md border'>
                    <FormControl>
                      <Checkbox
                        disabled={loading}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none '>
                      <FormLabel>Featured</FormLabel>
                      <FormDescription>
                        Featured products are shown on the homepage.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button disabled={loading} type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default BlogForm;
