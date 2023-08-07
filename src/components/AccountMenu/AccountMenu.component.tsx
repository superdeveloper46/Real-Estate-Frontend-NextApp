import { MenuItem } from '@material-ui/core';
import Router from 'next/router';
import React from 'react';
import { BsCaretDownFill } from 'react-icons/bs';
import { TbLogout } from 'react-icons/tb';

import { useUser } from '@/core/user';

import StyledMenu from '../StyledMenu/StyledMenu.component';

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { user } = useUser();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutFunc = () => {
    Router.replace('/api/auth/logout');
  };

  return (
    <div className='flex w-max'>
      <button
        className='flex h-10 w-full items-center whitespace-nowrap px-4 text-white hover:bg-sfra-blue-400'
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <span className='pr-2 font-montserrat text-ms'>{user?.name}</span>
        <BsCaretDownFill size={12} />
      </button>
      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        minWidth={160}
        borderRadius={10}
      >
        <div className='px-3'>
          {/* <MenuItem */}
          {/*  className='!py-1 !text-sm' */}
          {/*  onClick={() => { */}
          {/*    Router.push('/profile'); */}
          {/*  }} */}
          {/*  disableRipple */}
          {/* > */}
          {/*  <TbUser size={18} /> */}
          {/*  My Profile */}
          {/* </MenuItem> */}
          {/* <MenuItem */}
          {/*  className='!mb-2 !py-1 !text-sm' */}
          {/*  onClick={() => { */}
          {/*    Router.push('/billingSettings'); */}
          {/*  }} */}
          {/*  disableRipple */}
          {/* > */}
          {/*  <TbSettings size={18} /> */}
          {/*  Billing Settings */}
          {/* </MenuItem> */}
          {/* <Divider sx={{ my: 0.5 }} /> */}
          <MenuItem
            className='!py-1 !text-sm !text-red-300'
            onClick={() => {
              handleClose();
              logoutFunc();
            }}
            disableRipple
          >
            <TbLogout size={18} />
            Log Out
          </MenuItem>
        </div>
      </StyledMenu>
    </div>
  );
};

export default AccountMenu;
