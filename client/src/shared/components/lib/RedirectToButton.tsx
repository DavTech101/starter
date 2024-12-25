'use client';

import Link from 'next/link';
import cn from '@/shared/utils/styleMerger';
import { motion } from 'motion/react';
import { PropsWithChildren } from 'react';
import { GoArrowRight, GoArrowLeft } from 'react-icons/go';

//##########################################################################################
// REDIRECT TO BUTTON TYPES
//##########################################################################################
type RedirectToButtonProps = PropsWithChildren & {
  href: string;
  disabled?: boolean;
  className?: string;
  arrowDirection?: 'left' | 'right';
};

//##########################################################################################
// REDIRECT TO BUTTON COMPONENT
//##########################################################################################
const RedirectToButton: React.FC<RedirectToButtonProps> = ({
  href,
  disabled,
  children,
  className,
  arrowDirection = 'right',
}) => {
  return (
    <Link href={href}>
      <motion.button
        disabled={disabled}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          'group',
          'flex items-center justify-center px-4 py-3',
          'rounded-xl bg-primary text-base text-white',
          disabled
            ? 'animate-none cursor-not-allowed opacity-60'
            : 'cursor-pointer',
          className
        )}
      >
        {arrowDirection === 'left' && (
          <GoArrowLeft
            className={cn(
              'mr-1 group-hover:mr-3 group-hover:rotate-45',
              'text-xl transition-all duration-300'
            )}
          />
        )}
        {children}
        {arrowDirection === 'right' && (
          <GoArrowRight
            className={cn(
              'ml-1 group-hover:ml-3 group-hover:-rotate-45',
              'text-xl transition-all duration-300'
            )}
          />
        )}
      </motion.button>
    </Link>
  );
};

export default RedirectToButton;
