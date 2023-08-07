import { useEffect, useState } from 'react';

import Button from '@/components/Button/Button.component';
import { setNotification } from '@/redux/slices/global';
import { setBalance, setImportStep, setStep } from '@/redux/slices/skipTrace';
import { dispatch, useSelector } from '@/redux/store';
import { addSkiptrace as add, getBalance } from '@/utils/api/restful/skiptrace';

import styles from '../style.module.scss';
import RadioTab from './RadioTab.component';

const StepContentFinish = () => {
  const { importStep, rowCounts, uploadFiles, uploadedFileName, balance } =
    useSelector((state: any) => state.skipTrace);
  const [selectedTab, setSelectedTab] = useState(0);

  const costPerMatch: number = 0.14;

  const addSkiptrace = () => {
    const reqData = {
      fileName: uploadFiles[0].name,
      hashName: uploadedFileName,
      totalRecords: rowCounts,
      totalHits: 1,
      hit: 1,
      matches: 1,
      savings: 1,
      totalCost: rowCounts * costPerMatch,
    };
    add(reqData).then((data) => {
      if (data.result === 'success') {
        dispatch(
          setNotification({
            notiType: 'success',
            notification: 'Successfully saved.',
          })
        );
        dispatch(setStep(0));
      }
    });
  };

  useEffect(() => {
    getBalance().then((data) => {
      if (data.result === 'success') dispatch(setBalance(data.balance ?? 0));
    });
  });

  return (
    <div className={`${styles.content} space-y-10`}>
      <div className='flex space-x-8'>
        <div className='w-1/2'>
          <div className='font-montserrat text-xs text-sfra-gray-200'>
            ASSIGN TO LIST*
          </div>

          <div className='mt-4 flex items-center justify-start space-x-5'>
            <div>
              <Button
                text='Select List'
                textClass='text-gray-400 text-left w-56'
                classes='rounded-[6px] border !bg-sfra-blue-10 !h-9 !px-2'
                endIcon={
                  <img
                    src='/assets/images/skiptrace/down.svg'
                    alt='plus icon'
                    className='default-darkBlue-svg'
                  />
                }
              />
            </div>
            <div className='font-montserrat text-xs text-sfra-gray-200'>OR</div>
            <div>
              <Button
                text='Add New'
                classes='rounded-full border !bg-sfra-blue-100 !h-9 group !px-10 hover:!bg-white hover:text-sfra-blue-100 hover:border-sfra-blue-100'
                startIcon={
                  <img
                    src='/assets/images/skiptrace/plus.svg'
                    alt='plus icon'
                    className='blue-svg'
                  />
                }
              />
            </div>
          </div>
        </div>

        <div className='w-1/2'>
          <div className='font-montserrat text-xs text-sfra-gray-200'>
            ASSIGN TAGS
          </div>

          <div className='mt-4 flex items-center justify-start space-x-5'>
            <div>
              <Button
                text='Select List'
                textClass='text-gray-400 text-left w-56'
                classes='rounded-[6px] border !bg-sfra-blue-10 !h-9 !px-2'
                endIcon={
                  <img
                    src='/assets/images/skiptrace/down.svg'
                    alt='plus icon'
                    className='default-darkBlue-svg'
                  />
                }
              />
            </div>
            <div className='font-montserrat text-xs text-sfra-gray-200'>OR</div>
            <div>
              <Button
                text='Add New'
                classes='rounded-full border !bg-sfra-blue-100 !h-9 group !px-10 hover:!bg-white hover:text-sfra-blue-100 hover:border-sfra-blue-100'
                startIcon={
                  <img
                    src='/assets/images/skiptrace/plus.svg'
                    alt='plus icon'
                    className='blue-svg'
                  />
                }
              />
            </div>
          </div>
        </div>
      </div>

      <div className='flex rounded-[10px] bg-sfra-gray-400 p-2.5 font-montserrat text-xs text-white'>
        <img
          src='/assets/images/skiptrace/info.svg'
          className='mr-1.5'
          alt='info icon'
        />
        {`Records that have already been skip traced, are duplicates, or have insufficient information will be omitted and you will not be charged.`}
      </div>

      <div className='flex justify-between'>
        <div className='space-y-5'>
          <div className='font-montserrat text-base font-semibold text-sfra-gray-400'>
            Payment Method
          </div>

          <div className='flex space-x-5'>
            <div className='w-80'>
              <RadioTab
                title={
                  <div>
                    Wallet Balance{' '}
                    <span className='text-xa font-montserrat font-semibold text-sfra-gray-400'>
                      ${balance}
                    </span>
                  </div>
                }
                selected={selectedTab === 0}
                url='/assets/images/skiptrace/wallet.svg'
                setSelectedTab={() => {
                  setSelectedTab(0);
                }}
              />
            </div>

            <div>
              <Button
                text='Top Up'
                classes='rounded-full border !bg-sfra-blue-100 !h-9 group !px-10 hover:!bg-white hover:text-sfra-blue-100 hover:border-sfra-blue-100'
                startIcon={
                  <img
                    src='/assets/images/skiptrace/topUp.svg'
                    alt='topUp icon'
                    className='blue-svg'
                  />
                }
              />
            </div>
          </div>

          <div className='w-80'>
            <RadioTab
              title={'Pay now'}
              selected={selectedTab === 1}
              url='/assets/images/skiptrace/pay.svg'
              setSelectedTab={() => {
                setSelectedTab(1);
              }}
            />
          </div>

          <div className=' font-montserrat text-xs text-sfra-gray-200'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            semper fringilla tincidunt. Proin sagittis iaculis dolor, eu
            volutpat nisl vestibulum sed. In neque arcu, volutpat eu nulla sit
            amet, ultrices sagittis nunc. Nulla posuere sollicitudin sapien.
          </div>
        </div>
        <div className='mx-20 border border-r-[1px] bg-sfra-gray-50'></div>
        <div className='space-y-5'>
          <div className='text-center font-montserrat text-base font-semibold text-sfra-gray-400'>
            Payment Method
          </div>

          <div className='text-center font-montserrat text-xs text-sfra-gray-200'>
            <span className='text-sm font-semibold'>{rowCounts}</span>{' '}
            {'records eligible for skip tracing'}
            <br />
            <span className='text-sm font-semibold'>${costPerMatch}</span> per
            match
          </div>

          <div className='flex w-72 items-center justify-between rounded-[10px] bg-sfra-pink-100 px-6 py-3'>
            <div className='font-montserrat text-sxs text-white'>
              TOTAL COST
            </div>
            <div className='font-montserrat text-lg font-medium text-white'>
              ${costPerMatch * rowCounts}
            </div>
          </div>

          <div>
            <Button
              text='Save to Draft'
              classes='rounded-[10px] border !bg-white !h-9 group w-72 hover:!bg-white !text-sfra-pink-100 !border-sfra-pink-100 hover:!bg-sfra-gray-50'
            />
          </div>
        </div>
      </div>

      <div className='border border-b-[1px] bg-sfra-gray-50'></div>

      <div className='flex items-center justify-between'>
        <Button
          text='Back'
          classes='rounded-[10px] border !bg-white !h-9 group !px-16 hover:!bg-white !text-sfra-pink-100 !border-sfra-pink-100 hover:!bg-sfra-gray-50'
          onClick={() => {
            dispatch(setImportStep((Number(importStep) - 1) as any));
          }}
        />
        <div className='flex space-x-5'>
          <Button
            text='Cancel'
            classes='rounded-[10px] border !bg-white !h-9 group !px-16 hover:!bg-white !text-sfra-pink-100 !border-sfra-pink-100 hover:!bg-sfra-gray-50'
          />
          <Button
            text='Skip Trace'
            classes='rounded-[10px] border !bg-sfra-pink-100 !h-9 group !px-16 hover:!bg-white hover:text-sfra-pink-100 hover:border-sfra-pink-100'
            onClick={addSkiptrace}
          />
        </div>
      </div>
    </div>
  );
};

export default StepContentFinish;
