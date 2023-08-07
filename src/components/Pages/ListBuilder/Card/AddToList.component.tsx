import React from 'react';

type AddToListProps = {
  id: string;
  name: string;
  street: string;
  lat: string;
  long: string;
  url?: string;
};

const AddToList = (props: AddToListProps) => {
  return (
    <div className='flex space-x-6'>
      <div>
        <img
          className='w-44 rounded-2xl'
          src={
            props?.url ? props?.url : '/assets/images/listBuilder/addToList.svg'
          }
          alt='addToList icon'
        />
      </div>
      <div className='space-y-1'>
        <div className='font-montserrat text-sm font-semibold text-sfra-gray-400'>
          {props?.name}
        </div>
        <div className='font-montserrat text-xs font-normal text-sfra-gray-400'>
          {props?.street}
        </div>
        <div className='font-montserrat text-xs font-normal text-sfra-gray-400'>
          {`${props?.lat}, ${props?.long}`}
        </div>
      </div>
    </div>
  );
};

export default AddToList;
