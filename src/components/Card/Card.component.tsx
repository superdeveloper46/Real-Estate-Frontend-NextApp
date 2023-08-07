import React from 'react';

type CardProps = {
  title: string;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
};

const Card = (props: CardProps) => {
  return (
    <div
      className={`${props.className} mt-2 flex w-full flex-col rounded-xl border border-gray-300 text-left font-inter`}
    >
      <div
        style={{ backgroundColor: '#FBFBFB' }}
        className='flex rounded-t-xl p-2 text-left text-xl'
      >
        {props.icon}
        <span style={{ color: '#3161C5' }} className='ml-4'>
          {props.title}
        </span>
      </div>
      <div className='mx-4 grid grid-cols-2 gap-2 py-6 text-base text-gray-700'>
        {props.children}
      </div>
      <div>{props.footer}</div>
    </div>
  );
};

export default Card;
