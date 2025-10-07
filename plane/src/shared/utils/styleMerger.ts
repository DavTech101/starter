import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

//##########################################################################################
// CLASSNAMES MERGER
//##########################################################################################
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export default cn;
