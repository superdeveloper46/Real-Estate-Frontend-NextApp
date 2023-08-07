import React from 'react';

const RemoveFromList = () => {
  return (
    <div className='flex flex-col justify-center space-y-5'>
      <div className='mx-10 text-center font-montserrat text-base font-medium text-sfra-pink-100'>
        Are you sure you want to move this property?
      </div>
      <div className='!mb-6 text-center font-montserrat text-xs font-normal text-sfra-gray-400'>
        Or move to different list
      </div>
    </div>
  );
};
export default RemoveFromList;
