import React from 'react';

import style from './style.module.scss';

type HorizontalItemProps = {
  text?: string;
  value?: string;
  disabled?: boolean;
  varient?: 'lg' | 'md';
  classes?: string | '';
};

const HorizontalItem = (props: HorizontalItemProps) => {
  return (
    <div
      className={
        style.horizontalItem +
        ' ' +
        props?.classes +
        (props?.disabled ? ' bg-sfra-gray-50' : '') +
        (props?.varient === 'lg' ? ' h-9' : '')
      }
    >
      <div className='flex items-center px-2'>
        <div
          className={
            '!w-28 ' +
            (props?.varient !== 'lg' ? style.text : style.text + ' !text-ms')
          }
        >
          {props?.text}
        </div>
        <div className={style.vSeperator}></div>
      </div>
      <div className={`${style.text} ml-2 text-right !font-medium`}>
        {props?.value}
      </div>
    </div>
  );
};

export default HorizontalItem;
