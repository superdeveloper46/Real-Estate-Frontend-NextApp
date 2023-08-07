import React from 'react';

import style from './style.module.scss';

type NumberInputProps = {
  value: number;
  onChange?: (value: any) => void;
};

const NumberInput = (props: NumberInputProps) => {
  const minus = () => {
    const value = props?.value > 0 ? props?.value - 1 : 0;
    if (props?.onChange) props?.onChange(value);
  };

  const plus = () => {
    const value = props?.value + 1;
    if (props?.onChange) props?.onChange(value);
  };

  return (
    <div className='mt-1 flex h-8 w-full rounded-lg'>
      <div className='flex-none '>
        <button
          onClick={() => minus()}
          className='h-full w-10 flex-none cursor-pointer rounded-l-lg border-2 border-sfra-gray-50 bg-white text-sfra-gray-300 outline-none hover:bg-sfra-gray-50'
        >
          <span className='flex items-center justify-around'>
            <img
              src='/assets/images/listBuilder/minus.svg'
              className='h-4'
              alt='plus'
            />
          </span>
        </button>
      </div>

      <div className={'flex-auto ' + style.numberInput}>
        <input
          type='number'
          className={
            'foucs:outline-none h-full w-full appearance-none border-y-2 border-sfra-gray-50 bg-white text-center text-xs font-semibold text-sfra-gray-300 outline-none '
          }
          value={props?.value}
          onChange={(e) => {
            if (props?.onChange) {
              props?.onChange(Number(e.target.value) + '');
            }
          }}
        />
      </div>
      <div className='flex-none '>
        <button
          onClick={() => plus()}
          className='h-full w-10 cursor-pointer rounded-r-lg border-2 border-sfra-gray-50 bg-white text-sfra-gray-300 outline-none hover:bg-sfra-gray-50'
        >
          <span className='flex items-center justify-around'>
            <img
              src='/assets/images/listBuilder/plus.svg'
              className='h-3'
              alt='plus'
            />
          </span>
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
