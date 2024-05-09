'use client';

import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { Trash } from 'lucide-react';
import { Newsletter } from '@prisma/client';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import Heading from '@components/ui/Heading';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { Separator } from '@components/ui/Separator';
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
} from '@components/ui/Form';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type NewsFormProps = {
  initialData: Newsletter | null;
};

const NewsFormSchema = z.object({
  email: z.string().email(),
});

type NewsFormValues = z.infer<typeof NewsFormSchema>;

//##########################################################################################
// COMPONENT
//##########################################################################################
const NewsForm: React.FC<NewsFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { storeId, newsId } = useParams();
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit News' : 'Create News';
  const action = initialData ? 'Save changes' : 'Create News';
  const description = initialData ? 'Edit a News' : 'Add a new Newsletter';
  const toastMessage = initialData ? 'News updated.' : 'News created.';

  //###### ZOD FORM CREATION
  const form = useForm<NewsFormValues>({
    defaultValues: initialData || {
      email: '',
    },
    resolver: zodResolver(NewsFormSchema),
  });

  //###### HANDLE FORM SUBMIT
  const onSubmit = async (values: NewsFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${storeId}/newsletters/${newsId}`, values);
      } else {
        await axios.post(`/api/${storeId}/newsletters`, values);
      }

      router.push(`/${storeId}/newsletters`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  //###### HANDLE DELETE
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${storeId}/newsletters/${newsId}`);
      router.push(`/${storeId}/newsletters`);
      router.refresh();
      toast.success('News deleted.');
    } catch (error: any) {
      toast.error("Couldn't delete the size. Please remove all products.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

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
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              name='email'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Newsletter email'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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

export default NewsForm;
