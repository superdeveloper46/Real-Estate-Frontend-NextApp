import React from 'react';
import { useSelector } from 'react-redux';

import style from '../style.module.scss';

const Mortgages = () => {
  const { currentMortgages } = useSelector((state: any) => state.property);

  const data = [
    [
      'LOAN',
      currentMortgages?.mtg1lienposition,
      currentMortgages?.mtg2lienposition,
      currentMortgages?.mtg3lienposition,
      currentMortgages?.mtg4lienposition,
    ],
    [
      'RECORDING DATE',
      currentMortgages?.mtg1recordingdate,
      currentMortgages?.mtg2recordingdate,
      currentMortgages?.mtg3recordingdate,
      currentMortgages?.mtg4recordingdate,
    ],
    [
      'DOCUMENT NUMBER',
      currentMortgages?.mtg1documentnbr,
      currentMortgages?.mtg2documentnbr,
      currentMortgages?.mtg3documentnbr,
      currentMortgages?.mtg4documentnbr,
    ],
    [
      'LOAN TYPE',
      currentMortgages?.mtg1loantype,
      currentMortgages?.mtg2loantype,
      currentMortgages?.mtg3loantype,
      currentMortgages?.mtg4loantype,
    ],
    [
      'LENDER NAME',
      currentMortgages?.mtg1lender,
      currentMortgages?.mtg2lender,
      currentMortgages?.mtg3lender,
      currentMortgages?.mtg4lender,
    ],
    [
      'LOAN AMOUNT',
      currentMortgages?.mtg1loanamt,
      currentMortgages?.mtg2loanamt,
      currentMortgages?.mtg3loanamt,
      currentMortgages?.mtg4loanamt,
    ],
    [
      'EST RATE',
      currentMortgages?.mtg1interestrate,
      currentMortgages?.mtg2interestrate,
      currentMortgages?.mtg3interestrate,
      currentMortgages?.mtg4interestrate,
    ],
    [
      'TERM',
      currentMortgages?.mtg1term,
      currentMortgages?.mtg2term,
      currentMortgages?.mtg3term,
      currentMortgages?.mtg4term,
    ],
    [
      'DUE DATE',
      currentMortgages?.mtg1duedate,
      currentMortgages?.mtg1duedate,
      currentMortgages?.mtg1duedate,
      currentMortgages?.mtg1duedate,
    ],
  ];

  return (
    <div className='col-span-5 row-auto m-5 grid space-y-[1px] overflow-auto'>
      {data.map((item, index) => (
        <div
          key={index}
          className={`flex odd:bg-sfra-gray-50 even:bg-white
        ${index === 0 ? ' rounded-t-xl' : ''}`}
        >
          {item.map((child, i) => (
            <>
              {i === 0 ? (
                <div
                  className={`${style.tableColumn} !bg-[#DAE3F5] !font-medium ${
                    index === 0 ? 'rounded-tl-xl' : ''
                  }`}
                >
                  {item[0]}
                </div>
              ) : (
                <div className={style.tableColumn}>{item[i]}</div>
              )}
            </>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Mortgages;
