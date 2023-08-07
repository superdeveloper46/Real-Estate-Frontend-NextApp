import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';

import { setGlobalLoading } from '@/redux/slices/global';
import { dispatch } from '@/redux/store';

import styles from './style.module.scss';

const Information = () => {
  const [msas] = useState('');
  const [startDate] = useState('');
  const [endDate] = useState('');
  useEffect(() => {
    dispatch(setGlobalLoading(true));
    // getAccessMsas()
    //   .then((resData) => {
    //     setStartDate(resData.billing_start_date);
    //     setEndDate(resData.billing_end_date);
    //     setMsas(resData.msas);
    //     dispatch(setGlobalLoading(false));
    //   })
    //   .catch(() => {
    //     dispatch(setGlobalLoading(false));
    //   });
  }, []);

  const msaArray = msas.split(':::');

  return (
    <div className='space-y-3 px-8 py-5'>
      <div className='flex space-x-4'>
        <div className={styles.label}>Purchased date: </div>
        {startDate !== '' && (
          <div className={styles.value}>
            {format(new Date(startDate), 'MM/dd/yyyy')}
          </div>
        )}
      </div>
      <div className='flex space-x-4'>
        <div className={styles.label}>End date: </div>
        {endDate !== '' && (
          <div className={styles.value}>
            {format(new Date(endDate), 'MM/dd/yyyy')}
          </div>
        )}
      </div>
      <div className='flex items-center space-x-4'>
        <div className={styles.label}>Purchased Msas: </div>
        {msaArray?.map(
          (item, index: number) =>
            item !== '' && (
              <div
                className='rounded-md bg-sfra-blue-100/50 p-1 text-sm text-white'
                key={index}
              >
                {item}
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Information;
