import React, { useEffect } from 'react';

import { hideNotification } from '@/redux/slices/global';
import { dispatch, useSelector } from '@/redux/store';

const CloseButton = () => {
  return (
    <button
      type='button'
      className='-m-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300'
      data-dismiss-target='#toast-danger'
      aria-label='Close'
      onClick={() => {
        dispatch(hideNotification());
      }}
    >
      <span className='sr-only'>Close</span>
      <svg
        aria-hidden='true'
        className='h-5 w-5'
        fill='currentColor'
        viewBox='0 0 20 20'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill-rule='evenodd'
          d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
          clip-rule='evenodd'
        ></path>
      </svg>
    </button>
  );
};

const NotiComponent = () => {
  const { notification, notiType } = useSelector((state: any) => state.global);
  useEffect(() => {
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  }, []);
  return (
    <div className='fixed right-0 bottom-0 z-[99999] flex h-full w-full items-baseline justify-around pt-5'>
      {notiType === 'success' && (
        <div className='mb-4 flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow transition-all duration-500'>
          <div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500'>
            <svg
              aria-hidden='true'
              className='h-5 w-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                clip-rule='evenodd'
              ></path>
            </svg>
            <span className='sr-only'>Check icon</span>
          </div>
          <div className='ml-3 text-sm font-normal'>{notification}</div>
          <CloseButton />
        </div>
      )}
      {notiType === 'danger' && (
        <div className='mb-4 flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow'>
          <div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 '>
            <svg
              aria-hidden='true'
              className='h-5 w-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clip-rule='evenodd'
              ></path>
            </svg>
            <span className='sr-only'>Error icon</span>
          </div>
          <div className='ml-3 text-sm font-normal'>{notification}</div>
          <CloseButton />
        </div>
      )}
      {notiType === 'warning' && (
        <div className='flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow transition-all duration-500'>
          <div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 transition-all duration-500'>
            <svg
              aria-hidden='true'
              className='h-5 w-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                clip-rule='evenodd'
              ></path>
            </svg>
            <span className='sr-only'>Warning icon</span>
          </div>
          <div className='ml-3 text-sm font-normal'>{notification}</div>
          <CloseButton />
        </div>
      )}
    </div>
  );
};

const Notifcation = () => {
  const { notiVisible } = useSelector((state: any) => state.global);
  return <>{notiVisible && <NotiComponent />}</>;
};

export default Notifcation;
