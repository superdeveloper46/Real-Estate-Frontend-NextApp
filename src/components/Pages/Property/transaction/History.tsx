import { format } from 'date-fns';
import React from 'react';
import { useSelector } from 'react-redux';

import style from '../style.module.scss';

const History = () => {
  const { transaction } = useSelector((state: any) => state.property);
  const data = [
    {
      title: 'RECORDING DATE',
      value:
        transaction?.recordingdate === 'null'
          ? 'null'
          : format(new Date(transaction?.recordingdate), 'MM/dd/yyyy'),
    },
    {
      title: 'SALE DATE',
      value:
        transaction?.saledate === 'null'
          ? 'null'
          : format(new Date(transaction?.saledate), 'MM/dd/yyyy'),
    },
    {
      title: 'BUYER/BORROWER NAME',
      value: transaction?.buyerborrower1name,
    },
    {
      title: 'SELLER NAME',
      value: transaction?.seller1name,
    },
    {
      title: 'SALE AMOUNT',
      value: transaction?.saleamt,
    },
    {
      title: 'LOAN TYPE',
      value: transaction?.loan_type,
    },
    {
      title: 'LENDER NAME',
      value: transaction?.firstmtglendername,
    },
    {
      title: 'LOAN TERM',
      value: transaction?.firstmtgterm,
    },
    {
      title: 'LOAN DUE DATE',
      value:
        transaction?.loan_due_date === 'null'
          ? 'null'
          : format(new Date(transaction?.loan_due_date), 'MM/dd/yyyy'),
    },
  ];

  return (
    <div className='col-span-5 row-auto m-5 grid space-y-[1px] overflow-auto'>
      {data.map((item, index) => (
        <div
          key={index}
          className={`flex odd:bg-sfra-gray-50 even:bg-white
            ${index === 0 ? ' rounded-t-xl' : ''}`}
        >
          <div
            className={`${style.tableColumn} !bg-[#DAE3F5] !font-medium ${
              index === 0 ? 'rounded-tl-xl' : ''
            }`}
          >
            {item.title}
          </div>
          <div
            className={`${style.tableColumn} ${
              index === 0 ? ' rounded-tr-xl' : ''
            }`}
          >
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
