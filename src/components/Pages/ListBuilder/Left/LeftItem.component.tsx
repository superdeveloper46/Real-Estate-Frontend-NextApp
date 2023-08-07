import Tooltip from '@mui/material/Tooltip';
import React from 'react';

import Button from '@/components/Button/Button.component';
import Dialog from '@/components/Dialog/Dialog.component';
import ImageIcon from '@/components/ImageIcon/ImageIcon';

import {
  addCriteria,
  cancelCriteria,
  setOpenFilterDialog,
} from '../../../../redux/slices/listBuilder';
import { dispatch, useSelector } from '../../../../redux/store';

type LeftItemProps = {
  open: number;
  icon: string;
  title: string;
  filterCount?: number;
  children?: React.ReactNode;
  contentVisible?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

const LeftItem = (props: LeftItemProps) => {
  const { openFilterDialog } = useSelector((state: any) => state.listBuilder);

  const handleOpen = (index: any) => {
    dispatch(setOpenFilterDialog(index));
  };

  const Footer = () => {
    return (
      <div className='flex h-11 w-72 items-center justify-between'>
        <Button
          text='Cancel'
          textClass='text-gray-900 hover:text-sfra-blue-100'
          classes='!bg-white color'
          onClick={() => {
            dispatch(cancelCriteria());
            handleOpen(-1);
          }}
        />
        <Button
          text='Add Criteria'
          onClick={() => {
            dispatch(addCriteria());
            handleOpen(-1);
          }}
          classes='rounded-3xl hover:!bg-white hover:text-sfra-blue-100 hover:border-2 hover:border-sfra-blue-50'
        />
      </div>
    );
  };

  return (
    <>
      {props?.contentVisible ? (
        <div
          className={
            'group flex cursor-pointer items-center space-x-3 py-4 px-5 hover:rounded-lg hover:bg-sfra-gray-50 hover:text-sfra-blue-100'
          }
          onClick={() => handleOpen(props?.open)}
        >
          <ImageIcon
            src={props?.icon}
            alt='left list icon'
            classes='!h-5'
            varient='blue'
          />
          <div className='overflow-hidden whitespace-nowrap font-montserrat text-ms font-normal group-hover:font-semibold'>
            {props?.title}
          </div>
          <div className='px-2 text-sm font-semibold text-sfra-blue-100'>
            {props?.filterCount ? props?.filterCount + '' : ''}
          </div>
        </div>
      ) : (
        <Tooltip
          title={
            <React.Fragment>
              <span color='inherit'>{props?.title}</span>
              <span className='px-2 font-montserrat text-xs font-semibold text-sfra-blue-100'>
                {props?.filterCount ? props?.filterCount + '' : ''}
              </span>
            </React.Fragment>
          }
          placement='right'
          componentsProps={{
            tooltip: {
              sx: {
                color: '#7E7E8A',
                backgroundColor: 'white',
                fontSize: '0.8125rem',
                fontFamily: 'Montserrat',
                fontWeight: '400',
                padding: '0.7rem',
                boxShadow: '0px 0px 10px rgba(0,0,0,0.21)',
                borderRadius: '6px',
              },
            },
          }}
        >
          <div
            className={
              'group flex cursor-pointer items-center space-x-3 py-4 px-5 hover:rounded-lg hover:bg-sfra-gray-50 hover:text-sfra-blue-100'
            }
            onClick={() => handleOpen(props?.open)}
          >
            <ImageIcon
              src={props?.icon}
              classes='!h-5'
              alt='left list icon'
              varient='blue'
            />
          </div>
        </Tooltip>
      )}
      <Dialog
        open={openFilterDialog === props?.open}
        title={props?.title}
        closeDialog={() => handleOpen(-1)}
        icon={props?.icon}
        footer={<Footer />}
        body={props?.children}
      />
    </>
  );
};

export default LeftItem;
