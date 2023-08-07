import React from 'react';
import { useSelector } from 'react-redux';

import ImageIcon from '@/components/ImageIcon/ImageIcon';

import style from '../style.module.scss';

const VerticalItem = (props: { text: string; value: string }) => {
  return (
    <div className='py-2'>
      <div className={`${style.text} whitespace-nowrap py-1`}>
        {props?.text}
      </div>
      <div className={`${style.text} py-1 pr-2 !font-medium`}>
        {props?.value}
      </div>
    </div>
  );
};

const Property = () => {
  const { property } = useSelector((state: any) => state.property);

  const statusData = [
    {
      icon: '/assets/images/listBuilder/cardBottom1.svg',
      title: 'Owner Occupied',
      selected: false,
    },
    {
      icon: '/assets/images/listBuilder/cardBottom2.svg',
      title: 'For Sale',
      selected: true,
    },
    {
      icon: '/assets/images/listBuilder/cardBottom3.svg',
      title: 'In Foreclosure',
      selected: false,
    },
  ];

  return (
    <div className='my-6 mx-3 space-y-8'>
      <div className='flex justify-start space-x-6'>
        {statusData.map((item, index) => (
          <div
            key={index}
            className={
              style.bottomItem + ' w-40 space-x-1 flex items-center group'
            }
          >
            <ImageIcon
              src={item?.icon}
              alt={'card-bottom-icon'}
              varient='blue'
              classes={item.selected ? 'default-blue-svg' : ''}
              size='w-6 h-6'
            />
            <span
              className={
                style.text +
                (item.selected ? ' !text-sfra-blue-100' : '') +
                ' group-hover:text-sfra-blue-100 whitespace-nowrap'
              }
            >
              {item.title}
            </span>
          </div>
        ))}
      </div>
      <div className='flex justify-start space-x-6 overflow-auto p-1.5'>
        <VerticalItem text='Type' value={property?.property_type} />
        <div className={style.vSeperator} />
        <VerticalItem text='YEAR BUILT' value={property?.yearbuilt} />
        <div className={style.vSeperator} />
        <VerticalItem text='SQFT' value={property?.sumbuildingsqft} />
        <div className={style.vSeperator} />
        <VerticalItem text='LOT SIZE' value={property?.lotsizesqft} />
        <div className={style.vSeperator} />
        <VerticalItem text='BEDS' value={property?.bedrooms} />
        <div className={style.vSeperator} />
        <VerticalItem text='BATHS' value={property?.bathtotalcalc} />
      </div>
    </div>
  );
};

export default Property;
