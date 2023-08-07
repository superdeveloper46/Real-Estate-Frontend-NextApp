import { MenuItem } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import React from 'react';
import { FaBell } from 'react-icons/fa';

import StyledMenu from '../StyledMenu/StyledMenu.component';

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='flex w-max'>
      <button
        className='flex h-10 w-16 items-center justify-center whitespace-nowrap hover:bg-sfra-blue-400'
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <FaBell size={14} className='text-white/30' />
      </button>
      <StyledMenu
        id='demo-customized-menu'
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
      >
        <div className='px-4'>
          <div className='py-1 font-montserrat text-base font-semibold text-sfra-gray-400'>
            Notifications
          </div>
          <Divider sx={{ my: 0.5 }} />
          <MenuItem onClick={handleClose} disableRipple>
            <div className='font-montserrat'>
              <div className='flex items-start space-x-2'>
                <div className='mt-0.5 h-5 w-5 min-w-[20px] rounded-full bg-sfra-blue-100' />
                <div className='flex whitespace-normal text-base'>
                  Lorem ipsum dolor sit ame cons ctetur adipiscing elit.
                </div>
              </div>
              <div className='mt-3 flex w-full justify-end text-xs'>
                1 MIN AGO
              </div>
            </div>
          </MenuItem>
        </div>
      </StyledMenu>
    </div>
  );
};

export default NotificationMenu;
