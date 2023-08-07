import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';

import style from './style.module.scss';

type TableProps = {
  header?: Array<{ title: string; sort: boolean; icon?: React.ReactNode }>;
  body?: Array<string[]>;
  loading: boolean;
  radius?: boolean;
};

export default function SortedTable(props: TableProps) {
  const [rowData, setRowData] = useState(Array<string[]>);
  const [orderDirection, setOrderDirection] = useState('asc');

  function descendingComparator(a: any, b: any, by: any) {
    if (b[by] < a[by]) {
      return -1;
    }
    if (b[by] > a[by]) {
      return 1;
    }
    return 0;
  }

  useEffect(() => {
    setRowData(props?.body ?? [[]]);
  }, [props?.body]);

  function getComparator(direction: string, a: any, b: any, by: Number) {
    return direction === 'desc'
      ? descendingComparator(a, b, by)
      : -descendingComparator(a, b, by);
  }

  function applySortFilter(direction: string, by: Number) {
    const stabilizedThis = rowData?.map((el, index) => [el, index]);

    stabilizedThis?.sort((a: any, b: any) => {
      const order = getComparator(direction, a[0], b[0], by);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    setRowData(stabilizedThis?.map((el: any) => el[0]));
  }

  const handleSortRequest = (index: number) => {
    setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
    applySortFilter(orderDirection === 'asc' ? 'desc' : 'asc', index);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead className='h-12 bg-sfra-blue-100/5'>
          <TableRow
            className={
              props?.radius === undefined || props?.radius
                ? style.tableStyle
                : ''
            }
          >
            {props.header?.map((item, index) => {
              return item?.sort ? (
                <TableCell
                  key={index}
                  align='left'
                  onClick={() => handleSortRequest(index)}
                  className='cursor-pointer !py-0'
                >
                  <div className='justify-left !flex space-x-1'>
                    {item?.icon && item?.icon}
                    <span className='!font-montserrat !text-xs !font-medium !text-sfra-pink-100'>
                      {item.title}
                    </span>
                    <img
                      src={`/assets/images/listBuilder/sort.svg`}
                      alt='sort-icon'
                    />
                  </div>
                </TableCell>
              ) : (
                <TableCell
                  key={index}
                  align={index === 0 ? 'center' : 'left'}
                  className='px-6 !py-0 !font-montserrat !text-xs !font-medium !text-sfra-pink-100'
                >
                  {item?.title}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.loading ? (
            <div className='absolute flex h-full w-full items-center justify-center backdrop-blur-[1px]'>
              <svg
                aria-hidden='true'
                className='inline h-10 w-10 animate-spin fill-slate-50 text-gray-200 dark:text-gray-500'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
            </div>
          ) : rowData.length === 0 ? (
            <div className='absolute flex h-full w-full items-center justify-center font-montserrat text-base font-medium text-sfra-gray-300 backdrop-blur-[1px]'>
              <div className='space-y-2'>
                <div className='flex justify-center'>
                  <img
                    src='/assets/images/table/noData.svg'
                    className='h-12'
                    alt='no data icon'
                  />
                </div>
                <div>No data available</div>
              </div>
            </div>
          ) : (
            <></>
          )}

          {rowData?.map((row, index: number) => (
            <TableRow key={index} className='odd:bg-white even:bg-sfra-blue-10'>
              {row.map((datum, idx) => {
                return (
                  <TableCell
                    key={idx}
                    align='left'
                    className={
                      'group !border-none whitespace-nowrap !py-2.5 px-6 text-center !font-montserrat !text-xs !font-light !text-sfra-gray-200 ' +
                      (idx === 0 ? '!flex justify-center' : '')
                    }
                  >
                    {datum}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
