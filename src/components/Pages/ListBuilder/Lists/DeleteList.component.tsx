import React from 'react';

const DeleteList = (props: { listName: string }) => {
  return (
    <div className='flex flex-col justify-center space-y-4'>
      <div className='text-sn mx-10 text-center font-montserrat font-medium text-sfra-pink-100'>
        Are you sure you want to delete this list?
      </div>
      <div className='text-center font-montserrat text-sm font-medium text-sfra-gray-400'>
        {props?.listName}
      </div>
    </div>
  );
};

export default DeleteList;
