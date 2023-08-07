import React from 'react';

import Button from '@/components/Button/Button.component';
import { setStep } from '@/redux/slices/skipTrace';
import { dispatch } from '@/redux/store';

const SkipTraceContentImport = () => {
  return (
    <div className='flex h-[calc(100vh-200px)] items-center justify-center'>
      <div className='space-y-8'>
        <div className='flex items-center justify-center'>
          <img
            src='/assets/images/skiptrace/importData.svg'
            alt='importData icon'
            className='h-36'
          />
        </div>

        <div className='space-y-1'>
          <div className='text-center font-montserrat text-base font-medium text-sfra-pink-100'>{`You haven't data`}</div>

          <div className='text-center font-montserrat text-xs font-normal'>
            Please import your CSV file
          </div>
        </div>

        <div className='flex items-center justify-center border'>
          <Button
            text='Import'
            classes='rounded-full border !bg-sfra-pink-100 !h-9 group !px-10 hover:!bg-white hover:text-sfra-pink-100 hover:border-sfra-pink-100'
            onClick={() => dispatch(setStep(1 as any))}
          />
        </div>
      </div>
    </div>
  );
};

export default SkipTraceContentImport;
