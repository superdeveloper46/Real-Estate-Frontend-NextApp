import { Button } from '@mui/material';
import React from 'react';

import ImageIcon from '@/components/ImageIcon/ImageIcon';

const textClass = 'font-montserrat text-xs font-normal text-sfra-gray-400';

const FileItem = (props: {
  type: string;
  id: string;
  name: string;
  size: string;
  handleDeleteFile: (id: number) => void;
}) => {
  return (
    <div className='flex items-center justify-between rounded-[10px] border bg-sfra-blue-10 p-2'>
      <div className='flex items-center'>
        <div className='mr-2'>
          {props?.type === 'file' ? (
            <img
              src='/assets/images/property/file.svg'
              alt='file icon'
              className='h-4'
            />
          ) : (
            <img
              src='/assets/images/property/photo.svg'
              className='default-darkBlue-svg h-4'
              alt='file icon'
            />
          )}
        </div>
        <div className={textClass}>{props?.name}</div>
        <div className='mx-3 h-4 border-r'></div>
        <div className={textClass}>
          {'file size ' + (Number(props?.size) / 1000).toFixed(2) + ' KB'}
        </div>
      </div>
      <div
        className='group flex cursor-pointer items-center space-x-3'
        onClick={() => {
          props?.handleDeleteFile(Number(props?.id));
        }}
      >
        <div className='font-montserrat text-xs font-normal text-sfra-pink-100'>
          Delete File
        </div>
        <ImageIcon
          src={'/assets/images/property/delete.svg'}
          alt={'delete icon'}
          classes='default-pink-svg !h-4'
          varient='pink'
        />
      </div>
    </div>
  );
};

const UploadFile = (props?: {
  type: string;
  uploadedFiles: any;
  handleUploadFiles: (event: any) => void;
  handleDeleteFile: (id: number) => void;
}) => {
  let fileNames = '';
  props?.uploadedFiles.forEach((element: any) => {
    fileNames += element?.name + ', ';
  });

  return (
    <div className='flex w-[528px] flex-col justify-center space-y-3'>
      <div className='my-3 flex justify-center space-x-3'>
        <div className='flex items-center'>
          <img
            src='/assets/images/property/file.svg'
            alt='file svg'
            className='default-blue-svg h-5'
          />
        </div>
        <div className='text-center font-montserrat text-base font-medium text-sfra-blue-100'>
          {props?.type === 'file'
            ? 'Add File or Files to Files'
            : 'Add Photo or photos to My Photos'}
        </div>
      </div>
      <div className='!mb-3 flex items-center justify-between space-x-4'>
        <div className=''>
          <input
            className='w-96 rounded-[10px] border p-1.5 px-2 text-xs outline-none'
            type='text'
            placeholder='Select Files (Max upload size is 100KB per file)'
            value={fileNames.substring(0, fileNames.length - 2) ?? ''}
            onChange={() => {}}
          />
        </div>
        <div>
          <Button
            component='label'
            className='w-32 !rounded-[10px] !bg-sfra-blue-500 !px-5 !font-montserrat !text-xs !font-normal !normal-case !text-white'
          >
            {props?.type === 'file' ? 'Select Files' : 'Select Photos'}
            {props?.type === 'file' ? (
              <input
                type='file'
                multiple
                onChange={(event: any) => props?.handleUploadFiles(event)}
                hidden
              />
            ) : (
              <input
                type='file'
                multiple
                accept='image/*'
                onChange={(event: any) => props?.handleUploadFiles(event)}
                hidden
              />
            )}
          </Button>
        </div>
      </div>
      <div className='!my-2 w-full border-b-[1px]'></div>
      <div className='font-montserrat text-xs font-normal text-sfra-gray-400'>
        Uploaded {props?.type === 'file' ? 'File' : 'Photo'}
      </div>
      <div className='h-52 space-y-3 overflow-auto'>
        {props?.uploadedFiles.map((item: any, index: number) => (
          <FileItem
            key={index}
            type={props?.type}
            id={index + ''}
            name={item?.name}
            size={item?.size}
            handleDeleteFile={props?.handleDeleteFile}
          />
        ))}
      </div>
    </div>
  );
};

export default UploadFile;
