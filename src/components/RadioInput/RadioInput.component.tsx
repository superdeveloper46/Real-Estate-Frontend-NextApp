import React from 'react';

import style from './style.module.scss';

type CheckInputProps = {
  label?: string;
  checked?: boolean;
  name?: string;
  onClick: () => void;
};

const RadioInput = (props: CheckInputProps) => {
  return (
    <div
      className={
        'cursor-pointer flex items-center space-x-2  ' + style.radioInput
      }
      onClick={() => props?.onClick()}
    >
      <input
        type='radio'
        name={props?.name}
        className='h-[18px] w-[18px] cursor-pointer checked:border-sfra-blue-100 checked:before:bg-sfra-blue-100'
        checked={props?.checked}
        onChange={() => props?.onClick}
      />
      <label className='font-noraml cursor-pointer font-montserrat text-xs text-sfra-gray-300'>
        {props.label}
      </label>
    </div>
  );
};

export default RadioInput;
