import Tooltip from '@mui/material/Tooltip';
import React, { useState } from 'react';

import Button from '@/components/Button/Button.component';
import Dialog from '@/components/Dialog/Dialog.component';
import ImageIcon from '@/components/ImageIcon/ImageIcon';

type FileProps = {
  id: string;
  name: string;
  size: string;
  handleDeleteFileFromList: (id: string) => void;
  handleDownloadFile: (id: string, name: string) => void;
};

const textClass = 'font-montserrat text-xs font-normal text-sfra-gray-400';

const ToolTipComp = (props: {
  title: string;
  background?: string;
  color?: string;
  placement?:
    | 'right'
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'top-end'
    | 'top-start'
    | 'top'
    | undefined;
  children: React.ReactElement;
}) => {
  return (
    <Tooltip
      title={
        <React.Fragment>
          <span color='inherit'>{props?.title}</span>
        </React.Fragment>
      }
      placement={props?.placement ?? 'bottom'}
      componentsProps={{
        tooltip: {
          sx: {
            color: props?.color ?? '#7E7E8A',
            backgroundColor: props?.background ?? 'white',
            fontSize: '12px',
            fontFamily: 'Montserrat',
            fontWeight: '400',
            padding: '10px',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.21)',
            borderRadius: '10px',
          },
        },
      }}
    >
      {props?.children}
    </Tooltip>
  );
};

const File = (props: FileProps) => {
  const [openDeleteFile, setOpenDeleteFile] = useState(false);
  const handleOpenDeleteFile = () => {
    setOpenDeleteFile(true);
  };

  const DeleteFooter = () => {
    return (
      <div className='mt-4 flex h-8 w-72 items-center justify-between'>
        <Button
          text='Cancel'
          textClass='text-gray-900 hover:text-sfra-pink-100'
          classes='!bg-white'
          onClick={() => setOpenDeleteFile(false)}
        />
        <Button
          text='Delete'
          onClick={() => {
            setOpenDeleteFile(false);
            props?.handleDeleteFileFromList(props?.id);
          }}
          classes='rounded-3xl px-10 !bg-sfra-pink-100 hover:!bg-white hover:text-sfra-pink-100 hover:border-2 hover:border-sfra-pink-100'
        />
      </div>
    );
  };

  const DeleteBody = () => {
    return (
      <div className='flex flex-col justify-center space-y-4'>
        <div className='mx-10 flex justify-center space-x-3'>
          <div className='text-center font-montserrat text-base font-medium text-sfra-pink-100'>
            Are you sure you want to delete a file?
          </div>
        </div>
        <div className='flex items-center justify-center space-x-3'>
          <div className='flex'>
            <img
              src='/assets/images/property/file.svg'
              alt='file svg'
              className='h-4'
            />
          </div>
          <div className='text-center font-montserrat text-xs font-normal text-sfra-gray-400'>
            {props?.name} |{' '}
            {'file size ' + (Number(props?.size) / 1000).toFixed(2) + ' KB'}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='flex items-center justify-between rounded-[10px] border p-2'>
      <div className='flex items-center'>
        <div className={textClass}>{props?.name}</div>
        <div className='mx-3 h-3 border-r'></div>
        <div className={textClass}>
          {'file size ' + (Number(props?.size) / 1000).toFixed(2) + ' KB'}
        </div>
      </div>
      <div className='flex space-x-5'>
        <ToolTipComp title={'View File'} color='#52516A'>
          <div className='group flex cursor-pointer items-center'>
            <ImageIcon
              src={'/assets/images/property/view.svg'}
              alt={'view icon'}
              varient='darkBlue'
              classes='!h-5'
            />
          </div>
        </ToolTipComp>
        <ToolTipComp title={'Download'} color='#2BDDBD'>
          <div
            className='group flex cursor-pointer items-center'
            onClick={() => {
              props?.handleDownloadFile(props?.id, props?.name);
            }}
          >
            <ImageIcon
              src={'/assets/images/property/download.svg'}
              alt={'download icon'}
              varient='green'
              classes='!h-5'
            />
          </div>
        </ToolTipComp>
        <ToolTipComp title={'Share File'} color='#3263C9'>
          <div className='group flex cursor-pointer items-center'>
            <ImageIcon
              src={'/assets/images/listBuilder/shareList.svg'}
              classes='default-darkBlue-svg !h-5'
              alt={'share icon'}
              varient='blue'
            />
          </div>
        </ToolTipComp>
        <ToolTipComp title={'Delete File'} color='#D96BC1'>
          <div
            className='group flex cursor-pointer items-center'
            onClick={() => {
              handleOpenDeleteFile();
            }}
          >
            <ImageIcon
              src={'/assets/images/property/delete.svg'}
              alt={'delete icon'}
              classes='default-darkBlue-svg !h-5'
              varient='pink'
            />
          </div>
        </ToolTipComp>
      </div>

      <Dialog
        icon='/assets/images/listBuilder/noteRemoveList.svg'
        iconClasses='default-pink-svg'
        title={'Delete File'}
        classes='!bg-sfra-blue-300 !text-sfra-pink-100'
        closeDialog={() => setOpenDeleteFile(false)}
        body={<DeleteBody />}
        footer={<DeleteFooter />}
        open={openDeleteFile}
      />
    </div>
  );
};

export default File;
