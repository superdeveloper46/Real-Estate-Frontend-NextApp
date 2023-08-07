import Tooltip from '@mui/material/Tooltip';
import React from 'react';

type LeftTabProps = {
  icon: string;
  title: string;
  active: boolean;
  onClick: () => void;
};

const LeftTabItem = (props: LeftTabProps) => {
  return (
    <Tooltip
      title={
        <>
          <span color='inherit'>{props?.title}</span>
        </>
      }
      placement='right'
      componentsProps={{
        tooltip: {
          sx: {
            color: '#7E7E8A',
            backgroundColor: 'white',
            fontSize: '0.75rem',
            fontFamily: 'Montserrat',
            fontWeight: '300',
            padding: '10px',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.21)',
            borderRadius: '6px',
          },
        },
      }}
    >
      <div
        className='flex items-center justify-center'
        onClick={props?.onClick}
      >
        <div
          className={
            'group flex h-8 w-8 cursor-pointer items-center justify-center rounded-md hover:bg-sfra-blue-100' +
            (props?.active ? ' bg-sfra-blue-100' : '')
          }
        >
          <img
            src={props?.icon}
            alt='overView icon'
            className={
              'white-svg h-6 w-6' + (props?.active ? ' default-white-svg' : '')
            }
          />
        </div>
      </div>
    </Tooltip>
  );
};

export default LeftTabItem;
