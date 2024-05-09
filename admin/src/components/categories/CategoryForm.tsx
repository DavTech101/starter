'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import Heading from '@components/ui/Heading';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { Category, Tag } from '@prisma/client';
import useIsMounted from '@hooks/useIsMounted';
import TextInput from '@components/ui/TextInput';
import { Checkbox } from '@components/ui/Checkbox';
import ImageUpload from '@components/ui/ImageUpload';
import { Separator } from '@components/ui/Separator';
import { zodResolver } from '@hookform/resolvers/zod';
import AlertModal from '@components/modals/AlertModal';
import { useParams, useRouter } from 'next/navigation';
import CustomSelect from '@components/ui/CustomSelect';
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
type CategoryFormProps = {
  tags: Tag[];
  initialData:
    | (Category & {
        tags: {
          name: string;
          value: number | string;
        }[];
      })
    | null;
};

const CategoryFormSchema = z.object({
  name: z.string().min(3).max(50),
  slug: z.string().min(3).max(50),
  isArchived: z.boolean().optional(),
  metaTitle: z.string().max(500).nullable(),
  description: z.string().max(1000).nullable(),
  metaKeywords: z.string().max(500).nullable(),
  images: z.object({ url: z.string() }).array(),
  metaDescription: z.string().max(500).nullable(),
  tags: z
    .array(
      z.object({
        name: z.string(),
        value: z.union([z.string(), z.number()]),
      })
    )
    .optional(),
});

type CategoryFormValues = z.infer<typeof CategoryFormSchema>;

//##########################################################################################
// COMPONENT
//##########################################################################################
const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, tags }) => {
  const router = useRouter();
  const isMounted = useIsMounted();
  const [open, setOpen] = useState(false);
  const { storeId, categoryId } = useParams();
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit Category' : 'Create Category';
  const action = initialData ? 'Save changes' : 'Create Category';
  const description = initialData ? 'Edit a Category' : 'Add a new Category';
  const toastMessage = initialData ? 'Category updated.' : 'Category created.';

  //###### INFO FORM CREATION
  const form = useForm<CategoryFormValues>({
    defaultValues: initialData || {
      name: '',
      slug: '',
      tags: [],
      images: [],
      metaTitle: '',
      description: '',
      metaKeywords: '',
      isArchived: false,
      metaDescription: '',
    },
    resolver: zodResolver(CategoryFormSchema),
  });

  //###### HANDLE FORM SUBMIT
  const onSubmit = async (values: CategoryFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${storeId}/categories/${categoryId}`, values);
      } else {
        await axios.post(`/api/${storeId}/categories`, values);
      }

      router.push(`/${storeId}/categories`);
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
      await axios.delete(`/api/${storeId}/categories/${categoryId}`);
      router.push(`/${storeId}/categories`);
      router.refresh();
      toast.success('Category deleted.');
    } catch (error: any) {
      toast.error("Couldn't delete the category. Please remove all tags.");
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
                <FormLabel>Images</FormLabel>
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
              <FormField
                name='name'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Category name'
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
                        placeholder='Category slug'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='col-span-full'>
                <FormField
                  name='description'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <TextInput
                          ref={field.ref}
                          name='description'
                          disabled={loading}
                          onBlur={field.onBlur}
                          onChange={field.onChange}
                          value={field.value ?? ''}
                          placeholder='Category description'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                        Archived Categories are not shown on the store.
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

export default CategoryForm;
