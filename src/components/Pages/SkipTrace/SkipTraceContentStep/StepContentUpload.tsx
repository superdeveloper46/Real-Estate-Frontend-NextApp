import { Button as MUIButton } from '@mui/material';
import React from 'react';

import Button from '@/components/Button/Button.component';
import { setGlobalLoading } from '@/redux/slices/global';
import {
  setHeaders,
  setImportStep,
  setRowCounts,
  setSheets,
  setUploadedFileName,
  setUploadFiles,
} from '@/redux/slices/skipTrace';
import { dispatch, useSelector } from '@/redux/store';
import { getCSVData, upload } from '@/utils/api/restful/skiptrace';

import styles from '../style.module.scss';

const StepContentUpload = () => {
  const { uploadFiles, importStep, uploadedFileName } = useSelector(
    (state: any) => state.skipTrace
  );

  const handleChangeUploadFiles = (event: any) => {
    const files: any = [...event.target.files]?.filter((file: any) => {
      return file.size < 15000000;
    });

    const formData = new FormData();
    files.forEach((element: any) => {
      formData.append('files', element);
    });

    dispatch(setGlobalLoading(true));
    upload(formData).then((data) => {
      if (data.result === 'success') {
        dispatch(setUploadFiles(files));
        dispatch(setUploadedFileName(data.fileName));
        dispatch(setGlobalLoading(false));
      }
    });
  };

  return (
    <div className={`${styles.content} flex items-center justify-center`}>
      {uploadFiles.length === 0 ? (
        <div className='space-y-8 rounded-[10px] border border-dashed border-[#9FB0D5] px-40 py-20'>
          <div className='flex items-center justify-center'>
            <img
              src='/assets/images/skiptrace/upload.svg'
              alt='upload icon'
              className='h-36'
            />
          </div>

          <div className='!mt-3 space-y-1'>
            <div className='text-center font-montserrat text-base font-medium text-sfra-pink-100'>
              Drop files here or click to upload
            </div>

            <div className='text-center font-montserrat text-xs font-normal'>
              Please upload your CSV file max 15 mb
            </div>
          </div>

          <div className='flex items-center justify-center'>
            <MUIButton
              component='label'
              className='!h-9 w-32 !rounded-full !bg-sfra-pink-100 !px-10 !font-montserrat !text-xs !font-normal !normal-case !text-white'
            >
              Upload
              <input
                type='file'
                accept='.csv,.xlsx,.xls'
                onChange={(event: any) => {
                  handleChangeUploadFiles(event);
                }}
                hidden
              />
            </MUIButton>
          </div>
        </div>
      ) : (
        <div className='space-y-5'>
          <div className='flex items-center  justify-center space-x-4 rounded-[10px] border border-dashed border-[#9FB0D5] p-4'>
            <div>
              <img
                src='/assets/images/skiptrace/file.svg'
                alt='upload icon'
                className='h-9'
              />
            </div>
            <div className='!mr-32 font-montserrat text-base font-medium text-sfra-pink-100'>
              {uploadFiles[0] !== undefined ? uploadFiles[0].name : ''}
            </div>
            <div
              className='cursor-pointer'
              onClick={() => {
                dispatch(setUploadFiles([] as any));
                dispatch(setUploadedFileName(''));
              }}
            >
              <img
                src='/assets/images/skiptrace/delete.svg'
                alt='upload icon'
                className='h-6'
              />
            </div>
          </div>

          <div className='flex cursor-pointer items-center justify-center'>
            <Button
              text='Next'
              classes='rounded-[10px] border !bg-sfra-pink-100 !h-9 group !px-20 hover:!bg-white hover:text-sfra-pink-100 hover:border-sfra-pink-100'
              onClick={() => {
                dispatch(setGlobalLoading(true));
                getCSVData({ fileName: uploadedFileName }).then((data) => {
                  dispatch(setSheets(data.sheets));
                  dispatch(setHeaders(data.headers));
                  dispatch(setRowCounts(data.rowCounts));
                  dispatch(setGlobalLoading(false));

                  dispatch(setImportStep(importStep + 1));
                });
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StepContentUpload;
