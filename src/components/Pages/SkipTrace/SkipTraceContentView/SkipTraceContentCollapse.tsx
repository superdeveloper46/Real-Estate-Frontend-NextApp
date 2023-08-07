import { Pagination } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Table from '@/components/Table/Table.component';

import HeaderIcon from './HeaderIcon.component';

const SkipTraceContentCollapse = () => {
  const tableHeader = [
    { title: 'ADDRESS', sort: true, icon: <HeaderIcon /> },
    { title: 'UNIT', sort: true },
    { title: 'CITY', sort: true, icon: <HeaderIcon /> },
    { title: 'STATE', sort: true, icon: <HeaderIcon /> },
    { title: 'ZIP', sort: true, icon: <HeaderIcon /> },
    { title: 'COUNTY', sort: true, icon: <HeaderIcon /> },
    { title: 'APN', sort: true, icon: <HeaderIcon /> },
  ];
  const [tablePageIndex, setTablePageIndex] = useState(1);

  const { dataCollapse } = useSelector((state: any) => state.skipTrace);

  const lists = [
    'Skip Tracing Test.csv (4)',
    'Skip Tracing Test.csv (500)',
    'Skip Tracing Test.csv (12)',
    'Skip Tracing Test.csv (23)',
    'Skip Tracing Test.csv (5235)',
  ];

  const [selectedCollapse, setSelectedCollpase] = useState(0);
  const [visible, setVisible] = useState(false);

  return (
    <div className='mt-5 h-[calc(100vh-200px)]'>
      <div className='relative space-y-2.5 rounded-[10px] bg-white p-3'>
        {lists?.map((item, index) => (
          <div
            key={index}
            className={
              selectedCollapse === index && visible ? 'h-[460px]' : 'h-[30px]'
            }
            style={{
              transition: 'height 0.5s ease',
            }}
          >
            <div
              className='flex cursor-pointer items-center justify-between rounded bg-sfra-blue-50/20 py-1.5 px-2.5 font-montserrat text-xs text-sfra-gray-300'
              onClick={() => {
                setVisible(!visible);
                if (selectedCollapse !== index) {
                  setVisible(true);
                }
                setSelectedCollpase(index);
              }}
            >
              <span>{item}</span>
              <span>
                {selectedCollapse === index && visible ? (
                  <img
                    src='/assets/images/skiptrace/hide.svg'
                    alt='show icon'
                  />
                ) : (
                  <img
                    src='/assets/images/skiptrace/show.svg'
                    alt='show icon'
                  />
                )}
              </span>
            </div>
            {selectedCollapse === index && visible && (
              <div className='my-2'>
                <Table
                  header={tableHeader}
                  body={dataCollapse}
                  loading={false}
                  radius={false}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className='mt-3 flex w-full items-center justify-between'>
        <div className='font-montserrat text-sm text-sfra-gray-200'>
          {`showing 1 to 1 of ${dataCollapse.length} entries`}
        </div>
        <Pagination
          showFirstButton
          showLastButton
          count={dataCollapse.length}
          page={tablePageIndex}
          onChange={async (e: any, pageIndex: number) => {
            setTablePageIndex(pageIndex);
          }}
        />
      </div>
    </div>
  );
};

export default SkipTraceContentCollapse;
