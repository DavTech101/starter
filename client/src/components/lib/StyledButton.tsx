import { forwardRef } from 'react';
import cn from '@utils/styleMerger';

//##########################################################################################
// STYLED BUTTON TYPES
//##########################################################################################
type ButtonProps = {} & React.ButtonHTMLAttributes<HTMLButtonElement>;

//##########################################################################################
// STYLED BUTTON COMPONENT
//##########################################################################################
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      {...props}
      type={type}
      disabled={disabled}
      className={cn(
        `w-auto px-5 py-3 rounded-full text-white bg-black
        border-transparent font-semibold transistion hover:opacity-75
        disabled:cursor-not-allowed disabled:opacity-50`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
);

Button.displayName = 'Button';

export default Button;
