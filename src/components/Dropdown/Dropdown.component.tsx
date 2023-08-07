import React, { useEffect, useState } from 'react';

import Button from '../Button/Button.component';
import MenuItem from '../Pages/ListBuilder/MenuItem.component';

type DropDwonProps = {
  options: Array<string>;
  values: Array<string>;
  selectedValue: string;
  onClick?: (value: string) => void;
};

const Dropdown = (props: DropDwonProps) => {
  const [open, setOpen] = useState(false);
  const handleAnchorClick = () => {
    setOpen(!open);
  };
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const index =
      props?.selectedValue === undefined || props?.selectedValue === ''
        ? 0
        : props?.values.indexOf(props?.selectedValue);
    setSelectedIndex(index);
  }, []);

  return (
    <>
      <div className='relative'>
        <Button
          classes={
            '!w-full bg-white border border-sfra-blue-100/10 !justify-between ' +
            (open ? '!rounded-b-none' : '')
          }
          variant='filled'
          onClick={handleAnchorClick}
          textClass={
            'text-sfra-gray-300 text-left white overflow-hidden !font-normal whitespace-nowrap w-[90%] font-light text-xs'
          }
          text={props?.options[selectedIndex]}
          endIcon={
            <img
              className='default-gray-svg'
              src={
                !open
                  ? '/assets/images/listBuilder/arrow-bottom.svg'
                  : '/assets/images/listBuilder/arrow-top.svg'
              }
              alt='list builder bottom image'
            />
          }
        />

        <div
          className={
            'absolute z-40 -mt-1 w-full h-60 overflow-auto rounded-b-2xl border bg-white ' +
            (open ? 'block' : 'hidden')
          }
        >
          {props?.options?.map((item, index) => (
            <MenuItem
              key={index}
              text={item}
              classes='mx-1 text-xs'
              active={selectedIndex === index ? 'menu-active' : ''}
              onClick={() => {
                handleAnchorClick();
                setSelectedIndex(index);
                if (props?.onClick) props?.onClick(props?.values[index] ?? '');
              }}
            ></MenuItem>
          ))}
        </div>
      </div>
      <div
        className={'fixed inset-0 z-20 ' + (open ? 'block' : 'hidden')}
        onClick={handleAnchorClick}
      ></div>
    </>
  );
};

export default Dropdown;
