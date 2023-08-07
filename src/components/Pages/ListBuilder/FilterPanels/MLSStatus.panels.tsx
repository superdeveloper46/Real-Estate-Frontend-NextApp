import { format } from 'date-fns';
import React from 'react';

import DatepickerComp from '@/components/Datepicker/Datepicker.component';
import RadioInput from '@/components/RadioInput/RadioInput.component';

import { setData } from '../../../../redux/slices/listBuilder';
import { dispatch, useSelector } from '../../../../redux/store';
import style from './style.module.scss';

const MLSStatusPanel = () => {
  const dataId: string = 'mlsStatusFilters';

  const { filters }: any = useSelector((state: any) => state.listBuilder);
  const { mlsStatusFilters } = filters;

  const update = (key: string, value: any) => {
    const data: any = {
      dataId,
      key,
      value,
    };
    dispatch(setData(data));
  };

  return (
    <div className='w-72'>
      <div className={style.textLg}>On Market</div>
      <div className='mt-2 space-y-3 pl-1'>
        <RadioInput
          label='Bank Owned'
          checked={mlsStatusFilters.onMarket === 'Y'}
          onClick={() => update('onMarket', 'Y')}
        />
        <RadioInput
          label='No Bank Owned'
          checked={mlsStatusFilters.onMarket === 'N'}
          onClick={() => update('onMarket', 'N')}
        />
        <RadioInput
          label='Any'
          checked={mlsStatusFilters.onMarket === ''}
          onClick={() => update('onMarket', '')}
        />
      </div>

      <div className={style.hSeperator}></div>

      <div className={style.textLg}>MLS Status Date</div>
      <div className='my-3 flex space-x-3'>
        <div className='w-1/2'>
          <div className={style.textSm}>min date</div>
          <DatepickerComp
            value={
              mlsStatusFilters.mlsStatusDateStart === ''
                ? format(new Date(), 'MM/dd/yyyy')
                : mlsStatusFilters.mlsStatusDateStart
            }
            setValue={(value) => update('mlsStatusDateStart', value)}
          />
        </div>
        <div className='w-1/2'>
          <div className={style.textSm}>max date</div>
          <DatepickerComp
            value={
              mlsStatusFilters.mlsStatusDateEnd === ''
                ? format(new Date(), 'MM/dd/yyyy')
                : mlsStatusFilters.mlsStatusDateEnd
            }
            setValue={(value) => update('mlsStatusDateEnd', value)}
          />
        </div>
      </div>

      <div className={style.hSeperator}></div>

      <div>
        <div className={style.textLg}>Listing Amount</div>
        <div className='mt-2'>
          <input
            type={'text'}
            value={mlsStatusFilters.listingAmount}
            onChange={(e) => update('listingAmount', e.target.value)}
            className={style.textInput}
          />
        </div>
      </div>
    </div>
  );
};

export default MLSStatusPanel;
