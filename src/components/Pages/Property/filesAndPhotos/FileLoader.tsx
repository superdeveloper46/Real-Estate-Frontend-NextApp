import { Skeleton, Stack } from '@mui/material';

const FileLoader = () => {
  return (
    <Stack className='mb-2 rounded-[10px] ' spacing={1}>
      <div className='flex justify-between rounded-[10px] border px-2'>
        <div className='flex items-center justify-start space-x-2'>
          <Skeleton variant='text' width={130} height={40} />
          <div className='mx-3 h-3 border-r'></div>
          <Skeleton variant='text' width={100} height={40} />
        </div>
        <div className='flex items-center space-x-2'>
          <Skeleton variant='rounded' width={40} height={25} />
          <Skeleton variant='rounded' width={40} height={25} />
          <Skeleton variant='rounded' width={40} height={25} />
          <Skeleton variant='rounded' width={40} height={25} />
        </div>
      </div>
    </Stack>
  );
};

export default FileLoader;
