import { Skeleton } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Button from '@/components/Button/Button.component';
import Dialog from '@/components/Dialog/Dialog.component';
import {
  addFiles as add,
  deleteFile,
  getFiles,
} from '@/utils/api/restful/property';

import PhotoView from './PhotoView';
import UploadFile from './UploadFile';

const PhotoLoader = () => {
  return <Skeleton variant='rounded' width={'160px'} height={'88px'} />;
};

const Photos = () => {
  const router = useRouter();
  const propertyId = router.query.id;

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [photoList, setPhotoList] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [openUploadPhoto, setOpenUploadPhoto] = useState(false);
  const handleOpenUploadPhoto = () => {
    setOpenUploadPhoto(true);
  };

  const [openViewPhoto, setOpenViewPhoto] = useState(-1);

  const [hover, setHover] = useState(-1);

  const handleDeleteFile = (id: number) => {
    const newUploadedFiles = uploadedFiles.filter((item, index) => {
      return index !== id;
    });
    setUploadedFiles(newUploadedFiles);
  };

  const handleChangeUploadFiles = (event: any) => {
    const files: any = [...event.target.files]?.filter((file: any) => {
      return file.size < 100000;
    });
    const list: any = uploadedFiles.concat(files);
    setUploadedFiles(list);
  };

  const getData = () => {
    setLoading(true);
    getFiles({
      propertyId: propertyId as string,
      searchKey: '',
      type: '1',
    }).then((data) => {
      setPhotoList(data);
      setLoading(false);
    });
  };

  const addFiles = () => {
    if (uploadedFiles.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('type', '1');
    formData.append('propertyId', propertyId as string);
    uploadedFiles.forEach((element) => {
      formData.append('files', element);
    });

    add(formData).then((data) => {
      if (data.result === 'success') {
        setUploading(false);
        setTimeout(() => {
          setOpenUploadPhoto(false);
        }, 500);
        getData();
      }
    });
  };

  const handleDeletePhotoFromList = (fileId: string) => {
    const rows = photoList.filter((row: any) => row.id !== fileId);
    setPhotoList(rows);
    deleteFile({ id: fileId, type: '1' });
  };

  const AddFooter = () => {
    return (
      <div className='flex h-11 w-80 items-center justify-between'>
        <Button
          text='Cancel'
          textClass='text-gray-900 hover:text-sfra-blue-100'
          classes='!bg-white color'
          onClick={() => setOpenUploadPhoto(false)}
        />
        {uploading ? (
          <Button
            text='Uploading'
            classes='rounded-3xl group px-8 hover:!bg-white hover:text-sfra-blue-100 hover:border-2 hover:border-sfra-blue-50'
            endIcon={
              <div role='status'>
                <svg
                  aria-hidden='true'
                  className='inline h-5 w-5 animate-spin fill-slate-50 text-gray-200 dark:text-gray-500'
                  viewBox='0 0 100 101'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                    fill='currentColor'
                  />
                  <path
                    d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                    fill='currentFill'
                  />
                </svg>
                <span className='sr-only'>Loading...</span>
              </div>
            }
          />
        ) : (
          <Button
            text='Publish'
            onClick={() => {
              addFiles();
            }}
            classes='rounded-3xl group px-8 hover:!bg-white hover:text-sfra-blue-100 hover:border-2 hover:border-sfra-blue-50'
          />
        )}
      </div>
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='my-3 ml-4'>
      <div className='flex justify-end'>
        <Button
          text='Add Photo'
          classes='rounded-[10px] h-7 group hover:!bg-white hover:text-sfra-blue-100 hover:border-2 hover:border-sfra-blue-50'
          startIcon={
            <img
              src='/assets/images/listBuilder/makeNewList.svg'
              alt='addTolist icon'
              className='blue-svg h-4'
            />
          }
          onClick={handleOpenUploadPhoto}
        />
      </div>

      <div className='my-2 flex items-center justify-between'>
        <div className='font-montserrat text-xs font-normal text-sfra-gray-400'>
          My Photos
        </div>
      </div>

      {loading ? (
        <div>
          {new Array(10).fill(0).map((_, index) => (
            <div className='float-left mr-3 mb-6' key={index}>
              <PhotoLoader />
            </div>
          ))}
        </div>
      ) : (
        <div className='h-56 overflow-auto'>
          {photoList.map((item: any, index) => (
            <div
              key={index}
              className='float-left mr-3 mb-6 h-[88px] w-40 cursor-pointer rounded-[10px]'
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(-1)}
            >
              {hover === index ? (
                <>
                  <div
                    className='flex h-[88px] w-40 items-center justify-center overflow-hidden rounded-[10px] grayscale-[40%]'
                    onClick={() => {
                      setOpenViewPhoto(index);
                    }}
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_SFRA_BACKEND_API_URL}/property/downloadFile/${item?.id}/1`}
                      alt='photo icon'
                      className='h-full object-contain'
                    />
                    <img
                      src='/assets/images/property/eye.svg'
                      alt='eye.svg'
                      className='absolute z-20'
                    />
                    <div className='absolute h-full w-full rounded-[10px] bg-black/10'></div>
                  </div>
                  <div className='flex items-center justify-between space-x-4 p-1'>
                    <div className='overflow-hidden text-ellipsis whitespace-nowrap font-montserrat text-sxs font-normal text-sfra-gray-400'>
                      {item.name}
                    </div>
                    <div className='overflow-hidden text-ellipsis whitespace-nowrap font-montserrat text-sxs font-normal text-sfra-gray-400'>
                      file size&nbsp;
                      <span className='font-montserrat text-sxs font-normal text-sfra-blue-100'>
                        {(Number(item?.size) / 1000).toFixed(2) + ' KB'}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className='flex h-[88px] w-40 items-center justify-center overflow-hidden rounded-[10px] bg-black grayscale-[40%]'>
                  <img
                    src={`${process.env.NEXT_PUBLIC_SFRA_BACKEND_API_URL}/property/downloadFile/${item?.id}/1`}
                    alt='photo icon'
                    className='h-full object-contain'
                  />
                </div>
              )}

              <PhotoView
                key={index}
                index={index}
                length={photoList.length}
                open={openViewPhoto === index}
                viewPhoto={(i) => {
                  setOpenViewPhoto(i);
                  setHover(-1);
                }}
                handleDelete={handleDeletePhotoFromList}
                {...item}
              />
            </div>
          ))}
        </div>
      )}

      <Dialog
        icon='/assets/images/property/photo.svg'
        title={'Upload Photo'}
        classes='!bg-sfra-blue-300 !text-white'
        closeDialog={() => setOpenUploadPhoto(false)}
        body={
          <UploadFile
            type='photo'
            uploadedFiles={uploadedFiles}
            handleUploadFiles={handleChangeUploadFiles}
            handleDeleteFile={handleDeleteFile}
          />
        }
        footer={<AddFooter />}
        open={openUploadPhoto}
      />
    </div>
  );
};

export default Photos;
