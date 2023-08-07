import { Pagination } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useMemo, useState } from 'react';

const ITEMS_PER_PAGE = 20;

type TableProps = {
  header: Array<{
    title: string;
    sort: boolean;
    icon?: React.ReactNode;
    type?: string;
  }>;
  loading: boolean;
  body?: Array<string[]>;
  defaultSort?: { columnIndex: number; direction: 'desc' | 'asc' };
  maxHeight?: string;
  emptyStateCopy?: string | null;
  onlyContent?: boolean;
};

// Define the data formatting functions based on the header title
const formatFunctions: { [key: string]: (data: string) => string } = {
  'ZIP Code': (data) => data,
  'Sum building sqft': (data) => {
    const number = Number(data);
    return Number.isNaN(number)
      ? data
      : new Intl.NumberFormat('en-US').format(number);
  },
  Sqft: (data) => {
    const number = Number(data);
    return Number.isNaN(number)
      ? data
      : new Intl.NumberFormat('en-US').format(number);
  },
  'Year built': (data) => data,
  'Current avm value': (data) => {
    const number = Number(data);
    return Number.isNaN(number)
      ? data
      : `$${new Intl.NumberFormat('en-US').format(number)}`;
  },
  'Sale amt': (data) => {
    const number = Number(data);
    return Number.isNaN(number)
      ? data
      : `$${new Intl.NumberFormat('en-US').format(number)}`;
  },
  'Loan amt': (data) => {
    const number = Number(data);
    return Number.isNaN(number)
      ? data
      : `$${new Intl.NumberFormat('en-US').format(number)}`;
  },
  'Estimated value': (data) => {
    const number = Number(data);
    return Number.isNaN(number)
      ? data
      : `$${new Intl.NumberFormat('en-US').format(number)}`;
  },
};

export default function SortedTable(props: TableProps) {
  const [rowData, setRowData] = useState(Array<string[]>);
  const [orderDirection, setOrderDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(0);

  type RowData = number[] | string[] | Date[];

  const handleSortRequest = (data: any, index: number, direction: string) => {
    setCurrentPage(0);
    setOrderDirection(direction);
    const sortData = (compareFn: (a: RowData, b: RowData) => number) => {
      const sortFn =
        direction === 'asc'
          ? compareFn
          : (a: RowData, b: RowData) => compareFn(b, a);
      setRowData([...data].sort(sortFn));
    };

    if (props?.header[index]!.type === 'date') {
      sortData(
        (a: RowData, b: RowData) =>
          new Date(a[index]!).getTime() - new Date(b[index]!).getTime()
      );
    } else if (props?.header[index]!.type === 'number') {
      sortData((a: RowData, b: RowData) => Number(a[index]) - Number(b[index]));
    } else {
      sortData((a: RowData, b: RowData) =>
        String(a[index]).localeCompare(String(b[index]))
      );
    }
  };

  useEffect(() => {
    if (!props?.defaultSort) {
      setRowData(props?.body ?? [[]]);
    } else {
      handleSortRequest(
        props?.body ?? [[]],
        props?.defaultSort.columnIndex,
        props?.defaultSort.direction
      );
    }
  }, [props?.body]);

  const pagesCount =
    rowData.length % ITEMS_PER_PAGE === 0
      ? rowData.length / ITEMS_PER_PAGE
      : Math.floor(rowData.length / ITEMS_PER_PAGE) + 1;

  const pageData = useMemo(
    () =>
      rowData.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
      ),
    [currentPage, rowData]
  );

  return (
    <div
      style={{ height: props?.maxHeight ?? '100%' }}
      className='flex flex-col items-center'
    >
      <TableContainer sx={{ overflow: 'auto', flex: 1 }}>
        <Table stickyHeader>
          {!props.onlyContent && (
            <TableHead className='h-12 bg-sfra-blue-100/5'>
              <TableRow>
                {props.header?.map((item, index) => {
                  return item?.sort ? (
                    <TableCell
                      key={index}
                      align='center'
                      onClick={() =>
                        handleSortRequest(
                          rowData,
                          index,
                          orderDirection === 'asc' ? 'desc' : 'asc'
                        )
                      }
                      className='cursor-pointer !bg-[#F8F8FF] !px-7 !py-0'
                    >
                      <div className='flex items-center justify-center space-x-1'>
                        {item?.icon && item?.icon}
                        <span className='whitespace-nowrap !font-montserrat !text-xs !font-semibold !text-sfra-blue-600'>
                          {item.title}
                        </span>
                        <img
                          src={`/assets/images/table/sort.svg`}
                          alt='sort-icon'
                        />
                      </div>
                    </TableCell>
                  ) : (
                    <TableCell
                      key={index}
                      align={'center'}
                      className='whitespace-nowrap !bg-[#F8F8FF] !py-0 px-6 !font-montserrat !text-xs !font-semibold !text-sfra-blue-600'
                    >
                      {item?.title}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
          )}
          <TableBody className=''>
            {pageData.map((row, index: number) => (
              <TableRow
                hover
                key={index}
                className='odd:bg-white even:bg-sfra-blue-10'
              >
                {row.map((datum, idx) => {
                  // Check if there is a custom format function for this column
                  let formattedDatum = datum;
                  const formatter =
                    formatFunctions[props.header?.[idx]?.title || ''];
                  if (formatter) {
                    formattedDatum = formatter(datum);
                  }

                  return (
                    <TableCell
                      key={idx}
                      align='left'
                      className={
                        'group whitespace-nowrap !border-none !px-1 !py-2.5 text-left !font-montserrat !text-xs !font-normal !text-[#454443]'
                      }
                    >
                      {formattedDatum}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {props?.loading ? (
          <div
            className={`absolute top-3 flex h-full w-full items-center justify-center backdrop-blur-[1px]`}
          >
            <svg
              aria-hidden='true'
              className='inline h-7 w-7 animate-spin fill-slate-50 text-gray-200 dark:text-gray-500'
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
          <div className='absolute top-3 flex h-[calc(100%-20px)] w-full items-center justify-center font-montserrat text-xs font-medium text-sfra-gray-300 backdrop-blur-[1px]'>
            <div className='space-y-2'>
              <div className='flex justify-center'>
                <img
                  src='/assets/images/table/noData.svg'
                  className='h-12'
                  alt='no data icon'
                />
              </div>
              <div>
                {props.emptyStateCopy
                  ? props.emptyStateCopy
                  : 'No data available'}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </TableContainer>
      {pagesCount > 0 && !props.onlyContent && (
        <Pagination
          className='mt-4'
          page={currentPage + 1}
          count={pagesCount}
          onChange={(_, page) => setCurrentPage(page - 1)}
        />
      )}
    </div>
  );
}
