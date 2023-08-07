import React from 'react';
import { useSelector } from 'react-redux';

import Button from '@/components/Button/Button.component';
import { setSelectedDays, setStep } from '@/redux/slices/skipTrace';
import { dispatch } from '@/redux/store';

const SkipTraceHeader = () => {
  const days = ['7 Days', '30 Days', '90Days'];
  const { selectedDays, step } = useSelector((state: any) => state.skipTrace);

  return (
    <div className='flex h-9 items-center justify-between border-b border-gray-100 bg-white px-5 shadow-[0px_1px_6px_rgba(0,0,0,0.08)]'>
      <div
        className='flex items-center space-x-2'
        onClick={() => dispatch(setStep(0 as any))}
      >
        <div className='group cursor-pointer'>
          <img
            src='/assets/images/property/back.svg'
            alt='back.svg'
            className='blue-svg h-6'
          />
        </div>

        <div className='cursor-pointer font-montserrat text-xs font-normal text-sfra-gray-400'>
          {step === 0 ? 'Skip Trace' : 'Import'}
        </div>
      </div>

      {step === 0 && (
        <>
          <div className='flex space-x-3'>
            {days.map((item, index) => (
              <div
                key={index}
                className={`w-20 cursor-pointer rounded px-3 py-1 text-center font-montserrat text-ms text-sfra-gray-400 ${
                  selectedDays === index
                    ? 'bg-sfra-blue-100 !text-white'
                    : 'bg-sfra-gray-50'
                }`}
                onClick={() => dispatch(setSelectedDays(index as any))}
              >
                {item}
              </div>
            ))}
          </div>

          <div className='my-1'>
            <Button
              text='import'
              classes='rounded-full border h-7 group !px-8 hover:!bg-white hover:text-sfra-blue-100 hover:border-sfra-blue-50'
              onClick={() => dispatch(setStep(1 as any))}
              startIcon={
                <img
                  src='/assets/images/skiptrace/import.svg'
                  alt='import icon'
                  className='blue-svg h-4'
                />
              }
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SkipTraceHeader;
