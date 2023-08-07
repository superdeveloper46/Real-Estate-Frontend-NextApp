import { Skeleton, Stack } from '@mui/material';
import React from 'react';

const CardLoader = () => {
  return (
    <Stack className=' rounded-xl bg-white p-2.5' spacing={1}>
      <div className='flex items-center justify-between'>
        <Skeleton variant='rounded' width={'85%'} height={40} />
        <Skeleton variant='circular' width={40} height={40} />
      </div>

      <div className='flex items-center justify-between'>
        <Skeleton variant='rounded' width={'100%'} height={78} />
      </div>

      <div className='flex items-center justify-between'>
        <Skeleton variant='rounded' width={'100%'} height={30} />
      </div>
    </Stack>
  );
};

export default CardLoader;
