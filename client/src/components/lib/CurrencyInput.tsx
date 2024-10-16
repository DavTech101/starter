'use client';

import cn from '@utils/styleMerger';
import { useEffect, useState } from 'react';

//##########################################################################################
// CURRENCY INPUT TYPES
//##########################################################################################
type CurrencyInputProps = {
  disabled?: boolean;
  initialValue: string | number;
  onChange: (value: number) => void;
};

//##########################################################################################
// CURRENCY INPUT HELPER FUNCTION
//##########################################################################################
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
// CURRENCY INPUT COMPONENT
//##########################################################################################
const CurrencyInput: React.FC<CurrencyInputProps> = ({
  onChange,
  initialValue,
  disabled = false,
}) => {
  // #TODO: Refactor this to use a single state => Perplexity has solution
  const [value, setValue] = useState('0');
  const [centValue, setCentValue] = useState('00');

  const defaultClasses = cn(
    'rounded-md border border-input bg-background text-center',
    'text-sm ring-offset-background file:border-0',
    'file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50'
  );

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
    <div
      className={cn(
        'flex gap-1',
        disabled ? 'cursor-not-allowed opacity-90' : ''
      )}
    >
      <div className='relative inline-block'>
        <span className='pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 transform'>
          &euro;
        </span>
        <input
          type='text'
          value={value}
          placeholder='0'
          disabled={disabled}
          onChange={(e) => handleChange(e)}
          className={cn(
            defaultClasses,
            'rounded-mdpy-2 flex h-10 w-28 pl-5 pr-3 text-right'
          )}
        />
        <span
          className={cn(
            'pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 transform'
          )}
        >
          ,
        </span>
      </div>
      <input
        type='text'
        placeholder='00'
        value={centValue}
        disabled={disabled}
        onChange={(e) => handleCentChange(e)}
        className={cn(defaultClasses, 'flex h-10 w-8 text-center')}
      />
    </div>
  );
};

export default CurrencyInput;
