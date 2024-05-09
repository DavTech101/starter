'use client';

import { cn } from '@utils/styleMerger';
import { useState, useEffect, useRef } from 'react';

//##########################################################################################
// COMPONENT TYPES
//##########################################################################################
export type TSelectOption = {
  name: string;
  value: number | string;
};

type TSingleSelect = {
  multiple?: false;
  value?: TSelectOption;
  onChange: (value: TSelectOption | undefined) => void;
};

type TMultiSelect = {
  multiple: true;
  value: TSelectOption[];
  onChange: (value: TSelectOption[]) => void;
};

type CustomSelectProps = {
  options: TSelectOption[];
} & (TSingleSelect | TMultiSelect);

//##########################################################################################
// COMPONENT
//##########################################################################################
const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  options,
  multiple,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const selectOption = (option: TSelectOption) => {
    if (multiple) {
      const values = value.map((v) => v.value);
      if (values.includes(option.value)) {
        onChange(value.filter((v) => v.value !== option.value));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  };

  const isOptionSelected = (option: TSelectOption) => {
    let selected = false;
    if (multiple) {
      const values = value?.map((v) => v.value);
      selected = values.includes(option.value);
    } else {
      selected = option.value == value?.value;
    }

    return selected;
  };

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0);
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return;

      switch (e.code) {
        case 'Enter':
        case 'Space':
          setIsOpen(!isOpen);
          if (isOpen) selectOption(options[highlightedIndex]);
          break;
        case 'ArrowUp':
        case 'ArrowDown': {
          if (!isOpen) {
            setIsOpen(true);
            break;
          }

          const newValue = highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1);
          if (newValue >= 0 && newValue < options.length)
            setHighlightedIndex(newValue);
          break;
        }

        case 'Escape':
          setIsOpen(false);
          break;
      }
    };

    containerRef.current?.addEventListener('keydown', handler);

    return () => {
      containerRef.current?.removeEventListener('keydown', handler);
    };
  }, [isOpen, highlightedIndex, options]);

  return (
    <div
      tabIndex={0}
      ref={containerRef}
      onBlur={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
      className='relative flex items-center w-[20em] min-h-[1.5em] 
      gap-[.5em] p-[.5em] rounded-[.25em] outline-none
      border-2 focus:border-blue-500'
    >
      <span className='flex flex-grow flex-wrap gap-[.5em]'>
        {multiple
          ? value.map((v) => (
              <button
                key={v.value}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(v);
                }}
                className='group flex items-center py-[.15em] px-[.25em] gap-[.25em] 
                          border-2 rounded-[.25em] cursor-pointer outline-none 
                          hover:bg-red-200 hover:border-red-200
                          focus:bg-red-200 focus:border-red-200'
              >
                {v.name}
                <span className='group-hover:text-red-500 group-focus:text-red-500'>
                  &times;
                </span>
              </button>
            ))
          : value?.name}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className='text-slate-400 cursor-pointer font-[1.25em]
        hover:text-slate-500 focus:text-slate-500 
        focus:outline-none focus:ring-0'
      >
        &times;
      </button>
      <div className='bg-slate-400 self-stretch w-[.05em]' />
      <div
        className='translate-y-1/4 border-[0.25em] 
                border-solid border-transparent border-t-slate-400
                hover:text-slate-500 focus:text-slate-500'
      />
      <ul
        className={cn(
          isOpen ? 'block' : 'hidden',
          `absolute z-10 max-h-[25em] w-full bg-white
            left-0 top-[calc(100%+0.3em)]
            overflow-y-auto border-2 rounded-[.25em]`
        )}
      >
        {options.map((option, index) => (
          <li
            key={option.value}
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setIsOpen(false);
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            className={cn(
              isOptionSelected(option) ? 'bg-blue-300' : '',
              index === highlightedIndex ? 'bg-blue-200' : '',
              `py-[0.25em] px-[0.25em] cursor-pointer hover:bg-blue-100`
            )}
          >
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomSelect;
