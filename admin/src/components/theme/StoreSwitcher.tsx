'use client';

import { useState } from 'react';
import { Store } from '@prisma/client';
import { cn } from '@utils/styleMerger';
import { Button } from '@components/ui/Button';
import useStoreModal from '@hooks/useStoreModal';
import { useParams, useRouter } from 'next/navigation';
import {
  Check,
  PlusCircle,
  ChevronsUpDown,
  Store as StoreIcon,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import {
  Command,
  CommandItem,
  CommandList,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandSeparator,
} from '@components/ui/command';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type PopOverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

type StoreSwitcherProps = {
  items: Store[];
} & PopOverTriggerProps;

//##########################################################################################
// COMPONENT
//##########################################################################################
const StoreSwitcher: React.FC<StoreSwitcherProps> = ({
  className,
  items = [],
}) => {
  const router = useRouter();
  const params = useParams();
  const storeModal = useStoreModal();
  const [open, setOpen] = useState(false);

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
    onClick: () => {
      router.push(`/${item.id}`);
    },
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId
  );

  const onStoreSelect = (store: { value: string; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size='sm'
          role='combobox'
          variant='outline'
          aria-expanded={open}
          aria-label='Select a store'
          className={cn(className, 'min-w-[100px] justify-between')}
        >
          <StoreIcon className='mr-1 size-4' />
          {currentStore?.label || 'Select a store'}
          <ChevronsUpDown className='ml-auto size-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder='Search stores...' />
            <CommandEmpty>No store found.</CommandEmpty>
            <CommandGroup heading='Stores'>
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  className='text-sm'
                  onSelect={() => onStoreSelect(store)}
                >
                  <StoreIcon className='mr-2 size-4' />
                  {store.label}
                  <Check
                    className={cn(
                      'ml-auto size-4 shrink-0 opacity-0',
                      currentStore?.value === store.value && 'opacity-100'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                setOpen(false);
                storeModal.onOpen();
              }}
            >
              <PlusCircle className='mr-2 h-5 w-5' />
              Create a new store
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default StoreSwitcher;
