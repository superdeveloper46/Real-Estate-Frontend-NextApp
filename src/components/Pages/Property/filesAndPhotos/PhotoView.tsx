import React, { useState } from 'react';

import Button from '@/components/Button/Button.component';
import Dialog from '@/components/Dialog/Dialog.component';
import ImageIcon from '@/components/ImageIcon/ImageIcon';

type PhotoViewProps = {
  index: number;
  length: number;
  id: string;
  name: string;
  size: string;
  open: boolean;
  viewPhoto: (index: number) => void;
  handleDelete: (id: number) => void;
};

const textClass = 'font-montserrat text-xs font-normal text-sfra-gray-400';

const PhotoView = (props: PhotoViewProps) => {
  const [openDeletePhoto, setOpenDeletePhoto] = useState(false);

  const DeleteFooter = () => {
    return (
      <div className='mt-4 flex h-8 w-72 items-center justify-between'>
        <Button
          text='Cancel'
          textClass='text-gray-900 font-medium hover:text-sfra-pink-100'
          classes='!bg-white'
          onClick={() => setOpenDeletePhoto(false)}
        />
        <Button
          text='Delete'
          onClick={() => {
            setOpenDeletePhoto(false);
            props?.handleDelete(Number(props?.id));
          }}
          classes='rounded-3xl px-8 !bg-sfra-pink-100 hover:!bg-white hover:text-sfra-pink-100 hover:border-2 hover:border-sfra-pink-100'
        />
      </div>
    );
  };

  const DeleteBody = () => {
    return (
      <div className='flex flex-col justify-center space-y-4'>
        <div className='mx-10 flex justify-center space-x-3'>
          <div className='text-center font-montserrat text-base font-medium text-sfra-pink-100'>
            Are you sure you want to delete a photo?
          </div>
        </div>
        <div className='flex items-center justify-center space-x-3'>
          <div className='flex'>
            <img
              src='/assets/images/property/photo.svg'
              alt='photo svg'
              className='default-gray-svg h-4'
            />
          </div>
          <div className='text-center font-montserrat text-xs font-normal text-sfra-gray-400'>
            {props?.name} | file size{' '}
            {(Number(props?.size) / 1000).toFixed(2) + ' KB'}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {props?.open && (
        <div className='fixed inset-0 z-[100] flex cursor-default items-center justify-center'>
          <div
            className='fixed inset-0 bg-black/50'
            onClick={() => props?.viewPhoto(-1)}
          ></div>
          <div
            className='group absolute z-40 mr-[770px] w-auto cursor-pointer'
            onClick={() =>
              props?.viewPhoto(
                props?.index > 0 ? props?.index - 1 : props?.length - 1
              )
            }
          >
            <img
              src='/assets/images/property/left.svg'
              alt='left icon'
              className='green-svg h-9'
            />
          </div>
          <div
            className='group absolute z-40 ml-[770px] w-auto cursor-pointer'
            onClick={() =>
              props?.viewPhoto(
                props?.length - 1 > props?.index ? props?.index + 1 : 0
              )
            }
          >
            <img
              src='/assets/images/property/right.svg'
              alt='right icon'
              className='green-svg h-9'
            />
          </div>
          <div className='z-30 mx-auto w-auto'>
            <div className='mb-2 flex h-[450px] w-[700px] items-center justify-center overflow-hidden rounded-[10px] bg-black'>
              <img
                src={`${process.env.NEXT_PUBLIC_SFRA_BACKEND_API_URL}/property/downloadFile/${props?.id}/1`}
                className='h-full object-contain'
                alt='photo image'
              />
            </div>
            <div className='flex items-center justify-between rounded-[10px] border bg-white p-2'>
              <div className='flex items-center'>
                <div className='mr-2'>
                  <img
                    src='/assets/images/property/photo.svg'
                    alt='phot icon'
                    className='default-gray-svg h-4'
                  />
                </div>
                <div className={textClass}>{props?.name}</div>
                <div className='mx-3 h-3 border-r'></div>
                <div className={textClass}>
                  {'file size ' +
                    (Number(props?.size) / 1000).toFixed(2) +
                    ' KB'}
                </div>
              </div>
              <div
                className='group flex cursor-pointer items-center space-x-3'
                onClick={() => setOpenDeletePhoto(true)}
              >
                <div className='font-montserrat text-xs font-normal text-sfra-pink-100'>
                  Delete Photo
                </div>
                <ImageIcon
                  src={'/assets/images/property/delete.svg'}
                  alt={'delete icon'}
                  classes='default-pink-svg !h-4'
                  varient='pink'
                />
              </div>
            </div>
          </div>

          <Dialog
            icon='/assets/images/listBuilder/noteRemoveList.svg'
            iconClasses='default-pink-svg'
            title={'Delete File'}
            classes='!bg-sfra-blue-300 !text-sfra-pink-100'
            closeDialog={() => setOpenDeletePhoto(false)}
            body={<DeleteBody />}
            footer={<DeleteFooter />}
            open={openDeletePhoto}
          />
        </div>
      )}
    </>
  );
};

export default PhotoView;
