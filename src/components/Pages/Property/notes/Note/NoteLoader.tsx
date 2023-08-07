import { Skeleton, Stack } from '@mui/material';

const NoteLoader = () => {
  return (
    <Stack className='mb-6 rounded-[10px] ' spacing={1}>
      <div className='flex justify-between'>
        <Skeleton variant='rounded' width={100} height={30} />
        <Skeleton variant='circular' width={30} height={30} />
      </div>
      <Skeleton variant='text' width={'100%'} height={25} />
      <Skeleton variant='text' width={'100%'} height={25} />
    </Stack>
  );
};

export default NoteLoader;
