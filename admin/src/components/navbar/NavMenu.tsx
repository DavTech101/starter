'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@utils/styleMerger';
import { Button } from '@components/ui/Button';
import { useParams, usePathname } from 'next/navigation';
import { Check, Webhook, Telescope, ChevronsUpDown } from 'lucide-react';
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
} from '@components/ui/command';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type NavMenuProps = HTMLElement & {
  className?: string;
};

//##########################################################################################
// COMPONENT
//##########################################################################################
export default function NavMenu({
  className,
}: React.HTMLAttributes<NavMenuProps>) {
  const pathName = usePathname();
  const { storeId } = useParams();
  const [open, setOpen] = useState(false);

  const appRoutes: {
    [key: string]: string;
  } = {
    Dashboard: `/${storeId}`,
    Tags: `/${storeId}/tags`,
    Blogs: `/${storeId}/blogs`,
    Reviews: `/${storeId}/reviews`,
    Settings: `/${storeId}/settings`,
    Newsletters: `/${storeId}/newsletters`,
  };

  const routes = Object.entries(appRoutes).map(([label, path]) => {
    return {
      href: path,
      label: label,
      active: pathName === path,
    };
  });

  const currentPage = routes.find((item) => item.active === true);

  return (
    <nav className={cn('flex items-center', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size='sm'
            role='combobox'
            variant='outline'
            aria-expanded={open}
            aria-label='Select a Page'
            className={cn(className, 'min-w-[100px] justify-between')}
          >
            <Telescope className='mr-1 size-4' />
            {currentPage?.label || 'Page'}
            <ChevronsUpDown className='ml-auto size-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandList>
              <CommandInput placeholder='Search Pages...' />
              <CommandEmpty>No store found.</CommandEmpty>
              <CommandGroup heading='Pages'>
                {routes.map((route) => (
                  <Link key={route.href} href={route.href}>
                    <CommandItem
                      className='text-sm cursor-pointer'
                      onSelect={() => setOpen(false)}
                    >
                      <Webhook className='mr-2 size-4' />
                      {route.label}
                      <Check
                        className={cn(
                          'ml-auto size-4 shrink-0 opacity-0',
                          route.active && 'opacity-100'
                        )}
                      />
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </nav>
  );
}
