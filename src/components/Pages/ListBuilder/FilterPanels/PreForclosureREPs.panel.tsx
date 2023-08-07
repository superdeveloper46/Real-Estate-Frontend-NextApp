import { format } from 'date-fns';
import React from 'react';

import DatepickerComp from '@/components/Datepicker/Datepicker.component';

import { setData } from '../../../../redux/slices/listBuilder';
import { dispatch, useSelector } from '../../../../redux/store';
import style from './style.module.scss';

const PreForclosureREPsPanel = () => {
  const dataId: string = 'preForeclosureRepsFilters';

  const { filters }: any = useSelector((state: any) => state.listBuilder);
  const { preForeclosureRepsFilters } = filters;

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
      <div>
        <div className={style.textLg}>Status</div>
        <div className='mt-2 mb-5'>
          <input
            type={'text'}
            value={preForeclosureRepsFilters.status}
            onChange={(e) => update('status', e.target.value)}
            className={style.textInput}
          />
        </div>
      </div>

      <div className={style.hSeperator}></div>

      <div className={style.textLg}>Recording Date</div>
      <div className='my-2 flex space-x-3'>
        <div className='w-1/2'>
          <div className={style.textSm}>min date</div>
          <DatepickerComp
            value={
              preForeclosureRepsFilters.recordingDateStart === ''
                ? format(new Date(), 'MM/dd/yyyy')
                : preForeclosureRepsFilters.recordingDateStart
            }
            setValue={(value) => update('recordingDateStart', value)}
          />
        </div>
        <div className='w-1/2'>
          <div className={style.textSm}>max date</div>
          <DatepickerComp
            value={
              preForeclosureRepsFilters.recordingDateEnd === ''
                ? format(new Date(), 'MM/dd/yyyy')
                : preForeclosureRepsFilters.recordingDateEnd
            }
            setValue={(value) => update('recordingDateEnd', value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PreForclosureREPsPanel;
