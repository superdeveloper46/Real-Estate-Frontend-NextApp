import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';

import CheckInput from '@/components/CheckInput/CheckInput.component';
import { getFiltersByListId } from '@/utils/api/restful/listbuilder';

type EditListProps = {
  id: string;
  listName: string;
  totalCount: number;
  newCount?: number;
  filterCount: number;
  dmi: boolean;
  createAt: string;
  updateAt: string;
  onListNameChanged: (listname: string) => void;
  onDMIChanged: (dmi: boolean) => void;
  onCancelChange: () => void;
};

const EditList = (props: EditListProps) => {
  const [filters, setFilters] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getFiltersByListId({ id: props?.id }).then((data) => setFilters(data));
  }, []);

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
      <div className='flex items-center justify-center space-x-2 '>
        <img
          src='/assets/images/listBuilder/propertiesList.svg'
          alt='propertiesList icon'
          className='default-darkBlue-svg h-5'
        />
        <span className='font-montserrat text-base font-medium text-sfra-gray-400'>
          {props?.totalCount}
        </span>
        <span className='!ml-5 font-montserrat text-base font-medium text-sfra-gray-400'>
          properties in this list
        </span>
      </div>

      <div className='my-4 border border-b-0'></div>

      <div className='mb-6 flex h-12 items-center justify-center space-x-3'>
        {!visible ? (
          <span className='font-montserrat text-base font-semibold text-sfra-gray-400'>
            {props?.listName}
          </span>
        ) : (
          <input
            type='text'
            className='w-full rounded-lg border bg-sfra-blue-10 px-3 py-1.5 font-montserrat text-xs font-normal text-sfra-gray-200 outline-none'
            placeholder='New List Name'
            onChange={(e: any) => {
              props?.onListNameChanged(e.target.value);
            }}
            onKeyDown={(e: any) => {
              if (e.keyCode === 13) {
                setVisible(false);
              }
            }}
            value={props?.listName}
          />
        )}
        <div
          className='flex h-10 min-w-[40px] cursor-pointer items-center justify-center rounded-full hover:bg-sfra-gray-50'
          onClick={() => {
            setVisible(!visible);
            if (visible) props?.onCancelChange();
          }}
        >
          {!visible ? (
            <img
              src='/assets/images/listBuilder/editList.svg'
              alt='edit icon'
              className='h-5'
            />
          ) : (
            <img
              src='/assets/images/listBuilder/cancel.svg'
              className='defult-darkBlue-svg h-6'
              alt='cancel icon'
            />
          )}
        </div>
      </div>

      <div className='mb-6 flex items-center justify-between'>
        <div className='flex w-1/2 items-center space-x-1'>
          <span>
            <img
              src='/assets/images/listBuilder/calendar.svg'
              alt='calendar icon0'
              className='h-4'
            />
          </span>
          <span className='font-montserrat text-xs font-normal text-sfra-gray-600'>
            {format(new Date(props?.createAt), 'dd/MM/yyyy')}
          </span>
          <span className='!ml-4 font-montserrat text-xs font-normal text-sfra-gray-400'>
            list created on
          </span>
        </div>

        <div className='flex w-1/2 items-center space-x-1'>
          <span>
            <img
              src='/assets/images/listBuilder/calendar.svg'
              alt='calendar icon0'
              className='h-4'
            />
          </span>
          <span className='font-montserrat text-xs font-normal text-sfra-gray-600'>
            {format(new Date(props?.updateAt), 'dd/MM/yyyy')}
          </span>
          <span className='!ml-4 font-montserrat text-xs font-normal text-sfra-gray-400'>
            last time modified
          </span>
        </div>
      </div>

      <div className='mb-2 flex items-center space-x-2'>
        <span>
          <img
            src='/assets/images/listBuilder/filter-left.svg'
            alt='filter icon'
            className='h-4'
          />
        </span>
        <span className='font-montserrat text-xs font-normal text-sfra-gray-600'>
          {props?.filterCount} active filters
        </span>
      </div>

      <div className='max-h-[88px] min-h-[32px] w-full items-center overflow-y-auto overflow-x-hidden rounded-lg bg-sfra-gray-50 px-1.5 pt-1.5'>
        {filters.map((item: any, index: number) => (
          <div
            key={index}
            className='group float-left mr-1.5 mb-1.5 flex h-5 cursor-pointer items-center justify-between rounded-lg bg-white px-1.5'
          >
            <div className='whitespace-nowrap pr-2 font-montserrat text-xs font-normal text-sfra-gray-200 group-hover:text-sfra-blue-100'>
              {item?.key} : {item?.value}
            </div>
          </div>
        ))}
      </div>

      <div className='justify-left mt-8 flex items-center space-x-3 pb-3 font-montserrat text-base font-medium text-sfra-blue-100'>
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

      <div className='ml-8 mt-3 space-y-3 rounded-lg border px-5 py-3'>
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

export default EditList;
