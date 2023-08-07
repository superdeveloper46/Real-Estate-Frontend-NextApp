import React from 'react';

import ImageIcon from '@/components/ImageIcon/ImageIcon';

import HorizontalItem from './HorizontalItem.component';
import style from './style.module.scss';
import VerticalItem from './VerticalItem.component';

const PropertyInfo = (props: CardProps) => {
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
    <div className='space-y-4'>
      <div className='flex items-center justify-between rounded-t-xl px-2'>
        <div className='flex items-center space-x-3'>
          <span>
            <img
              src='/assets/images/listBuilder/cardHeader.svg'
              alt='card-header-icon'
              className='h-5'
            />
          </span>
          <span className='font-montserrat text-sm font-medium text-sfra-gray-400 '>
            {props?.situsfullstreetaddress ?? 'null'}
          </span>
        </div>
      </div>
      <div className='rounded-[10px] border bg-sfra-gray-50 px-2 py-4'>
        <div className='mx-1  flex items-center pb-3'>
          <div className='mr-2 flex h-full items-center px-2'>
            <div className={`${style.text}`}>Name</div>
            <div className={`${style.vSeperator} !h-3`}></div>
            <div className={`${style.text} !font-medium`}>
              {props?.ownername1full ?? 'null'}
            </div>
          </div>
          <div className='flex h-full items-center px-2'>
            <div className={`${style.text}`}>Age</div>
            <div className={`${style.vSeperator} !h-3`}></div>
            <div className={`${style.text} !font-medium`}>
              {props?.age ?? 'null'}
            </div>
          </div>
        </div>
        <div className='mx-1 flex items-center'>
          <div className='flex h-full w-2/5 items-center px-2'>
            <div>
              <img
                src='/assets/images/listBuilder/telephone.svg'
                alt='telephone icon'
              />
            </div>
            <div className={`${style.vSeperator} !h-3`}></div>
            <div className={`${style.text} !font-medium`}>
              {props?.telephone ?? 'null'}
            </div>
          </div>
          <div className='flex h-full items-center px-2'>
            <div>
              <img
                src='/assets/images/listBuilder/email.svg'
                alt='telephone icon'
              />
            </div>
            <div className={`${style.vSeperator} !h-3`}></div>
            <div className={`${style.text} !font-medium`}>
              {props?.email ?? 'null'}
            </div>
          </div>
        </div>
      </div>
      <div className='mx-2 flex justify-between'>
        {statusData.map((item, index) => (
          <div
            key={index}
            className={
              style.bottomItem + ' w-40 mx-2 space-x-1 flex items-center group'
            }
          >
            <ImageIcon
              src={item?.icon}
              alt={'card-bottom-icon'}
              varient='blue'
              classes={item.selected ? 'default-blue-svg' : ''}
              size='w-5'
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
      <div className='flex justify-evenly rounded-[10px] border bg-sfra-gray-50 p-2'>
        <VerticalItem text='YEAR BUILT' value={props?.yearbuilt ?? 'null'} />
        <div className={`${style.vSeperator} !h-12`}></div>
        <VerticalItem text='SQFT' value={props?.sumbuildingsqft ?? 'null'} />
        <div className={`${style.vSeperator} !h-12`}></div>
        <VerticalItem text='BEDS' value={props?.bedrooms ?? 'null'} />
        <div className={`${style.vSeperator} !h-12`}></div>
        <VerticalItem text='BATHS' value={props?.bathtotalcalc ?? 'null'} />
      </div>
      <div className='mx-2 flex space-x-4 pt-4'>
        <div className='w-1/2 space-y-4'>
          <HorizontalItem
            text='Estimated Value'
            value={props?.currentavmvalue ?? 'null'}
            varient='lg'
          />
          <HorizontalItem
            text='Equity'
            value={props?.equity ?? 'null'}
            disabled={true}
            varient='lg'
          />
        </div>
        <div className='w-1/2 space-y-4'>
          <HorizontalItem
            text='Purchase Price'
            value={props?.currentsalesprice ?? 'null'}
            varient='lg'
          />
          <HorizontalItem
            text='Purchase Date'
            value={props?.sales_date ?? 'null'}
            varient='lg'
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;
