import React from 'react';

type FieldProps = {
  type: string;
  autoComplete?: string;
  required?: boolean;
  label?: string;
  value: any;
  setValue: (val: any) => void;
  placeholder?: string;
};

const Field = (props: FieldProps) => {
  const randomId = Math.random().toString();

  return (
    <>
      {
        <div className='space-y-2'>
          {props.label && (
            <label htmlFor={randomId} className='font-medium'>
              {props.label}
            </label>
          )}
          <input
            id={randomId}
            name={`name-${randomId}`}
            type={props.type}
            autoComplete={props?.autoComplete}
            required={props?.required}
            className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
            value={props.value}
            onChange={(e) => {
              props.setValue(e.target.value);
            }}
            placeholder={props?.placeholder}
          />
        </div>
      }
    </>
  );
};

export default Field;
