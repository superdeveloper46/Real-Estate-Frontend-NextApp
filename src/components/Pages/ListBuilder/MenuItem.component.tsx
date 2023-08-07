import React from 'react';

import ImageIcon from '../../ImageIcon/ImageIcon';

type MenuItemProps = {
  icon?: string;
  iconClass?: string;
  text?: string;
  childrenNode?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  active?: string;
  varient?: 'blue' | 'darkBlue' | 'green' | 'pink' | 'white';
  classes?: string;
};

const MenuItem = (props: MenuItemProps) => {
  const textColors = {
    blue: 'group-hover:text-sfra-blue-100',
    darkBlue: 'group-hover:text-sfra-blue-200',
    green: 'group-hover:text-sfra-green-100',
    pink: 'group-hover:text-sfra-pink-300',
    white: 'group-hover:text-white',
  };
  const varient = props.varient ?? 'blue';
  return (
    <div
      onClick={props?.onClick}
      className='group flex cursor-pointer items-center p-1.5 hover:bg-sfra-gray-50'
    >
      <div className={`${props?.active} group mr-4 flex items-center`}>
        {props?.icon && (
          <ImageIcon
            src={props?.icon ? props?.icon : ''}
            alt='MenuItem-icon'
            classes={`mr-2 !h-5 ${props?.iconClass}`}
            varient={varient}
          />
        )}
        <div
          className={
            'font-montserrat text-xs text-sfra-gray-200 ' +
            textColors[varient] +
            ' ' +
            props?.classes
          }
        >
          {props?.text}
        </div>
      </div>
      {props?.childrenNode}
    </div>
  );
};

export default MenuItem;
