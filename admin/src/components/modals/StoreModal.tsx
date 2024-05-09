'use client';
import * as z from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import Modal from '@components/ui/Modal';
import { useForm } from 'react-hook-form';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import useStoreModal from '@hooks/useStoreModal';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from '@components/ui/Form';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type StoreModalProps = {};

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters long.' }),
});

//##########################################################################################
// COMPONENT
//##########################################################################################
const StoreModal: React.FC<StoreModalProps> = () => {
  const { isOpen, onClose } = useStoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/stores', data);

      window.location.assign(`/${response.data.id}`);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='Create Store'
      description='Add a new store to manage products, orders and categories.'
    >
      <div>
        <div className='space-y-4 py-2 pb-4'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={loading}
                        placeholder='E-commerce'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex items-center justify-end w-full pt-6 space-x-2'>
                <Button disabled={loading} variant='outline' onClick={onClose}>
                  Cancel
                </Button>
                <Button disabled={loading} type='submit'>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default StoreModal;
