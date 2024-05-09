//##########################################################################################
// COMPONENT TYPES
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
// COMPONENT
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
        className={`${className} 
          w-full min-h-[10rem] px-3 py-2  border-2 rounded 
          focus:outline-none focus:border-cs-blue transition-colors`}
      />
    </div>
  );
};

export default TextInput;
