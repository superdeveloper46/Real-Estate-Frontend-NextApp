import React from 'react';

import style from './style.module.scss';

type VerticalItemProps = {
  text?: string;
  value?: string;
};

const VerticalItem = (props: VerticalItemProps) => {
  return (
    <div>
      <div className={`${style.text} whitespace-nowrap py-1 !text-sxs`}>
        {props?.text}
      </div>
      <div className={`${style.text} py-1 pr-2 !font-medium`}>
        {props?.value}
      </div>
    </div>
  );
};

export default VerticalItem;
