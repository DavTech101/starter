'use client';

import { useEffect, useState } from 'react';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
type CurrencyInputProps = {
  initialValue: string | number;
  onChange: (value: number) => void;
};

export const addZeros = (value: string, cents: string) => {
  if (cents.length < 1) {
    cents = `00`;
  } else if (cents.length < 2) {
    cents = `${cents}0`;
  }

  if (value.length < 1) {
    value = `0`;
  }

  return parseInt(`${value}${cents}`);
};

//##########################################################################################
// COMPONENT
//##########################################################################################
const CurrencyInput: React.FC<CurrencyInputProps> = ({
  onChange,
  initialValue,
}) => {
  const [value, setValue] = useState('0');
  const [centValue, setCentValue] = useState('00');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const check = /^-?\d{0,7}$/.test(rawValue);

    if (check) {
      setValue(rawValue);
    }
  };

  const handleCentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const check = /^-?\d{0,2}$/.test(rawValue);

    if (check) {
      setCentValue(rawValue);
    }
  };

  useEffect(() => {
    initialValue = initialValue.toString();
    if (initialValue?.length > 2) {
      setValue(initialValue.slice(0, initialValue.length - 2));
      setCentValue(initialValue.slice(initialValue.length - 2));
    } else if (initialValue?.length > 0) {
      setCentValue(initialValue);
    }
  }, []);

  useEffect(() => {
    onChange(addZeros(value, centValue));
  }, [value, centValue]);

  return (
    <div className='flex gap-1'>
      <div className='relative inline-block'>
        <span className='absolute top-1/2 left-2 transform -translate-y-1/2 pointer-events-none'>
          &euro;
        </span>
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
        <span className='absolute top-1/2 right-2 transform -translate-y-1/2 pointer-events-none'>
          ,
        </span>
      </div>
      <input
        type='text'
        placeholder='00'
        value={centValue}
        onChange={(e) => handleCentChange(e)}
        className='w-8 flex h-10 text-center
           rounded-md border border-input bg-background
            text-sm ring-offset-background 
           file:border-0 file:bg-transparent file:text-sm file:font-medium 
           placeholder:text-muted-foreground focus-visible:outline-none 
           focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
           disabled:cursor-not-allowed disabled:opacity-50'
      />
    </div>
  );
};

export default CurrencyInput;
