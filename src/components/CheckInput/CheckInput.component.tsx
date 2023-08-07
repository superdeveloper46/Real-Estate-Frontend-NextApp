import React from 'react';

import style from './style.module.scss';

type CheckInputProps = {
  label?: string;
  checked?: boolean;
  name?: string;
  value?: string;
  color?: 'green' | 'blue';
  classes?: string;
  onClick: () => void;
};

const color = { green: ' bg-sfra-green-100', blue: ' bg-sfra-blue-100' };

const CheckInput = (props: CheckInputProps) => {
  return (
    <label className={style.main}>
      {props?.label}
      <input
        type='checkbox'
        className={style.customCheckbox}
        onChange={() => props?.onClick()}
        checked={props?.checked}
      />
      <span
        className={
          style.geekmark +
          ' ' +
          (props?.classes !== undefined ? props?.classes : ' mt-1') +
          (props?.checked ? color[props?.color ?? 'green'] : ' bg-white')
        }
      ></span>
    </label>
  );
};

export default CheckInput;
