import React from 'react';

import Alert from '@/components/Alert/Alert.component';
import CheckInput from '@/components/CheckInput/CheckInput.component';

type MakeaListProps = {
  listName: string;
  dmi: boolean;
  totalCount: number;
  error: boolean;
  onListNameChanged: (listname: string) => void;
  onDMIChanged: (dmi: boolean) => void;
  onError: (error: boolean) => void;
};

const MakeaList = (props: MakeaListProps) => {
  const Item = (itemProps: { value: number; title: string }) => {
    return (
      <div className='w-24 rounded-md bg-sfra-blue-10 py-1.5 px-2 shadow-[0px_1px_6px_rgba(0,0,0,0.08)]'>
        <div className='font-montserrat text-base font-medium text-sfra-pink-300'>
          {itemProps?.value}
        </div>
        <div className='whitespace-nowrap font-montserrat text-xs font-normal text-sfra-blue-100'>
          {itemProps?.title}
        </div>
      </div>
    );
  };

  const itemList = [
    {
      value: 127,
      title: 'Total',
    },
    {
      value: 88,
      title: 'HIGH EQUITY',
    },
    {
      value: 12,
      title: 'Just Sold',
    },
    {
      value: 7,
      title: 'Vacant',
    },
    {
      value: 20,
      title: 'On Market',
    },
  ];

  const dynamicList = [
    ['Always up to date with Insights and Automations.', 'Learn More.'],
    [
      '9,999 of 10,000 properties remaining to monitor.',
      'Upgrade to add more.',
    ],
    ['Monitoring cannot be turned off for 5 days after being turned on.', ''],
  ];

  const descriptionClass =
    'flex items-center font-montserrat text-xs font-normal text-sfra-gray-200';

  return (
    <div>
      <div className='flex items-center justify-center space-x-3 pt-3 pb-8 font-montserrat text-base font-medium text-sfra-blue-100'>
        <img
          src='/assets/images/listBuilder/propertiesList.svg'
          alt='propertiesList icon'
          className='h-5'
        />
        <span>{`${props?.totalCount
          .toString()
          .replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ','
          )} PROPERTIES IN THIS LIST`}</span>
      </div>
      <div className='flex justify-between space-x-3'>
        {itemList.map((item, index) => (
          <Item key={index} value={item.value} title={item.title} />
        ))}
      </div>
      <div className='py-8'>
        {props?.error && (
          <Alert icon={'error'} color={'red'} text={'This field is required'} />
        )}
        <input
          type='text'
          className='w-full rounded-lg border bg-sfra-blue-10 px-3 py-2 font-montserrat text-xs font-normal text-sfra-gray-200 outline-none'
          placeholder='New List Name'
          ref={(input) => {
            if (input != null) {
              input.focus();
            }
          }}
          onChange={(e) => {
            const { value } = e.target;
            props?.onListNameChanged(e.target.value);
            if (value === '') {
              props?.onError(true);
            } else {
              props?.onError(false);
            }
          }}
          value={props?.listName}
        />
      </div>

      <div className='border border-b-0'></div>

      <div className='justify-left flex items-center space-x-3 pt-6 pb-3 font-montserrat text-base font-medium text-sfra-blue-100'>
        <img
          src='/assets/images/listBuilder/dynamicList.svg'
          alt='propertiesList icon'
          className='h-4'
        />
        <span>Make a Dynamic List</span>
      </div>
      <div>
        <CheckInput
          label={'Make a Dynamic List, Add Monitoring, Insights & Automations'}
          classes=''
          onClick={() => {
            props?.onDMIChanged(!props?.dmi);
          }}
          checked={props?.dmi}
        />
      </div>
      <div className='ml-9 mt-6 space-y-3 rounded-lg border px-5 py-3'>
        {dynamicList.map((item, index) => (
          <div className={descriptionClass} key={index}>
            <img src='/assets/images/listBuilder/dot.svg' alt='dot icon' />
            <span>&nbsp;&nbsp;{item[0]}&nbsp;&nbsp;</span>
            <span className='underline'>{item[1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MakeaList;
