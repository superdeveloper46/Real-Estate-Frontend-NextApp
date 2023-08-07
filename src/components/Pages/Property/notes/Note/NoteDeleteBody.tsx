const DeleteBody = () => {
  return (
    <div className='flex flex-col justify-center space-y-4'>
      <div className='mx-10 flex justify-center space-x-3'>
        <div className='flex items-center'>
          <img
            src='/assets/images/property/deleteNote.svg'
            alt='deleteNote svg'
            className='h-5'
          />
        </div>
        <div className='text-center font-montserrat text-base font-medium text-sfra-pink-100'>
          Are you sure you want to delete a note?
        </div>
      </div>
      <div className='text-center font-montserrat text-xs font-normal text-sfra-gray-400'>
        Nulla posuere sollicitudin sapien.
      </div>
    </div>
  );
};

export default DeleteBody;
