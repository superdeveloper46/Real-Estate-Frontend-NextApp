import { format } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';

import HorizontalItem from '../HorizontalItem.component';
import style from './style.module.scss';

const Value = () => {
  const { property } = useSelector((state: any) => state.property);

  const summaryData = [
    {
      title: 'ESTIMATED VALUE',
      value: property?.currentavmvalue,
    },
    {
      title: 'ASSESSED VALUE',
      value: property?.assdtotalvalue,
    },
    {
      title: 'ESTIMATED EQUITY',
      value: property?.equity,
    },
    {
      title: 'ESTIMATED OPEN LOAN BALANCE',
      value: 'null',
    },
  ];

  return (
    <div
      className={`${style.container} flex !justify-start !space-x-24 !space-y-0`}
    >
      <div className='relative w-1/3 space-y-4 p-2'>
        <div className='p flex items-center space-x-2 border-b pb-2'>
          <div>
            <img
              src='/assets/images/property/summary.svg'
              alt='summary icon'
              className='h-5'
            />
          </div>
          <div className='font-montserrat text-base font-medium text-sfra-blue-100'>
            Summary
          </div>
        </div>
        {summaryData.map((item, index) => (
          <HorizontalItem
            key={index}
            title={item.title}
            value={item.value ?? 'null'}
          />
        ))}
      </div>
      <div className='w-1/3 space-y-4 p-2'>
        <div className='p flex items-center space-x-2 border-b pb-2'>
          <div>
            <img
              src='/assets/images/property/purchase.svg'
              alt='summary icon'
              className='h-5'
            />
          </div>
          <div className='font-montserrat text-base font-medium text-sfra-blue-100'>
            Purchase
          </div>
        </div>
        <HorizontalItem
          title={'PURCHASE DATE'}
          value={
            property?.sales_date === 'null'
              ? 'null'
              : format(new Date(property?.sales_date), 'MM/dd/yyyy')
          }
        />
        <HorizontalItem
          title={'PURCHASE PRICE'}
          value={property?.currentsalesprice ?? 'null'}
        />
      </div>
    </div>
  );
};

export default Value;
