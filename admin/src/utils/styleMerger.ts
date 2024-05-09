import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';

//##########################################################################################
// TAILWINDCSS CLASS MERGER
//##########################################################################################
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export default cn;
