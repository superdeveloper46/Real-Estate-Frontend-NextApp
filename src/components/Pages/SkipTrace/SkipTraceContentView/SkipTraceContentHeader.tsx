import React from 'react';

import styles from '../style.module.scss';

const SkipTraceContentHeader = () => {
  const items = [
    { title: 'RECORDS SUBMITTTED', value: '0' },
    { title: 'TOTAL HITS', value: '0' },
    { title: 'TOTAL HIT', value: '0' },
  ];
  return (
    <div className='flex justify-between space-x-5'>
      {items.map((item, index) => (
        <div className={styles.totalItem} key={index}>
          <div>{item?.title}</div>
          <div className='mt-2 flex items-center justify-between'>
            <div>{item.value}</div>
            <div className='flex items-center justify-center space-x-2'>
              <img
                src='/assets/images/skiptrace/arrowUp.svg'
                alt='arrowUp icon'
              />
              <div className='rounded-[6px] bg-[#17A163] py-1 px-2 text-sxs text-white'>
                100.00%
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkipTraceContentHeader;
