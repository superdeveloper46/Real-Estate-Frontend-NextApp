import React from 'react';

type FactsItemProps = {
  text?: string;
  value?: string;
};

const FactsItem = (props: FactsItemProps) => {
  return (
    <div className='flex items-center justify-start overflow-hidden rounded-md border bg-sfra-blue-10 p-1.5'>
      <div className='flex space-x-2'>
        <img
          src='/assets/images/property/factsItem.svg'
          alt='facts item icon'
          className='h-4'
        />
        <div className='whitespace-nowrap font-montserrat text-xs text-sfra-gray-300/70'>
          {props?.text}
        </div>
      </div>
      <div className='mx-3 h-4 border-r border-[#3263c933]'></div>
      <div
        className={
          'overflow-hidden whitespace-nowrap font-montserrat text-xs font-medium text-sfra-gray-300'
        }
      >
        {props?.value}
      </div>
    </div>
  );
};

export default FactsItem;
