'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { Trash } from 'lucide-react';
import { Review } from '@prisma/client';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import Heading from '@components/ui/Heading';
import useIsMounted from '@hooks/useIsMounted';
import { Button } from '@components/ui/Button';
import { Checkbox } from '@components/ui/Checkbox';
import { Separator } from '@components/ui/Separator';
import NumberInput from '@components/ui/NumberInput';
import ImageUpload from '@components/ui/ImageUpload';
import { zodResolver } from '@hookform/resolvers/zod';
import AlertModal from '@components/modals/AlertModal';
import { useParams, useRouter } from 'next/navigation';
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
type ReviewFormProps = {
  initialData: Review;
};

const ReviewFormSchema = z.object({
  show: z.boolean(),
  rating: z.number().min(1).max(100),
  title: z.string().min(1).max(50).nullable(),
  author: z.string().min(1).max(50).nullable(),
  content: z.string().min(1).max(1000).nullable(),
  imgURL: z.string().min(1).max(10000).nullable(),
  productName: z.string().max(100).nullable().optional(),
});

type ReviewFormValues = z.infer<typeof ReviewFormSchema>;

//##########################################################################################
// COMPONENT
//##########################################################################################
const ReviewForm: React.FC<ReviewFormProps> = ({ initialData }) => {
  const router = useRouter();
  const isMounted = useIsMounted();
  const [open, setOpen] = useState(false);
  const { storeId, reviewId } = useParams();
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit Review' : 'Create Review';
  const action = initialData ? 'Save changes' : 'Create Review';
  const description = initialData ? 'Edit a Review' : 'Add a new Review';
  const toastMessage = initialData ? 'Review updated.' : 'Review created.';

  //###### ZOD FORM CREATION
  const form = useForm<ReviewFormValues>({
    defaultValues: initialData || {
      rating: 0,
      title: '',
      author: '',
      imgURL: '',
      content: '',
      show: false,
      productName: '',
    },
    resolver: zodResolver(ReviewFormSchema),
  });

  //###### HANDLE FORM SUBMIT
  const onSubmit = async (values: ReviewFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${storeId}/reviews/${reviewId}`, values);
      } else {
        await axios.post(`/api/${storeId}/reviews`, values);
      }

      router.push(`/${storeId}/reviews`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  //###### HANDLE DELETE
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${storeId}/reviews/${reviewId}`);
      router.push(`/${storeId}/reviews`);
      router.refresh();
      toast.success('Review deleted.');
    } catch (error: any) {
      toast.error("Couldn't delete the size. Please remove all products.");
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
          <div className='grid grid-cols-2 gap-8'>
            <FormField
              name='title'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <input
                      value={field.value ?? ''}
                      disabled={loading}
                      placeholder='Review title'
                      onChange={field.onChange}
                      className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='productName'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name (Optional)</FormLabel>
                  <FormControl>
                    <input
                      value={field.value ?? ''}
                      disabled={loading}
                      placeholder='Product Name'
                      onChange={field.onChange}
                      className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='author'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <input
                      value={field.value ?? ''}
                      disabled={loading}
                      onChange={field.onChange}
                      placeholder='Review Author'
                      className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='content'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <input
                      disabled={loading}
                      value={field.value ?? ''}
                      onChange={field.onChange}
                      placeholder='Review content'
                      className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='rating'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review rating</FormLabel>
                  <FormControl>
                    <NumberInput
                      onChange={field.onChange}
                      initialValue={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='imgURL'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      disabled={loading}
                      onRemove={() => field.onChange('')}
                      onChange={(url) => field.onChange(url)}
                      value={field.value ? [field.value] : []}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='show'
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
                    <FormLabel>Show</FormLabel>
                    <FormDescription>
                      Show Review are shown on the homepage.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type='submit'>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ReviewForm;
