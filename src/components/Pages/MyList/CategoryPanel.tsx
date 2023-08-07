import React from 'react';
import { useSelector } from 'react-redux';

const Item = (itemProps: { value: number; title: string }) => {
  return (
    <div className='min-w-[6rem] cursor-pointer rounded-md bg-sfra-blue-10 py-1.5 px-2 shadow-[0px_1px_6px_rgba(0,0,0,0.08)] hover:bg-sfra-blue-100/10'>
      <div className='font-montserrat text-base font-medium text-sfra-pink-300'>
        {itemProps?.value}
      </div>
      <div className='whitespace-nowrap font-montserrat text-xs font-normal text-sfra-blue-100'>
        {itemProps?.title}
      </div>
    </div>
  );
};

const CategoryPanel = () => {
  const { selectedList } = useSelector((state: any) => state.myLists);
  const list = [
    {
      title: 'Total',
      value: selectedList?.totalCount,
    },
    {
      title: 'On Market',
      value: '0',
    },
    {
      title: 'Just Sold',
      value: '0',
    },
    {
      title: 'Vacant',
      value: '0',
    },
    {
      title: 'High Equity',
      value: '0',
    },
    {
      title: 'Low Equity',
      value: '0',
    },
    {
      title: 'Neg Equity',
      value: '0',
    },
    {
      title: 'Bank Owned',
      value: '0',
    },
    {
      title: 'Pre-Foreclosure',
      value: '0',
    },
    {
      title: 'Auction',
      value: '0',
    },
    {
      title: 'Has Lien',
      value: '0',
    },
    {
      title: 'Free & Clear',
      value: '0',
    },
    {
      title: 'Bankruptcy',
      value: '0',
    },
  ];
  return (
    <div className='flex w-full space-x-2.5 overflow-auto border p-3'>
      {list.map((item: any, index: number) => (
        <Item key={index} value={item.value} title={item.title} />
      ))}
    </div>
  );
};

export default CategoryPanel;
