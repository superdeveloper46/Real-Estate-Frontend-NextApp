import React from 'react';

import Range from '@/components/Range/Range.component';

import { setData } from '../../../../redux/slices/listBuilder';
import { dispatch, useSelector } from '../../../../redux/store';
import style from './style.module.scss';

const ValuationEquityInfoPanel = () => {
  const dataId: string = 'valuationEquityInfoFilters';

  const { filters }: any = useSelector((state: any) => state.listBuilder);
  const { valuationEquityInfoFilters } = filters;

  const update = (key: string, value: any) => {
    const data: any = {
      dataId,
      key,
      value,
    };
    dispatch(setData(data));
  };

  return (
    <div>
      <div className={style.textLg}>Estimated Value</div>
      <div className={style.priceInput + ' flex justify-between my-2'}>
        <input
          type='number'
          value={valuationEquityInfoFilters.estimatedValueMin}
          onChange={(e) =>
            update('estimatedValueMin', Number(e.target.value) + '')
          }
        />
        <input
          type='number'
          value={valuationEquityInfoFilters.estimatedValueMax}
          onChange={(e) =>
            update('estimatedValueMax', Number(e.target.value) + '')
          }
        />
      </div>
      <Range
        value={[
          valuationEquityInfoFilters.estimatedValueMin,
          valuationEquityInfoFilters.estimatedValueMax,
        ]}
        max={5000000}
        onChange={(value: Array<number>) => {
          update('estimatedValueMin', value[0] ?? 0);
          update('estimatedValueMax', value[1] ?? 0);
        }}
      />
      <div className='mb-2 flex justify-between space-x-3'>
        <div className={style.textSm}>min</div>
        <div className={style.textSm}>max</div>
      </div>

      <div className={style.hSeperator}></div>

      <div className={style.textLg}>Estimated Equity</div>
      <div className={style.priceInput + ' flex justify-between my-2'}>
        <input
          type='number'
          value={valuationEquityInfoFilters.estimatedEquityMin}
          onChange={(e) =>
            update('estimatedEquityMin', Number(e.target.value) + '')
          }
        />
        <input
          type='number'
          value={valuationEquityInfoFilters.estimatedEquityMax}
          onChange={(e) =>
            update('estimatedEquityMax', Number(e.target.value) + '')
          }
        />
      </div>
      <Range
        value={[
          valuationEquityInfoFilters.estimatedEquityMin,
          valuationEquityInfoFilters.estimatedEquityMax,
        ]}
        max={5000000}
        onChange={(value: Array<number>) => {
          update('estimatedEquityMin', value[0] ?? 0);
          update('estimatedEquityMax', value[1] ?? 0);
        }}
      />
      <div className='mb-2 flex justify-between space-x-3'>
        <div className={style.textSm}>min</div>
        <div className={style.textSm}>max</div>
      </div>

      <div className={style.hSeperator}></div>

      <div className={style.textLg}>Assessed Total Value</div>
      <div className={style.priceInput + ' flex justify-between my-2'}>
        <input
          type='number'
          value={valuationEquityInfoFilters.assessedTotalValueMin}
          onChange={(e) =>
            update('assessedTotalValueMin', Number(e.target.value) + '')
          }
        />
        <input
          type='number'
          value={valuationEquityInfoFilters.assessedTotalValueMax}
          onChange={(e) =>
            update('assessedTotalValueMax', Number(e.target.value) + '')
          }
        />
      </div>
      <Range
        value={[
          valuationEquityInfoFilters.assessedTotalValueMin,
          valuationEquityInfoFilters.assessedTotalValueMax,
        ]}
        max={5000000}
        onChange={(value: Array<number>) => {
          update('assessedTotalValueMin', value[0] ?? 0);
          update('assessedTotalValueMax', value[1] ?? 0);
        }}
      />
      <div className='mb-2 flex justify-between space-x-3'>
        <div className={style.textSm}>min</div>
        <div className={style.textSm}>max</div>
      </div>
    </div>
  );
};

export default ValuationEquityInfoPanel;
