import React from 'react';

const MoveToList = () => {
  return (
    <div className='flex flex-col justify-center space-y-4'>
      <div className='mx-10 text-center font-montserrat text-sm font-medium text-sfra-blue-100'>
        Are you sure you want to move this property?
      </div>
      <div className='!mb-6 text-center font-montserrat text-ms font-normal text-sfra-gray-400'>
        {'St Staten Island, NY 20413 '}
      </div>
    </div>
  );
};

export default MoveToList;
