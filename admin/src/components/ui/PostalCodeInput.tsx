'use client';

import { useState, useEffect } from 'react';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type PostalCodeInputProps = {
  disabled?: boolean;
  initialValue: string;
  onChange: (value: string) => void;
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const PostalCodeInput: React.FC<PostalCodeInputProps> = ({
  onChange,
  disabled,
  initialValue,
}) => {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const check = /^[a-zA-Z0-9]{0,6}$/.test(rawValue);

    if (check) {
      setValue(rawValue);
    }
  };

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <input
      type='text'
      value={value}
      placeholder='0000AB'
      disabled={disabled ?? false}
      onChange={(e) => handleChange(e)}
      className={`flex h-10 w-full px-3 py-2 rounded-md border bg-background text-sm 
      ring-offset-background border-input 
      file:border-0 file:bg-transparent file:text-sm file:font-medium 
      placeholder:text-muted-foreground 
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
      focus-visible:ring-offset-2 
      disabled:cursor-not-allowed disabled:opacity-50`}
    />
  );
};

export default PostalCodeInput;
