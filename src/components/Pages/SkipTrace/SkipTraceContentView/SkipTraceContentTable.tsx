import { Pagination } from '@mui/material';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Table from '@/components/Table/Table.component';
import { setGlobalLoading } from '@/redux/slices/global';
import { setData } from '@/redux/slices/skipTrace';
import { dispatch } from '@/redux/store';
import {
  downloadExportFile,
  downloadOriginFile,
  getSkiptrace,
} from '@/utils/api/restful/skiptrace';

import HeaderIcon from './HeaderIcon.component';
import SkipTraceContentImport from './SkipTraceContentImport';

const SkipTraceContentTable = () => {
  const tableHeader = [
    { title: 'UPLOADED FILE', sort: true, icon: <HeaderIcon /> },
    { title: 'TOTAL RECORDS', sort: true, icon: <HeaderIcon /> },
    { title: 'TOTAL HITS', sort: true, icon: <HeaderIcon /> },
    { title: 'HIT', sort: true, icon: <HeaderIcon /> },
    { title: 'MATCHES', sort: true, icon: <HeaderIcon /> },
    { title: 'SAVINGS', sort: true, icon: <HeaderIcon /> },
    { title: 'TOTAL COST', sort: true, icon: <HeaderIcon /> },
    { title: 'STATUS', sort: true, icon: <HeaderIcon /> },
    { title: 'ADDED', sort: false },
    { title: 'RESULT', sort: false },
  ];
  const [tablePageIndex, setTablePageIndex] = useState(1);
  const pageCount = 10;

  const { data, selectedDays } = useSelector((state: any) => state.skipTrace);

  const sortArr = [
    'fileName',
    'totalRecords',
    'totalHits',
    'hit',
    'matches',
    'savings',
    'totalCost',
    'status',
    'created',
  ];

  const download = (blob: any, name: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadOrignFile = (fileId: string, name: string) => {
    dispatch(setGlobalLoading(true));
    downloadOriginFile({ id: fileId })
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        dispatch(setGlobalLoading(false));
        download(blob, name);
      });
  };

  const handleDownloadExportFile = (fileId: string, name: string) => {
    dispatch(setGlobalLoading(true));
    downloadExportFile({ id: fileId })
      .then((response) => {
        return response.blob();
      })
      .then((blob) => {
        dispatch(setGlobalLoading(false));
        download(blob, name);
      });
  };

  useEffect(() => {
    const reqData = {
      from: tablePageIndex,
      size: pageCount,
      selectedDays,
    };
    getSkiptrace(reqData).then((resData) => {
      const tableData = resData?.map((item: any) => {
        let obj = {};
        sortArr.forEach((k) => {
          obj = { ...obj, [k]: item[k] };
        });
        const d = Object.values(obj);
        const added: string = format(
          new Date(d[d.length - 1] as string),
          'MM/dd/yyyy'
        );
        d[d.length - 1] = added;
        d[0] = (
          <div
            className='cursor-pointer text-sfra-blue-100 hover:underline hover:underline-offset-1'
            onClick={() => handleDownloadOrignFile(item.id, item.fileName)}
          >
            {d[0] as any}
          </div>
        );
        d[d.length] = (
          <div
            className='flex cursor-pointer items-center justify-center text-sfra-blue-100'
            onClick={() =>
              handleDownloadExportFile(item.id, 'Export_' + item.fileName)
            }
          >
            <img
              src='/assets/images/skiptrace/download.svg'
              alt='download icon'
              className='default-blue-svg h-4'
            />
          </div>
        );
        return d;
      });

      dispatch(setData(tableData));
    });
  }, [tablePageIndex, selectedDays]);

  return (
    <>
      {data.length === 0 ? (
        <SkipTraceContentImport />
      ) : (
        <div className='mt-5 h-[calc(100vh-200px)]'>
          <div className='relative h-[460px] rounded-[10px] bg-white p-3'>
            <Table
              header={tableHeader}
              body={data}
              loading={false}
              radius={false}
            />
          </div>
          <div className='mt-3 flex w-full items-center justify-between'>
            <div className='font-montserrat text-sm text-sfra-gray-200'>
              {`showing 1 to 1 of ${data.length} entries`}
            </div>
            <Pagination
              showFirstButton
              showLastButton
              count={data.length}
              page={tablePageIndex}
              onChange={async (e: any, pageIndex: number) => {
                setTablePageIndex(pageIndex);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SkipTraceContentTable;
