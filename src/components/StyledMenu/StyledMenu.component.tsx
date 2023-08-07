import type { MenuProps } from '@mui/material/Menu';
import Menu from '@mui/material/Menu';
import { styled } from '@mui/material/styles';
import React from 'react';

type StyledMenuProps = MenuProps & {
  maxWidth?: number;
  minWidth?: number;
  maxHeight?: number;
  borderRadius?: number;
  width?: number;
};

const StyledMenu = styled((props: StyledMenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))((props) => ({
  '& .MuiPaper-root': {
    borderRadius: props?.borderRadius ?? 18,
    marginTop: 5,
    maxWidth: props?.maxWidth ?? 490,
    minWidth: props?.minWidth ?? 280,
    maxHeight: props?.maxHeight ?? 300,
    width: props?.width ?? 'auto',
    color: 'rgba(76, 79, 94, 0.6)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '14px 0',
    },
    '& .MuiMenuItem-root': {
      fontFamily: 'montserrat',
      padding: '10px 12px',
      gap: '12px',
      '&:hover': {
        backgroundColor:
          'linear-gradient(0deg, rgba(50, 99, 201, 0.05), rgba(50, 99, 201, 0.05)), #FFFFFF',
      },
    },
  },
}));

export default StyledMenu;
