'use client';
import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { Trash } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Banner } from '@prisma/client';
import Heading from '@components/ui/Heading';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import ImageUpload from '@components/ui/ImageUpload';
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
// BANNER FORM TYPES
//##########################################################################################
type BannerFormProps = {
  initialData: Banner | null;
};

const BannerFormSchema = z.object({
  imageUrl: z.string().url(),
  name: z.string().min(3).max(50),
});

type BannerFormValues = z.infer<typeof BannerFormSchema>;

//##########################################################################################
// BANNER FORM
//##########################################################################################
const BannerForm: React.FC<BannerFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { storeId, bannerId } = useParams();
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit Banner' : 'Create Banner';
  const description = initialData ? 'Edit a Banner' : 'Add a new Banner';
  const toastMessage = initialData ? 'Banner updated.' : 'Banner created.';
  const action = initialData ? 'Save changes' : 'Create Banner';

  //###### ZOD FORM CREATION
  const form = useForm<BannerFormValues>({
    defaultValues: initialData || {
      name: '',
      imageUrl: '',
    },
    resolver: zodResolver(BannerFormSchema),
  });

  //###### HANDLE FORM SUBMIT
  const onSubmit = async (values: BannerFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${storeId}/banners/${bannerId}`, values);
      } else {
        await axios.post(`/api/${storeId}/banners`, values);
      }

      router.refresh();
      router.push(`/${storeId}/banners`);
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
      await axios.delete(`/api/${storeId}/banners/${bannerId}`);
      router.refresh();
      router.push(`/${storeId}/banners`);
      toast.success('Banner deleted.');
    } catch (error: any) {
      toast.error("Couldn't delete the banner. Please remove all categories.");
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
          <FormField
            name='imageUrl'
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
                      placeholder='Banner name'
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

export default BannerForm;
