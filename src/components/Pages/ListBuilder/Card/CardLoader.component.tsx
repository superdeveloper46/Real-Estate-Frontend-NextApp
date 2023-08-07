import { Skeleton, Stack } from '@mui/material';
import React from 'react';

const CardLoader = () => {
  return (
    <Stack className='rounded-[10px] bg-white p-4'>
      <div className='flex items-center justify-between'>
        <Skeleton variant='circular' width={40} height={40} />
        <Skeleton variant='rounded' width={'80%'} height={40} />
      </div>

      <div className='mt-2 flex items-center justify-between'>
        <Skeleton variant='rounded' width={'100%'} height={40} />
      </div>
      <div className='!my-4 space-y-2'>
        <Skeleton variant='rounded' width={'100%'} height={25} />
        <Skeleton variant='rounded' width={'100%'} height={25} />
        <Skeleton variant='rounded' width={'100%'} height={25} />
        <Skeleton variant='rounded' width={'100%'} height={25} />
      </div>
      <div className='flex items-center justify-between'>
        <Skeleton variant='rounded' width={'100%'} height={65} />
      </div>
      <div className='mt-2 flex items-center justify-center space-x-6'>
        <Skeleton variant='rounded' width={50} height={45} />
        <Skeleton variant='rounded' width={50} height={45} />
        <Skeleton variant='rounded' width={50} height={45} />
      </div>
    </Stack>
  );
};

export default CardLoader;
