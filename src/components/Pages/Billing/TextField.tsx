import type { ReactNode } from 'react';
import React from 'react';

type TextFieldProps = {
  style?: string;
  label?: string;
  image?: string;
  textColor?: string;
  value: any;
  icon?: ReactNode;
};

const TextField = (props: TextFieldProps) => {
  return (
    <div className={'relative rounded-lg ' + props?.style}>
      <div className='pointer-events-none absolute inset-y-0 left-0 z-50 flex items-center pl-3 text-[16px] font-normal text-gray-500'>
        {props?.label}
        {props?.icon}
      </div>
      <div
        className={
          'relative font-semibold text-[20px] block w-full appearance-none rounded-lg border border-gray-300 px-3 py-2 text-right placeholder:text-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 ' +
          props?.textColor
        }
      >
        {props.value}
      </div>
    </div>
  );
};

export default TextField;
