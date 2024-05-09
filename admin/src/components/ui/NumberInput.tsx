'use client';

import { useEffect, useState } from 'react';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type NumberInputProps = {
  initialValue: string | number;
  onChange: (value: number) => void;
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const NumberInput: React.FC<NumberInputProps> = ({
  onChange,
  initialValue,
}) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const check = /^-?\d{0,6}$/.test(rawValue);

    if (check) {
      setValue(rawValue);
    }
  };

  useEffect(() => {
    initialValue = initialValue.toString();
    if (initialValue) {
      setValue(initialValue);
    }
  }, []);

  useEffect(() => {
    onChange(parseInt(value));
  }, [value]);

  return (
    <div className='flex'>
      <div className='relative inline-block'>
        <input
          type='text'
          value={value}
          placeholder='0'
          onChange={(e) => handleChange(e)}
          className='w-28 pl-5 pr-3 flex h-10 text-right
           rounded-md border border-input bg-background
           py-2 text-sm ring-offset-background 
           file:border-0 file:bg-transparent file:text-sm file:font-medium 
           placeholder:text-muted-foreground focus-visible:outline-none 
           focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
           disabled:cursor-not-allowed disabled:opacity-50'
        />
      </div>
    </div>
  );
};

export default NumberInput;
