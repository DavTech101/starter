'use client';
import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { Trash } from 'lucide-react';
import { Tag } from '@prisma/client';
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
type TagFormProps = {
  initialData: Tag | null;
};

const TagFormSchema = z.object({
  name: z.string().min(3).max(50),
});

type TagFormValues = z.infer<typeof TagFormSchema>;

//##########################################################################################
// COMPONENT
//##########################################################################################
const TagForm: React.FC<TagFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { storeId, tagId } = useParams();
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit Tag' : 'Create Tag';
  const action = initialData ? 'Save changes' : 'Create Tag';
  const description = initialData ? 'Edit a Tag' : 'Add a new Tag';
  const toastMessage = initialData ? 'Tag updated.' : 'Tag created.';

  //###### ZOD FORM CREATION
  const form = useForm<TagFormValues>({
    defaultValues: initialData || {
      name: '',
    },
    resolver: zodResolver(TagFormSchema),
  });

  //###### HANDLE FORM SUBMIT
  const onSubmit = async (values: TagFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${storeId}/tags/${tagId}`, values);
      } else {
        await axios.post(`/api/${storeId}/tags`, values);
      }

      router.push(`/${storeId}/tags`);
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
      await axios.delete(`/api/${storeId}/tags/${tagId}`);
      router.push(`/${storeId}/tags`);
      router.refresh();
      toast.success('Tags deleted.');
    } catch (error: any) {
      toast.error(
        "Couldn't delete the tag. Please remove all categories/products."
      );
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
              name='name'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Tag name'
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

export default TagForm;
