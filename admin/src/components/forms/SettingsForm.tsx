'use client';
import * as z from 'zod';
import axios from 'axios';
import { use, useState } from 'react';
import { Trash } from 'lucide-react';
import { Store } from '@prisma/client';
import { toast } from 'react-hot-toast';
import useOrigin from '@hooks/useOrigin';
import { useForm } from 'react-hook-form';
import Heading from '@components/ui/Heading';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import ApiAlert from '@components/ui/ApiAlert';
import { Separator } from '@components/ui/Separator';
import { zodResolver } from '@hookform/resolvers/zod';
import AlertModal from '@components/modals/AlertModal';
import { useParams, useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/Form';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type SettingsFormProps = {
  store: Store;
};

const SettingsFormSchema = z.object({
  name: z.string().min(3).max(50),
});

type SettingsFormValues = z.infer<typeof SettingsFormSchema>;

//##########################################################################################
// COMPONENT
//##########################################################################################
const SettingsForm: React.FC<SettingsFormProps> = ({ store }) => {
  const router = useRouter();
  const origin = useOrigin();
  const { storeId } = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingsFormValues>({
    defaultValues: store,
    resolver: zodResolver(SettingsFormSchema),
  });

  const onSubmit = async (values: SettingsFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${storeId}`, values);
      router.refresh();
      toast.success('Store updated successfully');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${storeId}`);
      router.push('/');
      router.refresh();
      toast.success('Store deleted successfully');
    } catch (error: any) {
      toast.error(
        "Make sure you don't have any products in this store or categories"
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
        <Heading title='Settings' description='Manage your store settings' />
        <Button
          disabled={loading}
          variant='destructive'
          size='icon'
          onClick={() => setOpen(true)}
        >
          <Trash className='w-4 aspect-square' />
        </Button>
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
                      placeholder='Store name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type='submit'>
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        variant='public'
        title='NEXT_PUBLIC_API_KEY'
        description={`${origin}/api/${storeId}`}
      />
    </>
  );
};

export default SettingsForm;
