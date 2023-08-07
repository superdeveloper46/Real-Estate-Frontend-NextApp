import React from 'react';

type ListItemProps = {
  title: string;
  value?: string;
  marginY?: string;
  blurred?: boolean;
  icon?: React.ReactNode;
  style?: any;
};

const ListItem = (props: ListItemProps) => {
  return (
    <div
      style={props.style}
      className={`flex w-4/5 flex-col content-between items-center rounded-lg pl-2 text-center lg:flex-row xl:flex-row`}
    >
      {props.icon}
      <div className='mx-1 items-start border-gray-300 px-2 text-sm text-gray-500 lg:border lg:border-y-0 lg:border-l-0 lg:border-r-2'>
        {props.title}
      </div>
      <div
        className={`pl-2 text-center text-gray-800 ${
          props.blurred && 'blur-sm'
        }`}
      >
        {props.value}
      </div>
    </div>
  );
};

export default ListItem;
