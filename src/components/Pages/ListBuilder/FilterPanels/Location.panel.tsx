import React from 'react';

import { setData } from '../../../../redux/slices/listBuilder';
import { dispatch, useSelector } from '../../../../redux/store';
import style from './style.module.scss';

const LocationPanel = () => {
  const dataId: string = 'locationFilters';
  const { filters }: any = useSelector((state: any) => state.listBuilder);
  const { locationFilters } = filters;

  const update = (key: string, value: any) => {
    const data: any = {
      dataId,
      key,
      value,
    };
    dispatch(setData(data));
  };

  return (
    <div className='space-y-4'>
      <div>
        <div className={style.textLg}>Zip Code</div>
        <div className='mt-2'>
          <input
            type={'text'}
            value={locationFilters.zipCode}
            onChange={(e) => update('zipCode', e.target.value)}
            className={style.textInput}
          />
        </div>
      </div>

      <div>
        <div className={style.textLg}>City</div>
        <div className='mt-2'>
          <input
            type={'text'}
            value={locationFilters.city}
            onChange={(e) => update('city', e.target.value)}
            className={style.textInput}
          />
        </div>
      </div>

      <div>
        <div className={style.textLg}>County</div>
        <div className='mt-2'>
          <input
            type={'text'}
            value={locationFilters.county}
            onChange={(e) => update('county', e.target.value)}
            className={style.textInput}
          />
        </div>
      </div>

      <div>
        <div className={style.textLg}>MSA</div>
        <div className='mt-2'>
          <input
            type={'text'}
            value={locationFilters.msa}
            onChange={(e) => update('msa', e.target.value)}
            className={style.textInput}
          />
        </div>
      </div>

      <div>
        <div className={style.textLg}>School District</div>
        <div className='mt-2'>
          <input
            type={'text'}
            value={locationFilters.schoolDistrict}
            onChange={(e) => update('schoolDistrict', e.target.value)}
            className={style.textInput}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationPanel;
