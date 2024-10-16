import cn from '@utils/styleMerger';

//##########################################################################################
// TEXT INPUT TYPES
//##########################################################################################
type TextInputProps = {
  name: string;
  value: string;
  className?: string;
  disabled?: boolean;
  onBlur?: () => void;
  placeholder?: string;
  onChange: (target: string) => void;
  ref?: React.Ref<HTMLTextAreaElement>;
};

//##########################################################################################
// TEXT INPUT COMPONENT
//##########################################################################################
const TextInput: React.FC<TextInputProps> = ({
  ref,
  name,
  value,
  onBlur,
  onChange,
  className = '',
  disabled = false,
  placeholder = '',
}) => {
  return (
    <div className='flex flex-col'>
      <textarea
        ref={ref}
        name={name}
        value={value}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'min-h-[10rem] w-full rounded border-2 px-3 py-2',
          'transition-colors focus:border-primary focus:outline-none',
          className
        )}
      />
    </div>
  );
};

export default TextInput;
